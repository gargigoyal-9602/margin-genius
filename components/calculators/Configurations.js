import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { validationSchema } from "../../validators/configuration.validators";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import styles from "../../styles/login.module.scss";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import tokenExpired from "../layout/withAuth/tokenExpired";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { useRouter } from "next/router";
import Loader from "../Loader";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { DropDownBox } from "../tableControls.style";
import MuiBox from "./MuiBox";
import { DropdownButton } from "./DropdownButton";

import layout from "../../styles/layout.module.scss";
import Image from "next/image";
import {
  OutlineButton,
  InputText,
  MainButton,
  RedOutlineButton,
  InputTextArea,
  ErrorMsg,
  ErrorTextBox,
} from "../formControls.style";
import { toast } from "react-toastify";

export const Configurations = (props) => {
  console.log(props.values.department);
  const [dep, setDep] = React.useState(
    props.values.department
      ? props.values.department
      : "Department / Sales Team"
  );
  const [cat, setCat] = React.useState(
    props.values.category ? props.values.category : "Choose the category"
  );
  const [newCat, setNewCat] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [options, setOptions] = React.useState(props.values.categoryOptions);

  const [roles, setRoles] = React.useState([]);
  const [uniqueRole, setUniqueRole] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [newOpen, setNewOpen] = React.useState(false);
  // const [errorCal, setErrorCal] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  console.log(props.values.categoryOptions, "options");
  const handleDepartment = (val) => setDep(val);
  // const initialFormValues = {
  //   orgId: "",
  //   userId: "",
  //   roleId: "",
  //   departmentId: "",
  //   deliverableName: "",
  //   employeeroleLevel: "",
  //   description: "",
  //   deliveryHours: "",
  //   turnaroundTime: "",
  //   customDropdwon: false,
  //   vendorName: "",
  //   Markup: "",
  //   price: "",
  //   costfulfilled: "Internal",
  //   costMeasured: "Hourly Based",
  // };
  const router = useRouter();
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const ContractLength = [
    "1 Month",
    "2 Month",
    "3 Month",
    "6 Month",
    "12 Month",
  ];
  // const ContractLength = [
  //   { title: '1 Month' },
  //   { title: '2 Month' },
  //   { title: '3 Month' },
  //   { title: '6 Month' },
  //   { title: '12 Month' },
  // ]
  const NegotiationMargin = ["0 %", "5 %", "10 %", "15 %", "20 %"];
  // const NegotiationMargin = [
  //   { title: '0 %' },
  //   { title: '5 %' },
  //   { title: '10 %' },
  //   { title: '15 %' },
  //   { title: '20 %' },
  // ]
  const initialValues = {
    calculatorName: props.apiData.calculatorName,
    department: props.apiData.department,
    category: "",
    employeeLevel: "",
    customColor: props.apiData.calculatorColor,
    calculatorColor: props.apiData.calculatorColor,
    contractConfiguration: props.apiData.setupfeeConfig,
    contractLength: props.apiData.contractlengthConfig,
    negotiationMargin: props.apiData.negotiationMargin,
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const getRoles = async (val) => {
    const authDetails = JSON.parse(localStorage.getItem("authDetails"));
    if (authDetails) {
      setLoading(true);
      const { jwt, userId, orgId } = authDetails;
      try {
        const response = await axios({
          method: "get",
          url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/roles?orgId=${orgId}&userId=${userId}&roleDepartment=${val}`,
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        });
        setRoles(response.data.data);
        const newArr = [];
        response.data.data.map((ele) => {
          if (!newArr.includes(ele.role)) {
            newArr.push(ele.role);
          }
        });
        setUniqueRole(newArr);
        console.log(newArr, "newArr");
        console.log(response.data.data, "roles");
      } catch (err) {
        tokenExpired(err, router);
      }
      setLoading(false);
    } else {
      router.push("/auth/login");
    }
  };
  const checkForDuplicateCalculator = () => {
    if (!props.row) {
      let calSet = new Set();
      props.calculators.map((element) => {
        calSet.add(element.calculatorName);
      });
      if (calSet.has(props.values.calculatorName)) {
        props.setErrorCal(true);
        // toast.error("duplicate calculator", {
        //   position: toast.POSITION.BOTTOM_RIGHT,
        // });
        return false;
      } else {
        props.setErrorCal(false);
        return true;
      }
    } else {
      let calSet = new Set();
      props.calculators.map((element) => {
        calSet.add(element.calculatorName);
      });
      if (
        calSet.has(props.values.calculatorName) &&
        props.row.calculatorName !== props.values.calculatorName
      ) {
        props.setErrorCal(true);
        return false;
      } else {
        props.setErrorCal(false);
        return true;
      }
    }
  };
  React.useEffect(() => {
    props.setErrorCal(false);
  }, []);
  return (
    <>
      <Loader loading={loading} />

      <div
        style={{
          border: "1px solid #D2D4D4",
          borderRadius: "8px",
          padding: "20px",
        }}
      >
        <h3>General Information</h3>
        <div className={`${layout.flex_top} ${layout.mb_20}`}>
          <div className={layout.mr_10} style={{ width: "50%" }}>
            <InputLabel htmlFor="CalculatorName">Calculator Name</InputLabel>
            <InputText
              size="small"
              id="CalculatorName"
              type="text"
              placeholder="Enter Calculator Name"
              name="calculatorName"
              onBlur={() => {
                checkForDuplicateCalculator();
              }}
              onChange={(e) => {
                props.setErrorCal(false);
                props.formik.setTouched(
                  Object.keys(props.touched).length == 0
                    ? { calculatorName: true }
                    : props.touched
                );
                // props.setApiData({...props.apiData,calculatorName:e.target.value})
                props.setFieldValue("calculatorName", e.target.value);
              }}
              value={props.values.calculatorName}
            />
            <ErrorMsg name="calculatorName"></ErrorMsg>
            {props.errorCal && (
              <ErrorTextBox className="error">
                <Image
                  src="/icons/error-ico.svg"
                  height="14"
                  width="14"
                  className={layout.error_img}
                  alt="error"
                />
                <span className={layout.ml_5}>
                  Calculator Name is already present
                </span>
              </ErrorTextBox>
            )}
          </div>
          <div className={layout.ml_10} style={{ width: "50%" }}>
            <InputLabel htmlFor="Department">
              Department / Sales Team
            </InputLabel>
            <Select
              onChange={(e) => {
                props.formik.setTouched(
                  Object.keys(props.touched).length == 0
                    ? { department: true }
                    : props.touched
                );
                const depart = e.target.value;
                const departId = () => {
                  return props.departments.forEach((element) => {
                    if (element.department == depart) {
                      localStorage.setItem("depId", element.departmentId);
                      return element.departmentId;
                    }
                  });
                };
                departId();
                props.setFieldValue(
                  "departmentId",
                  JSON.parse(localStorage.getItem("depId"))
                );
                props.setFieldValue("department", depart);
                handleDepartment(e.target.value);
              }}
              size="small"
              style={{ width: "100%" }}
              id="Department"
              name="departmentId"
              
                value={dep}
                
              >
              <MenuItem selected disabled value='none'
              value=" Department / Sales Team"
              >
                <span style={{ color: "rgba(0, 0, 0, 0.38)" }}>
                  Department / Sales Team
                </span>
              </MenuItem>
              {props.departments &&
                props.departments.map((ele, index) => {
                  return (
                    <MenuItem value={ele.department}>
                      {/* <span style={{ color: "rgba(0, 0, 0, 0.38)" }}> */}
                      {ele.department}
                      {/* </span> */}
                    </MenuItem>
                  );
                })}
            </Select>

            <ErrorMsg name="department"></ErrorMsg>
          </div>
        </div>
        <div className={`${layout.flex_top} ${layout.mb_20}`}>
          <div
            className={layout.mr_10}
            style={{ width: "48%", position: "relative" }}
          >
            <InputLabel htmlFor="Department">Category</InputLabel>
            <InputText
              size="small"
              onClick={() => {
                handleToggle();
                // handleToggle()
              }}
              value={props.values.category}
              placeholder="Choose Category"
              htmlFor="Department"
              InputProps={{
                endAdornment: (
                  <DropdownButton
                    open={open}
                    handleOpen={handleOpen}
                    handleClose={handleClose}
                    handleToggle={handleToggle}
                  />
                ),
              }}
            />

            {open && (
              <MuiBox
                touched={props.touched}
                formik={props.formik}
                values={props.values}
                setCat={setCat}
                setFieldValue={props.setFieldValue}
                handleToggle={handleToggle}
                newOpen={newOpen}
                setNewOpen={setNewOpen}
                setNewCat={setNewCat}
                newCat={newCat}
                calculators={props.calculators}
              />
            )}

            <ErrorMsg name="category"></ErrorMsg>
          </div>
        </div>
        <div className={`${layout.flex_top} ${layout.mb_20}`}>
          <div style={{ width: "100%" }}>
            <InputLabel htmlFor="Department">Calculator Color</InputLabel>
            <div
              name="calculatorColor"
              className={`${layout.flex_top} ${layout.mt_10}`}
            >
              <span className={layout.color_select}>
                <Image
                  onClick={() => {
                    props.formik.setTouched(
                      Object.keys(props.touched).length == 0
                        ? { calculatorColor: true }
                        : props.touched
                    );
                    // props.setApiData({...props.apiData,calculatorColor:""})
                    props.setFieldValue("calculatorColor", "");
                  }}
                  src="/icons/no-color.svg"
                  height="20"
                  width="20"
                  alt=""
                />
              </span>
              <span
                className={`${layout.color_select} ${layout.coral}`}
                onClick={() => {
                  props.formik.setTouched(
                    Object.keys(props.touched).length == 0
                      ? { calculatorColor: true }
                      : props.touched
                  );

                  // props.setApiData({...props.apiData,calculatorColor:"#FF8080"})
                  props.setFieldValue("calculatorColor", "#FF8080");
                }}
                value="#FF8080"
              ></span>

              <span
                className={`${layout.color_select} ${layout.chestnut}`}
                onClick={() => {
                  props.formik.setTouched(
                    Object.keys(props.touched).length == 0
                      ? { calculatorColor: true }
                      : props.touched
                  );

                  // props.setApiData({...props.apiData,calculatorColor:"#B75252"})
                  props.setFieldValue("calculatorColor", "#B75252");
                }}
                value="#B75252"
              ></span>
              <span
                className={`${layout.color_select} ${layout.golden}`}
                onClick={() => {
                  props.formik.setTouched(
                    Object.keys(props.touched).length == 0
                      ? { calculatorColor: true }
                      : props.touched
                  );

                  // props.setApiData({...props.apiData,calculatorColor:"#FFDF85"})
                  props.setFieldValue("calculatorColor", "#FFDF85");
                }}
                value="#FFDF85"
              ></span>
              <span
                className={`${layout.color_select} ${layout.light_green}`}
                onClick={() => {
                  props.formik.setTouched(
                    Object.keys(props.touched).length == 0
                      ? { calculatorColor: true }
                      : props.touched
                  );

                  // props.setApiData({...props.apiData,calculatorColor:"#BFFF88"})
                  props.setFieldValue("calculatorColor", "#BFFF88");
                }}
                value="#BFFF88"
              ></span>
              <span
                className={`${layout.color_select} ${layout.green}`}
                onClick={() => {
                  props.formik.setTouched(
                    Object.keys(props.touched).length == 0
                      ? { calculatorColor: true }
                      : props.touched
                  );

                  // props.setApiData({...props.apiData,calculatorColor:"#61EC8A"})
                  props.setFieldValue("calculatorColor", "#61EC8A");
                }}
                value="#61EC8A"
              ></span>

              <span
                className={`${layout.color_select} ${layout.sky_blue}`}
                onClick={() => {
                  props.formik.setTouched(
                    Object.keys(props.touched).length == 0
                      ? { calculatorColor: true }
                      : props.touched
                  );

                  // props.setApiData({...props.apiData,calculatorColor:"#7EFFFF"})
                  props.setFieldValue("calculatorColor", "#7EFFFF");
                }}
                value="#7EFFFF"
              ></span>
              <span
                className={`${layout.color_select} ${layout.light_blue}`}
                onClick={() => {
                  props.formik.setTouched(
                    Object.keys(props.touched).length == 0
                      ? { calculatorColor: true }
                      : props.touched
                  );

                  // props.setApiData({...props.apiData,calculatorColor:"#2BB4C7"})
                  props.setFieldValue("calculatorColor", "#2BB4C7");
                }}
                value="#2BB4C7"
              ></span>
              <span
                className={`${layout.color_select} ${layout.neon_blue}`}
                onClick={() => {
                  props.formik.setTouched(
                    Object.keys(props.touched).length == 0
                      ? { calculatorColor: true }
                      : props.touched
                  );

                  // props.setApiData({...props.apiData,calculatorColor:"#7F9FFC"})
                  props.setFieldValue("calculatorColor", "#7F9FFC");
                }}
                value="#7F9FFC"
              ></span>
              <span
                className={`${layout.color_select} ${layout.blue}`}
                onClick={() => {
                  props.formik.setTouched(
                    Object.keys(props.touched).length == 0
                      ? { calculatorColor: true }
                      : props.touched
                  );

                  // props.setApiData({...props.apiData,calculatorColor:"#2F52B5"})
                  props.setFieldValue("calculatorColor", "#2F52B5");
                }}
                value="#2F52B5"
              ></span>

              <span
                className={`${layout.color_select} ${layout.violate}`}
                onClick={() => {
                  props.formik.setTouched(
                    Object.keys(props.touched).length == 0
                      ? { calculatorColor: true }
                      : props.touched
                  );

                  // props.setApiData({...props.apiData,calculatorColor:"#BF80FC"})
                  props.setFieldValue("calculatorColor", "#BF80FC");
                }}
                value="#BF80FC"
              ></span>
              <span
                className={`${layout.color_select} ${layout.pink}`}
                onClick={() => {
                  props.formik.setTouched(
                    Object.keys(props.touched).length == 0
                      ? { calculatorColor: true }
                      : props.touched
                  );

                  // props.setApiData({...props.apiData,calculatorColor:"#FF80DC"})
                  props.setFieldValue("calculatorColor", "#FF80DC");
                }}
                value="#FF80DC"
              ></span>
            </div>
          </div>
        </div>
        <ErrorMsg name="calculatorColor"></ErrorMsg>
        <div className={`${layout.flex_top}`}>
          <div className={layout.mr_10} style={{ width: "50%" }}>
            <InputLabel htmlFor="customColor">Or enter custom</InputLabel>
            <InputText
              size="small"
              id="customColor"
              type="text"
              placeholder="#000000"
              value={props.values.calculatorColor}
              onChange={(e) => {
                // props.setApiData({...props.apiData,calculatorColor:e.target.value})
                props.setFieldValue("calculatorColor", e.target.value);
              }}
              name="calculatorColor"
            />
            {/* <ErrorMsg name="customColor"></ErrorMsg> */}
          </div>
        </div>
      </div>
      <div
        className={`${layout.mt_20}`}
        style={{
          border: "1px solid #D2D4D4",
          borderRadius: "8px",
          padding: "20px",
        }}
      >
        <h3>Contract Configurations</h3>
        <div className={layout.mb_10}>
          <span className={layout.grey_text}>Setup Fee Configuration</span>
          <div className={styles.formGroup}>
            <RadioGroup
              value={props.values.setupfeeConfig}
              onChange={(e) => {
                // props.setApiData({...props.apiData,setupfeeConfig:e.target.value})
                props.setFieldValue("setupfeeConfig", e.target.value);
              }}
              name="setupfeeConfig"
              row
            >
              <div style={{ width: "80px" }}>
                <FormControlLabel value="%" control={<Radio />} label="%" />
              </div>
              <div style={{ width: "80px" }}>
                <FormControlLabel value="$" control={<Radio />} label="$" />
              </div>
              <div style={{ width: "80px" }}>
                <FormControlLabel
                  value="null"
                  control={<Radio />}
                  label="Null"
                />
              </div>
            </RadioGroup>
            <ErrorMsg name="setupfeeConfig"></ErrorMsg>
          </div>
        </div>
        <div className={layout.mb_10}>
          <span className={layout.grey_text}>Discount Fee Configuration</span>
          <div className={styles.formGroup}>
            <RadioGroup
              value={props.values.discountfeeConfig}
              onChange={(e) => {
                // props.setApiData({...props.apiData,setupfeeConfig:e.target.value})
                props.setFieldValue("discountfeeConfig", e.target.value);
              }}
              name="discountfeeConfig"
              row
            >
              <div style={{ width: "80px" }}>
                <FormControlLabel value="$" control={<Radio />} label="$" />
              </div>
              <div style={{ width: "80px" }}>
                <FormControlLabel
                  value="null"
                  control={<Radio />}
                  label="Null"
                />
              </div>
            </RadioGroup>
            <ErrorMsg name="discountfeeConfig"></ErrorMsg>
          </div>
        </div>

        <div className={`${layout.flex_top}`}>
          <div className={layout.mr_10} style={{ width: "50%" }}>
            <InputLabel htmlFor="customColor">
              Contract Length Configuration
            </InputLabel>
            <Autocomplete
              value={props.values.contractlengthConfig}
              onChange={(event, value) => {
                // props.setApiData({...props.apiData,contractlengthConfig:value})
                props.setFieldValue("contractlengthConfig", value);
              }}
              multiple
              size="small"
              name="contractlengthConfig"
              options={ContractLength}
              disableCloseOnSelect
              getOptionLabel={(option) => option}
              renderOption={(props, option, { selected }) => (
                <>
                  <li {...props}>
                    <Checkbox checked={selected} />
                    {option}
                  </li>
                </>
              )}
              renderInput={(params) => (
                <TextField {...params} placeholder="Contract Length" />
              )}
            />

            <ErrorMsg name="contractlengthConfig"></ErrorMsg>
          </div>

          <div className={layout.mr_10} style={{ width: "50%" }}>
            <InputLabel htmlFor="customColor">Negotiation Margin</InputLabel>
            <Autocomplete
              value={props.values.negotiationMargin}
              onChange={(event, value) => {
                // props.setApiData({...props.apiData,negotiationMargin:value})
                props.setFieldValue("negotiationMargin", value);
              }}
              // value={values.negotiationMargin}
              name="negotiationMargin"
              multiple
              size="small"
              debug={true}
              options={NegotiationMargin}
              disableCloseOnSelect
              getOptionLabel={(option) => option}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    checked={selected}
                  />
                  {option}
                </li>
              )}
              renderInput={(params) => (
                <TextField {...params} placeholder="Negotiation Margin" />
              )}
            />
            <ErrorMsg name="negotiationMargin"></ErrorMsg>
          </div>
        </div>
      </div>
      <div className={layout.mt_20}>
        <div className={layout.flex_between}>
          <OutlineButton
            disabled
            variant="text"
            fixwidth="auto"
            marginbottom="0"
            className={layout.mr_10}
            style={{ border: "0", color: "gray" }}
            // style={{ border: "0", color: "#0A2828" }}
            // onClick={() => props.toggleDrawer(props.anchor, false)}
          >
            Previous
          </OutlineButton>
          <MainButton
            fixwidth="auto"
            marginbottom="0"
            variant="contained"
            onClick={() => {
              props.formik.setTouched({
                department: true,
                category: true,
                calculatorName: true,
                calculatorColor: true,
                contractlengthConfig: true,
                setupfeeConfig: true,
                negotiationMargin: true,
                discountfeeConfig: true,
              });
              if (
                Object.keys(props.formik.touched).length != 0 &&
                checkForDuplicateCalculator()
              ) {
                props.formik.errors.department ||
                props.formik.errors.category ||
                props.formik.errors.calculatorName ||
                props.formik.errors.calculatorColor ||
                props.formik.errors.setupfeeConfig ||
                props.formik.errors.discountfeeConfig ||
                props.formik.errors.contractlengthConfig ||
                props.formik.errors.negotiationMargin
                  ? props.setValue("Configurations")
                  : props.setValue("Access");
              }
            }}
          >
            Next
          </MainButton>
        </div>
      </div>
    </>
  );
};
