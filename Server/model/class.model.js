const classSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        default: none
    },
    subject: {
        type: String,
        require: true
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
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
