const express = require('express')
const router = express.Router()
const { createPost , deletePost , readPosts , editPost ,updateVideoDetilas, getVideos } = require('../controller/PostController')
const { isLoggedin} = require('../middleware/AuthMiddleware')

router.post('/createpost',isLoggedin ,createPost)
router.post('/editpost',isLoggedin,editPost)
router.post('/deletepost',isLoggedin, deletePost)
router.post('/updatevideodetails',isLoggedin , updateVideoDetilas)

router.get('/getpost',isLoggedin,readPosts);
router.get('/getvideos',isLoggedin , getVideos)

module.exports = router