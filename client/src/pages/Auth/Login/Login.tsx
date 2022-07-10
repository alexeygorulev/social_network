import React from "react";
import s from './Login.module.scss'
import { Formik, Form, Field } from "formik"
import * as yup from 'yup'


interface Values {
  email: string;
  password: string;
}

const Login = () => {
  const validationSchema = yup.object().shape({
    email: yup.string().email('Введите верный email').required('Обязательно'),
    password: yup.string().typeError('Должно быть строкой').required('Обязательно')
  })

  return (
    <div >
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        validateOnBlur
        onSubmit={(values: Values) => console.log(values)}
      >
        {({ values, errors, touched,
          handleChange, handleBlur, isValid,
          handleSubmit, dirty }) => (
          <Form>
            <div className={s.container_form} >
              <label htmlFor="login" ></label>
              <Field
                className={s.email}
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder='Login'
              />
              {touched.email && errors.email && <p className={s.errors}>{errors.email}</p>}
              <p>
                <label htmlFor="password" ></label>
                <Field
                  className={s.password}
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Password"
                />
                {touched.password && errors.password && <p className={s.errors}>{errors.password}</p>}
              </p>
              <div className={s.container__checkbox}>
                <input className={s.checkbox__input} type="checkbox" /> 
                <label className={s.checkbox__label}>Запомнить меня</label>
              </div>
              <div>
                <button
                  disabled={!isValid && !dirty}
                  type="submit"
                > ВОЙТИ</button>
              </div>
            </div>
          </Form>
        )}
      </Formik>

    </div>
  );
}

export default Login;