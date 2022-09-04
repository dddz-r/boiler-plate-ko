//바로 action에서 안가져오고 type파일에서 가져옴
import { LOGIN_USER } from "../_actions/types";

export default function (state = {}, action) {//이전 state (비어있음/spreadOpreraion?), action => 다음 state 리턴
    switch (action.type) {
        case LOGIN_USER:
            return {...state, loginSuccess: action.payload }
            break;
        
        default:
            return state;
            break;
    }
}