const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10; //sort의 글자 수
var jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
        // required: true
    },
    email: {
        type: String,
        trim: true,
        unique: 1
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


userSchema.pre('save', function(next){//mongoose의 pre함수 이용, 파라미터 next(다음에 실행 할 함수)
    var user = this;//this는 userSchema
    
    //이 함수는 user정보가 수정되어 저장될때도 실행됨.
    if(user.isModified('password')){//비밀번호가 변경 되었을 때만 비밀번호 암호화한다는 조건절
        bcrypt.genSalt(saltRounds, function(err, salt) {//saltRounds길이의 salt 생성
            if(err) return next(err); //next 함수 실행
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err);
                user.password = hash;
                console.log(user.password);
                next();
            });
        });
    }else {
        next();
    }
})

userSchema.methods.comparePassword = function (plainPassword, callback) {//함수이름 상용자 정의
    console.log(plainPassword + " @ " + this.password);
    console.log(this);
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        console.log(isMatch);
        if(err) return callback(err);
        callback(null, isMatch)//isMatch 는 true
    })

}

userSchema.methods.generateToken = function(callback) {//함수이름 상용자 정의
    var user = this;
    var token = jwt.sign(user._id.toHexString(), 'secretToken');//toHexString없으면 Error: Expected "payload" to be a plain object.
    //user._id, 'secretToken' 두개합쳐서 토큰 만듬. secretToken에 아무거나 문자열 넣으면 됨.
    user.token = token;
    user.save(function(err, user){
        if(err) return callback(err);
        callback(null, user);
    })
}

userSchema.statics.findByToken = function(token, cb){
    var user = this;

    //토큰을 decode
    jwt.verify(token, 'secretToken', function(err, decoded){
        //findOne는 moongoDB 함수
        user.findOne({"_id": decoded, "token": token}, function(err, user){
            if(err) return cb(err);
            cb(null, user)
        })
    });
}

const User = mongoose.model('User', userSchema) //모델이름, 스키마

module.exports = {User} //다른 곳에서도 쓸수 있도록 export