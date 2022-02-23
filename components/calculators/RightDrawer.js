import React from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Drawer } from "../tableControls.style";
import layout from "../../styles/layout.module.scss";
import { Formik, Form } from "formik";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { TabBox } from "./Calculators.style";
import { Configurations } from "./Configurations";
import { Access } from "./Access";
import { Items } from "./Items";
import { History } from "./History";
import tokenExpired from "../layout/withAuth/tokenExpired";
import axios from "axios";
import { useRouter } from "next/router";
import { validationSchema } from "../../validators/configuration.validators";
import Image from "next/image";
import { OutlineButton } from "../formControls.style";
import { NewReleases } from "@mui/icons-material";
import { toast } from "react-toastify";

const RightDrawer = (props) => {
 
  const [loaing, setLoading] = React.useState(false);
  const [errorCal,setErrorCal]=React.useState(false)
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => {
    setState({ ...state, [anchor]: open });
  };

  const [value, setValue] = React.useState("Configurations");

  const [apiData, setApiData] = React.useState({
    roleId: "",
    department: props.row ? props.row.departmentName : "",
    departmentId: props.row ? props.row.departmentId : "",
    calculatorName: props.row ? props.row.calculatorName : "",
    category: props.row ? props.row.category : "",
    categoryOptions: [],
    calculatorColor: props.row ? props.row.calculatorColor : "",
    dealScoped: props.row ? props.row.dealScoped : "",
    contractlengthConfig: props.row
      ? props.row.contractlengthConfig.split(",")
      : [],
    setupfeeConfig: props.row ? props.row.setupfeeConfig : "",
    discountfeeConfig: props.row ? props.row.discount : "",
    salesMan: props.row ? [1] : [],
    approvers: props.row ? [1] : [],
    negotiationMargin: props.row ? props.row.negotiationMargin.split(",") : [],
    calculatorAccess: props.row ? props.row.calculatorAccess : [],
    calculatorCustomDeliverable: props.row
      ? props.row.calculatorCustomDeliverable
      : [],
    packages: props.row ? [1] : [],
    deliverables: props.row ? [1] : [],
    calculatorPackages: props.row ? props.row.calculatorPackages : [],
    allowPack:props.row?true:false
  });
  const router = useRouter();
  const handleTabChange = (event, newValue) => {
    setValue("Configurations");
  };
  const addCalculator = async (values) => {
    const authDetails = JSON.parse(localStorage.getItem("authDetails"));
    if (authDetails) {
      const { jwt, userId, orgId } = authDetails;

      setLoading(true);

      try {
        const response = await axios({
          method: "post",
          url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/calculator`,
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
          data: {
            userId: userId,
            orgId: orgId,
            category: values.category,
            departmentId: values.departmentId,
            calculatorName: values.calculatorName,
            calculatorColor: values.calculatorColor,
            dealScoped: values.dealScoped,
            contractlengthConfig: values.contractlengthConfig.toString(),
            setupfeeConfig: values.setupfeeConfig,
            negotiationMargin: values.negotiationMargin.toString(),
            calculatorAccess: values.calculatorAccess,
            calculatorCustomDeliverable: values.calculatorCustomDeliverable,
            calculatorPackages: values.calculatorPackages,
            discount:values.discountfeeConfig
          },
        });
        if (response && response.data) {
          let calId=response.data.data.calculatorId
          console.log(calId)
          localStorage.removeItem('calId');
          localStorage.setItem('calId',calId)
          setValue("history");
          toast.success(response.data.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      } catch (err) {}
      setLoading(false);
    } else {
    }
  };
  const editCalculator = async (values) => {
    const authDetails = JSON.parse(localStorage.getItem("authDetails"));
    if (authDetails) {
      const { jwt, userId, orgId } = authDetails;

      setLoading(true);
      try {
        const response = await axios({
          method: "put",
          url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/calculator`,
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
          data: {
            calculatorId: props.row.calculatorId,
            userId: userId,
            orgId: orgId,
            category: values.category,
            departmentId: values.departmentId,
            calculatorName: values.calculatorName,
            calculatorColor: values.calculatorColor,
            dealScoped: values.dealScoped,
            contractlengthConfig: values.contractlengthConfig.toString(),
            setupfeeConfig: values.setupfeeConfig,
            negotiationMargin: values.negotiationMargin.toString(),
            calculatorAccess: values.calculatorAccess,
            calculatorCustomDeliverable: values.calculatorCustomDeliverable,
            calculatorPackages: values.calculatorPackages,
            discount:values.discountfeeConfig
          },
        });
        if (response && response.data) {
          toast.success(response.data.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    } else {
      // router.push("/auth/login")
    }
  };
  React.useEffect(() => {
    localStorage.setItem(
      "calId",
      props.row ? JSON.stringify(props.row.calculatorId) : ""
    );
   console.log('re-render')
  }, [props.togg]);
  
  return (
    <>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          {props.calculators && props.text === undefined && (
            <OutlineButton
              aligncenter="true"
              fixwidth="auto"
              onClick={() => {toggleDrawer(anchor, true),setValue("Configurations")}}
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
              <span className={layout.ml_10}>Add New Calculator</span>
            </OutlineButton>
          )}
          <SwipeableDrawer
            anchor={anchor}
            open={
              props.text === undefined
                ? state[anchor]
                : props.Drawerstate[anchor]
            }
            onClose={() => {
              if (props.text === undefined) {
                toggleDrawer(anchor, false);
              } else {
                props.toggleDraw(anchor, false);
              }
            }}
            onOpen={() => {
              if (props.text === undefined) {
                toggleDrawer(anchor, true);
              } else {
                props.toggleDraw(anchor, true);
              }
            }}
          >
            <Drawer style={{ width: "600px" }}>
              <span
                className={layout.model_close}
                onClick={() => {
                  if (props.text !== undefined) {
                    props.toggleDraw(anchor, false);
                  } else {
                    toggleDrawer(anchor, false);
                  }
                }}
              >
                <Image src="/icons/cancel.svg" height="12" width="12" alt="" />
              </span>
              <h2>Calculator Template</h2>
              <div className="DrawerWrap" style={{ padding: "0" }}>
                <Formik
                  enableReinitialize
                  initialValues={apiData}
                  onSubmit={(values, { resetForm }) => {
                    if (!props.row) {
                      addCalculator(values);
                      props.getAllCalculators();  
                      // toggleDrawer(anchor, false);
                     
                     
                    } else {
                      editCalculator(values);
                      props.getAllCalculators();
                      props.toggleDraw(anchor, false);
                      props.setTogg(!props.togg)
                      setValue("Configurations");
                     
                    }
                  }}
                  validationSchema={validationSchema}
                >
                  {(formik) => {
                    return (
                      <Form>
                        <TabBox>
                          <TabContext
                            value={
                              props.text === undefined || props.text === ""
                                ? value
                                : props.text
                            }
                          >
                            <TabList
                              onChange={(event, newValue) => {
                                console.log('tabs changed')
                                errorCal||
                                formik.errors.department ||
                                formik.errors.category ||
                                formik.errors.calculatorName ||
                                formik.errors.calculatorColor ||
                                formik.errors.setupfeeConfig ||
                                formik.errors.discountfeeConfig ||
                                formik.errors.contractlengthConfig ||
                                formik.errors.negotiationMargin
                                  ? setValue("Configurations")
                                  : formik.errors.salesMan ||
                                    formik.errors.approvers
                                  ? newValue == "Configurations"
                                    ? setValue("Configurations")
                                    : setValue("Access")
                                  : setValue(newValue);

                                Object.keys(formik.touched).length == 0 &&
                                  setValue("Configurations");
                                // setValue("Configurations");
                              }}
                            >
                              <Tab
                                label="Configurations"
                                value="Configurations"
                              />
                              <Tab
                                label="Access"
                                // type="submit"
                                onClick={() => {
                                  formik.setTouched({
                                    department: true,
                                    category: true,
                                    calculatorName: true,
                                    calculatorColor: true,
                                    contractlengthConfig: true,
                                    setupfeeConfig: true,
                                    negotiationMargin: true,
                                    discountfeeConfig: true,
                                  });
                                }}
                                value="Access"
                              />
                              <Tab
                                label="Items"
                                onClick={() => {
                                  formik.setTouched({
                                    department: true,
                                    calculatorName: true,
                                    calculatorColor: true,
                                    contractlengthConfig: true,
                                    setupfeeConfig: true,
                                    negotiationMargin: true,
                                    discountfeeConfig: true,
                                    approvers: true,
                                    salesMan: true,
                                  });
                                }}
                                value="Items"
                              />
                              <Tab label="history" value="history" />
                            </TabList>
                            <TabPanel value="Configurations">
                              <Configurations
                                setValue={setValue}
                                // validateField={validateField}
                                touched={formik.touched}
                                formik={formik}
                                handleChange={formik.handleChange}
                                values={formik.values}
                                setFieldValue={formik.setFieldValue}
                                getDepartments={props.getDepartments}
                                departments={props.departments}
                                setDepartments={props.setDepartments}
                                addCalculator={addCalculator}
                                apiData={apiData}
                                setApiData={setApiData}
                                toggleDrawer={toggleDrawer}
                                anchor={anchor}
                                calculators={props.calculators}
                                row={props.row}
                                errorCal={errorCal}
                                setErrorCal={setErrorCal}
                              />
                            </TabPanel>
                            <TabPanel value="Access">
                              <Access
                                setValue={setValue}
                                formik={formik}
                                setFieldValue={formik.setFieldValue}
                                values={formik.values}
                                users={props.users}
                                setUsers={props.setUsers}
                                nameObj={props.nameObj}
                                setNameObj={props.setNameObj}
                                calculators={props.calculators}
                                anchor={anchor}
                                toggleDrawer={toggleDrawer}
                                row={props.row}
                              />
                            </TabPanel>
                            <TabPanel value="Items">
                              <Items
                               

                                setValue={setValue}
                                deliverables={props.deliverables}
                                setDeliverables={props.setDeliverables}
                                deliverableNameObj={props.deliverableNameObj}
                                setDeliverableNameObj={
                                  props.setDeliverableNameObj
                                }
                                deliverableRoleId={props.deliverableRoleId}
                                setDeliverableRoleId={
                                  props.setDeliverableRoleId
                                }
                                // deliverableNameObj={deliverableNameObj}
                                // setDeliverableNameObj={setDeliverableNameObj}
                                deliverablePriceObj={props.deliverablePriceObj}
                                setDeliverablePriceObj={
                                  props.setDeliverablePriceObj
                                }
                                packageNameObj={props.packageNameObj}
                                packagePriceObj={props.packagePriceObj}
                                values={formik.values}
                                setFieldValue={formik.setFieldValue}
                                packages={props.packages}
                                setPackages={props.setPackages}
                                toggleDrawer={toggleDrawer}
                                anchor={anchor}
                                row={props.row}
                                packageAllowAccess={props.packageAllowAccess}
                              />
                            </TabPanel>
                            <TabPanel value="history">
                              <History />
                            </TabPanel>
                          </TabContext>
                        </TabBox>
                      </Form>
                    );
                  }}
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
