const express = require("express")
const router = express.Router()

const {generatePresignedUrl,statuschange} = require("../controller/awsController");
const { isLoggedin } = require("../middleware/AuthMiddleware")


// router.get("/generate-presigned-url", presigndURL);                   
router.get("/generate-presigned-url", isLoggedin,generatePresignedUrl);

router.get('/statuschanger',statuschange)
module.exports = router;