import s from "../Auth.module.scss";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Введите корректный email")
    .required("Обязательноe поле"),
  firstName: yup.string().required("Обязательноe поле"),
  password: yup.string().required("Обязательноe поле"),
});

const SignUp = () => {
  return (
    <div className={s.card__back}>
      <div className={s.center__wrap}>
        <div style={{ textAlign: "center" }}>
          <h4 style={{ marginBottom: 5, paddingBottom: 5 }}>Sign up</h4>
          <Formik
            initialValues={{
              email: "",
              password: "",
              firstName: "",
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
                <div className={s.form__group}>
                  <Field
                    type="firstName"
                    name="firstName"
                    className={s.form__style}
                    placeholder="Your Name"
                    id="firstName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                  />
                  {touched.firstName && errors.firstName && (
                    <p className={s.errors}>{errors.firstName}</p>
                  )}
                  <p className={s.input__icon}>
                    <span className="material-symbols-outlined">person</span>
                  </p>
                </div>
                <div className={s.form__group} style={{ marginTop: 10 }}>
                  <Field
                    type="email"
                    name="email"
                    className={s.form__style}
                    id="email"
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
                <button type="submit" className={s.btn}>
                  submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
