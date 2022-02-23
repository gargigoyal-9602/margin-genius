import React, { useEffect, useState } from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import { Drawer } from "../tableControls.style";
import { Formik, Form } from "formik";
import { validationSchema } from "../../validators/deliverables.validators";
import layout from "../../styles/layout.module.scss";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import styles from "../../styles/login.module.scss";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

// Calendar
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";

//
import Image from "next/image";
import {
  MainButton,
  OutlineButton,
  InputText,
  RedOutlineButton,
  InputTextArea,
  ErrorMsg,
} from "../formControls.style";
import { AntSwitch } from "../tableControls.style";
import { Directions } from "@mui/icons-material";

const RightDrawer = (props) => {
  const { getdepartmentRole, departmentRole } = props;
  const [role, setRole] = useState("");
  const [markUp, setMarkUp] = useState("");
  const [hourlySalary, sethourlySalary] = useState("");
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const initialFormValues = {
    orgId: "",
    userId: "",
    roleId: "",
    departmentId: "",
    deliverableName: "",
    employeeroleLevel: "",
    description: "",
    deliveryHours: "",
    turnaroundTime: "",
    customDropdwon: false,
    vendorName: "",
    Markup: "",
    price: "",
    costfulfilled: "Internal",
    costMeasured: "Hourly Based",
  };
  const toggleDrawer = (anchor, open) => {
    setState({ ...state, [anchor]: open });
  };
  return (
    <>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <OutlineButton
            aligncenter="true"
            fixwidth="auto"
            onClick={() => toggleDrawer(anchor, true)}
            marginbottom="0"
          >
            <span className={layout.flex_top}>
              <Image src="/icons/plus-icon-green.svg" width="16" height="16" alt=""/>
            </span>
            <span className={layout.ml_10}>Add New Package</span>
          </OutlineButton>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={() => toggleDrawer(anchor, false)}
            onOpen={() => toggleDrawer(anchor, true)}
          >
            <Drawer style={{ width: "630px" }}>
              <span
                className={layout.model_close}
                onClick={() => toggleDrawer(anchor, false)}
              >
                <Image src="/icons/cancel.svg" height="12" width="12" alt="" />
              </span>
              <h2>Add a New Package</h2>
              <div className="DrawerWrap">
                <Formik
                  enableReinitialize
                  initialValues={initialFormValues}
                  validationSchema={validationSchema}
                  onSubmit={(values) => {
                    console.log(values, "values");

                    // handleSignUpUserDetails(details);
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
                      <div
                        style={{
                          border: "1px solid #D2D4D4",
                          borderRadius: "8px",
                          padding: "20px",
                        }}
                      >
                        <h3>General Information</h3>
                      </div>
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
