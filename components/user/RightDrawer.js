import * as React from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import { Drawer } from "../tableControls.style";
import { Formik, Form } from "formik";
import { validationSchema } from "../../validators/user.validators";
import layout from "../../styles/layout.module.scss";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import styles from "../../styles/login.module.scss";
// Calendar
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import axios from "axios";
import tokenExpired from "../layout/withAuth/tokenExpired";
import moment from "moment";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  MainButton,
  OutlineButton,
  InputText,
  RedOutlineButton,
  ErrorMsg,
} from "../../components/formControls.style";
import Loader from "../Loader";

const RightDrawer = (props) => {
  const {
    setDrawerstate,
    toggleDrawer,
    Drawerstate,
    userInfo,
    setUserInfo,
    row,
    authDetails,
    handlesingleDeleteUsers,
    updatingUsers,
  } = props;
  const [value, setValue] = React.useState(row && row.workAnniversary);

  const [loading, setLoading] = React.useState(false);
  const minDate = new Date("2000-01-01T00:00:00.000");
  const maxDate = new Date("2025-01-01T00:00:00.000");
  const initialFormValues = {
    userId: row.email || "",
    fullName: row.fullName || "",
    phoneNumber: row.phoneNumber || "",
    // skype: userInfo ? row.skype : "",
    country: row.country || "",
    companyName: row.companyName || "",
    // workAnniversary: userInfo ? row.workAnniversary : "",
    bio: row.bio || "",
    language: "English",
    userRole: row.userRole || "",
    enabled: row.enabled || "",
  };
  const router = useRouter();

  /// user edit handle
  const handleUserEdit = async (values) => {
    const isEmailChanged = row.email != values.userId;
    console.log(values, "value");

    const postValue = {
      userId: row.userId,
      orgId: row.orgId,
      email: values.userId,
      fullName: values.fullName,
      userRole: values.userRole,
      country: values.country,
      companyName: values.companyName,
      birthday: "",
      phoneNumber: values.phoneNumber,
      // skype: values.skype,
      title: "",
      // workAnniversary: values.workAnniversary,
      language: values.language,
      bio: values.bio,
      verified: isEmailChanged ? false : row.verified,
      enabled: isEmailChanged ? false : values.enabled,
      profileLogo: row.profileLogo,
    };
    setLoading(true);
    try {
      const response = await axios({
        method: "put",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/edit-user?type=User-Settings`,
        headers: {
          Authorization: `Bearer ${authDetails.jwt}`,
        },
        data: postValue,
      });

      if (response && response.data) {
        toggleDrawer("right", false);
        if (isEmailChanged && authDetails.userId == row.userId) {
          localStorage.removeItem("authDetails"), router.push("/auth/login");
        } else updatingUsers();
        toast.success(response.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      } else {
        toast.error(
          `${response.data.error ? response.data.error : "error while login"}`,
          {
            position: toast.POSITION.BOTTOM_RIGHT,
          }
        );
      }
    } catch (err) {
      console.log(err);
      tokenExpired(err, router);
    }
    setLoading(false);
  };

  return (
    <>
      <Loader loading={loading} />

      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* <Button onClick={() => toggleDrawer(anchor, true)}>Edit</Button> */}
          <SwipeableDrawer
            anchor={anchor}
            open={Drawerstate[anchor]}
            onClose={() => toggleDrawer(anchor, false)}
            onOpen={() => toggleDrawer(anchor, true)}
          >
            <Drawer>
              <span
                className={layout.model_close}
                onClick={() => toggleDrawer(anchor, false)}
              >
                <Image src="/icons/cancel.svg" height="12" width="12" alt="" />
              </span>
              <h2>User’s Information</h2>
              <div className="DrawerWrap">
                <Formik
                  enableReinitialize
                  initialValues={initialFormValues}
                  validationSchema={validationSchema}
                  onSubmit={(values) => {
                    handleUserEdit(values);
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
                    <Form>
                      <div className={layout.flex_center}>
                        <div
                          className={layout.mr_20}
                          style={{ position: "relative" }}
                        >
                          <span className={layout.online}></span>
                          <label htmlFor="UserImg" className="UserImgUpload">
                            <Image
                              htmlFor="UserImg"
                              src={
                                row.profileLogo
                                  ? row.profileLogo
                                  : "/icons/user-avatar.svg"
                              }
                              alt=""
                              width="40"
                              height="40"
                            />
                            {/* <input
                              id="UserImg"
                              className="UserImg"
                              type="file"
                              name="UserImg"
                              style={{ display: "none" }}
                            /> */}
                          </label>
                        </div>
                        <div className={layout.mb_20} style={{ width: "100%" }}>
                          <InputLabel htmlFor="fullName">Full Name</InputLabel>
                          <InputText
                            size="small"
                            id="fullName"
                            type="text"
                            name="fullName"
                            placeholder="Type the name of the user"
                            value={values.fullName}
                            onChange={handleChange}
                            disabled={userInfo}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Image
                                    src="/icons/name-icon.svg"
                                    height="20"
                                    width="26"
                                    alt="Full Name"
                                  />
                                </InputAdornment>
                              ),
                            }}
                            error={touched.fullName && Boolean(errors.fullName)}
                          />
                          <ErrorMsg name="fullName"></ErrorMsg>
                        </div>
                      </div>
                      <div className={layout.mb_20}>
                        <InputLabel htmlFor="userId">Email</InputLabel>
                        <InputText
                          size="small"
                          id="userId"
                          type="text"
                          name="userId"
                          value={values.userId}
                          disabled={userInfo}
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
                          error={touched.userId && Boolean(errors.userId)}
                        />
                        <ErrorMsg name="userId"></ErrorMsg>
                      </div>
                      <div className={layout.mb_20}>
                        <InputLabel htmlFor="phoneNumber">
                          Phone Number
                        </InputLabel>
                        <InputText
                          size="small"
                          id="phoneNumber"
                          type="text"
                          name="phoneNumber"
                          placeholder="Type the phone number"
                          value={values.phoneNumber}
                          disabled={userInfo}
                          onChange={handleChange}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Image
                                  src="/icons/phone-icon.svg"
                                  height="20"
                                  width="26"
                                  alt="phone"
                                />
                              </InputAdornment>
                            ),
                          }}
                          error={
                            touched.phoneNumber && Boolean(errors.phoneNumber)
                          }
                        />
                        <ErrorMsg name="phoneNumber"></ErrorMsg>
                      </div>

                      <div className={layout.mb_20}>
                        <InputLabel htmlFor="country">Country</InputLabel>
                        <InputText
                          size="small"
                          id="country"
                          type="text"
                          name="country"
                          placeholder="Type the country of the user"
                          value={values.country}
                          disabled={userInfo}
                          onChange={handleChange}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Image
                                  src="/icons/location-icon.svg"
                                  height="20"
                                  width="26"
                                  alt="country"
                                />
                              </InputAdornment>
                            ),
                          }}
                          error={touched.country && Boolean(errors.country)}
                        />
                        <ErrorMsg name="country"></ErrorMsg>
                      </div>
                      <div className={layout.mb_20}>
                        <InputLabel htmlFor="companyName">
                          Company Name
                        </InputLabel>
                        <InputText
                          size="small"
                          id="companyName"
                          type="text"
                          name="companyName"
                          placeholder="Type the name of the company"
                          value={values.companyName}
                          disabled={userInfo}
                          onChange={handleChange}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Image
                                  src="/icons/company-icon.svg"
                                  height="20"
                                  width="26"
                                  alt="companyName"
                                />
                              </InputAdornment>
                            ),
                          }}
                          error={
                            touched.companyName && Boolean(errors.companyName)
                          }
                        />
                        <ErrorMsg name="companyName"></ErrorMsg>
                      </div>
                      {/* <div className={layout.mb_20}>
                        <InputLabel htmlFor="workAnniversary">
                          Work Anniversary
                        </InputLabel>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            views={["year", "day"]}
                            value={value}
                            minDate={minDate}
                            maxDate={maxDate}
                            onChange={(newValue) => {
                              setValue(newValue);
                              setFieldValue(
                                "workAnniversary",
                                moment(newValue).format("L")
                              );
                            }}
                            disabled={userInfo}
                            renderInput={(params) => (
                              <InputText
                                id="workAnniversary"
                                name="workAnniversary"
                                disabled={userInfo}
                                size="small"
                                {...params}
                                helperText={null}
                                value={value}
                                error={
                                  touched.workAnniversary &&
                                  Boolean(errors.workAnniversary)
                                }
                                disabled
                              />
                            )}
                          />
                        </LocalizationProvider>
                        <ErrorMsg name="workAnniversary"></ErrorMsg>
                      </div> */}
                      <div className={layout.mb_20}>
                        <InputLabel htmlFor="bio">Bio</InputLabel>
                        <InputText
                          size="small"
                          id="bio"
                          type="text"
                          name="bio"
                          placeholder="Type a few words about this user"
                          value={values.bio}
                          disabled={userInfo}
                          onChange={handleChange}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Image
                                  src="/icons/bio-icon.svg"
                                  height="20"
                                  width="26"
                                  alt="Bio"
                                />
                              </InputAdornment>
                            ),
                          }}
                          error={touched.bio && Boolean(errors.bio)}
                        />
                        <ErrorMsg name="bio"></ErrorMsg>
                      </div>
                      <div className={layout.mb_20}>
                        <InputLabel htmlFor="language">Language</InputLabel>
                        <InputText
                          size="small"
                          id="language"
                          type="text"
                          name="language"
                          placeholder="English"
                          value={values.language}
                          disabled={true}
                          onChange={handleChange}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Image
                                  src="/icons/language-icon.svg"
                                  height="20"
                                  width="26"
                                  alt="language"
                                />
                              </InputAdornment>
                            ),
                          }}
                          error={touched.language && Boolean(errors.language)}
                        />
                        <ErrorMsg name="language"></ErrorMsg>
                      </div>
                      <div className={layout.mb_10}>
                        <span className={layout.grey_text}>User Role</span>
                        <div className={styles.formGroup}>
                          <RadioGroup
                            row
                            aria-label="gender"
                            name="row-radio-buttons-group"
                            value={values.userRole}
                            onChange={(e) => {
                              setFieldValue("userRole", e.target.value);
                            }}
                          >
                            <FormControlLabel
                              value="Admin"
                              control={<Radio />}
                              label="Admin"
                              disabled={
                                userInfo || authDetails.userId == row.userId
                              }
                            />
                            <FormControlLabel
                              value="User"
                              control={<Radio />}
                              label="User"
                              disabled={
                                userInfo || authDetails.userId == row.userId
                              }
                            />
                          </RadioGroup>
                        </div>
                      </div>
                      <div className={layout.mb_10}>
                        <span className={layout.grey_text}>User Status</span>
                        <div className={styles.formGroup}>
                          <RadioGroup
                            row
                            aria-label="gender"
                            name="row-radio-buttons-group"
                            value={values.enabled ? "Active" : "Deactive"}
                            onChange={(e) => {
                              const updateEnabled =
                                e.target.value == "Active" ? true : false;
                              setFieldValue("enabled", updateEnabled);
                            }}
                          >
                            <FormControlLabel
                              value="Active"
                              control={<Radio />}
                              label="Active"
                              disabled={
                                userInfo ||
                                authDetails.userId == row.userId ||
                                !row.verified
                              }
                            />
                            <FormControlLabel
                              value="Deactive"
                              control={<Radio />}
                              label="Deactive"
                              disabled={
                                userInfo ||
                                authDetails.userId == row.userId ||
                                !row.verified
                              }
                            />
                          </RadioGroup>
                        </div>
                      </div>
                      {row.verified && userInfo && (
                        <div>
                          <MainButton
                            variant="contained"
                            type="Edit"
                            onClick={() => setUserInfo(false)}
                          >
                            Edit Information
                          </MainButton>
                        </div>
                      )}
                      {!userInfo && (
                        <div className={layout.flex_between_center}>
                          <RedOutlineButton
                            fixwidth="auto"
                            disabled={authDetails.userId == row.userId}
                            onClick={() => {
                              handlesingleDeleteUsers(row);
                              // toggleDrawer(anchor, false);
                            }}
                          >
                            Delete User
                          </RedOutlineButton>
                          <div className={layout.flex_center}>
                            <OutlineButton
                              fixwidth="auto"
                              className={layout.mr_10}
                              onClick={() => toggleDrawer(anchor, false)}
                            >
                              Cancel
                            </OutlineButton>
                            <MainButton
                              fixwidth="auto"
                              variant="contained"
                              type="submit"
                            >
                              Save Changes
                            </MainButton>
                          </div>
                        </div>
                      )}
                    </Form>
                  )}
                </Formik>
              </div>
            </Drawer>
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </>
  );
};

export default RightDrawer;
