import React from "react";
import s from './Auth.module.scss'

const Auth = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <div className={s.container__text}>
          <p> АВТОРИЗАЦИЯ </p>
        </div>
        <div >
          <form className={s.container_form} action="#">
            <input type="text" />
            <input type="text" />
            <div>
              <input type="checkbox" /> Запомнить меня
            </div>
            <div>
              <button> ВОЙТИ</button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}

export default Auth;