import { useEffect, useState } from "react";
import styles from "../../../styles/login.module.scss";
import layout from "../../../styles/layout.module.scss";
import {
  MainButton,
  InputText,
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
  SignupInitialFormValues,
  SignupValidationSchema,
} from "../../../validators/auth.validators";
import Loader from "../../../components/Loader";

function Index() {
  const [loading, setLoading] = useState(false);

  //handleforgotpass
  const handleForgotPass = async (values) => {
    setLoading(true);

    try {
      const response = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/reset-password?email=${values.email}`,
      });
      response && toast.success(response?.data?.message);
    } catch (err) {
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
                    <Link href="/auth/login" className={styles.link}>
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
                    <span className={layout.ml_30}>Forgot Password?</span>
                  </h1>
                </div>
              </div>
            </div>
            <div className={styles.main}>
              <Formik
                enableReinitialize
                initialValues={SignupInitialFormValues}
                validationSchema={SignupValidationSchema}
                onSubmit={(values) => {
                  console.log(values, "++++++");
                  handleForgotPass(values);
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

                      <MainButton variant="contained" type="submit">
                        Send an Email Instruction
                      </MainButton>
                    </Form>
                    <div className={styles.first_link}>
                      <Link href="/" className={styles.link}>
                        <a>Resend an email</a>
                      </Link>
                    </div>
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
