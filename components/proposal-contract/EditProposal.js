import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../../styles/login.module.scss";
import layout from "../../styles/layout.module.scss";
import axios from "axios";
import InputAdornment from "@mui/material/InputAdornment";
import tokenExpired from "../layout/withAuth/tokenExpired";
import { useRouter } from "next/router";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { MenuList, TextWrap } from "../calculators/Calculators.style";
import {
  SwitchWrap,
  NewSwitch,
  SmallSwitch,
} from "../../components/tableControls.style";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Menu from "@mui/material/Menu";

import {
  MainButton,
  OutlineButton,
  InputText,
  RedOutlineButton,
  InputTextArea,
  ErrorMsg,
  EditRowBtn,
} from "../../components/formControls.style";

export const ProposalEdit = (props) => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    resetForm,
    createProposals,
    setCreateProposals,
    editProposals,
    setEditProposals,
    initialFormValues,
    calculators,
  } = props;
  const [open, setOpen] = React.useState(false);
  const [fileFormat, setfileFormat] = React.useState(false);
  const [pcSetting, setPcSetting] = React.useState(false);
  const [CalculatorDisplay, setCalculatorDisplay] = React.useState("");
  const [formatDisplay, setformatDisplay] = React.useState("");
  const [pcSettingDisplay, setpcSettingDisplay] = React.useState("");

  const [selectList, setSelectList] = React.useState(null);
  const openMenu = Boolean(selectList);
  const handleClick1 = (event) => {
    setSelectList(event.currentTarget);
  };
  const handleClose = () => {
    setSelectList(null);
  };
  // console.log(values, "ba;ies");
  const [selectList2, setSelectList2] = React.useState(null);
  const openMenu2 = Boolean(selectList2);
  const handleClick2 = (event) => {
    setSelectList2(event.currentTarget);
  };
  const handleClose2 = () => {
    setSelectList2(null);
  };
  const [selectList3, setSelectList3] = React.useState(null);
  const openMenu3 = Boolean(selectList3);
  const handleClick3 = (event) => {
    setSelectList3(event.currentTarget);
  };
  const handleClose3 = () => {
    setSelectList3(null);
  };
  useEffect(() => {
    const filtercalc =
      calculators.length > 0 &&
      values.calculatorIds.length > 0 &&
      calculators.filter((item) => item.id == values.calculatorIds[0])[0].name;
    const calc =
      calculators.length > 0 && values.calculatorIds.length > 0
        ? values.calculatorIds.length == 1
          ? filtercalc
          : `${values.calculatorIds.length + " calculators"}`
        : "Select";
    setCalculatorDisplay(calc && calc);
  }, [values.calculatorIds]);

  useEffect(() => {
    const filterFormat =
      values.fileFormat.length > 0
        ? values.fileFormat.length == 1
          ? values.fileFormat[0]
          : `${values.fileFormat.length + " File Formats"}`
        : "Select";
    setformatDisplay(filterFormat && filterFormat);
  }, [values.fileFormat]);

  useEffect(() => {
    const filterSettings =
      values.pcSettings &&
      Object.keys(values.pcSettings).filter(
        (setting) => values.pcSettings[setting] == true
      );
    console.log(filterSettings, "filterSettings");
    const Settings =
      filterSettings.length > 0
        ? filterSettings.length == 1
          ? filterSettings[0]
          : `${filterSettings.length + " P/C Settings"}`
        : "Select";
    setpcSettingDisplay(Settings && Settings);
  }, [values.pcSettings]);

  return (
    <TableRow
      hover
      role="checkbox"
      // aria-checked={isItemSelected}
      tabIndex={-1}
      // selected={isItemSelected}
      className="editMode"
    >
      <TableCell />
      <TableCell component="th" scope="row" padding="none">
        <InputText
          size="small"
          id="title"
          type="text"
          placeholder="Please Enter Title"
          name="title"
          value={values.title}
          onChange={handleChange}
          error={touched.title && Boolean(errors.title)}
        />
        <ErrorMsg name="title"></ErrorMsg>
      </TableCell>
      <TableCell>
        <div>
          <OutlineButton
            fixwidth="auto"
            marginbottom="0"
            style={{
              border: 0,
              color: "rgba(0, 0, 0, 0.87)",
              fontSize: "12px",
            }}
            onClick={handleClick1}
          >
            <span className={layout.mr_10}>{CalculatorDisplay}</span>
            <Image alt="" src="/icons/down-arrow.svg" width="12" height="12" />
          </OutlineButton>
          <Menu
            id="basic-menu"
            anchorEl={selectList}
            open={openMenu}
            onClose={handleClose}
            style={{ maxHeight: "250px" }}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {calculators.length > 0 &&
              calculators.map((calculator, index) => {
                return (
                  <MenuList key={index}>
                    <div className="block">
                      <MenuItem>
                        <FormControlLabel
                          style={{ fontSize: "12px" }}
                          control={
                            <Checkbox
                              defaultChecked={
                                values.calculatorIds
                                  ? values.calculatorIds.includes(calculator.id)
                                  : false
                              }
                              onChange={(e) => {
                                e.target.checked
                                  ? setFieldValue("calculatorIds", [
                                      ...values.calculatorIds,
                                      calculator.id,
                                    ])
                                  : setFieldValue(
                                      "calculatorIds",
                                      values.calculatorIds.filter(
                                        (id) => id != calculator.id
                                      )
                                    );
                              }}
                            />
                          }
                          label={calculator.name}
                        />
                      </MenuItem>
                    </div>
                  </MenuList>
                );
              })}
          </Menu>
          <ErrorMsg name="calculatorIds"></ErrorMsg>
        </div>
      </TableCell>

      <TableCell>
        <div>
          <OutlineButton
            fixwidth="auto"
            marginbottom="0"
            style={{
              border: 0,
              color: "rgba(0, 0, 0, 0.87)",
              fontSize: "12px",
            }}
            onClick={handleClick2}
          >
            <span className={layout.mr_10}>{formatDisplay}</span>
            <Image alt="" src="/icons/down-arrow.svg" width="12" height="12" />
          </OutlineButton>

          <Menu
            id="basic-menu"
            anchorEl={selectList2}
            open={openMenu2}
            onClose={handleClose2}
            style={{ maxHeight: "250px" }}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuList>
              <div className="block">
                <MenuItem>
                  <FormControlLabel
                    style={{ fontSize: "12px" }}
                    control={
                      <Checkbox
                        defaultChecked={
                          values.fileFormat.length > 0
                            ? values.fileFormat.includes("PDF")
                            : false
                        }
                        onChange={(e) => {
                          const format = values.fileFormat;
                          e.target.checked
                            ? setFieldValue("fileFormat", [...format, "PDF"])
                            : setFieldValue(
                                "fileFormat",
                                format.filter((item) => item != "PDF")
                              );
                        }}
                      />
                    }
                    label="PDF"
                  />
                </MenuItem>
                <MenuItem>
                  <FormControlLabel
                    style={{ fontSize: "12px" }}
                    control={
                      <Checkbox
                        defaultChecked={
                          values.fileFormat.length > 0
                            ? values.fileFormat.includes("PNG/JPEG")
                            : false
                        }
                        onChange={(e) => {
                          const format = values.fileFormat;
                          e.target.checked
                            ? setFieldValue("fileFormat", [
                                ...format,
                                "PNG/JPEG",
                              ])
                            : setFieldValue(
                                "fileFormat",
                                format.filter((item) => item != "PNG/JPEG")
                              );
                        }}
                      />
                    }
                    label="PNG/JPEG"
                  />
                </MenuItem>
                {/* <MenuItem>
                  <FormControlLabel
                    style={{ fontSize: "12px" }}
                    control={
                      <Checkbox
                        defaultChecked={
                          values.fileFormat.length > 0
                            ? values.fileFormat.includes("Google Sheet")
                            : false
                        }
                        onChange={(e) => {
                          const format = values.fileFormat;
                          e.target.checked
                            ? setFieldValue("fileFormat", [
                                ...format,
                                "Google Sheet",
                              ])
                            : setFieldValue(
                                "fileFormat",
                                format.filter((item) => item != "Google Sheet")
                              );
                        }}
                      />
                    }
                    label="Google Sheet"
                  />
                </MenuItem>{" "}
                <MenuItem>
                  <FormControlLabel
                    style={{ fontSize: "12px" }}
                    control={
                      <Checkbox
                        defaultChecked={
                          values.fileFormat.length > 0
                            ? values.fileFormat.includes("Excel")
                            : false
                        }
                        onChange={(e) => {
                          const format = values.fileFormat;
                          e.target.checked
                            ? setFieldValue("fileFormat", [...format, "Excel"])
                            : setFieldValue(
                                "fileFormat",
                                format.filter((item) => item != "Excel")
                              );
                        }}
                      />
                    }
                    label="Excel"
                  />
                </MenuItem>{" "} */}
              </div>
            </MenuList>
          </Menu>
        </div>
        <ErrorMsg name="fileFormat"></ErrorMsg>
      </TableCell>
      <TableCell>
        <div>
          <OutlineButton
            fixwidth="auto"
            marginbottom="0"
            style={{
              border: 0,
              color: "rgba(0, 0, 0, 0.87)",
              fontSize: "12px",
            }}
            onClick={handleClick3}
          >
            <span className={layout.mr_10}>{pcSettingDisplay}</span>
            <Image alt="" src="/icons/down-arrow.svg" width="12" height="12" />
          </OutlineButton>

          <Menu
            id="basic-menu"
            anchorEl={selectList3}
            open={openMenu3}
            onClose={handleClose3}
            style={{ maxHeight: "250px" }}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuList>
              <div className="block">
                <MenuItem>
                  <FormControlLabel
                    style={{ fontSize: "12px" }}
                    control={
                      <SwitchWrap style={{ margin: 0 }}>
                        <SmallSwitch
                          defaultChecked={
                            values.pcSettings && values.pcSettings.setupFees
                          }
                          onChange={(e) => {
                            setFieldValue("pcSettings", {
                              ...values.pcSettings,
                              ["setupFees"]: e.target.checked,
                            });
                          }}
                        />
                      </SwitchWrap>
                    }
                    label={<span className={layout.ml_10}>Setup Fees</span>}
                  />
                </MenuItem>
                <MenuItem>
                  <FormControlLabel
                    style={{ fontSize: "12px" }}
                    control={
                      <SwitchWrap style={{ margin: 0 }}>
                        <SmallSwitch
                          defaultChecked={
                            values.pcSettings &&
                            values.pcSettings.customDeliverables
                          }
                          onChange={(e) => {
                            setFieldValue("pcSettings", {
                              ...values.pcSettings,
                              ["customDeliverables"]: e.target.checked,
                            });
                          }}
                        />
                      </SwitchWrap>
                    }
                    label={
                      <span className={layout.ml_10}>Custom Deliverables</span>
                    }
                  />
                </MenuItem>
                <MenuItem>
                  <FormControlLabel
                    style={{ fontSize: "12px" }}
                    control={
                      <SwitchWrap style={{ margin: 0 }}>
                        <SmallSwitch
                          defaultChecked={
                            values.pcSettings &&
                            values.pcSettings.frequencyOfDeliverables
                          }
                          onChange={(e) => {
                            setFieldValue("pcSettings", {
                              ...values.pcSettings,
                              ["frequencyOfDeliverables"]: e.target.checked,
                            });
                          }}
                        />
                      </SwitchWrap>
                    }
                    label={
                      <span className={layout.ml_10}>
                        Frequency of Deliverables
                      </span>
                    }
                  />
                </MenuItem>{" "}
                <MenuItem>
                  <FormControlLabel
                    style={{ fontSize: "12px" }}
                    control={
                      <SwitchWrap style={{ margin: 0 }}>
                        <SmallSwitch
                          defaultChecked={
                            values.pcSettings &&
                            values.pcSettings.phaseOfDeliverables
                          }
                          onChange={(e) => {
                            setFieldValue("pcSettings", {
                              ...values.pcSettings,
                              ["phaseOfDeliverables"]: e.target.checked,
                            });
                          }}
                        />
                      </SwitchWrap>
                    }
                    label={
                      <span className={layout.ml_10}>
                        Phase of Deliverables
                      </span>
                    }
                  />
                </MenuItem>{" "}
                <MenuItem>
                  <FormControlLabel
                    style={{ fontSize: "12px" }}
                    control={
                      <SwitchWrap style={{ margin: 0 }}>
                        <SmallSwitch
                          defaultChecked={
                            values.pcSettings &&
                            values.pcSettings.quantityOfDeliverables
                          }
                          onChange={(e) => {
                            setFieldValue("pcSettings", {
                              ...values.pcSettings,
                              ["quantityOfDeliverables"]: e.target.checked,
                            });
                          }}
                        />
                      </SwitchWrap>
                    }
                    label={
                      <span className={layout.ml_10}>
                        Quantity of Deliverables
                      </span>
                    }
                  />
                </MenuItem>
                <MenuItem>
                  <FormControlLabel
                    style={{ fontSize: "12px" }}
                    control={
                      <SwitchWrap style={{ margin: 0 }}>
                        <SmallSwitch
                          defaultChecked={
                            values.pcSettings &&
                            values.pcSettings.itemizedPricingOfDeliverables
                          }
                          onChange={(e) => {
                            setFieldValue("pcSettings", {
                              ...values.pcSettings,
                              ["itemizedPricingOfDeliverables"]:
                                e.target.checked,
                            });
                          }}
                        />
                      </SwitchWrap>
                    }
                    label={
                      <span className={layout.ml_10}>
                        Itemized Pricing of Deliverables
                      </span>
                    }
                  />
                </MenuItem>
              </div>
            </MenuList>
          </Menu>
        </div>
      </TableCell>
      <TableCell>
        <SwitchWrap style={{ margin: 0 }}>
          {" "}
          <NewSwitch
            checked={values.companyLogo ? values.companyLogo : ""}
            onChange={(e) => {
              setFieldValue("companyLogo", e.target.checked);
            }}
          />
        </SwitchWrap>
      </TableCell>
      <TableCell>
        <SwitchWrap style={{ margin: 0 }}>
          {" "}
          <NewSwitch
            checked={values.companyName ? values.companyName : ""}
            onChange={(e) => {
              setFieldValue("companyName", e.target.checked);
            }}
          />
        </SwitchWrap>
      </TableCell>
      <TableCell>
        <SwitchWrap style={{ margin: 0 }}>
          {" "}
          <NewSwitch
            checked={values.tvc ? values.tvc : ""}
            onChange={(e) => {
              setFieldValue("tvc", e.target.checked);
            }}
          />
        </SwitchWrap>
      </TableCell>
      <TableCell>
        <SwitchWrap style={{ margin: 0 }}>
          {" "}
          <NewSwitch
            checked={values.mvc ? values.mvc : ""}
            onChange={(e) => {
              setFieldValue("mvc", e.target.checked);
            }}
          />
        </SwitchWrap>
      </TableCell>
      <TableCell>
        <SwitchWrap style={{ margin: 0 }}>
          {" "}
          <NewSwitch
            checked={values.contractLength ? values.contractLength : ""}
            onChange={(e) => {
              setFieldValue("contractLength", e.target.checked);
            }}
          />
        </SwitchWrap>
      </TableCell>
      <TableCell align="left">
        <div className={layout.flex_center}>
          <span className={layout.mr_5}>
            <EditRowBtn type="submit">
              <span className={layout.flex_center}>
                <Image
                  alt=""
                  src="/icons/save-icon.svg"
                  width="16"
                  height="16"
                />
              </span>
            </EditRowBtn>
          </span>
          <span
            className={layout.ml_5}
            onClick={() => {
              createProposals && setCreateProposals(!createProposals);
              editProposals && setEditProposals(!editProposals);
              resetForm({ values: "" });
            }}
          >
            <EditRowBtn>
              <span className={layout.flex_center}>
                <Image
                  alt=""
                  src="/icons/cancel-icn.svg"
                  width="16"
                  height="16"
                />
              </span>
            </EditRowBtn>
          </span>
        </div>
      </TableCell>
    </TableRow>
  );
};
