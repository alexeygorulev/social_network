import s from '../Auth.module.scss';
import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { FIELDS, LABELS } from './constants';
import InputText from 'application/common/Fields/InputText';
import PropTypes from 'prop-types';
import Loader from 'application/common/Loader/Loader';
import { Link } from 'react-router-dom';

const LogIn = (props) => {
  const { store, onLogin } = props;
  const { mounted, mount, unmount, values, onBlur, onChange, checkLogin, errors, disabled } = store;
  useEffect(() => {
    if (!onLogin) unmount();
    return () => {};
  }, [onLogin]);
  useEffect(() => {
    if (!mounted) mount();
    return () => {
      if (mounted) unmount();
    };
  }, [mounted]);
  if (!mounted) return null;
  return (
    <div className={s.card__front}>
      <div className={s.center__wrap}>
        <div style={{ textAlign: 'center' }}>
          <h4 style={{ marginBottom: 5, paddingBottom: 5 }}>Log In</h4>
          <div className={s.form__group}>
            <InputText
              id={FIELDS.LOGIN}
              type="text"
              onChange={onChange}
              values={values[FIELDS.LOGIN]}
              placeholder="Your Login"
              onBlur={onBlur}
            />
            {errors[FIELDS.LOGIN] !== undefined && !errors[FIELDS.LOGIN] && (
              <p className={s.errors}>{LABELS.ERRORS_FIELDS}</p>
            )}
            <p className={s.input__icon}>
              <span className="material-symbols-outlined">alternate_email</span>
            </p>
          </div>
          <div className={s.form__group} style={{ marginTop: 10 }}>
            <InputText
              id={FIELDS.PASSWORD}
              type="password"
              onChange={onChange}
              values={values[FIELDS.PASSWORD]}
              placeholder="Your Password"
              onBlur={onBlur}
            />
            {errors[FIELDS.PASSWORD] !== undefined && !errors[FIELDS.PASSWORD] && (
              <p className={s.errors}>{LABELS.ERRORS_FIELDS}</p>
            )}
            <p className={s.input__icon}>
              <span className="material-symbols-outlined">lock</span>
            </p>
          </div>
          <Link to={'/profile'}>
            <button disabled={disabled} onClick={checkLogin} type="submit" className={s.btn}>
              submit
            </button>
          </Link>
          <p style={{ textAlign: 'center', margin: 10 }}>
            {/* <a href="/" className={s.link}>
              Forgot your password?
            </a> */}
          </p>
        </div>
      </div>
    </div>
  );
};
LogIn.propTypes = {
  store: PropTypes.shape().isRequired,
  onLogin: PropTypes.bool.isRequired,
};
export default observer(LogIn);
