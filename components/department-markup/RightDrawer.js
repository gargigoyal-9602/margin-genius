import * as React from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import { Drawer } from "../tableControls.style";
import { Formik, Form } from "formik";
import { validationSchema } from "../../validators/department.validators";
import layout from "../../styles/layout.module.scss";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import styles from "../../styles/login.module.scss";
// import { validate, validationSchema } from "../../validators/department.validators";
// Calendar
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";

//
import Image from "next/image";
import { useRouter } from "next/router";
import {
  MainButton,
  OutlineButton,
  InputText,
  RedOutlineButton,
  ErrorMsg,
} from "../../components/formControls.style";
import { Directions } from "@mui/icons-material";
import tokenExpired from "../layout/withAuth/tokenExpired";
import axios from "axios";
import Loader from "../Loader";
import currency from "currency.js";

const initialFormValues = {
  Department: "",
  MarkupMultiplier: "",
  GrossMargin: "",
  WholeSaleCost: "",
  SellingPrice: "",
  GrossMarginPercentage: "",
};

const RightDrawer = (props) => {
  const router = useRouter();
  const path = router.pathname.split("/")[2];
  console.log(path == "roles" ? "Create New" : "Add New Department");
  const [loading, setLoading] = React.useState(false);

  const { roles, setRoles } = props;
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

  const initialValues = {
    department: "",
    wholesaleCost: "",
    markupMultiplier: "",
    grossmarginPercentage: "",
    sellingPrice: "",
    grossmarginAmount: "",
  };

  return (
    <>
      <Loader loading={loading} />

      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          {path != "roles" ? (
            <OutlineButton
              aligncenter="true"
              marginbottom="0"
              fixwidth="auto"
              onClick={() => toggleDrawer(anchor, true)}
            >
              <span className={layout.flex_center}>
                <Image
                  src="/icons/plus-icon-green.svg"
                  width="16"
                  height="16"
                  alt=""
                />
              </span>
              <span className={layout.ml_10}>Add a New Department</span>
            </OutlineButton>
          ) : (
            <OutlineButton
              size="small"
              aligncenter="true"
              marginbottom="0"
              onClick={() => toggleDrawer(anchor, true)}
              sx={{marginTop:2}}
            >
              Create New
            </OutlineButton>
          )}
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
              <h2>Add New Department</h2>
              <div className="DrawerWrap">
                <Formik
                  enableReinitialize
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={(values, { resetForm }) => {
                    toggleDrawer("right", false);
                    props.addDepartment({
                      Department: values.department,
                      WholeSaleCost: currency(
                        values.wholesaleCost
                      ).value.toString(),
                      markupMultiplier: values.markupMultiplier,
                      GrossMarginPercentage: values.grossmarginPercentage,
                      SellingPrice: values.sellingPrice,
                      GrossMargin: values.grossmarginAmount,
                    });
                    resetForm({ values: "" });
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
                      <h3>Department Information</h3>
                      <div className={`${layout.flex_top} ${layout.mb_20}`}>
                        <div className={layout.mr_10} style={{ width: "100%" }}>
                          <InputLabel htmlFor="Department">
                            Department<span className={styles.red}>*</span>
                          </InputLabel>
                          <InputText
                            size="small"
                            id="Department"
                            placeholder="Enter Department"
                            type="text"
                            name="department"
                            value={values.department}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              touched.department && Boolean(errors.department)
                            }
                          />
                          <ErrorMsg name="department"></ErrorMsg>
                        </div>
                        <div
                          className={`${layout.ml_10} `}
                          style={{ width: "100%" }}
                        >
                          <InputLabel htmlFor="wholesaleCost">
                            Wholsale Cost<span className={styles.red}>*</span>
                          </InputLabel>
                          <InputText
                            size="small"
                            id="wholesaleCost"
                            name="wholesaleCost"
                            placeholder="500"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  $
                                </InputAdornment>
                              ),
                            }}
                            value={values.wholesaleCost}
                            onBlur={(e) => {
                              setFieldValue(
                                "wholesaleCost",
                                values.wholesaleCost
                                  .toString()
                                  .replace(
                                    /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                                    ","
                                  )
                              );
                            }}
                            onChange={(e) => {
                              const Wholesale = e.target.value;
                              const markup = values.markupMultiplier;
                              const selling =
                                values.markupMultiplier &&
                                currency(Wholesale).multiply(markup);

                              // Number(
                              //   (currency(Wholesale).value * markup).toFixed(
                              //     2
                              //   )
                              // );
                              const grossmarginValue =
                                values.markupMultiplier &&
                                currency(selling).subtract(Wholesale);
                              const grossmarginper =
                                values.markupMultiplier &&
                                (grossmarginValue / selling) * 100;

                              selling && isNaN(selling) === false
                                ? setFieldValue("sellingPrice", selling)
                                : setFieldValue("sellingPrice", "");
                              grossmarginValue &&
                              isNaN(grossmarginValue) === false
                                ? setFieldValue(
                                    "grossmarginAmount",
                                    grossmarginValue
                                  )
                                : setFieldValue("grossmarginAmount", "");
                              Wholesale &&
                              markup != 0 &&
                              isNaN(grossmarginper) === false
                                ? setFieldValue(
                                    "grossmarginPercentage",
                                    grossmarginper.toFixed(2)
                                  )
                                : setFieldValue("grossmarginPercentage", "");
                              setFieldValue("wholesaleCost", Wholesale);
                            }}
                            error={
                              touched.wholesaleCost &&
                              Boolean(errors.wholesaleCost)
                            }
                          />
                          <ErrorMsg name="wholesaleCost"></ErrorMsg>
                        </div>
                      </div>
                      <div className={`${layout.flex_top} ${layout.mb_30}`}>
                        <div className={layout.mr_10} style={{ width: "100%" }}>
                          <InputLabel htmlFor="MarkupMultiplier">
                            Markup Multiplier
                            <span className={styles.red}>*</span>
                          </InputLabel>
                          <InputText
                            size="small"
                            id="MarkupMultiplier"
                            placeholder="3x"
                            name="markupMultiplier"
                            value={values.markupMultiplier}
                            onChange={(e) => {
                              const markup = e.target.value;
                              const Wholesale = currency(
                                values.wholesaleCost
                              ).value;

                              const selling =
                                currency(Wholesale).multiply(markup).value;
                              const grossmarginValue = selling - Wholesale;
                              const grossmarginper =
                                (grossmarginValue / selling) * 100;

                              selling && isNaN(selling) === false
                                ? setFieldValue("sellingPrice", selling)
                                : setFieldValue("sellingPrice", "");
                              // grossmarginValue &&
                              // console.log(grossmarginValue,"value")
                              isNaN(grossmarginValue) === false
                                ? setFieldValue(
                                    "grossmarginAmount",
                                    grossmarginValue.toFixed(2)
                                  )
                                : setFieldValue("grossmarginAmount", "");
                              Wholesale &&
                              markup != 0 &&
                              isNaN(grossmarginper) === false
                                ? setFieldValue(
                                    "grossmarginPercentage",
                                    grossmarginper.toFixed(2)
                                  )
                                : setFieldValue("grossmarginPercentage", "");
                              setFieldValue("markupMultiplier", e.target.value);
                            }}
                            error={
                              touched.markupMultiplier &&
                              Boolean(errors.markupMultiplier)
                            }
                          />
                          <ErrorMsg name="markupMultiplier"></ErrorMsg>
                        </div>
                        <div className={layout.ml_10} style={{ width: "100%" }}>
                          <InputLabel htmlFor="GrossMarginPercentage">
                            Gross Margin%<span className={styles.red}>*</span>
                          </InputLabel>
                          <InputText
                            size="small"
                            id="GrossMarginPercentage"
                            name="grossmarginPercentage"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  %
                                </InputAdornment>
                              ),
                            }}
                            placeholder="20"
                            value={values.grossmarginPercentage}
                            disabled
                            onChange={handleChange}
                            // onChange={(e) => {
                            //   const grossMargin = e.target.value;
                            //   const margin = grossMargin / 100;
                            //   const deletedMargin = 1 - Number(margin);
                            //   const markup = margin / deletedMargin;
                            //   isNaN(markup)===false ? setFieldValue(
                            //     "markupMultiplier",
                            //     (markup * 100).toFixed(2)
                            //   ):setFieldValue(
                            //     "markupMultiplier",
                            //     ""
                            //   );
                            //   const Wholesale = values.wholesaleCost;
                            //   const selling =
                            //     Number(Wholesale) +
                            //     Number((Wholesale * grossMargin) / 100);

                            //   isNaN(selling)===false ? setFieldValue("sellingPrice", selling.toFixed(2)):setFieldValue("sellingPrice", "");
                            //   isNaN(Wholesale * grossMargin)===false ? setFieldValue(
                            //     "grossmarginAmount",
                            //     ((Wholesale * grossMargin) / 100).toFixed(2)
                            //   ):setFieldValue(
                            //     "grossmarginAmount",
                            //     "");
                            //   setFieldValue(
                            //     "grossmarginPercentage",
                            //     e.target.value
                            //   );
                            // }}
                            error={
                              touched.grossmarginPercentage &&
                              Boolean(errors.grossmarginPercentage)
                            }
                          />
                          <ErrorMsg name="grossmarginPercentage"></ErrorMsg>
                        </div>
                      </div>

                      <div
                        className={`${layout.mb_20}`}
                        style={{ borderTop: "1px dashed #D2D4D4" }}
                      >
                        <div className={`${layout.flex_top}  ${layout.mt_20} `}>
                          <div
                            className={`${layout.mr_10} `}
                            style={{ width: "100%" }}
                          >
                            <InputLabel htmlFor="SellingPrice">
                              Selling Price
                            </InputLabel>
                            <InputText
                              size="small"
                              id="SellingPrice"
                              InputProps={{
                                startAdornment: values.sellingPrice && (
                                  <InputAdornment position="start">
                                    {"$"}
                                  </InputAdornment>
                                ),
                              }}
                              // type="text"
                              name="sellingPrice"
                              value={values.sellingPrice
                                .toString()
                                .replace(
                                  /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                                  ","
                                )}
                              disabled={true}
                              onChange={handleChange}
                              error={
                                touched.sellingPrice &&
                                Boolean(errors.sellingPrice)
                              }
                            />
                            <ErrorMsg name="sellingPrice"></ErrorMsg>
                          </div>
                          <div
                            className={layout.ml_10}
                            style={{ width: "100%" }}
                          >
                            <InputLabel htmlFor="GrossMargin">
                              Gross Margin $
                            </InputLabel>
                            <InputText
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    {values.grossmarginAmount && "$"}
                                  </InputAdornment>
                                ),
                              }}
                              size="small"
                              id="GrossMargin"
                              // type="text"
                              name="grossmarginAmount"
                              value={values.grossmarginAmount
                                .toString()
                                .replace(
                                  /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                                  ","
                                )}
                              onChange={handleChange}
                              disabled
                              error={
                                touched.grossmarginAmount &&
                                Boolean(errors.grossmarginAmount)
                              }
                            />
                            <ErrorMsg name="grossmarginAmount"></ErrorMsg>
                          </div>
                        </div>
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
                            variant="text"
                            fixwidth="auto"
                            className={layout.mr_10}
                            onClick={() => toggleDrawer(anchor, false)}
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
