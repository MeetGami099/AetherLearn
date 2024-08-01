const mongoose = require('mongoose');

const dbConnect = async ()=>{
    console.log("Function Called")
    try{
        mongoose.connect('mongodb://127.0.0.1:27017/atherlearn')
        .then(()=>{
            console.log('DB Connected')
        })
        .catch((err)=>{
            console.log('DB Does not Connected');
        })

    }catch(errr){
        console.log("Can  not connected to DB Some Internal server Err")
    }
}

module.exports = dbConnect;
