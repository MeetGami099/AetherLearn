const {
  ReceiveMessageCommand,
  SQSClient,
  DeleteMessageCommand,
} = require("@aws-sdk/client-sqs");
const { ECSClient, RunTaskCommand } = require("@aws-sdk/client-ecs");
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
                QueueUrl:process.env.AWS_SQS_URL,
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

          //Spint The Docker (We are Using ECS)

          const runTask = new RunTaskCommand({
            taskDefinition:process.env.AWS_TASK_ARN,
            cluster:process.env.AWS_CLUSTER_ARN,
            launchType: "FARGATE",
            networkConfiguration: {
              awsvpcConfiguration: {
                assignPublicIp: "ENABLED",
                securityGroups: process.env.AWS_SEC_GRP,
                subnets: process.env.AWS_SUBNETS,
              },
            },
            overrides: {
              containerOverrides: [
                {
                  name: "video-transcoder",
                  environment: [
                    { name: "BUCKET_NAME", value: bucket.name },
                    { name: "KEY", value: object.key },
                    {
                      name: "VIDEO_ID",
                      value: object.key
                        .split("/")[1]
                        .split("-")[2]
                        .split(".")[0],
                    },
                  ],
                },
              ],
            },
          });

          await ecsClient.send(runTask);
          console.log("Conatiner Spinend");

          await clinet.send(
            new DeleteMessageCommand({
              QueueUrl:
              process.env.AWS_SQS_URL,
              ReceiptHandle: message.ReceiptHandle,
            })
          );
        }
        console.log("MSg Deleted");

        //Still We have to Store the IT in DB
        //And Delete the Raw Video
      }
    } catch (error) {
      console.log(error);
    }
  }
}

init();
