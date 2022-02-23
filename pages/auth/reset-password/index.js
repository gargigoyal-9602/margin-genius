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
import Link from "next/link";
import { style } from "@mui/system";
import { useRouter } from "next/router";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { validationSchema } from "../../../validators/auth.validators";
import axios from "axios";
import { toast } from "react-toastify";
import {
  ResetPassInitialFormValues,
  ResetPassValidationSchema,
} from "../../../validators/auth.validators";
import Loader from "../../../components/Loader";
import { route } from "next/dist/server/router";

function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { token, email } = router.query;
  //handleResetPass
  const handleResetPass = async (values) => {
    setLoading(true);
    try {
      const response = await axios({
        method: "put",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/change-password`,
        data: {
          email: email && email,
          password: values.password,
        },
      });
      if (response) {
        toast.success(`${response?.data?.message}, Please login`, {
          position: toast.POSITION.BOTTOM_RIGHT,

          icon: false,
        });
        router.push("/auth/login");
      }
    } catch (err) {
      router.push("/auth/login");

      err?.response?.data
        ? toast.error(err.response?.data?.message, {
            position: toast.POSITION.BOTTOM_RIGHT,

            icon: false,
          })
        : toast.error("Some error happened", {
            position: toast.POSITION.BOTTOM_RIGHT,

            icon: false,
          });
    }
    setLoading(false);
  };
  useEffect(() => {
    !email && router.push("/auth/login");
  });

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
                <div className={styles.d_flex_center}>
                  <h1>
                    <Link href="/auth/forgot-password" className={styles.link}>
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
                    <span className={layout.ml_30}>New Password</span>
                  </h1>
                </div>
              </div>
            </div>
            <div className={styles.main}>
              <Formik
                enableReinitialize
                initialValues={ResetPassInitialFormValues}
                validationSchema={ResetPassValidationSchema}
                onSubmit={(values) => {
                  handleResetPass(values);
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
                  <div className={styles.formWrap}>
                    <Form className={styles.form}>
                      <div className={styles.formGroup}>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <InputText
                          id="password"
                          type="password"
                          placeholder="Enter here"
                          value={values.password}
                          onChange={handleChange}
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
                        <ErrorMsg name="password" />
                      </div>
                      <div className={styles.formGroup}>
                        <InputLabel htmlFor="RePassword">
                          Repeat Password
                        </InputLabel>
                        <InputText
                          id="RePassword"
                          type="password"
                          placeholder="Enter here"
                          value={values.RePassword}
                          onChange={handleChange}
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
                          error={
                            touched.RePassword && Boolean(errors.RePassword)
                          }
                        />
                        <ErrorMsg name="RePassword" />
                      </div>
                      <MainButton variant="contained" type="submit">
                        Save the New Password
                      </MainButton>
                    </Form>
                  </div>
                )}
              </Formik>
            </div>
          </div>
        </section>
        <RightSection />
      </section>
    </>
  );
}

export default Index;
