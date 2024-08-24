//ppt pdf video 

const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    tags: [String],
    description: {
        type: String,
    },
    // pptLinks: [{
    //     // type: mongoose.Schema.Types.ObjectId,
    //     // ref: 'PPT'
    // }],
    // pdfLinks: [{
    //     // type: mongoose.Schema.Types.ObjectId,
    //     // ref: 'PDF'
    // }],
    // videoLinks: [{
    //     // type: mongoose.Schema.Types.ObjectId,
    //     // ref: 'Video'
    // }],
    
    
    pptLinks: [pptSchema],
    pdfLinks: [pdfSchema],
    videoLinks: [videoSchema]

});


const videoSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
});

const pdfSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },

});

const pptSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
});


module.exports = mongoose.model('Material', materialSchema);
