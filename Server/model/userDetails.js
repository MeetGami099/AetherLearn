const mongoose = require('mongoose');

const userLoginSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student','faculty','admin'],
        default: 'student'
    },
    contest: [{
        contestID: {
            type: mongoose.Schema.Types.ObjectId,
            default: null
        },
        teamID: {
            type: mongoose.Schema.Types.ObjectId,
            default: null
        },
        matchID: {
            type: mongoose.Schema.Types.ObjectId,
            default: null
        }
    }],
    joinedclass:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        default: []
    }]
},{timestamps:true});

userLoginSchema.pre('save', async function(next) {
    try {
        const result = await this.collection.dropIndex('joinedclass_1');
    } catch (err) {
        console.error('Error dropping index:', err);
    }
    next();
});


module.exports = mongoose.model('User', userLoginSchema);
