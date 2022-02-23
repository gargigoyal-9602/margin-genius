import * as React from "react";
import layout from "../../styles/layout.module.scss";
import {
  ErrorMsg,
  MainButton,
  OutlineButton,
  InputText,
} from "../../components/formControls.style";
import Image from "next/image";
import { MyProfileBox } from "../../components/account-settings/AccountSetting.style";
import { Formik, Form } from "formik";
import { validationSchema } from "../../validators/accounts.validators";
import tokenExpired from "../layout/withAuth/tokenExpired";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import ModalChangePassword from "./ModalChangePassword";
import ModalSaveChanges from "./ModalSaveChanges";
import Loader from "../Loader";
import { CountrySelect } from "../countrySelect";

const MyProfile = (props) => {
  const { userData, setUserData } = props;
  const hiddenFileInput = React.useRef(null);
  const router = useRouter();

  const uniqueId = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [pic, setPic] = React.useState({
    preview: "/icons/user-avatar.svg",
    raw: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loginType, setLoginType] = React.useState("");
  const [SaveOpen, setSaveOpen] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState({
    fullName: "",
    birthday: "",
    country: "",
    email: "",
    phoneNumber: "",
    password: "",
    userRole: "",
    title: "",
    language: "",
    bio: "",
    newPassword: "",
    currentPassword: "",
    oldPassword: "",
    repeatPassword: "",
    profileLogo: "/icons/user-avatar.svg",
  });
  const [pwd, setPwd] = React.useState("");
  const [isEditable, setIsEditable] = React.useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
  });
  const [isEdit, setIsEdit] = React.useState(false);
  const handleSaveChangeOpen = () => setSaveOpen(true);
  const handleSaveClose = () => setSaveOpen(false);

  const getUserAccountInfo = async () => {
    // setLoading(true);
    try {
      const authDetails = JSON.parse(localStorage.getItem("authDetails"));
      const { jwt, userId, orgId, loginType } = authDetails;
      setLoginType(loginType);
      const response = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/user?userId=${userId}`,
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      });

      setUserInfo(response.data.data);
      setUserData({
        ...userData,
        fullName: response.data.data.fullName,
        profileLogo: response.data.data.profileLogo,
      });
    } catch (err) {
      console.log(err);
      tokenExpired(err, router);
    }
    // setLoading(false);
  };

  React.useEffect(() => {
    getUserAccountInfo();
  }, []);

  const handleOnClick = (e) => {
    setIsEdit(true);

    if (e.target.id === "1") {
      setIsEditable({
        ...isEditable,
        [e.target.id]: true,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
      });
    }
    if (e.target.id === "2") {
      setIsEditable({
        ...isEditable,
        [e.target.id]: true,
        1: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
      });
    }
    if (e.target.id === "3") {
      setIsEditable({
        ...isEditable,
        [e.target.id]: true,
        1: false,
        2: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
      });
    }
    if (e.target.id === "4") {
      setIsEditable({
        ...isEditable,
        [e.target.id]: true,
        1: false,
        2: false,
        3: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
      });
    }
    if (e.target.id === "5") {
      setIsEditable({
        ...isEditable,
        [e.target.id]: true,
        1: false,
        2: false,
        3: false,
        4: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
      });
    }
    if (e.target.id === "6") {
      setIsEditable({
        ...isEditable,
        [e.target.id]: true,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        7: false,
        8: false,
        9: false,
        10: false,
      });
    }
    if (e.target.id === "7") {
      setIsEditable({
        ...isEditable,
        [e.target.id]: true,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        8: false,
        9: false,
        10: false,
      });
    }
    if (e.target.id === "8") {
      setIsEditable({
        ...isEditable,
        [e.target.id]: true,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        9: false,
        10: false,
      });
    }
    if (e.target.id === "9") {
      setIsEditable({
        ...isEditable,
        [e.target.id]: true,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        10: false,
      });
    }
    if (e.target.id === "10") {
      setIsEditable({
        ...isEditable,
        [e.target.id]: true,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
      });
    }
  };

  const handleSave = (e, name, values) => {
    setUserInfo({ ...userInfo, [name]: values[name] });
    console.log(e.target.id);
    uniqueId.map((id) => {
      if (e.target.id === id) {
        setIsEditable({ ...isEditable, [id]: false });
      }
    });
  };
  const handleSaveChanges = async (values) => {
    try {
      const authDetails = JSON.parse(localStorage.getItem("authDetails"));

      const { jwt, userId, orgId } = authDetails;

      const response = await axios({
        method: "put",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/user-profile?type=Account-Settings`,
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
        data: { ...values, userId: userId, orgId: orgId },
      });
      if (response && response.data) {
        console.log("working get");
        getUserAccountInfo();

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
  const handleCancelChanges = () => {
    getUserAccountInfo();
    setIsEdit(false);
    setIsEditable({
      ...isEditable,
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false,
      8: false,
      9: false,
      10: false,
    });
  };
  const uploadProfileLogo = async (fileNames) => {
    const dataForm = new FormData();
    setLoading(true);
    try {
      const authDetails = JSON.parse(localStorage.getItem("authDetails"));

      const { jwt, userId, orgId, userType } = authDetails;
      dataForm.append("userId", userId);
      dataForm.append("type", userType);
      dataForm.append("file", fileNames);

      const response = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/upload`,

        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
        data: dataForm,
      });
      setUserInfo({ ...userInfo, profileLogo: response.data.data });
      if (response && response.data) {
        setLoading(false);
        console.log("working get");
        console.log(response.data.data);

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
  const handleFileChange = (e) => {
    if (
      e.target.files.length &&
      e.target.files[0].size < 990000 &&
      (e.target.files[0].type === "image/jpeg" ||
        e.target.files[0].type === "image/png")
    ) {
      setUserInfo({
        ...userInfo,
        profileLogo: URL.createObjectURL(e.target.files[0]),
      });
      setPic({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });

      uploadProfileLogo(e.target.files[0]);
      console.log(e.target.files[0]);
      setIsEdit(true);
    } else {
      toast.error(
        e.target.files[0].size > 990000
          ? "File size should be less than 990 KB"
          : "File type should be jpeg",
        {
          position: toast.POSITION.BOTTOM_RIGHT,
        }
      );
    }
  };
  return (
    <>
      <Loader loading={loading} />
      <Formik
        enableReinitialize
        initialValues={userInfo}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("hi");
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
          <Form>
            <MyProfileBox>
              <div className="profile_img">
                {pic.preview ? (
                  <Image
                    src={
                      userInfo.profileLogo === null
                        ? "/icons/user-avatar.svg"
                        : userInfo.profileLogo
                    }
                    alt="User Image"
                    width="100"
                    height="100"
                    className="user"
                  />
                ) : null}

                <div className="profile_hover">
                  <div
                    onClick={() => {
                      hiddenFileInput.current.click();
                    }}
                    className="change_img"
                  >
                    <input
                      type="file"
                      name="profileLogo"
                      ref={hiddenFileInput}
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                    <Image
                      alt="Icon"
                      width="20"
                      height="20"
                      src="/icons/edit-pen-icon.svg"
                    />
                    <span className={layout.mt_5}>Change Photo</span>
                  </div>
                  <Button
                    onClick={() => {
                      setIsEdit(true);
                      setPic({ ...pic, preview: "/icons/user-avatar.svg" });
                      setUserInfo({
                        ...userInfo,
                        profileLogo: "/icons/user-avatar.svg",
                      });
                    }}
                    className="delete_img"
                  >
                    <Image
                      alt="Icon"
                      width="14"
                      height="14"
                      src="/icons/delete-icon2.svg"
                    />
                    <span className={layout.ml_5}>Delete</span>
                  </Button>
                </div>
              </div>
              <div
                style={{ padding: "0 30px", width: "100%" }}
                className="form-block"
              >
                <div className={layout.profile_data}>
                  <div className={layout.title}>Full Name</div>
                  <Image
                    alt="Icon"
                    width="16"
                    height="16"
                    src="/icons/user-name.svg"
                  />
                  <div
                    className={`${layout.flex_top} ${layout.ml_10}`}
                    style={{ width: "60%" }}
                  >
                    {isEditable[1] ? (
                      <>
                        <div className="input_box">
                          <InputText
                            size="small"
                            type="text"
                            name="fullName"
                            value={values.fullName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.fullName && Boolean(errors.fullName)}
                          />

                          <div className="errormessagewrap">
                            <ErrorMsg
                              name="fullName"
                              className="Error"
                            ></ErrorMsg>
                          </div>
                        </div>
                        <div className="btn-wrap">
                          <MainButton
                            id="1"
                            className={layout.ml_20}
                            marginbottom="0"
                            fixwidth="auto"
                            variant="contained"
                            onClick={(e) => {
                              resetForm();
                              handleSave(e, "fullName", values);
                            }}
                            disabled={
                              touched.fullName && Boolean(errors.fullName)
                            }
                          >
                            Save
                          </MainButton>
                        </div>
                      </>
                    ) : (
                      <p
                        id="1"
                        className={
                          userInfo.fullName === null || userInfo.fullName === ""
                            ? `${layout.ml_10} ${layout.disabled}`
                            : `${layout.ml_10}`
                        }
                        onClick={(e) => {
                          resetForm();
                          handleOnClick(e);
                        }}
                      >
                        {userInfo.fullName === null || userInfo.fullName === ""
                          ? "Add your Full Name"
                          : userInfo.fullName}
                      </p>
                    )}
                  </div>
                  <br />
                </div>

                {/* <div className={layout.profile_data}>
                  <div className={layout.title}>Birthday</div>
                  <Image
                    alt="Icon"
                    width="16"
                    height="16"
                    src="/icons/birthday.svg"
                  />

                  <div
                    className={`${layout.flex_top} ${layout.ml_10}`}
                    style={{ width: "60%" }}
                  >
                    {isEditable[2] ? (
                      <>
                        <div className="input_box">
                          <InputText
                            size="small"
                            type="text"
                            name="birthday"
                            value={values.birthday}
                            placeholder="MM/DD/YYY"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.birthday && Boolean(errors.birthday)}
                          />
                          <div className="errormessagewrap">
                            <ErrorMsg name="birthday"></ErrorMsg>
                          </div>
                        </div>
                        <div className="btn-wrap">
                          <MainButton
                            id="2"
                            className={layout.ml_20}
                            marginbottom="0"
                            fixwidth="auto"
                            variant="contained"
                            onClick={(e) => {
                              handleSave(e, "birthday", values);
                            }}
                            disabled={
                              touched.birthday && Boolean(errors.birthday)
                            }
                          >
                            Save
                          </MainButton>
                        </div>
                      </>
                    ) : (
                      <p
                        id="2"
                        className={
                          userInfo.birthday === null || userInfo.birthday === ""
                            ? `${layout.ml_10} ${layout.disabled}`
                            : `${layout.ml_10}`
                        }
                        onClick={(e) => {
                          resetForm();
                          handleOnClick(e);
                        }}
                      >
                        {userInfo.birthday === null || userInfo.birthday === ""
                          ? "Add your birthday"
                          : userInfo.birthday}
                      </p>
                    )}
                  </div>
                </div> */}
                <div className={layout.profile_data}>
                  <div className={layout.title}>Country</div>
                  <Image
                    alt="Icon"
                    width="16"
                    height="16"
                    src="/icons/location-icon.svg"
                  />
                  <div
                    className={`${layout.flex_top} ${layout.ml_10}`}
                    style={{ width: "60%" }}
                  >
                    {isEditable[3] ? (
                      <>
                        <div className="input_box">
                          <CountrySelect
                            name="country"
                            value={values.country}
                            setFieldValue={setFieldValue}
                            errors={errors}
                            touched={touched}

                            // disabled={openDelete}
                          />
                          <div className="errormessagewrap">
                            <ErrorMsg
                              name="country"
                              className="Error"
                            ></ErrorMsg>
                          </div>
                        </div>
                        <div className="btn-wrap">
                          <MainButton
                            id="3"
                            className={layout.ml_20}
                            marginbottom="0"
                            fixwidth="auto"
                            variant="contained"
                            onClick={(e) => {
                              resetForm();
                              handleSave(e, "country", values);
                            }}
                            disabled={
                              touched.country && Boolean(errors.country)
                            }
                          >
                            Save
                          </MainButton>
                        </div>
                      </>
                    ) : (
                      <p
                        id="3"
                        className={
                          userInfo.country === null || userInfo.country === ""
                            ? `${layout.ml_10} ${layout.disabled}`
                            : `${layout.ml_10}`
                        }
                        onClick={(e) => {
                          resetForm();
                          handleOnClick(e);
                        }}
                      >
                        {userInfo.country === null || userInfo.country === ""
                          ? "Add your location"
                          : userInfo.country}
                      </p>
                    )}
                  </div>
                </div>
                <div className={layout.profile_data}>
                  <div className={layout.title}>Email</div>
                  <Image
                    alt="Icon"
                    width="16"
                    height="16"
                    src="/icons/email-icon.svg"
                  />
                  <div
                    className={`${layout.flex_top} ${layout.ml_10}`}
                    style={{ width: "60%" }}
                  >
                    {isEditable[4] ? (
                      <>
                        <div className="input_box">
                          <InputText
                            size="small"
                            type="text"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.email && Boolean(errors.email)}
                          />
                          <div className="errormessagewrap">
                            <ErrorMsg name="email" className="Error"></ErrorMsg>
                          </div>
                        </div>

                        <div className="btn-wrap">
                          <MainButton
                            id="4"
                            className={layout.ml_20}
                            marginbottom="0"
                            fixwidth="auto"
                            variant="contained"
                            onClick={(e) => {
                              handleSave(e, "email", values);
                            }}
                            disabled={touched.email && Boolean(errors.email)}
                          >
                            Save
                          </MainButton>
                        </div>
                      </>
                    ) : (
                      <p
                        id="4"
                        className={`${layout.ml_10} ${layout.disabled}`}
                      >
                        {userInfo.email === null || userInfo.email === ""
                          ? "Add your email"
                          : userInfo.email}
                      </p>
                    )}
                  </div>
                </div>
                <div className={layout.profile_data}>
                  <div className={layout.title}>Phone Number</div>
                  <Image
                    alt="Icon"
                    width="16"
                    height="16"
                    src="/icons/mobile-icon.svg"
                  />
                  <div
                    className={`${layout.flex_top} ${layout.ml_10}`}
                    style={{ width: "60%" }}
                  >
                    {isEditable[5] ? (
                      <>
                        <div className="input_box">
                          <InputText
                            size="small"
                            type="text"
                            name="phoneNumber"
                            value={values.phoneNumber}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              touched.phoneNumber && Boolean(errors.phoneNumber)
                            }
                          />
                          <div className="errormessagewrap">
                            <ErrorMsg name="phoneNumber"></ErrorMsg>
                          </div>
                        </div>
                        <div className="btn-wrap">
                          <MainButton
                            id="5"
                            className={layout.ml_20}
                            marginbottom="0"
                            fixwidth="auto"
                            variant="contained"
                            onClick={(e) =>
                              handleSave(e, "phoneNumber", values)
                            }
                            disabled={
                              touched.phoneNumber && Boolean(errors.phoneNumber)
                            }
                          >
                            Save
                          </MainButton>
                        </div>
                      </>
                    ) : (
                      <p
                        id="5"
                        onClick={(e) => {
                          resetForm();
                          handleOnClick(e);
                        }}
                        className={
                          userInfo.phoneNumber === null ||
                          userInfo.phoneNumber === ""
                            ? `${layout.ml_10} ${layout.disabled}`
                            : `${layout.ml_10}`
                        }
                      >
                        {userInfo.phoneNumber === null ||
                        userInfo.phoneNumber === ""
                          ? "Add your phone number"
                          : userInfo.phoneNumber}
                      </p>
                    )}
                  </div>
                </div>
                <div className={layout.profile_data}>
                  <div className={layout.title}>Title</div>
                  <Image
                    alt="Icon"
                    width="16"
                    height="16"
                    src="/icons/company-profile-tab.svg"
                  />
                  <div
                    className={`${layout.flex_top} ${layout.ml_10}`}
                    style={{ width: "60%" }}
                  >
                    {isEditable[8] ? (
                      <>
                        <div className="input_box">
                          <InputText
                            size="small"
                            type="text"
                            name="title"
                            value={values.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.title && Boolean(errors.title)}
                          />
                          <div className="errormessagewrap">
                            <ErrorMsg name="title"></ErrorMsg>
                          </div>
                        </div>
                        <div className="btn-wrap">
                          <MainButton
                            id="8"
                            className={layout.ml_20}
                            marginbottom="0"
                            fixwidth="auto"
                            variant="contained"
                            onClick={(e) => handleSave(e, "title", values)}
                            disabled={touched.title && Boolean(errors.title)}
                          >
                            Save
                          </MainButton>
                        </div>
                      </>
                    ) : (
                      <p
                        id="8"
                        onClick={(e) => {
                          resetForm();
                          handleOnClick(e);
                        }}
                        className={
                          userInfo.title === null || userInfo.title === ""
                            ? `${layout.ml_10} ${layout.disabled}`
                            : `${layout.ml_10}`
                        }
                      >
                        {userInfo.title === null || userInfo.title === ""
                          ? "Add your title"
                          : userInfo.title}
                      </p>
                    )}
                  </div>
                </div>
                <div className={layout.profile_data}>
                  <div className={layout.title}>User Role</div>
                  <Image
                    alt="Icon"
                    width="16"
                    height="16"
                    src="/icons/role-icon.svg"
                  />
                  <div
                    className={`${layout.flex_top} ${layout.ml_10}`}
                    style={{ width: "60%" }}
                  >
                    {isEditable[7] ? (
                      <>
                        <div className="input_box">
                          <InputText
                            size="small"
                            type="text"
                            name="userRole"
                            value={values.userRole}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.userRole && Boolean(errors.userRole)}
                          />
                          <div className="errormessagewrap">
                            <ErrorMsg name="userRole"></ErrorMsg>
                          </div>
                        </div>
                        <div className="btn-wrap">
                          <MainButton
                            id="7"
                            className={layout.ml_20}
                            marginbottom="0"
                            fixwidth="auto"
                            variant="contained"
                            onClick={(e) => handleSave(e, "userRole", values)}
                            disabled={
                              touched.userRole && Boolean(errors.userRole)
                            }
                          >
                            Save
                          </MainButton>
                        </div>
                      </>
                    ) : (
                      <p
                        id="7"
                        className={`${layout.ml_10} ${layout.disabled}`}
                      >
                        {userInfo.userRole === null || userInfo.userRole === ""
                          ? null
                          : userInfo.userRole}
                      </p>
                    )}
                  </div>
                </div>
                <div className={layout.profile_data}>
                  <div className={layout.title}>Password</div>
                  <Image
                    alt="Icon"
                    width="16"
                    height="16"
                    src="/icons/lockicon.svg"
                  />
                  <div
                    className={`${layout.flex_top} ${layout.ml_10}`}
                    style={{ width: "60%" }}
                  >
                    {isEditable[6] ? (
                      <>
                        <div className="input_box">
                          <InputText
                            size="small"
                            type="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.password && Boolean(errors.password)}
                          />
                          <div className="errormessagewrap">
                            <ErrorMsg name="password"></ErrorMsg>
                          </div>
                        </div>
                        <div className="btn-wrap">
                          <MainButton
                            onClick={handleOpen}
                            className={layout.ml_20}
                            marginbottom="0"
                            fixwidth="auto"
                            variant="contained"
                            disabled={
                              touched.password && Boolean(errors.password)
                            }
                          >
                            Edit
                          </MainButton>
                        </div>
                      </>
                    ) : (
                      <p
                        id="6"
                        className={
                          loginType === "Portal"
                            ? `${layout.ml_10}`
                            : `${layout.ml_10} ${layout.disabled}`
                        }
                        onClick={(e) => {
                          resetForm();
                          if (loginType === "Portal") {
                            handleOpen();
                          }
                        }}
                      >
                        {userInfo.password == null || userInfo.password === ""
                          ? "**********"
                          : "**********"}
                      </p>
                    )}
                    <ModalChangePassword
                      open={open}
                      handleClose={handleClose}
                      pwd={pwd}
                      setPwd={setPwd}
                    />
                  </div>
                </div>

                {/* <div className={layout.profile_data}>
                  <div className={layout.title}>Language</div>
                  <Image
                    alt="Icon"
                    width="16"
                    height="16"
                    src="/icons/language-icon.svg"
                  />
                  <div
                    className={`${layout.flex_top} ${layout.ml_10}`}
                    style={{ width: "60%" }}
                  >
                    {isEditable[9] ? (
                      <>
                        <div className="input_box">
                          <InputText
                            size="small"
                            type="text"
                            name="language"
                            value={values.language}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.language && Boolean(errors.language)}
                          />
                          <div className="errormessagewrap">
                            <ErrorMsg name="language"></ErrorMsg>
                          </div>
                        </div>
                        <div className="btn-wrap">
                          <MainButton
                            id="9"
                            className={layout.ml_20}
                            marginbottom="0"
                            fixwidth="auto"
                            variant="contained"
                            onClick={(e) => handleSave(e, "language", values)}
                            disabled={
                              touched.language && Boolean(errors.language)
                            }
                          >
                            Save
                          </MainButton>
                        </div>
                      </>
                    ) : (
                      <p
                        id="9"
                        onClick={(e) => {
                          resetForm();
                          handleOnClick(e);
                        }}
                        className={
                          userInfo.language === null || userInfo.language === ""
                            ? `${layout.ml_10} ${layout.disabled}`
                            : `${layout.ml_10}`
                        }
                      >
                        {userInfo.language === null || userInfo.language === ""
                          ? "Add languages you speak"
                          : userInfo.language}
                      </p>
                    )}
                  </div>
                </div> */}
                {/* <div className={layout.profile_data}>
                  <div className={layout.title}>Bio</div>
                  <Image
                    alt="Icon"
                    width="16"
                    height="16"
                    src="/icons/bio-icon.svg"
                  />
                  <div
                    className={`${layout.flex_top} ${layout.ml_10}`}
                    style={{ width: "60%" }}
                  >
                    {isEditable[10] ? (
                      <>
                        <div className="input_box">
                          <InputText
                            size="small"
                            type="text"
                            name="bio"
                            value={values.bio}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.bio && Boolean(errors.bio)}
                          />
                          <div className="errormessagewrap">
                            <ErrorMsg name="bio"></ErrorMsg>
                          </div>
                        </div>
                        <div className="btn-wrap">
                          <MainButton
                            id="10"
                            className={layout.ml_20}
                            marginbottom="0"
                            fixwidth="auto"
                            variant="contained"
                            onClick={(e) => handleSave(e, "bio", values)}
                            disabled={touched.bio && Boolean(errors.bio)}
                          >
                            Save
                          </MainButton>
                        </div>
                      </>
                    ) : (
                      <p
                        id="10"
                        onClick={(e) => {
                          resetForm();
                          handleOnClick(e);
                        }}
                        className={
                          userInfo.bio === null || userInfo.bio === ""
                            ? `${layout.ml_10} ${layout.disabled}`
                            : `${layout.ml_10}`
                        }
                        style={{ maxWidth: "70%" }}
                      >
                        {userInfo.bio === null || userInfo.bio === ""
                          ? "Enter information about yourself"
                          : userInfo.bio}
                      </p>
                    )}
                  </div>
                </div> */}
                <div className={`${layout.flex_center} ${layout.mt_30}`}>
                  {isEdit && (
                    <>
                      <OutlineButton
                        className={`${layout.mr_20}`}
                        variant="text"
                        marginbottom="0"
                        onClick={handleCancelChanges}
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
                        onClick={() => {
                          if (loginType === "Portal") {
                            handleSaveChangeOpen();
                          } else {
                            handleSaveChanges(values);
                            setIsEdit(false);
                          }
                        }}
                        className={` ${layout.ml_20}`}
                        variant="contained"
                        marginbottom="0"
                        disabled={
                          Boolean(errors.fullName) ||
                          Boolean(errors.email) ||
                          Boolean(errors.birthday) ||
                          Boolean(errors.language) ||
                          Boolean(errors.phoneNumber) ||
                          Boolean(errors.userRole) ||
                          Boolean(errors.title) ||
                          Boolean(errors.country) ||
                          Boolean(errors.bio)
                        }
                      >
                        <Image
                          alt="Icon"
                          width="16"
                          height="16"
                          src="/icons/save-icon-white.svg"
                        />
                        <span className={layout.ml_10}>Save changes</span>
                      </MainButton>
                    </>
                  )}
                  <ModalSaveChanges
                    SaveOpen={SaveOpen}
                    handleSaveClose={handleSaveClose}
                    handleSaveChanges={handleSaveChanges}
                    setIsEdit={setIsEdit}
                    values1={values}
                    pwd={pwd}
                    setPwd={setPwd}
                    getUserAccountInfo={getUserAccountInfo}
                  />
                </div>
              </div>
            </MyProfileBox>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default MyProfile;
