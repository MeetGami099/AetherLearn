const express = require("express")
const router = express.Router()

const {generatePresignedUrl} = require("../controller/awsController");
const { isLoggedin } = require("../middleware/AuthMiddleware")


// router.get("/generate-presigned-url", presigndURL);                   
router.get("/generate-presigned-url", isLoggedin,generatePresignedUrl);
module.exports = router;