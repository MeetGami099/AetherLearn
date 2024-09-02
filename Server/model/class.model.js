const { default: mongoose } = require("mongoose");

const classSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        default: null
    },
    subject: {
        type: String,
        require: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    facultys:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    assignments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assignment'
    }],
    classCode: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 6
    }
},{timestamps:true});

module.exports = mongoose.model('Class', classSchema);
