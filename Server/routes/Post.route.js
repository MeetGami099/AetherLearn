const express = require('express')
const router = express.Router()
const { createpost , editpost , readposts , deletepost } = require('../controller/PostController')
const { isLoggedin, isFaculty, isAdmin } = require('../middleware/AuthMiddleware')

router.post('/createpost',isLoggedin,isFaculty || isAdmin,createpost)
router.post('/editpost',isLoggedin,isFaculty || isAdmin , editpost)
router.post('/deletepost',isLoggedin,isFaculty || isAdmin , deletepost)

router.get('/getpost',isLoggedin,readposts)

module.exports = router