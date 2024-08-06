const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,  
        maxlength: 1000, 
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',     
        required: true,
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',    
        required: true,
    },
    attachments: [{
        type: String,    
    }],
    links: [{
        type: String,    
    }]
},{timestamps:true});

// Pre-save middleware to update `updatedAt` field
// postSchema.pre('save', function (next) {
//     this.updatedAt = Date.now();
//     next();
// });

module.exports = mongoose.model('Post', postSchema);
