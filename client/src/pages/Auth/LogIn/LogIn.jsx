import s from "../Auth.module.scss";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";

const LogIn = () => {
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Введите корректный email")
      .required("Обязательно"),
    password: yup
      .string()
      .typeError("Должно быть строкой")
      .required("Обязательно"),
  });
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      validateOnBlur
      onSubmit={(values) => console.log(values)}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isValid,
        handleSubmit,
        dirty,
      }) => (
        <Form>
          <div className={s.card__front}>
            <div className={s.center__wrap}>
              <div style={{ textAlign: "center" }}>
                <h4 style={{ marginBottom: 5, paddingBottom: 5 }}>Log In</h4>
                <div className={s.form__group}>
                  <Field
                    type="email"
                    name="email"
                    className={s.form__style}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder="Your Email"
                  />
                  {touched.email && errors.email && (
                    <p className={s.errors}>{errors.email}</p>
                  )}
                  <p className={s.input__icon}>
                    <span className="material-symbols-outlined">
                      alternate_email
                    </span>
                  </p>
                </div>
                <div className={s.form__group} style={{ marginTop: 10 }}>
                  <Field
                    type="password"
                    name="password"
                    className={s.form__style}
                    id="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    placeholder="Your Password"
                  />
                  {touched.password && errors.password && (
                    <p className={s.errors}>{errors.password}</p>
                  )}
                  <p className={s.input__icon}>
                    <span className="material-symbols-outlined">lock</span>
                  </p>
                </div>
                <button
                  disabled={!isValid && !dirty}
                  type="submit"
                  className={s.btn}
                >
                  submit
                </button>
                <p style={{ textAlign: "center", margin: 10 }}>
                  <a href="/" className={s.link}>
                    Forgot your password?
                  </a>
                </p>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LogIn;
