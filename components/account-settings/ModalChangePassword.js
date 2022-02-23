import React from "react";
import layout from "../../styles/layout.module.scss";
import { Formik, Form } from "formik";
import { passwordValidation } from "../../validators/accounts.validators";
import {
  ErrorMsg,
  InputText,
  MainButton,
  OutlineButton,
} from "../formControls.style";
import { InputLabel } from "@mui/material";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import { ModalBox } from "../tableControls.style";
import InputAdornment from "@mui/material/InputAdornment";
import Image from "next/image";
import { useRouter } from "next/router";
import tokenExpired from "../layout/withAuth/tokenExpired";
import axios from "axios";
import { toast } from "react-toastify";

function ModalChangePassword(props) {
  const router = useRouter();
  const initialPasswordValues = {
    oldPassword: "",
    confirmPassword: "",
    repeatPassword: "",
  };
  let { open, handleClose, pwd, setPwd } = props;
  const handleChangePassword = async (values) => {
    try {
      const authDetails = JSON.parse(localStorage.getItem("authDetails"));

      const { jwt, userId, orgId } = authDetails;

      const response = await axios({
        method: "put",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/update-password`,

        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
        data: {
          ...values,
          userId: userId,
          confirmPassword: values.confirmPassword,
        },
      });
      if (response && response.data) {
        console.log("working get");

        setPwd(values.confirmPassword);
        localStorage.removeItem("authDetails");
        router.push("/auth/login");
        toast.success(response.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      } else {
        toast.error(
          `${
            response.data.errors ? response.data.errors : "error while login"
          }`,
          {
            position: toast.POSITION.BOTTOM_RIGHT,
          }
        );
      }
    } catch (err) {
      console.log(err);
      tokenExpired(err, router);
    }
  };
  return (
    <Formik
      enableReinitialize
      initialValues={initialPasswordValues}
      validationSchema={passwordValidation}
      onSubmit={(values, { resetForm }) => {
        handleChangePassword(values);
        handleClose();
        resetForm();
      }}
    >
      {({
        touched,
        errors,
        values,
        handleBlur,
        handleChange,
        setFieldValue,
        resetForm,
      }) => (
        <div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <ModalBox style={{ minWidth: "480px" }}>
                <span
                  className={layout.model_close}
                  onClick={() => {
                    resetForm();
                    handleClose();
                  }}
                >
                  <Image
                    src="/icons/cancel.svg"
                    height="12"
                    width="12"
                    alt=""
                  />
                </span>
                <Form>
                  <div className={layout.mb_20}>
                    <h3>Change Password</h3>
                    <div className={layout.mt_20}>
                      <InputLabel htmlFor="password">
                        Current Password
                      </InputLabel>
                      <InputText
                        size="small"
                        id="password"
                        type="password"
                        placeholder="Enter Current Password"
                        value={values.password}
                        name="oldPassword"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          touched.oldPassword && Boolean(errors.oldPassword)
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
                      />
                      <ErrorMsg name="oldPassword"></ErrorMsg>
                    </div>
                    <div className={layout.mt_20}>
                      <InputLabel htmlFor="password">New Password</InputLabel>
                      <InputText
                        size="small"
                        id="password"
                        type="password"
                        placeholder="Enter New Password"
                        values={values.newPassword}
                        name="confirmPassword"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          touched.confirmPassword &&
                          Boolean(errors.confirmPassword)
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
                      />
                      <ErrorMsg name="confirmPassword"></ErrorMsg>
                    </div>
                    <div className={layout.mt_20}>
                      <InputLabel htmlFor="password">
                        Repeat New Password
                      </InputLabel>
                      <InputText
                        size="small"
                        id="password"
                        type="password"
                        placeholder="Repeat Password"
                        name="repeatPassword"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          touched.repeatPassword &&
                          Boolean(errors.repeatPassword)
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
                      />
                      <ErrorMsg name="repeatPassword"></ErrorMsg>
                    </div>
                    <div className={`${layout.flex_center} ${layout.mt_30}`}>
                      <OutlineButton
                        className={`${layout.mr_10}`}
                        variant="text"
                        marginbottom="0"
                        onClick={() => {
                          resetForm();
                          handleClose();
                        }}
                      >
                        <Image
                          alt="Icon"
                          width="14"
                          height="14"
                          src="/icons/cancel-icon.svg"
                        />
                        <span className={layout.ml_10}>Cancel</span>
                      </OutlineButton>
                      <MainButton
                        className={` ${layout.ml_10}`}
                        variant="contained"
                        marginbottom="0"
                        type="submit"
                        // onClick={() => handleChangePassword(values)}
                      >
                        <Image
                          alt="Icon"
                          width="16"
                          height="16"
                          src="/icons/save-icon-white.svg"
                        />
                        <span className={layout.ml_10}>Change Password</span>
                      </MainButton>
                    </div>
                  </div>
                </Form>
              </ModalBox>
            </Fade>
          </Modal>
        </div>
      )}
    </Formik>
  );
}

export default ModalChangePassword;
