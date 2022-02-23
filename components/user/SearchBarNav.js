import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import globalLayout from "../../styles/globalLayout.module.scss";
import layout from "../../styles/layout.module.scss";
import Image from "next/image";
import InputAdornment from "@mui/material/InputAdornment";
import {
  IconButton,
  MainButton,
  OutlineButton,
  InputText,
  ErrorMsg,
  BorderButton,
} from "../formControls.style";
import { ModalBox, FilterButton, FilterBox } from "../tableControls.style";
import styles from "../../styles/login.module.scss";
import Radio from "@mui/material/Radio";
import Checkbox from "@mui/material/Checkbox";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Formik, Form } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { toast } from "react-toastify";
import tokenExpired from "../layout/withAuth/tokenExpired";
import { ChipOption } from "../tableControls.style";
import Loader from "../Loader";

const SearchBarNav = (props) => {
  const authDetails = JSON.parse(localStorage.getItem("authDetails"));
  const {
    handleInvite,
    open,
    updatingUsers,
    openDelete,
    handleDeleteAllModal,
    handledeleteuser,
    userLength,
    search,
    setSearch,
    updatingSearchUsers,
    disableDelete,
    users,
    setAppliedFilter,
    appliedfilter,
    message,
  } = props;
  const [chipsArray, setchipsArray] = useState([]);
  const [radioValue, setRadioValue] = useState("Admin");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [adminlength, setAdminLength] = React.useState("");
  const [filter, setFilter] = React.useState({
    admin: false,
    user: false,
  });
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const click = Boolean(anchorEl);
  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleFilterClose = () => {
    setAnchorEl(null);
    setFilter(appliedfilter);
  };

  const handleRadioChange = (e) => {
    setRadioValue(e.target.value);
  };

  const handleDelete = (i) => {
    const newChipsArray = chipsArray.filter((chip) => chip != chipsArray[i]);
    setchipsArray(newChipsArray);
  };
  //validation for login
  const initialValues = {
    Emails: "",
  };
  const ValidationSchema = yup.object().shape({
    Emails: yup
      .string()
      .trim()
      .email("Please enter valid email")
      .when({
        is: chipsArray.length == 0,
        then: yup.string().required("Please enter email address"),
      }),
  });

  //hab]ndle send invite
  const handleSendInvite = async () => {
    const postData = {
      userId: authDetails.userId,
      email: chipsArray,
      orgId: authDetails.orgId,
      userRole: radioValue,
    };
    setLoading(true);

    try {
      const response = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/invite-user`,
        headers: {
          Authorization: `Bearer ${authDetails.jwt}`,
          // "Content-Type": "application/json",
        },
        data: postData,
      });
      if (response.data) {
        handleInvite();
        setchipsArray([]);
        toast.success(response.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        updatingUsers();
      }
    } catch (err) {
      handleInvite();
      setchipsArray([]);
      tokenExpired(err, router);
    }
    setLoading(false);
  };

  //handle admin length
  const handlelength = async (users) => {
    const adminLen = users && users.filter((user) => user.userRole != "User");
    setAdminLength(adminLen && adminLen.length);
  };
  useEffect(() => {
    handlelength(users);
  }, [users]);

  useEffect(() => {
    setFilter(appliedfilter);
  }, [appliedfilter]);
  return (
    <>
      <Loader loading={loading} />
      <div className={globalLayout.search_bar_nav}>
        {(userLength > 0 || message == "No Users Found.") && (
          <div className={globalLayout.search_field}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div>
                <InputText
                  width="350px"
                  id="Search"
                  name="Search"
                  type="text"
                  value={search}
                  placeholder="Search for user name or user type"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Image
                          src="/icons/search.svg"
                          height="15"
                          width="15"
                          alt="search"
                        />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    let filterValue;
                    if (!filter.admin && filter.user) {
                      filterValue = "user";
                    } else if (filter.admin && !filter.user) {
                      filterValue = "admin";
                    } else {
                      filterValue = "";
                    }
                    updatingUsers(e.target.value, filterValue);
                  }}
                />
              </div>
              <div className={layout.ml_20}>
                <FilterButton
                  active
                  id="demo-customized-button"
                  aria-controls="demo-customized-menu"
                  aria-haspopup="true"
                  aria-expanded={click ? "true" : undefined}
                  disableElevation
                  onClick={handleFilterClick}
                  endIcon={<KeyboardArrowDownIcon />}
                >
                  <Image
                    alt=""
                    src="/icons/filter-white.svg"
                    width="16"
                    height="16"
                  />
                  <span className="lable_text">Filter</span>
                </FilterButton>
                <FilterBox
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  anchorEl={anchorEl}
                  open={click}
                  onClose={handleFilterClose}
                >
                  <div className="filter_head">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <h3>Filters</h3>
                      <p
                        style={{
                          color: "#8E9595",
                          marginLeft: "10px",
                          fontSize: "12px",
                        }}
                      >
                        Showing all of {userLength && userLength} users
                      </p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <p
                        style={{
                          color: "#8E9595",
                          cursor: "pointer",
                          marginRight: "10px",
                          marginLeft: "10px",
                        }}
                        onClick={() => {
                          handleFilterClose();
                          setAppliedFilter({
                            ["admin"]: false,
                            ["user"]: false,
                          });
                          updatingUsers(search, "");
                        }}
                      >
                        Clear All
                      </p>
                      <BorderButton
                        onClick={() => {
                          let filterValue;
                          if (!filter.admin && filter.user) {
                            filterValue = "user";
                          } else if (filter.admin && !filter.user) {
                            filterValue = "admin";
                          } else {
                            filterValue = "";
                          }
                          handleFilterClose();
                          setAppliedFilter(filter);
                          updatingUsers(search, filterValue);
                        }}
                      >
                        Apply Filters
                      </BorderButton>
                    </div>
                  </div>
                  <p className={layout.mb_10}>Employee Type</p>
                  <div className="cutome_check">
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked={filter && filter.admin}
                          onChange={(e) => {
                            setFilter({
                              ...filter,
                              ["admin"]: e.target.checked,
                            });
                          }}
                        />
                      }
                      label="Admin"
                    />
                    <span
                      className={`check_count ${
                        filter && filter.admin && "active"
                      }`}
                    >
                      {adminlength}
                    </span>
                  </div>
                  <div className="cutome_check">
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked={filter && filter.user}
                          onChange={(e) => {
                            setFilter({
                              ...filter,
                              ["user"]: e.target.checked,
                            });
                          }}
                        />
                      }
                      label="User"
                    />
                    <span
                      className={`check_count ${
                        filter && filter.user && "active"
                      }`}
                    >
                      {userLength && userLength - adminlength}
                    </span>
                  </div>
                </FilterBox>
              </div>
            </div>
          </div>
        )}
        <div className={layout.flex_center}>
          {/* delete start */}
          {(userLength > 0 || message == "No Users Found.") && (
            <>
              <IconButton
                onClick={handleDeleteAllModal}
                className={`layout.mr_20 ${disableDelete && "disabled"}`}
                style={{ marginRight: "9px" }}
                disabled={disableDelete}
              >
                <span className={layout.flex_center}>
                  <Image
                    alt=""
                    src="/icons/delete-icon.svg"
                    width="16"
                    height="16"
                  />
                </span>
              </IconButton>

              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openDelete}
                onClose={handleDeleteAllModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open}>
                  <ModalBox style={{ opacity: 1, visibility: "visible" }}>
                    <span
                      className={layout.model_close}
                      onClick={handleDeleteAllModal}
                    >
                      <Image
                        src="/icons/cancel.svg"
                        height="12"
                        width="12"
                        alt=""
                      />
                    </span>
                    <div className={layout.mb_20}>
                      <h3>Are you sure you want to delete this user?</h3>
                      <p>
                        The user will be deleted immediately and this action
                        cannot be undone.
                      </p>
                    </div>
                    <div className={layout.flex_between_center}>
                      <OutlineButton
                        onClick={handleDeleteAllModal}
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
                        Cancel
                      </OutlineButton>
                      <IconButton
                        onClick={() => {
                          handledeleteuser();
                          handleDeleteAllModal();
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
                            Delete these Users
                          </span>
                        </span>
                      </IconButton>
                    </div>
                  </ModalBox>
                </Fade>
              </Modal>
              {/* delete close */}
              <OutlineButton
                onClick={() => handleInvite()}
                fixwidth="auto"
                variant="contained"
                marginbottom="0px"
              >
                <span className={globalLayout.btn_icon}>
                  <Image
                    alt=""
                    src="/icons/plus-icon-green.svg"
                    width="16"
                    height="16"
                  />
                </span>
                Add New Users
              </OutlineButton>
            </>
          )}
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleInvite}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <ModalBox minWidth="450px">
                <span
                  className={layout.model_close}
                  onClick={() => handleInvite()}
                >
                  <Image
                    src="/icons/cancel.svg"
                    height="12"
                    width="12"
                    alt=""
                  />
                </span>
                <div className={layout.mb_20}>
                  <h3>Add New Users</h3>
                </div>
                <Formik
                  enableReinitialize
                  initialValues={initialValues}
                  validationSchema={ValidationSchema}
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
                      <div className={layout.mb_20}>
                        <span className={layout.grey_text}>Add with Email</span>
                        <div className={styles.formGroup}>
                          {/* <AddNewUser /> */}
                          <div className={layout.mb_10}>
                            {chipsArray.map((chip, index) => {
                              return (
                                <ChipOption
                                  key={index}
                                  variant="outlined"
                                  deleteIcon={
                                    <Image
                                      src="/icons/cancel.svg"
                                      height="12"
                                      width="12"
                                      alt=""
                                    />
                                  }
                                  onDelete={(e) => handleDelete(index)}
                                  label={`${chip}`}
                                />
                              );
                            })}
                          </div>

                          <InputText
                            id="Emails"
                            name="Emails"
                            value={values.Emails}
                            onChange={handleChange}
                            placeholder="Type or paste email and press Enter"
                            onKeyUp={(e) => {
                              const emailExit = chipsArray.find(
                                (email) => email == e.target.value
                              );

                              if (
                                e.key == "Enter" &&
                                e.target.value &&
                                !emailExit &&
                                !errors.Emails
                              ) {
                                setchipsArray((chip) => [
                                  ...chip,
                                  e.target.value,
                                ]);
                                setFieldValue("Emails", "");
                              }
                            }}
                            error={touched.Emails && Boolean(errors.Emails)}
                          />
                          <ErrorMsg name="Emails"></ErrorMsg>
                        </div>
                      </div>
                      <div className={layout.mb_10}>
                        <span className={layout.grey_text}>User Role</span>
                        <div className={styles.formGroup}>
                          <RadioGroup
                            row
                            aria-label="gender"
                            name="row-radio-buttons-group"
                            value={radioValue}
                            onChange={(e) => handleRadioChange(e)}
                          >
                            <FormControlLabel
                              value="Admin"
                              control={<Radio />}
                              label="Admin"
                            />
                            <FormControlLabel
                              value="User"
                              control={<Radio />}
                              label="User"
                            />
                          </RadioGroup>
                        </div>
                      </div>
                      <MainButton
                        variant="contained"
                        // type="submit"
                        onClick={() => handleSendInvite()}
                        disabled={chipsArray.length == 0}
                      >
                        <span className={layout.flex_center}>
                          {" "}
                          <Image
                            src="/icons/send-icon.svg"
                            height="14"
                            width="14"
                            alt=""
                          />{" "}
                          <span className={layout.ml_10}>Send an invite</span>
                        </span>
                      </MainButton>
                    </Form>
                  )}
                </Formik>
              </ModalBox>
            </Fade>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default SearchBarNav;
