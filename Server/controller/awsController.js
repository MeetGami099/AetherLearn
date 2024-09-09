const express = require('express');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const router = express.Router();

require('dotenv').config();
// Initialize the S3 client
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const generatePresignedUrl = async (req, res) => {
    try {
        const { fileName, fileType } = req.body;
        // console.log("dsjbfsafb",fileName)
        // Define the parameters for the presigned URL
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,  // Your S3 bucket name
            Key: fileName,                        // The name of the file to be uploaded
            ContentType: fileType,                // The file MIME type
        };

        // Create a command to put the object
        const command = new PutObjectCommand(params);
        const publicUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
        // Generate the presigned URL (expiration time: 5 minutes)
        const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 });
        console.log("dsc",presignedUrl)
        res.status(200).json({
            success: true,
            url: presignedUrl,
        });
    } catch (error) {
        console.error('Error generating presigned URL:', error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong while generating the presigned URL',
        });
    }
};



module.exports = {generatePresignedUrl};