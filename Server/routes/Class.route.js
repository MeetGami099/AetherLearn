const express = require('express')
const router = express.Router()

const {editclass,createClass, getclass, joinclass, leaveclass} = require('../controller/ClassController')
// for teachers only do this thing
router.post('/createclass',createClass)
router.put('/editclass',editclass)

// it is for teacher and student both
router.get('/getclass',getclass)

// for student join
router.post('/joinclass',joinclass)

//for leave class
router.post('/leaveclass',leaveclass)

module.exports = router