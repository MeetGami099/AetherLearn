//ppt pdf video 

const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    classroomId:{
        type: String,
    },
    userId:{
        type: String,
    },
    videoId:{
        type: String,
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum:["processing","private","publish"]
    },
    url:{
        type: String,
    }
});


module.exports = mongoose.model('Video', videoSchema);
