import React, { useContext, useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { withRouter, useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "../../components/UserContext";
import cookie from "js-cookie";
 
const LoginPage = ({ isAuth }) => {
  const history = useHistory();

  const { token, setToken } = useContext(UserContext);

  useEffect(() => {
    if (isAuth) {
      history.push("/");
      
    } else {
    }
  }, [isAuth, history]);

  const [error, setError] = useState();

  const loginSubmit = async (email, password) => {
    // e.preventDefault();
    const loginUrl = `http://localhost:8000/api/admin/login?email=${email}&password=${password}`;
    const inOneHour = new Date(new Date().getTime() + 2000000 * 60 * 1000);
    try {
      await axios.post(loginUrl).then((res) => {
        cookie.set("token", res.data.access_token, {
          expires: inOneHour,
        });
        setToken(res.data.access_token);
      });
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data);
    }

    // 	.catch((e) => {
    // 	;
    // 	});
  };

  return (
    <div>
    <section style={{}}>
      <Card
        // bg="dark"
        // border="light"
        style={{ width: "35%", marginTop: "5rem" }}
        className="mx-auto	"
      >
        <Card.Header className="text-center pb-5 pt-5 ">
          <h3>Login</h3>
        </Card.Header>
        <Card.Body>
          <Formik
            // enableReinitialize={true}
            initialValues={{ email: "", password: "" }}
            onSubmit={(values, { setSubmitting }) => {
              const { email, password } = values;
              setSubmitting(false);
              loginSubmit(email, password);
            }}
            validationSchema={Yup.object({
              email: Yup.string()
                .min(3, "Must be 3 characters or more")
                .max(28, "Must be 28 characters or less")
                .required("Email is required"),
              password: Yup.string()
                .min(3, "Must be 3 characters or more")
                .max(15, "Must be 15 characters or less")
                .required("Password is required"),
            })}
          >
            {(formik, isSubmitting) => (
              <Form className="w-50 mx-auto mt-3">
                <div className="form-group">
                  {error ? (
                    <p style={{ color: "red" }}>
                      Invalid email or password, please try again
                    </p>
                  ) : null}
                  <label htmlFor="email">Email</label>
                  <Field
                    name="email"
                    className={
                      formik.touched.email && formik.errors.email
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    type="text"
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="invalid-feedback">
                      {formik.errors.email}
                    </div>
                  ) : null}
                </div>

                <div className="form-group">
                  <label htmlFor="password">password</label>
                  <Field
                    name="password"
                    className={
                      formik.touched.password && formik.errors.password
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    type="password"
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="invalid-feedback">
                      {formik.errors.password}
                    </div>
                  ) : null}
                </div>

                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-primary mt-4"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Please wait..." : "Login"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </section>
    </div>
  );
};

export default withRouter(LoginPage);
