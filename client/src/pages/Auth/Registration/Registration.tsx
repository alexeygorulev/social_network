import RegistrationForm from "./Form/RegistrationForm";
import {NavLink} from 'react-router-dom'
import s from '../Registration/Registration.module.scss'

const Registration = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <div className={s.container__text}>
          <p> Форма регистрации </p>
        </div>
        <RegistrationForm />
        <NavLink to='/' className={s.container__registration}>Вернуться на страницу входа</NavLink>
      </div >
    </div >
  );
}

export default Registration;