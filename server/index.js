const express = require('express');//express안에 body-parser포함되서 따로 안써도 된다고함
const app = express();
const port = 5000 //아무 포트번호 지정
// const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const { auth } = require('./middleware/auth');
const { User } = require('./models/User');
const config = require("./config/key")


app.use(express.urlencoded({extended: true}));//application/x-www-form-urlencoded
app.use(express.json());//application/json

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, //useUnifiedTopology: true, useCreateIndex: true, useFindAndModifity: false
}).then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err))


app.get('/', (req, res) => { //'/'루트 디렉토리에 오면 Hello World 출력
  res.send('Hello World!')
})

app.get('/api/hello', (req, res) => {
  res.send("hi~");
})

app.post('/api/users/register', (req, res) => { //라우터의 endpoint가 register
  //회원가입 할 때 필요한 정보를 client에서 가져와 DB에 넣음

  //모델 가져와서 인스턴스 생성//req.body에 json형태로 데이터 들어있는데 bodyparser에서 파싱해준 것
  const user = new User(req.body);
  user.save((err, userInfo) => { //모델에 저장
    if(err) return res.json({ success: false, err})
    return res.status(200).json({
      success: true
    })
  })
})

app.post('/api/users/login', (req, res) => { //라우터의 endpoint가 register
  // const user = new User(req.body);
  
  // 요청된 이메일 데이터 베이스에 있는지 찾기
    User.findOne({ email: req.body.email }, (err, userInfo)=>{
      console.log(userInfo)
      if(!userInfo){
        return res.json({
          loginSuccess: false,
          message: "등록되지 않은 이메일입니다."
        })
      } 
      // else {
        // 비밀번호가 일치하는지 확인
        userInfo.comparePassword(req.body.password, (err, isMatch) => {//User.js에서 선언한 함수
          if (!isMatch)
            return res.json({ loginSuccess: false, message: "틀린 비밀번호입니다." })

          //토큰생성
          userInfo.generateToken((err, user) => {//User.js에서 선언한 함수
            if (err) return res.status(400).send(err);

            //토큰을 저장 -> 쿠키/로컬스토리지 등
            // localStorage.setItem()
            res.cookie("x_auth", user.token)
              .status(200)
              .json({ loginSuccess: true, userId: user._id });


          })
        })
      // }
    })
})

///api/users user랑 관련된거 앞에 붙여주기 나중에 Router(express에서 제공)로 관련기능별로 정리 필요
/*
 (req, res) => { 이게 콜백함수
 })
*/
app.get('/api/users/auth', auth, (req, res) => {//auth는 미들웨어, 엔드포인트에 req받은 후 콜백전에 
  //미들웨어 통과. Authentication Tue
  //client에 유저 정보 제공
  res.status(200).json({
    _id: req.user._id,//미들웨어에서 req에 넣은 정보
    //임의로 정한 role
    // 0: 일반 유저(0이아니면 관리자), 1: admin, 2: 특정 부서 admin
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    image: req.user.image
  })

})

app.get('/api/users/logout', auth, (req, res) => { //로그인된 상태라서 auth바로 넣어서 사용가능
  User.findOneAndUpdate({ _id: req.user._id}, { token: ""}, (err, user) => { //파라미터는 find할것, update할것, 콜백
    if(err) return res.json({ success: false, err});
    return res.status(200).send({
      success: true
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})