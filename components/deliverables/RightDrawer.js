import React, { useEffect, useState } from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Drawer } from "../tableControls.style";
import { Formik, Form } from "formik";
import { validationSchema } from "../../validators/deliverables.validators";
import layout from "../../styles/layout.module.scss";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import styles from "../../styles/login.module.scss";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
//
import Image from "next/image";
import {
  MainButton,
  OutlineButton,
  InputText,
  InputTextArea,
  ErrorMsg,
} from "../../components/formControls.style";
import { SwitchWrap, NewSwitch } from "../../components/tableControls.style";
import currency from "currency.js";

const RightDrawer = (props) => {
  const { departmentRole, createDeliverables, toggleDrawer, Drawerstate } =
    props;
  const [role, setRole] = useState("");
  const [employeeLevel, setemployeeLevel] = useState("");
  const [markUp, setMarkUp] = useState("");
  const [hourlySalary, sethourlySalary] = useState("");

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
              <Image
                src="/icons/plus-icon-green.svg"
                width="16"
                height="16"
                alt=""
              />
            </span>
            <span className={layout.ml_10}>Add a New Deliverable</span>
          </OutlineButton>
          <SwipeableDrawer
            anchor={anchor}
            open={Drawerstate[anchor]}
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
              <h2>Add a New Deliverable</h2>
              <div className="DrawerWrap">
                <Formik
                  enableReinitialize
                  initialValues={initialFormValues}
                  validationSchema={validationSchema}
                  onSubmit={(values) => {
                    createDeliverables(values);
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
                        <div className={`${layout.flex_top} ${layout.mb_20}`}>
                          <div
                            className={layout.mr_10}
                            style={{ width: "50%" }}
                          >
                            <InputLabel htmlFor="deliverableName">
                              Deliverable / Service Offering Name
                            </InputLabel>
                            <InputText
                              size="small"
                              id="deliverableName"
                              type="text"
                              placeholder="Enter the name of service"
                              name="deliverableName"
                              value={values.deliverableName}
                              onChange={handleChange}
                              error={
                                touched.deliverableName &&
                                Boolean(errors.deliverableName)
                              }
                            />
                            <ErrorMsg name="deliverableName"></ErrorMsg>
                          </div>

                          <div
                            className={layout.ml_10}
                            style={{ width: "50%" }}
                          >
                            <InputLabel htmlFor="departmentId">
                              Department
                            </InputLabel>
                            <Select
                              size="small"
                              style={{ width: "100%" }}
                              id="departmentId"
                              name="departmentId"
                              value={
                                values.departmentId
                                  ? values.departmentId
                                  : "none"
                              }
                              onChange={(e) => {
                                const departmentValue = e.target.value;
                                const department = departmentRole.filter(
                                  (item) => item.departmentId == e.target.value
                                );

                                departmentValue &&
                                  setMarkUp(
                                    Number(department[0].markupMultiplier)
                                  );
                                departmentValue &&
                                  setFieldValue(
                                    "Markup",
                                    department[0].markupMultiplier
                                  );
                                departmentValue && sethourlySalary("");
                                departmentValue && setFieldValue("price", "");
                                departmentValue &&
                                  setFieldValue("roleId", "none");
                                departmentValue &&
                                  setFieldValue("employeeroleLevel", "none");
                                departmentValue && setRole(department[0].roles);
                                departmentValue &&
                                  setFieldValue("departmentId", e.target.value);
                              }}
                              error={
                                touched.departmentId &&
                                Boolean(errors.departmentId)
                              }
                            >
                              <MenuItem disabled value="none">
                                <span style={{ color: "rgba(0, 0, 0, 0.38)" }}>
                                  Select Department
                                </span>
                              </MenuItem>
                              {departmentRole && departmentRole.length > 0 ? (
                                departmentRole.map((item, index) => {
                                  return (
                                    <MenuItem
                                      value={item.departmentId}
                                      key={index}
                                    >
                                      {item.department}
                                    </MenuItem>
                                  );
                                })
                              ) : (
                                <MenuItem value="">
                                  {" "}
                                  No department found
                                </MenuItem>
                              )}
                            </Select>
                            <ErrorMsg name="departmentId"></ErrorMsg>
                          </div>
                        </div>
                        <div className={`${layout.flex_top} ${layout.mb_30}`}>
                          <div
                            className={layout.mr_10}
                            style={{ width: "50%" }}
                          >
                            <InputLabel htmlFor="roleId">Role</InputLabel>
                            <Select
                              size="small"
                              style={{ width: "100%" }}
                              id="roleId"
                              name="roleId"
                              value={values.roleId ? values.roleId : "none"}
                              onChange={(e) => {
                                const selectedrole = role.filter(
                                  (item) => item.roleId == e.target.value
                                );
                                sethourlySalary("");

                                setemployeeLevel(
                                  selectedrole[0].employeeLevel.split(",")
                                );
                                setFieldValue("employeeroleLevel", "none");
                                setFieldValue("roleId", e.target.value);
                              }}
                              error={touched.roleId && Boolean(errors.roleId)}
                              disabled={!values.departmentId}
                            >
                              <MenuItem disabled value="none">
                                <span style={{ color: "rgba(0, 0, 0, 0.38)" }}>
                                  Select Role
                                </span>
                              </MenuItem>
                              {role && role.length > 0 ? (
                                role.map((item, index) => {
                                  return (
                                    <MenuItem value={item.roleId} key={index}>
                                      {item.role}
                                    </MenuItem>
                                  );
                                })
                              ) : (
                                <MenuItem value=""> No role found</MenuItem>
                              )}
                            </Select>
                            <ErrorMsg name="roleId"></ErrorMsg>
                          </div>
                          <div
                            className={layout.ml_10}
                            style={{ width: "50%" }}
                          >
                            <InputLabel htmlFor="employeeroleLevel">
                              Employee Role Level
                            </InputLabel>
                            <Select
                              size="small"
                              style={{ width: "100%" }}
                              id="employeeroleLevel"
                              name="employeeroleLevel"
                              value={
                                values.employeeroleLevel
                                  ? values.employeeroleLevel
                                  : "none"
                              }
                              onChange={(e) => {
                                const selectedrole = role.filter(
                                  (item) => item.roleId == values.roleId
                                );
                                const employeeIndex = employeeLevel.indexOf(
                                  e.target.value
                                );
                                const newhourlySalary =
                                  selectedrole[0].hourlySalary.split(",")[
                                    employeeIndex
                                  ];
                                const price =
                                  values.deliveryHours && !errors.deliveryHours
                                    ? values.costMeasured == "Hourly Based"
                                      ? currency(values.deliveryHours)
                                          .multiply(newhourlySalary)
                                          .multiply(markUp).value
                                      : currency(values.deliveryHours).multiply(
                                          markUp
                                        ).value
                                    : "";
                                setFieldValue("price", price);
                                sethourlySalary(newhourlySalary);
                                setFieldValue(
                                  "employeeroleLevel",
                                  e.target.value
                                );
                              }}
                              error={
                                touched.employeeroleLevel &&
                                Boolean(errors.employeeroleLevel)
                              }
                              disabled={!values.roleId}
                            >
                              <MenuItem disabled value="none">
                                <span style={{ color: "rgba(0, 0, 0, 0.38)" }}>
                                  Select Employee Role Level
                                </span>
                              </MenuItem>
                              {employeeLevel && employeeLevel.length > 0 ? (
                                employeeLevel.map((item, index) => {
                                  return (
                                    <MenuItem value={item} key={index}>
                                      {item}
                                    </MenuItem>
                                  );
                                })
                              ) : (
                                <MenuItem value=""> No role found</MenuItem>
                              )}
                            </Select>
                            <ErrorMsg name="employeeroleLevel"></ErrorMsg>
                          </div>
                        </div>

                        <div className={`${layout.mb_30}`}>
                          <InputLabel htmlFor="description">
                            Description of the Deliverable / Service Offering
                          </InputLabel>
                          <InputTextArea
                            minRows={4}
                            id="description"
                            name="description"
                            value={values.description}
                            onChange={handleChange}
                            placeholder="Enter Description of the Deliverable"
                          />
                          <ErrorMsg name="description"></ErrorMsg>
                        </div>
                      </div>
                      {/* second form */}
                      <div
                        style={{
                          border: "1px solid #D2D4D4",
                          borderRadius: "8px",
                          padding: "20px",
                          marginTop: "30px",
                        }}
                      >
                        <h3>Price</h3>
                        <div className={`${layout.mb_20}`}>
                          <div className={layout.mb_10}>
                            <span className={layout.grey_text}>
                              How is it being fulfilled?
                            </span>
                            <div className={styles.formGroup}>
                              <RadioGroup
                                row
                                aria-label="costfulfilled"
                                name="row-radio-buttons-group"
                                value={values.costfulfilled}
                                onChange={(e) => {
                                  setFieldValue("vendorName", "");
                                  setFieldValue(
                                    "costfulfilled",
                                    e.target.value
                                  );
                                }}
                              >
                                <div style={{ width: "50%" }}>
                                  <FormControlLabel
                                    value="Internal"
                                    control={<Radio />}
                                    label="Internal"
                                  />
                                </div>
                                <div style={{ width: "50%" }}>
                                  <FormControlLabel
                                    value="Outsourced"
                                    control={<Radio />}
                                    label="Outsourced"
                                  />
                                </div>
                              </RadioGroup>
                            </div>
                          </div>
                          <div className={layout.mb_10}>
                            <span className={layout.grey_text}>
                              How is it being measured?
                            </span>
                            <div className={styles.formGroup}>
                              <RadioGroup
                                row
                                aria-label="measured"
                                name="row-radio-buttons-group"
                                value={values.costMeasured}
                                onChange={(e) => {
                                  setFieldValue("internalCost", "");
                                  setFieldValue("deliveryHours", "");
                                  setFieldValue("price", "");
                                  setFieldValue("vendorName", "");
                                  setFieldValue("costMeasured", e.target.value);
                                }}
                              >
                                <div style={{ width: "50%" }}>
                                  <FormControlLabel
                                    value="Hourly Based"
                                    control={<Radio />}
                                    label="Hourly Based"
                                  />
                                </div>
                                <div style={{ width: "50%" }}>
                                  <FormControlLabel
                                    value="Fixed Cost"
                                    control={<Radio />}
                                    label="Fixed Cost"
                                  />
                                </div>
                              </RadioGroup>
                            </div>
                          </div>
                        </div>

                        <div className={`${layout.flex_top} ${layout.mb_30}`}>
                          <div
                            className={layout.mr_10}
                            style={{ width: "50%" }}
                          >
                            <InputLabel htmlFor="deliveryHours">
                              {values.costMeasured == "Hourly Based"
                                ? "How Many Hours for Delivery?"
                                : `${
                                    values.costfulfilled == "Internal"
                                      ? "Internal"
                                      : "External"
                                  }
                                Cost`}
                            </InputLabel>
                            <InputText
                              size="small"
                              id="deliveryHours"
                              type="text"
                              name="deliveryHours"
                              value={values.deliveryHours}
                              onBlur={() => {
                                values.costMeasured != "Hourly Based" &&
                                  setFieldValue(
                                    "deliveryHours",
                                    values.deliveryHours
                                      .toString()
                                      .replace(
                                        /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                                        ","
                                      )
                                  );
                              }}
                              placeholder={
                                values.costMeasured != "Hourly Based"
                                  ? "500"
                                  : "Enter Delivery Hours"
                              }
                              InputProps={{
                                startAdornment: values.costMeasured !=
                                  "Hourly Based" && (
                                  <InputAdornment position="start">
                                    $
                                  </InputAdornment>
                                ),
                              }}
                              onChange={(e) => {
                                const newdeliveryHours = currency(
                                  e.target.value
                                ).value;
                                console.log(markUp);
                                const price = newdeliveryHours
                                  ? values.costMeasured == "Hourly Based"
                                    ? currency(newdeliveryHours)
                                        .multiply(hourlySalary)
                                        .multiply(markUp)
                                        .value.toString()
                                    : currency(newdeliveryHours)
                                        .multiply(markUp)
                                        .value.toString()
                                  : "";
                                setFieldValue("price", price);
                                setFieldValue("deliveryHours", e.target.value);
                              }}
                              error={
                                touched.deliveryHours &&
                                Boolean(errors.deliveryHours)
                              }
                            />
                            <ErrorMsg name="deliveryHours"></ErrorMsg>
                          </div>
                          <div
                            className={layout.ml_10}
                            style={{ width: "50%" }}
                          >
                            <InputLabel htmlFor="turnaroundTime">
                              Turn Around Time in Business Days
                            </InputLabel>
                            <InputText
                              size="small"
                              id="turnaroundTime"
                              type="text"
                              name="turnaroundTime"
                              value={values.turnaroundTime}
                              placeholder="Enter Turn Around Time"
                              onChange={handleChange}
                              error={
                                touched.turnaroundTime &&
                                Boolean(errors.turnaroundTime)
                              }
                            />
                            <ErrorMsg name="turnaroundTime"></ErrorMsg>
                          </div>
                        </div>
                        {values.costfulfilled == "Outsourced" && (
                          <div className={`${layout.mb_30}`}>
                            <InputLabel htmlFor="vendorName">
                              Vendor Name (optional)
                            </InputLabel>
                            <InputText
                              size="small"
                              id="vendorName"
                              type="textarea"
                              name="vendorName"
                              placeholder="Enter Vendor Name"
                              value={values.vendorName}
                              onChange={handleChange}
                              error={
                                touched.vendorName && Boolean(errors.vendorName)
                              }
                            />
                            <ErrorMsg name="vendorName"></ErrorMsg>
                          </div>
                        )}
                        <div className={`${layout.mb_30}`}>
                          <SwitchWrap style={{margin:0}}>
                            <NewSwitch
                              checked={values.customDropdwon}
                              onChange={(e) =>
                                setFieldValue(
                                  "customDropdwon",
                                  e.target.checked
                                )
                              }
                            />
                            <p style={{marginLeft:'10px'}}>Display in the Custom Dropdown</p>
                          </SwitchWrap>
                        </div>
                        <div className={`${layout.flex_top} ${layout.mb_30}`}>
                          <div
                            className={layout.mr_10}
                            style={{ width: "50%" }}
                          >
                            <InputLabel htmlFor="Markup">Markup</InputLabel>
                            <InputText
                              size="small"
                              id="Markup"
                              type="text"
                              name="Markup"
                              value={values.Markup}
                              onChange={handleChange}
                              error={touched.Markup && Boolean(errors.Markup)}
                              disabled
                            />
                            <ErrorMsg name="Markup"></ErrorMsg>
                          </div>
                          <div
                            className={layout.ml_10}
                            style={{ width: "50%" }}
                          >
                            <InputLabel htmlFor="price">Price</InputLabel>
                            <InputText
                              size="small"
                              id="price"
                              type="text"
                              name="price"
                              value={values.price
                                .toString()
                                .replace(
                                  /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                                  ","
                                )}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    {values.price && "$"}
                                  </InputAdornment>
                                ),
                              }}
                              onChange={handleChange}
                              error={touched.price && Boolean(errors.price)}
                              disabled
                            />
                            <ErrorMsg name="price"></ErrorMsg>
                          </div>
                        </div>
                      </div>
                      <div className={layout.mt_20}>
                        <div
                          className={layout.flex_top}
                          style={{ justifyContent: "space-between" }}
                        >
                          <OutlineButton
                            variant="text"
                            fixwidth="auto"
                            marginbottom="0"
                            className={layout.mr_10}
                            style={{ border: "0", color: "#0A2828" }}
                            onClick={() => toggleDrawer(anchor, false)}
                          >
                            Cancel
                          </OutlineButton>
                          <MainButton
                            fixwidth="auto"
                            marginbottom="0"
                            variant="contained"
                            style={{ width: "150px" }}
                            type="submit"
                          >
                            Add
                          </MainButton>
                        </div>
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
