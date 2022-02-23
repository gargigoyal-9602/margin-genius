import React, { useEffect, useState } from "react";
import styles from "../../../styles/login.module.scss";
import globalLayout from "../../../styles/globalLayout.module.scss";
import layout from "../../../styles/layout.module.scss";
import {
  MainButton,
  InputText,
  ErrorMsg,
  OutlineButton,
  IconButton,
} from "../../../components/formControls.style";
import { CountrySelect } from "../../../components/countrySelect";
import RightSection from "../../../components/layout/rightSection";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Image from "next/image";
import { style } from "@mui/system";
import { useRouter } from "next/router";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { validationSchema } from "../../../validators/auth.validators";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import { ModalBox } from "../../../components/tableControls.style";
import Loader from "../../../components/Loader";

// validation for signup
export function Index() {
  const [orgId, setOrgId] = useState("");
  const [userId, setuserId] = useState("");
  const [openDelete, setOpenDelete] = React.useState(false);
  const handleDeleteAllModal = () => setOpenDelete(!openDelete);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { token, email, companyName } = router.query;
  const initialFormValues = {
    userId: (email && email) || "",
    CompanyName: (companyName && companyName) || "",
    FName: "",
    CountryName: "",
    password: "",
    RePassword: "",
  };
  // verify signup
  useEffect(() => {
    // !email && router.push("/auth/login");
    email && token && handleVerifyAccount();
  }, [email, token]);

  //handle verify account
  const handleVerifyAccount = async () => {
    setLoading(true);

    try {
      let userData;
      const response = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/confirm-account?token=${token}&email=${email}`,
      });
      if (response) {
        userData = response?.data.data;
        toast.success(`${userData.message}, Please fill the user details`, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });

        response?.data.data.alreadyRegistered && handleDeleteAllModal();
        setOrgId(userData.org_id);
        setuserId(userData.user_id);
      }
    } catch (err) {
      err?.response?.data
        ? toast.error("Token is invalid ,Please contact your Administrator", {
            position: toast.POSITION.BOTTOM_RIGHT,
          })
        : toast.error("Some error happened", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
      router.push("/");
    }
    setLoading(false);
  };
  //handle signup user details
  const handleSignUpUserDetails = async (values) => {
    setLoading(true);

    try {
      const response = await axios({
        method: "put",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/update-user`,
        data: values,
      });
      if (response) {
        toast.success("Details updated successfully, Please login ", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        router.push("/auth/login");
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
                <h1>Complete your account</h1>
              </div>
            </div>
            <div className={styles.main}>
              <div className={styles.formWrap}>
                <Formik
                  enableReinitialize
                  initialValues={initialFormValues}
                  validationSchema={validationSchema}
                  onSubmit={(values) => {
                    console.log(values, "values");
                    const details = {
                      userId: userId,
                      orgId: orgId,
                      email: values.userId,
                      fullName: values.FName,
                      password: values.password,
                      country: values.CountryName,
                      companyName: values.CompanyName,
                      loginType: "Portal",
                    };
                    handleSignUpUserDetails(details);
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
                        <InputLabel htmlFor="userId">Email</InputLabel>
                        <InputText
                          id="userId"
                          type="text"
                          name="userId"
                          placeholder="john.golt@example.com"
                          value={values.userId}
                          onChange={handleChange}
                          disabled={true}
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
                          error={touched.userId && Boolean(errors.userId)}
                        />
                        <ErrorMsg name="userId"></ErrorMsg>
                      </div>
                      <div className={styles.formGroup}>
                        <InputLabel htmlFor="CompanyName">
                          Company Name<span className={styles.red}>*</span>
                        </InputLabel>
                        <InputText
                          id="CompanyName"
                          name="CompanyName"
                          type="text"
                          placeholder="Enter here"
                          value={values.CompanyName}
                          onChange={handleChange}
                          disabled={!companyName ? false : true}
                          error={
                            touched.CompanyName && Boolean(errors.CompanyName)
                          }
                        />
                        <ErrorMsg name="CompanyName"></ErrorMsg>
                      </div>
                      <div className={styles.formGroup}>
                        <InputLabel htmlFor="FName">
                          Full Name<span className={styles.red}>*</span>
                        </InputLabel>
                        <InputText
                          id="FName"
                          name="FName"
                          type="text"
                          placeholder="Enter here"
                          value={values.FName}
                          onChange={handleChange}
                          error={touched.FName && Boolean(errors.FName)}
                        />
                        <ErrorMsg name="FName"></ErrorMsg>
                      </div>
                      <div className={styles.formGroup}>
                        <InputLabel htmlFor="CountryName">
                          Country<span className={styles.red}>*</span>
                        </InputLabel>
                        <CountrySelect
                          name="CountryName"
                          value={values.CountryName}
                          setFieldValue={setFieldValue}
                          errors={errors}
                          touched={touched}
                          disabled={openDelete}
                        />
                        <ErrorMsg name="CountryName"></ErrorMsg>
                      </div>
                      <span className={styles.line}></span>
                      <div className={styles.formGroup}>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <InputText
                          id="password"
                          name="password"
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
                        <ErrorMsg name="password"></ErrorMsg>
                      </div>
                      <div className={styles.formGroup}>
                        <InputLabel htmlFor="RePassword">
                          Repeat Password
                        </InputLabel>
                        <InputText
                          id="RePassword"
                          name="RePassword"
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
                        <ErrorMsg name="RePassword"></ErrorMsg>
                      </div>
                      <MainButton type="submit" variant="contained">
                        Sign Up
                      </MainButton>
                      <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={openDelete}
                        onClose={(event, reason) => {
                          if (reason !== "backdropClick") {
                            handleDeleteAllModal;
                          }
                        }}
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                          timeout: 500,
                        }}
                      >
                        <Fade in={false}>
                          <ModalBox
                            style={{ opacity: 1, visibility: "visible" }}
                          >
                            <span
                              className={layout.model_close}
                              onClick={() => {
                                router.push("/auth/login");
                              }}
                            >
                              <Image
                                src="/icons/cancel.svg"
                                height="12"
                                width="12"
                                alt=""
                              />
                            </span>
                            <div className={layout.mb_20}>
                              <h3>
                                Are you sure you want to delete this user?
                              </h3>
                              <p>
                                The user will be deleted immediately and this
                                action cannot be undone.
                              </p>
                            </div>
                            <div className={layout.flex_between_center}>
                              <OutlineButton
                                onClick={() => {
                                  handleVerifyAccount();
                                  handleDeleteAllModal();
                                }}
                                aligncenter="true"
                                fixwidth="auto"
                                marginbottom="0px"
                              >
                                <span className={globalLayout.btn_icon}>
                                  <Image
                                    alt=""
                                    src="/icons/cancel-icon.svg"
                                    width="16"
                                    height="16"
                                  />
                                </span>
                                Accept the invitation
                              </OutlineButton>
                              <IconButton
                                onClick={() => {
                                  router.push("/auth/login");
                                }}
                                withText
                              >
                                <span className={layout.flex_center}>
                                  <Image
                                    alt=""
                                    src="/icons/delete-icon-white.svg"
                                    width="16"
                                    height="16"
                                  />{" "}
                                  <span className={layout.ml_10}>
                                    Reject and stay
                                  </span>
                                </span>
                              </IconButton>
                            </div>
                          </ModalBox>
                        </Fade>
                      </Modal>
                    </Form>
                  )}
                </Formik>
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
