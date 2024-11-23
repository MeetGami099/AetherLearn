const express = require('express');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const videoModal = require("../model/video.modal")

const { v4: uuidv4 } = require('uuid');

function generateShortUUID() {
    const uuid = uuidv4();
    const shortUUID = uuid.split('-')[4];
    return shortUUID;
}

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
        const { classroomID, fileType } = req.query || req.body;
        const uuid = generateShortUUID();

        //check This uuid in Db Exist or not if not thans store it [PENDING]
        let videoEntrie = await videoModal.findOne({videoId:uuid})

        if(videoEntrie){
            while(videoEntrie!==null){
                const uuid = generateShortUUID();
                    videoEntrie = await videoModal.findOne({videoId:uuid})
                if(!videoEntrie){break;}
            }
        }

        const response = await videoModal.create({
            classroomId:classroomID,
            userId:req.user._id,
            videoId:uuid,
            status:"processing",
            url:`${process.env.AWS_CLOUDFRONT}/Production/${uuid}/`
        })


        // Define the parameters for the presigned URL
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,  // Your S3 bucket name
            Key:`RawVideos/${req.user._id}-${classroomID}-${uuid}`,                        // The name of the file to be uploaded
            ContentType: fileType,                // The file MIME type
        };

        // Create a command to put the object
        const command = new PutObjectCommand(params);

        // const publicUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

        // Generate the presigned URL (expiration time: 5 minutes)
        const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 });
     
        res.status(200).json({
            success: true,
            url: presignedUrl,
            dbId:response._id
        });

    } catch (error) {
        console.error('Error generating presigned URL:', error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong while generating the presigned URL',
        });
    }
};

const generatePdfUrl = async (req, res) => {
    try {
        const { classroomID, fileType } = req.query || req.body;
        const uuid = generateShortUUID();

        //check This uuid in Db Exist or not if not thans store it [PENDING]
        let videoEntrie = await videoModal.findOne({videoId:uuid})

        if(videoEntrie){
            while(videoEntrie!==null){
                const uuid = generateShortUUID();
                    videoEntrie = await videoModal.findOne({videoId:uuid})
                if(!videoEntrie){break;}
            }
        }

        const response = await videoModal.create({
            classroomId:classroomID,
            userId:req.user._id,
            videoId:uuid,
            status:"processing",
            url:`${process.env.AWS_CLOUDFRONT}/Production/${uuid}/360.m3u8`
        })

        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,  
            Key:`pdf/${req.user._id}-${classroomID}-${uuid}`,                   
            ContentType: fileType,                
        };

        // Create a command to put the object
        const command = new PutObjectCommand(params);

        // const publicUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

        // Generate the presigned URL (expiration time: 5 minutes)
        const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 });
     
        res.status(200).json({
            success: true,
            url: presignedUrl,
            dbId:response._id
        });

    } catch (error) {
        console.error('Error generating presigned URL:', error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong while generating the presigned URL',
        });
    }
};

const statuschange = async (req,res)=>{
    try {
        console.log("AWS requuest Arrived");
        const {videoId} = req.query
        console.log(videoId)
        const video1 = await videoModal.findOneAndUpdate({videoId:videoId},{status:'publish'})
        if(!video1){
            return res.status(404).json({
                success: false,
                message: 'Video not found',
            })
        }
        return res.status(200).json({
            success:true,
            message:"status change successfully"
        })


    } catch (e) {
        confirm.log('error in status change controller',e)
        return res.status(500)
    }
}

module.exports = {generatePresignedUrl,generatePdfUrl,statuschange};