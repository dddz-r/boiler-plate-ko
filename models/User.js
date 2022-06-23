const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
        // required: true
    },
    email: {
        type: String,
        // trim: true,
        // unique: 1
    },
    password: {
        type: String,
        minlength: 5,
        // required: true
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp:{
        type: Number
    }
})

const User = mongoose.model('User', userSchema) //모델이름, 스키마

module.exports = {User} //다른 곳에서도 쓸수 있도록 export