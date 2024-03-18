import React from 'react'
import AccountPage from './AccountPage';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {loginUserSlice} from "../features/Auth/AuthSlice"
import Loading from './Loading';

function MiddlePage() {
    const auth = useSelector((state) => state.auth);
    const account = useSelector((state) => state.account);
    const isLogin=auth.isLogin.login;
    const dispatch=useDispatch();
    const navigate=useNavigate();
    console.log(auth);
    console.log(isLogin);
    useEffect(() => {
        if (!auth.isLogin.login) {
            const url_code = new URLSearchParams(window.location.search).get('code');
            if(url_code){
            console.log(url_code);
            dispatch(loginUserSlice(url_code));
            }
        }
       
    }, [])
    useEffect(()=>{
        if(isLogin) {
            navigate("/accountPage");
        }
        if(auth.error.error) {
            
            navigate("/");
        }

    },[isLogin])
  return (
    <div>{
        isLogin?
        <AccountPage/>:<Loading/>
}
        </div>
  )
}

export default MiddlePage