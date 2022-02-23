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
import { SwitchWrap, NewSwitch } from "../../components/tableControls.style";
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

export const EditPackages = (props) => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    handleCreatePackages,
    createPackages,
    resetForm,
    departments,
    rowEdit,
    isRowEdit,
    handleEditPackages,
  } = props;
  const employeeLevel = ["Junior Level", "Medium Level", "Senior Level"];
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
      <TableCell />
      <TableCell component="th" scope="row" padding="none">
        <InputText
          size="small"
          id="packageName"
          type="text"
          placeholder="Package Name"
          name="packageName"
          value={values.packageName}
          onChange={handleChange}
          error={touched.packageName && Boolean(errors.packageName)}
        />
        <ErrorMsg name="packageName"></ErrorMsg>
      </TableCell>

      <TableCell align="left">
        <InputText
          size="small"
          id="overallPrice"
          type="text"
          placeholder="Overall Price"
          name="overallPrice"
          value={
            values.overallPrice &&
            values.overallPrice
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
          }
          onChange={handleChange}
          error={touched.overallPrice && Boolean(errors.overallPrice)}
          disabled={true}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {values.overallPrice && "$"}
              </InputAdornment>
            ),
          }}
        />
        <ErrorMsg name="overallPrice"></ErrorMsg>
      </TableCell>

      <TableCell align="left">
        <Select
          size="small"
          style={{ width: "100%" }}
          id="roleId"
          name="roleId"
          value={values.departmentId ? values.departmentId : "none"}
          onChange={(e) => {
            setFieldValue("departmentId", e.target.value);
          }}
          error={touched.departmentId && Boolean(errors.departmentId)}
          disabled={isRowEdit ? true : false}
        >
          <MenuItem disabled value="none">
            <span style={{ color: "rgba(0, 0, 0, 0.38)" }}>
              Select Department
            </span>
          </MenuItem>
          {departments &&
            departments.length > 0 &&
            departments.map((item, index) => {
              return (
                <MenuItem value={item.departmentId} key={index}>
                  {item.department}
                </MenuItem>
              );
            })}
        </Select>
        <ErrorMsg name="departmentId"></ErrorMsg>
      </TableCell>
      <TableCell align="left">
        <Select
          size="small"
          style={{ width: "100%" }}
          id="minRoleLevel"
          name="minRoleLevel"
          value={values.minRoleLevel ? values.minRoleLevel : "none"}
          onChange={(e) => {
            setFieldValue("minRoleLevel", e.target.value);
          }}
          error={touched.minRoleLevel && Boolean(errors.minRoleLevel)}
        >
          <MenuItem value="none" disabled>
            <span style={{ color: "rgba(0, 0, 0, 0.38)" }}>
              Select Role Level
            </span>
          </MenuItem>
          {employeeLevel.map((level, index) => {
            return (
              <MenuItem value={level} key={index}>
                {level}
              </MenuItem>
            );
          })}
        </Select>
        <ErrorMsg name="minRoleLevel"></ErrorMsg>
      </TableCell>
      <TableCell align="left">
        <InputText
          size="small"
          id="packageDeliverables"
          type="textarea"
          name="packageDeliverables"
          placeholder="Deliverables"
          value={values.packageDeliverables}
          onChange={handleChange}
          error={
            touched.packageDeliverables && Boolean(errors.packageDeliverables)
          }
          disabled={true}
        />
        <ErrorMsg name="packageDeliverables"></ErrorMsg>
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
              createPackages && handleCreatePackages();
              isRowEdit && handleEditPackages();
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
