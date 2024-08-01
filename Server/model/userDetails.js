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
    joinedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userLoginSchema);
