import React from "react";
import s from './Auth.module.scss'
import LogIn from "./LogIn/LogIn";
import SignUp from "./SignUp/SignUp";

const Auth = () => {
  return (
    <div className={s.section}>
      <div className={s.container}>
        <div className={s.container__row}>
          <div className={s.container__col}>
            <div className={s.container__login}>
              <h6 className="mb-0 pb-3"><span>Log In </span><span>Sign Up</span></h6>
              <input className={s.checkbox} type="checkbox" id="reg-log" name="reg-log" />
              <label htmlFor="reg-log"></label>
              <div className={s.card__wrap}>
                <div className={s.card__wrapper}>
                  <LogIn />
                  <SignUp />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;