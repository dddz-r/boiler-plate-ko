const { User } = require('../models/User');//쩜두개: 상위폴더로

let auth = (req, res, next) => {
    //인증 처리

    //클라이언트 쿠키에서 토큰을 가져옴
    let token = req.cookies.x_auth; //x_auth는 index에서 토큰 넣은 이름//req.cookies['x-auth']
    
    //토큰을 복호화 한 후 유저를 찾음
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json( {isAuth: false, error: true})

        //inext.js에 auth 라우터에서 req를 받아서 사용할 수 있도록 넣어줌
        req.token = token;
        req.user = user;
        next();//auth가 미들웨어로 User.js에서 쓰여서 다음으로 넘어가도록 next

    })//User.js에 생성한 함수
}

module.exports = { auth };