const express = require('express')
const router = express.Router()
const { isLoggedin , isStudent , isFaculty ,isAdmin} = require('../middleware/AuthMiddleware')

const {editclass,createClass, getclass, joinclass, leaveclass,getAllClasses} = require('../controller/ClassController')
// for teachers only do this thing
router.post('/createclass',isLoggedin, createClass)
router.post('/editclass',isLoggedin,editclass)

// it is for teacher and student both
router.get('/getclass',isLoggedin,getclass)

//Route to Find All the Classes Related to User Either Joined or Created
router.get('/getallclass',isLoggedin,getAllClasses)

// for student join
router.post('/joinclass',isLoggedin,joinclass)

//leave class for student and faculty who created class 
router.post('/leaveclass',isLoggedin,leaveclass)

module.exports = router