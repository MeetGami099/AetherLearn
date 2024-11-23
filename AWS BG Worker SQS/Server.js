const {
  ReceiveMessageCommand,
  SQSClient,
  DeleteMessageCommand,
} = require("@aws-sdk/client-sqs");
const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { ECSClient, RunTaskCommand } = require("@aws-sdk/client-ecs");
const axios = require("axios"); // Import axios
require('dotenv').config();

const clinet = new SQSClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const ecsClient = new ECSClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Parse the environment variables as arrays
const AWS_SEC_GRP = JSON.parse(process.env.AWS_SEC_GRP);
const AWS_SUBNETS = JSON.parse(process.env.AWS_SUBNETS);

const taskList = []; 
const taskDetailsMap = new Map(); 

async function init() {
  const command = new ReceiveMessageCommand({
    QueueUrl: process.env.AWS_SQS_URL,
    MaxNumberOfMessages: 1,
    WaitTimeSeconds: 15,
  });

  while (true) {
    const { Messages } = await clinet.send(command);
    if (!Messages) {
      console.log("No Message");
      continue;
    }

    try {
      for (const message of Messages) {
        if (!message.Body) continue;
        const event = JSON.parse(message.Body);

        if ("Service" in event && "Event" in event) {
          if (event.Event == "s3:TestEvent") {
            await clinet.send(
              new DeleteMessageCommand({
                QueueUrl: process.env.AWS_SQS_URL,
                ReceiptHandle: message.ReceiptHandle,
              })
            );
            continue;
          }
        }

        for (const record of event.Records) {
          const { s3 } = record;
          const { bucket, object } = s3;

          console.log("\n\n", object);

          // Spin the Docker (ECS Task)
          const runTask = new RunTaskCommand({
            taskDefinition: process.env.AWS_TASK_ARN,
            cluster: process.env.AWS_CLUSTER_ARN,
            launchType: "FARGATE",
            networkConfiguration: {
              awsvpcConfiguration: {
                assignPublicIp: "ENABLED",
                securityGroups: AWS_SEC_GRP,
                subnets: AWS_SUBNETS,
              },
            },

            overrides: {
              containerOverrides: [
                {
                  name: "video-transcoder",
                  environment: [
                    { name: "BUCKET_NAME", value: bucket.name },
                    { name: "KEY", value: object.key },
                    { name: "VIDEO_ID", value: object.key.split("/")[1].split("-")[2] },
                  ],
                },
              ],
            },
          });

          const runTaskResponse = await ecsClient.send(runTask);
          console.log("Container Spinned");

          // Delete the message from the queue after processing
          await clinet.send(
            new DeleteMessageCommand({
              QueueUrl: process.env.AWS_SQS_URL,
              ReceiptHandle: message.ReceiptHandle,
            })
          );
          console.log("Message Deleted");

          try {
            const command = new DeleteObjectCommand({
              Bucket: bucket.name,
              Key:  object.key,
            });
        
            const response = await s3Client.send(command);
            console.log(`Successfully deleted ${object.key} from bucket ${bucket.name}.`, response);
          } catch (error) {
            console.error(`Error deleting ${object.key} from bucket ${ bucket.name}:`, error);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}

init();

