import axios from "axios";
import {
    LOGIN_USER
} from './types';

export function loginUser(dataTosubmit) {

    const request = axios.post('/api/users/login', dataTosubmit)//index.js에 만들어둔 api랑 같은 주소
      .then(response => response.data) //request는 백엔드에서 들고온 데이터
      //server/index.js에서 로그인 성공했을 때 res.json으로 넣어준게 브라우저 콘솔에 찍힘

    return {
        type: LOGIN_USER,
        payload: request
    }
}