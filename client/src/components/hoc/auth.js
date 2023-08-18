import { response } from "express";
import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';

export default function (SpecificComponent, option, adminRoute = null) {//ex6문법 아무것도 안들어오면 null
    /*
    option
    null => 아무나 출입이 가능한 페이지
    true => 로그인한 유저만 출입 가능
    false => 로그인한 유저 출입 불가능(ex. login페이지)

    adminRoute 어드민유저만 들어가길 원하는 페이지
    */ 

    function AuthenticationCeck(props) {
        const dispatch = useDispatch();

        useEffect(() =>{
            dispatch(auth()).then(response => {
                console.log(response)
            })
        }, [])

        return(<SpecificComponent/>)
    }

    return AuthenticationCeck;
}