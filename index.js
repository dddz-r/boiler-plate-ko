const express = require('express');//express안에 body-parser포함되서 따로 안써도 된다고함
const app = express();
const port = 3000 //아무 포트번호 지정
const bodyParser = require('body-parser');
const { User } = require('./models/User');
const config = require("./config/key")

//bodyParser 옵션
app.use(bodyParser.urlencoded({extended: true}));//application/x-www-form-urlencoded
app.use(bodyParser.json());//application/json

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, //useUnifiedTopology: true, useCreateIndex: true, useFindAndModifity: false
}).then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err))


app.get('/', (req, res) => { //'/'루트 디렉토리에 오면 Hello World 출력
  res.send('Hello World!')
})

app.post('/register', (req, res) => { //라우터의 endpoint가 register
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})