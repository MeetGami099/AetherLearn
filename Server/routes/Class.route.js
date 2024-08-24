const express = require('express')
const router = express.Router()
const { isLoggedin , isStudent , isFaculty ,isAdmin} = require('../middleware/AuthMiddleware')

const {editclass,createClass, getclass, joinclass, leaveclass} = require('../controller/ClassController')
// for teachers only do this thing
router.post('/createclass',isLoggedin,isFaculty || isAdmin , createClass)
router.put('/editclass',isLoggedin,isFaculty || isAdmin ,editclass)

// it is for teacher and student both
router.get('/getclass',isLoggedin,getclass)

// for student join
router.post('/joinclass',isLoggedin,joinclass)

//for leave class
router.post('/leaveclass',isLoggedin,leaveclass)

module.exports = router