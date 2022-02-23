import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
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
import Link from "next/link";
import { style } from "@mui/system";
import { Formik, Form } from "formik";
import {
  SignupInitialFormValues,
  SignupValidationSchema,
} from "../../../validators/auth.validators";
import { toast } from "react-toastify";
import axios from "axios";
import tokenExpired from "../../../components/layout/withAuth/tokenExpired";
import OutlookLogin from "../../../components/layout/socialLogin/outlooklogin";
import GoogleLoginApp from "../../../components/layout/socialLogin/googleLogin";
import Loader from "../../../components/Loader";
import { route } from "next/dist/server/router";

function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  //handle signup verify
  const handleSignUp = async (values) => {
    setLoading(true);

    try {
      const response = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/signup?email=${values.email}`,
      });
      response &&
        toast.success(response?.data?.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      router.push(`/auth/verify-email?email=${values.email}`);
    } catch (err) {
      tokenExpired(err, router);
    }
    setLoading(false);
  };

  //handle social signup
  const handleSocialSignUp = async (values, loginData) => {
    setLoading(true);

    try {
      const response = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/add-user`,
        data: values,
      });
      response &&
        toast.success(`${response?.data?.message},Please Login`, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      handleLogin(loginData);
    } catch (err) {
      tokenExpired(err, router);
    }
    setLoading(false);
  };

  const handleLogin = async (values) => {
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
                  Welcome to Margin <br /> Genius!
                </h1>
                <p>
                  A helper with whom you can create a perfect proposal or
                  contract to present to your clients!
                </p>
              </div>
            </div>
            <div className={styles.main}>
              <div className={styles.formWrap}>
                <Formik
                  enableReinitialize
                  initialValues={SignupInitialFormValues}
                  validationSchema={SignupValidationSchema}
                  onSubmit={(values) => {
                    handleSignUp(values);
                  }}
                >
                  {({ touched, errors, values, handleBlur, handleChange }) => (
                    <Form className={styles.form}>
                      <div className={styles.formGroup}>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <InputText
                          id="email"
                          type="text"
                          placeholder="john.golt@example.com"
                          value={values.email}
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
                          error={touched.email && Boolean(errors.email)}
                        />
                        <ErrorMsg name="email" />
                      </div>
                      <MainButton
                        variant="contained"
                        type="submit"
                        // onClick={() => router.push("/auth/sign-up")}
                      >
                        Sign Up
                      </MainButton>
                      <SocialButton onClick={() => router.push("/auth/login")}>
                        <span>Login Now</span>
                      </SocialButton>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
            <p style={{ textAlign: "center" }}>Or</p>
            <div className={styles.signup}>
              <div>
                <GoogleLoginApp
                  router={router}
                  handleSocialSignUp={handleSocialSignUp}
                />
                <OutlookLogin
                  router={router}
                  handleSocialSignUp={handleSocialSignUp}
                />
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
