const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");

const fs = require("fs/promises");
const fsOld = require("fs");
const path = require("node:path");
const ffmpeg = require("fluent-ffmpeg");

require('dotenv').config();

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

  const command = new GetObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: process.env.KEY,
  });

  const result = await s3Client.send(command);
  const orignalFilePath = "videos/orignal-video.mp4";

  await fs.writeFile(orignalFilePath, result.Body);

  const orignalVideoPath = path.resolve(orignalFilePath);
  const outputDirectory = "result";

  const resolutions = [
    { width: 640, height: 360, bitrate: "800k" }, // 360p
    { width: 854, height: 480, bitrate: "1200k" }, // 480p
  ];

  const promises = resolutions.map(({ width, height, bitrate }) => {
    return new Promise((resolve, reject) => {
      const outputFileName = `${height}.m3u8`;
      const outputFilePath = `${outputDirectory}/${outputFileName}`;

      ffmpeg(orignalVideoPath)
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
          //IF not Work Shift OutCommand Here
          resolve(); // Resolve the promise when done
        })
        .on("error", (err) => {
          console.error(`Error during transcoding: ${err.message}`);
          reject(err); // Reject the promise on error
        })
        .run();
    });
  });

  // Return a promise that resolves when all transcoding promises are done
  await Promise.all(promises);
  await uploadFolderToS3(bucketName, localFolderPath, s3FolderPath);
  process.exit(0);
}

async function uploadFolderToS3(bucketName, folderPath, s3FolderPath) {
  try {
    const files = await fs.readdir(folderPath);

    // Iterate over each file in the folder
    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const stats = await fs.stat(filePath);

      // If it's a directory, recurse into it
      if (stats.isDirectory()) {
        await uploadFolderToS3(
          bucketName,
          filePath,
          path.join(s3FolderPath, file)
        );
      } else {
        // Upload the file to S3
        const relativePath = path.relative(folderPath, filePath); // Get the relative path
        const s3Key = path.join(s3FolderPath, relativePath).replace(/\\/g, "/"); // Construct the S3 key

        const putCommand = new PutObjectCommand({
          Bucket: bucketName,
          Key: s3Key, // Use the constructed key
          Body: fsOld.createReadStream(filePath), // Use a read stream for the file
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

