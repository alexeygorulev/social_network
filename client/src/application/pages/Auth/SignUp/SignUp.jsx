import s from '../Auth.module.scss';
import { observer } from 'mobx-react';
import InputText from 'application/common/Fields/InputText';
import { useEffect } from 'react';
import { FIELDS, LABELS } from './constants';
import PropTypes from 'prop-types';


const SignUp = (props) => {
  const { store, onLogin } = props;
  const { mounted, mount, unmount, values, onBlur, onChange, addNewUser, errors, disabled, errorLabels } = store;
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
    <div className={s.card__back}>
      <div className={s.center__wrap}>
        <div style={{ textAlign: 'center' }}>
          <h4 style={{ marginBottom: 5, paddingBottom: 5 }}>Sign up</h4>
          <div className={s.form__group}>
            <InputText
              id={FIELDS.LOGIN}
              type="text"
              onChange={onChange}
              values={values[FIELDS.LOGIN]}
              placeholder="Your Login"
              onBlur={onBlur}
            />
            {errorLabels[FIELDS.LOGIN] ? (
              <p className={s.errors}>{errorLabels[FIELDS.LOGIN]} </p>
            ) : (
              errors[FIELDS.LOGIN] !== undefined &&
              !errors[FIELDS.LOGIN] && <p className={s.errors}>{LABELS.ERRORS_FIELDS} </p>
            )}
            <p className={s.input__icon}>
              <span className="material-symbols-outlined">person</span>
            </p>
          </div>
          <div className={s.form__group} style={{ marginTop: 10 }}>
            <InputText
              id={FIELDS.EMAIL}
              type="email"
              onChange={onChange}
              values={values[FIELDS.EMAIL]}
              placeholder="Your Email"
              onBlur={onBlur}
            />
            {errorLabels[FIELDS.EMAIL] ? (
              <p className={s.errors}>{errorLabels[FIELDS.EMAIL]} </p>
            ) : (
              errors[FIELDS.EMAIL] !== undefined &&
              !errors[FIELDS.EMAIL] && <p className={s.errors}>{LABELS.ERRORS_FIELDS} </p>
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
            {errorLabels[FIELDS.PASSWORD] ? (
              <p className={s.errors}>{errorLabels[FIELDS.PASSWORD]} </p>
            ) : (
              errors[FIELDS.PASSWORD] !== undefined &&
              !errors[FIELDS.PASSWORD] && <p className={s.errors}>{LABELS.ERRORS_FIELDS} </p>
            )}
            <p className={s.input__icon}>
              <span className="material-symbols-outlined">lock</span>
            </p>
          </div>
          <button disabled={disabled} onClick={addNewUser} type="submit" className={s.btn}>
            submit
          </button>
        </div>
      </div>
    </div>
  );
};

SignUp.propTypes ={
  store: PropTypes.shape().isRequired
}
export default observer(SignUp);
