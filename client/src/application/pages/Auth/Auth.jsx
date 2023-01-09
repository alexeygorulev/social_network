import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import s from './Auth.module.scss';
import LogIn from './LogIn';
import SignUp from './SignUp';

const Auth = (props) => {
  const { store } = props;
  const { mounted, mount, unmount, changeForm, onLogin } = store;
  useEffect(() => {
    if (!mounted) mount();

    return () => {
      if (mounted) unmount();
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className={s.section}>
      <div className={s.container}>
        <div className={s.container__row}>
          <div className={s.container__col}>
            <div className={s.container__login}>
              <h6 className="mb-0 pb-3">
                <span>Log In </span>
                <span>Sign Up</span>
              </h6>
              <input onClick={changeForm} className={s.checkbox} type="checkbox" id="reg-log" name="reg-log" />
              <label htmlFor="reg-log"></label>
              <div className={s.card__wrap}>
                <div className={s.card__wrapper}>
                  <LogIn onLogin={onLogin} />
                  <SignUp onLogin={onLogin} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(Auth);
