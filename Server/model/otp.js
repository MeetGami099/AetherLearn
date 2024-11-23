const mongoose = require('mongoose');

const otpSchema =  mongoose.Schema({
    otp:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true
    }
},{timestamps:true});

module.exports = mongoose.model('otp',otpSchema);