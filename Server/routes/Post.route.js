const express = require('express')
const router = express.Router()
const { createpost , editpost , readposts , deletepost ,updateVideoDetilas } = require('../controller/PostController')
const { isLoggedin, isFaculty, isAdmin } = require('../middleware/AuthMiddleware')

router.post('/createpost',isLoggedin ,createpost)
router.post('/editpost',isLoggedin,editpost)
router.post('/deletepost',isLoggedin, deletepost)
router.post('/updatevideodetails',isLoggedin , updateVideoDetilas)

router.get('/getpost',isLoggedin,readposts)

module.exports = router