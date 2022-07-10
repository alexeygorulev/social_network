import React from "react";
import s from './Auth.module.scss'
import Login from "./Login/Login";
import {NavLink} from 'react-router-dom'




const Auth = () => {

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <div className={s.container__text}>
          <p> АВТОРИЗАЦИЯ </p>
        </div>
        <Login />
        <NavLink to='/registration' className={s.container__registration}>Нет аккаунта?</NavLink>
      </div >
    </div >
  );
}

export default Auth;