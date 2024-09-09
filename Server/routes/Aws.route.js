const express = require("express")
const router = express.Router()

const {generatePresignedUrl} = require("../controller/awsController");


// router.get("/generate-presigned-url", presigndURL);                   
router.get("/generate-presigned-url", generatePresignedUrl);
module.exports = router;