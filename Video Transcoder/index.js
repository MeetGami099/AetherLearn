const axios = require("axios"); // Import axios
const { S3Client, GetObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs/promises");
const path = require("node:path");
const ffmpeg = require("fluent-ffmpeg");

require('dotenv').config();

// Check if environment variables are set
const requiredEnvVars = ['AWS_REGION', 'AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'BUCKET_NAME', 'VIDEO_ID', 'KEY'];
for (let envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Environment variable ${envVar} is missing`);
  }
}

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const bucketName = process.env.BUCKET_NAME;
const localFolderPath = "./result"; 
const s3FolderPath = `Production/${process.env.VIDEO_ID}`;

async function init() {
  try {
    // Fetch the video from S3
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: process.env.KEY,
    });

    const result = await s3Client.send(command);
    const originalFilePath = "videos/original-video.mp4";

    await fs.writeFile(originalFilePath, result.Body);

    const originalVideoPath = path.resolve(originalFilePath);
    const outputDirectory = "result";

    const resolutions = [
      { width: 640, height: 360, bitrate: "800k" }, // 360p
      { width: 854, height: 480, bitrate: "1200k" }, // 480p
    ];

    const promises = resolutions.map(({ width, height, bitrate }) => {
      return new Promise((resolve, reject) => {
        const outputFileName = `${height}.m3u8`;
        const outputFilePath = `${outputDirectory}/${outputFileName}`;

        ffmpeg(originalVideoPath)
          .outputOptions([
            `-vf scale=${width}:${height}`, // Scale to the desired resolution
            `-b:v ${bitrate}`, // Set video bitrate
            "-f hls", // Set output format to HLS
            "-hls_time 10", // Segment duration
            "-hls_list_size 0", // Keep all segments in the playlist
            `-hls_segment_filename ${outputDirectory}/video-${width}x${height}-%03d.ts`, // Segment file pattern
          ])
          .output(outputFilePath)
          .on("end", async () => {
            console.log(`Transcoding to ${width}x${height} completed!`);
            resolve(); // Resolve the promise when done
          })
          .on("error", (err) => {
            console.error(`Error during transcoding: ${err.message}`);
            reject(err); // Reject the promise on error
          })
          .run();
      });
    });

    // Wait for all resolutions to be transcoded
    await Promise.all(promises);

    // Upload the transcoded files to S3
    await uploadFolderToS3(bucketName, localFolderPath, s3FolderPath);

    // Call the API after all uploads are complete
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/aws/statuschanger?videoId=${process.env.VIDEO_ID}`,);
      console.log("API Response:", response.data);
    } catch (apiError) {
      console.error("Error calling API:", apiError.message);
    }

    process.exit(0); // Exit after completion
  } catch (error) {
    console.error("Error initializing video transcoding:", error);
    process.exit(1); // Exit with error if any step fails
  }
}

async function uploadFolderToS3(bucketName, folderPath, s3FolderPath) {
  try {
    const files = await fs.readdir(folderPath);

    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const stats = await fs.stat(filePath);

      if (stats.isDirectory()) {
        await uploadFolderToS3(bucketName, filePath, path.join(s3FolderPath, file));
      } else {
        const relativePath = path.relative(folderPath, filePath);
        const s3Key = path.join(s3FolderPath, relativePath).replace(/\\/g, "/");

        const putCommand = new PutObjectCommand({
          Bucket: bucketName,
          Key: s3Key,
          Body: fs.createReadStream(filePath),
        });

        await s3Client.send(putCommand);
        console.log(`Uploaded ${filePath} to s3://${bucketName}/${s3Key}`);
      }
    }
  } catch (error) {
    console.error("Error uploading folder:", error);
  }
}

init();
