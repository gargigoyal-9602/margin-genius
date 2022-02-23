import { useEffect, useState } from "react";
import styles from "../../../styles/login.module.scss";
import layout from "../../../styles/layout.module.scss";
import {
  MainButton,
  InputText,
  TextLink,
  SocialButton,
  ErrorMsg,
} from "../../../components/formControls.style";
import RightSection from "../../../components/layout/rightSection";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Image from "next/image";
import { style } from "@mui/system";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { LineAxisOutlined, Router } from "@mui/icons-material";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { toast } from "react-toastify";
import GoogleLoginApp from "../../../components/layout/socialLogin/googleLogin";
import {
  LoginInitialFormValues,
  LoginValidationSchema,
} from "../../../validators/auth.validators";
import { route } from "next/dist/server/router";
import OutlookLogin from "../../../components/layout/socialLogin/outlooklogin";
import Loader from "../../../components/Loader";

function Index() {
  const [passwordBlank, setPasswordBlank] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (values, resetForm) => {
    setLoading(true);
    try {
      const response = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/authenticate`,
        data: values,
        headers: { "Content-Type": "application/json" },
      });

      if (response && response.data.jwt) {
        localStorage.removeItem("authDetails");
        localStorage.setItem("authDetails", JSON.stringify(response.data));
        toast.success("login successfully", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        router.push("/admin/dashboard");
      } else {
        toast.error(
          `${response.data.error ? response.data.error : "error while login"}`,
          {
            position: toast.POSITION.BOTTOM_RIGHT,
          }
        );
      }
    } catch (err) {
      resetForm &&
        resetForm({
          values: {
            userName: values.userName,
            password: "",
          },
        });
      err?.response?.data
        ? toast.error(err.response?.data?.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          })
        : toast.error("Some error happened", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
    }
    setLoading(false);
  };
  useEffect(() => {
    const authDetails = JSON.parse(localStorage.getItem("authDetails"));
    authDetails && router.push("/admin/dashboard");
  }, []);

  return (
    <>
      <Loader loading={loading} />
      <section className={styles.container}>
        <section className={styles.left_side}>
          <div className={styles.header}>
            <Image
              src="/mg-logo.svg"
              height="80"
              width="200"
              layout="fixed"
              alt="logo"
            />
          </div>
          <div className={styles.welcome_center}>
            <div className={styles.welcome}>
              <div className={styles.welcome_content}>
                <h1>
                  <Link href="/auth/welcome" className={styles.link}>
                    <a>
                      <Image
                        src="/icons/back-icon.svg"
                        height="25"
                        width="25"
                        layout="fixed"
                        alt="back_icon"
                      />
                    </a>
                  </Link>
                  <span className={layout.ml_30}>Welcome back!</span>
                </h1>
              </div>
            </div>
            <div className={styles.main}>
              <div className={styles.formWrap}>
                <Formik
                  enableReinitialize
                  initialValues={LoginInitialFormValues}
                  validationSchema={LoginValidationSchema}
                  onSubmit={(values, { resetForm }) => {
                    handleLogin(values, resetForm);
                  }}
                >
                  {({
                    touched,
                    errors,
                    values,
                    handleBlur,
                    handleChange,
                    setFieldValue,
                  }) => (
                    <Form className={styles.form}>
                      <div className={styles.formGroup}>
                        <InputLabel htmlFor="userName">Name</InputLabel>
                        <InputText
                          id="userName"
                          name="userName"
                          type="text"
                          placeholder="john.golt@example.com"
                          value={values.userName}
                          onChange={handleChange}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Image
                                  src="/icons/email-icon.svg"
                                  height="20"
                                  width="26"
                                  alt="email"
                                />
                              </InputAdornment>
                            ),
                          }}
                          error={touched.userName && Boolean(errors.userName)}
                        />
                        <ErrorMsg name="userName"></ErrorMsg>
                      </div>
                      <div className={styles.formGroup}>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <InputText
                          id="password"
                          name="password"
                          type="password"
                          placeholder="******"
                          value={values.password}
                          onChange={handleChange}
                          autoFocus={
                            values.email != "" && values.password == ""
                          }
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Image
                                  src="/icons/password.svg"
                                  height="22"
                                  width="26"
                                  alt="password"
                                />
                              </InputAdornment>
                            ),
                          }}
                          error={touched.password && Boolean(errors.password)}
                        />
                        <ErrorMsg name="password"></ErrorMsg>
                      </div>

                      <MainButton
                        variant="contained"
                        type="submit"
                        //  value="Submit"
                      >
                        Login
                      </MainButton>
                    </Form>
                  )}
                </Formik>
                <div className={styles.first_link}>
                  <Link href="/auth/forgot-password" className={styles.link}>
                    <a>Forgot Password?</a>
                  </Link>
                </div>
                <div className={styles.second_link}>
                  <Link href="/" className={styles.green_txt}>
                    <a>I don’t have an account</a>
                  </Link>
                </div>
              </div>
            </div>
            <div className={styles.signup}>
              <div>
                <GoogleLoginApp router={router} handleLogin={handleLogin} />
                <OutlookLogin router={router} handleLogin={handleLogin} />
              </div>
            </div>
          </div>
        </section>
        <RightSection />
      </section>
    </>
  );
}

export default Index;
