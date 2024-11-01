//ppt pdf video 

const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    classroomId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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
},{ timestamps: true });


module.exports = mongoose.model('Video', videoSchema);
