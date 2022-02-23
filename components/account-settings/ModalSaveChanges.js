import React from "react";
import layout from "../../styles/layout.module.scss";
import { Formik, Form } from "formik";
import { oldPasswordValidate } from "../../validators/accounts.validators";
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
import axios from "axios";
import { useRouter } from "next/router";
import tokenExpired from "../layout/withAuth/tokenExpired";
import { toast } from "react-toastify";

function ModalSaveChanges(props) {
  const router = useRouter();
  let {
    SaveOpen,
    handleSaveClose,
    handleSaveChanges,
    setIsEdit,
    values1,
    pwd,
    setPwd,
    getUserAccountInfo,
  } = props;
  const initialOldPasswordValues = {
    oldPassword: "",
  };

  const confirmWithOldPassword = async (values) => {
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
          confirmPassword: pwd === "" ? values.oldPassword : pwd,
        },
      });
      if (response && response.data) {
        handleSaveChanges(values1);
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
      getUserAccountInfo();
      console.log("error occured");
      console.log(err);
      tokenExpired(err, router);
    }
  };
  return (
    <Formik
      enableReinitialize
      initialValues={initialOldPasswordValues}
      validationSchema={oldPasswordValidate}
      onSubmit={(values, { resetForm }) => {
        console.log(values);
        confirmWithOldPassword(values);
        console.log("confirmed");

        handleSaveClose();
        setIsEdit(false);
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
            open={SaveOpen}
            onClose={handleSaveClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={SaveOpen}>
              <ModalBox style={{ minWidth: "480px" }}>
                <span className={layout.model_close} onClick={handleSaveClose}>
                  <Image
                    src="/icons/cancel.svg"
                    height="12"
                    width="12"
                    alt=""
                  />
                </span>
                <Form>
                  <div className={layout.mb_20}>
                    <h3>Enter old password to save changes</h3>
                    <div className={layout.mt_20}>
                      <InputLabel htmlFor="password">Enter Password</InputLabel>
                      <InputText
                        size="small"
                        type="password"
                        placeholder="Enter Old Password"
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
                    <div className={`${layout.flex_center} ${layout.mt_30}`}>
                      <OutlineButton
                        className={`${layout.mr_10}`}
                        variant="text"
                        marginbottom="0"
                        onClick={handleSaveClose}
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
                        // onClick={() => {
                        //   handleSaveChanges(values);
                        //   handleSaveClose();
                        //   setIsEdit(false);
                        // }}
                      >
                        <Image
                          alt="Icon"
                          width="16"
                          height="16"
                          src="/icons/save-icon-white.svg"
                        />
                        <span className={layout.ml_10}>Save Changes</span>
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

export default ModalSaveChanges;
