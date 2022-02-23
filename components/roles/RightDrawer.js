import * as React from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Drawer } from "../tableControls.style";
import { Formik, Form } from "formik";
import { validationSchema } from "../../validators/roles.validators";
import layout from "../../styles/layout.module.scss";
import InputLabel from "@mui/material/InputLabel";
import styles from "../../styles/login.module.scss";
import InputAdornment from "@mui/material/InputAdornment";
// Calendar
import axios from "axios";

//
import Image from "next/image";
import {
  MainButton,
  OutlineButton,
  InputText,
  RedOutlineButton,
  ErrorMsg,
} from "../../components/formControls.style";
import { useRouter } from "next/router";
import { Directions } from "@mui/icons-material";
import tokenExpired from "../layout/withAuth/tokenExpired";
import { MenuItem, Select } from "@mui/material";
import { toast } from "react-toastify";
import currency from "currency.js";

const initialFormValues = {
  departmentId: "",
  department: "",
  role: "",
  employeeLevel: "",
  yearlySalary: "",
  hourlySalary: "",
};

const RightDrawer = (props) => {
  const router = useRouter();
  const [departments, setDepartments] = React.useState([]);
  const [value, setValue] = React.useState(new Date());
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const minDate = new Date("2000-01-01T00:00:00.000");
  const maxDate = new Date("2025-01-01T00:00:00.000");

  const toggleDrawer = (anchor, open) => {
    setState({ ...state, [anchor]: open });
  };
  const getRols = async () => {
    const authDetails = JSON.parse(localStorage.getItem("authDetails"));
    const { jwt, userId, orgId } = authDetails;
    try {
      const response = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/roles?orgId=${orgId}&userId=${userId}`,
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      });
      props.setRoles(response.data.data);
    } catch (err) {
      tokenExpired(err, router);
    }
  };
  const handleSaveRoles = async (values) => {
    const authDetails = JSON.parse(localStorage.getItem("authDetails"));
    const { jwt, userId, orgId } = authDetails;

    try {
      const response = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/role`,
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
        data: {
          userId: userId,
          orgId: orgId,
          departmentId: JSON.parse(localStorage.getItem("deptId")),
          department: values.department,
          role: values.role,
          employeeLevel: values.employeeLevel,
          yearlySalary: currency(values.yearlySalary).value,
          hourlySalary: values.hourlySalary,
        },
      });
      if (response && response.data) {
        // setRoles([...roles, values]);
        getRols();
        toast.success(response.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        toggleDrawer("right", false);
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
      tokenExpired(err, router);
    }
  };
  const employeeLevels = ["Junior Level", "Middle Level", "Senior Level"];
  const getDepartments = async () => {
    const authDetails = JSON.parse(localStorage.getItem("authDetails"));
    const { jwt, userId, orgId } = authDetails;
    try {
      const response = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/departments?userId=${userId}&orgId=${orgId}`,
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      });
      setDepartments(response.data.data);
    } catch (err) {
      tokenExpired(err, router);
    }
  };
  React.useEffect(() => {
    getDepartments();
  }, []);

  return (
    <>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <OutlineButton
            aligncenter="true"
            marginbottom="0px"
            fixwidth="auto"
            onClick={() => {
              getDepartments();
              toggleDrawer(anchor, true);
            }}
          >
            <span className={layout.flex_center}>
              <Image
                alt=""
                src="/icons/plus-icon-green.svg"
                width="16"
                height="16"
              />
            </span>
            <span className={layout.ml_10}>Add a New Role</span>
          </OutlineButton>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={() => toggleDrawer(anchor, false)}
            onOpen={() => toggleDrawer(anchor, true)}
          >
            <Drawer style={{ width: "560px" }}>
              <span
                className={layout.model_close}
                onClick={() => toggleDrawer(anchor, false)}
              >
                <Image src="/icons/cancel.svg" height="12" width="12" alt="" />
              </span>
              <h2>Add a New Role</h2>
              <div className="DrawerWrap">
                <Formik
                  enableReinitialize
                  initialValues={initialFormValues}
                  validationSchema={validationSchema}
                  onSubmit={(values) => {
                    handleSaveRoles(values);
                    props.setSelected([]);
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
                    <Form
                      style={{
                        border: "1px solid #D2D4D4",
                        borderRadius: "8px",
                        padding: "20px",
                      }}
                    >
                      <h3>Role Information</h3>
                      <div className={`${layout.flex_top} ${layout.mb_20}`}>
                        <div className={layout.mr_10} style={{ width: "100%" }}>
                          <InputLabel htmlFor="Department">
                            Department<span className={styles.red}>*</span>
                          </InputLabel>
                          <Select
                            size="small"
                            fullWidth
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={
                              values.department ? values.department : "none"
                            }
                            onChange={(e) => {
                              localStorage.setItem("deptId", e.target.value);
                              handleChange(e);
                            }}
                            name="department"
                            onBlur={handleBlur}
                            // defaultC
                          >
                            <MenuItem disabled value="none">
                              <span style={{ color: "rgba(0, 0, 0, 0.38)" }}>
                                Select Department
                              </span>
                            </MenuItem>
                            {departments.length > 0 ? (
                              departments.map((department, index) => {
                                return (
                                  <MenuItem
                                    value={department.departmentId}
                                    key={index}
                                  >
                                    {department.department}
                                  </MenuItem>
                                );
                              })
                            ) : (
                              <MenuItem value=""> No department found</MenuItem>
                            )}
                          </Select>

                          <ErrorMsg name="department"></ErrorMsg>
                        </div>

                        <div className={layout.ml_10} style={{ width: "100%" }}>
                          <InputLabel htmlFor="MarkupMultiplier">
                            Role<span className={styles.red}>*</span>
                          </InputLabel>
                          <InputText
                            size="small"
                            id="role"
                            type="text"
                            name="role"
                            placeholder="Enter Role"
                            value={values.role}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.role && Boolean(errors.role)}
                          />
                          <ErrorMsg name="role"></ErrorMsg>
                        </div>
                      </div>
                      <div className={`${layout.flex_top} ${layout.mb_30}`}>
                        <div className={layout.mr_10} style={{ width: "100%" }}>
                          <InputLabel htmlFor="Margin">
                            Employee Role Level
                          </InputLabel>
                          <Select
                            fullWidth
                            size="small"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={
                              values.employeeLevel
                                ? values.employeeLevel
                                : "none"
                            }
                            onChange={handleChange}
                            name="employeeLevel"
                            onBlur={handleBlur}
                          >
                            <MenuItem disabled value="none">
                              <span style={{ color: "rgba(0, 0, 0, 0.38)" }}>
                                Select Role Level
                              </span>
                            </MenuItem>
                            {employeeLevels.map((empLevel, index) => {
                              return (
                                <MenuItem value={empLevel} key={index}>
                                  {empLevel}
                                </MenuItem>
                              );
                            })}
                          </Select>

                          <ErrorMsg name="employeeLevel"></ErrorMsg>
                        </div>
                        <div className={layout.ml_10} style={{ width: "100%" }}>
                          <InputLabel htmlFor="Department">
                            Yearly Salary<span className={styles.red}>*</span>
                          </InputLabel>
                          <InputText
                            size="small"
                            id="yearlySalary"
                            type="text"
                            name="yearlySalary"
                            value={values.yearlySalary}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  $
                                </InputAdornment>
                              ),
                            }}
                            placeholder="500"
                            onChange={(e) => {
                              const salary = currency(e.target.value).divide(
                                2080
                              ).value;
                              setFieldValue("yearlySalary", e.target.value);
                              !isNaN(salary) &&
                                setFieldValue("hourlySalary", salary);
                            }}
                            onBlur={(e) => {
                              handleBlur(e);
                              setFieldValue(
                                "yearlySalary",
                                values.yearlySalary
                                  .toString()
                                  .replace(
                                    /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                                    ","
                                  )
                              );
                            }}
                            error={
                              touched.yearlySalary &&
                              Boolean(errors.yearlySalary)
                            }
                          />
                          <ErrorMsg name="yearlySalary"></ErrorMsg>
                        </div>
                      </div>
                      <div className={`${layout.flex_top} ${layout.mb_30}`}>
                        <div className={layout.mr_10} style={{ width: "100%" }}>
                          <InputLabel htmlFor="Margin">
                            Hourly Salary<span className={styles.red}>*</span>
                          </InputLabel>
                          <InputText
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  {values.hourlySalary === "" ? "" : "$"}
                                </InputAdornment>
                              ),
                            }}
                            size="small"
                            id="hourlySalary"
                            type="text"
                            name="hourlySalary"
                            value={values.hourlySalary
                              .toString()
                              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                            onChange={handleChange}
                            disabled={true}
                            // onBlur={handleBlur}
                          />
                          {/* <ErrorMsg name="hourlySalary"></ErrorMsg> */}
                        </div>
                        <div
                          className={layout.ml_10}
                          style={{ width: "100%" }}
                        ></div>
                      </div>
                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          right: "30px",
                        }}
                      >
                        <div className={layout.flex_center}>
                          <OutlineButton
                            onClick={() => toggleDrawer(anchor, false)}
                            variant="text"
                            fixwidth="auto"
                            className={layout.mr_10}
                            style={{ border: "0", color: "#0A2828" }}
                          >
                            Cancel
                          </OutlineButton>
                          <MainButton
                            type="submit"
                            fixwidth="auto"
                            variant="contained"
                            style={{ width: "150px" }}
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
