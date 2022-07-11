import React from "react";
import s from './RegistrationForm.module.scss'
import { Formik, Form, Field } from "formik"
import * as yup from 'yup'

interface RegValues {
  email: string
  password: string
  secondPassword: string
  firstName: string
  secondName: string
}

const RegistrationForm = () => {
  const validationSchema = yup.object().shape({
    email: yup.string().email('Введите корректный email').required('Обязательноe поле'),
    firstName: yup.string().required('Обязательноe поле'),
    secondName: yup.string().required('Обязательноe поле'),
    password: yup.string().required('Обязательноe поле'),
    secondPassword: yup.string().oneOf([yup.ref('password'), null], 'пароль должен совпадать')
  })

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        secondPassword: '',
        firstName: '',
        secondName: '',
      }}
      validationSchema={validationSchema}
      validateOnBlur
      onSubmit={(values: RegValues) => console.log(values)}
    >
      {({ values, errors, touched,
        handleChange, handleBlur, isValid,
        handleSubmit, dirty }) => (
        <Form className={s.wrapper__form} >
          <div className={s.container__form} >
            <p>
              <label htmlFor="firstName" ></label>
              <Field
                className={s.form__input}
                type="firstName"
                name="firstName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
                placeholder="Ваше имя"
              />
              {touched.firstName && errors.firstName && <p className={s.errors}>{errors.firstName}</p>}
            </p>
            <p>
              <label htmlFor="secondName" ></label>
              <Field
                className={s.form__input}
                type="secondName"
                name="secondName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.secondName}
                placeholder="secondName"
              />
              {touched.secondName && errors.secondName && <p className={s.errors}>{errors.secondName}</p>}
            </p>
            <p>
              <label htmlFor="email" ></label>
              <Field
                className={s.form__input}
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="Введите Email"
              />
              {touched.email && errors.email && <p className={s.errors}>{errors.email}</p>}
            </p>
            <p>
              <label htmlFor="password" ></label>
              <Field
                className={s.form__input}
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder="Введите Пароль"
              />
              {touched.password && errors.password && <p className={s.errors}>{errors.password}</p>}
            </p>
            <p>
              <label htmlFor="secondPassword" ></label>
              <Field
                className={s.form__input}
                type="secondPassword"
                name="secondPassword"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.secondPassword}
                placeholder="Повторите Пароль"
              />
              {touched.secondPassword && errors.secondPassword && <p className={s.errors}>{errors.secondPassword}</p>}
            </p>
            <button
              disabled={!isValid && !dirty}
              type="submit"
            > Отправить </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default RegistrationForm;