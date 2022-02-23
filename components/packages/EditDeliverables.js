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
import { SwitchWrap, NewSwitch } from "../../components/tableControls.style";
import FormControlLabel from "@mui/material/FormControlLabel";

import {
  MainButton,
  OutlineButton,
  InputText,
  RedOutlineButton,
  InputTextArea,
  ErrorMsg,
  EditRowBtn,
} from "../../components/formControls.style";

export const EditDeliverables = (props) => {
  const {
    deliverables,

    departmentRole,
    row,
    roles,
    newemployeeLevel,
    handleRowEdit,
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    isEditdeliv,
    setisEditdeliv,
    delivEdit,
    setdelivEdit,
    createdeliverables,
    handleCreateDeliverable,
    handleEditDeliverable,
    resetForm,
  } = props;
  const phases = ["Onboarding", "Ongoing", "One-time"];
  const frequencies = ["One-time", "Monthly", "Quarterly", "Semi-annual"];
  const showDeliverable = deliverables.filter(
    (item) => item.department[0].department == row.departmentName
  );

  return (
    <TableRow
      hover
      role="checkbox"
      // aria-checked={isItemSelected}
      tabIndex={-1}
      // selected={isItemSelected}
      className="editMode"
    >
      <TableCell component="th" scope="row" padding="none">
        <Select
          size="small"
          style={{ width: "100%" }}
          id="deliverableId"
          name="deliverableId"
          value={values.deliverableId ? values.deliverableId : "none"}
          onChange={(e) => {
            const selectedDeiverable = showDeliverable.filter(
              (item) => item.deliverablesId == e.target.value
            )[0];
            setFieldValue(
              "roleId",
              selectedDeiverable.department[0].roles[0].roleId
            );
            setFieldValue(
              "employeeLevel",
              selectedDeiverable.employeeroleLevel
            );
            setFieldValue("price", selectedDeiverable.price);

            setFieldValue("deliverableId", e.target.value);
          }}
          error={touched.deliverableId && Boolean(errors.deliverableId)}
        >
          <MenuItem disabled value="none">
            <span style={{ color: "rgba(0, 0, 0, 0.38)" }}>
              Select Deliverables
            </span>
          </MenuItem>

          {showDeliverable &&
            showDeliverable.map((deliverable, index) => {
              return (
                <MenuItem value={deliverable.deliverablesId} key={index}>
                  {deliverable.deliverableName}
                </MenuItem>
              );
            })}
        </Select>
        <ErrorMsg name="deliverableId"></ErrorMsg>
      </TableCell>
      <TableCell align="left">
        <InputText
          size="small"
          id="price"
          type="text"
          placeholder="Price"
          name="price"
          value={
            values.price &&
            values.price
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
          }
          onChange={handleChange}
          error={touched.price && Boolean(errors.price)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {values.price && "$"}
              </InputAdornment>
            ),
          }}
          disabled
        />
        <ErrorMsg name="price"></ErrorMsg>
      </TableCell>

      <TableCell align="left">
        <Select
          size="small"
          style={{ width: "100%" }}
          id="phase"
          name="phase"
          value={values.phase ? values.phase : "none"}
          onChange={(e) => {
            setFieldValue("phase", e.target.value);
          }}
          error={touched.phase && Boolean(errors.phase)}
        >
          <MenuItem disabled value="none">
            <span style={{ color: "rgba(0, 0, 0, 0.38)" }}>Select Phase</span>
          </MenuItem>
          {phases.map((phase, index) => {
            return (
              <MenuItem value={phase} key={index}>
                {phase}
              </MenuItem>
            );
          })}
        </Select>
        <ErrorMsg name="phase"></ErrorMsg>
      </TableCell>
      <TableCell align="left">
        <InputText
          size="small"
          id="department"
          type="text"
          placeholder="Department"
          name="department"
          value={row.departmentName}
          disabled
        />
      </TableCell>
      <TableCell align="left">
        <FormControlLabel
          control={
            <SwitchWrap>
              <NewSwitch
                checked={values.mandatory ? values.mandatory : ""}
                onChange={(e) => {
                  setFieldValue("mandatory", e.target.checked);
                }}
              />
            </SwitchWrap>
          }
          label=""
        />
      </TableCell>
      <TableCell align="left">
        <InputText
          size="small"
          id="employeeLevel"
          type="text"
          placeholder="Role Level"
          name="employeeLevel"
          value={values.employeeLevel}
          disabled
        />
      </TableCell>
      <TableCell align="left">
        <Select
          size="small"
          style={{ width: "100%" }}
          id="frequency"
          name="frequency"
          value={values.frequency ? values.frequency : "none"}
          onChange={(e) => {
            setFieldValue("frequency", e.target.value);
          }}
          error={touched.frequency && Boolean(errors.frequency)}
        >
          <MenuItem disabled value="none">
            <span style={{ color: "rgba(0, 0, 0, 0.38)" }}>
              Select frequency
            </span>
          </MenuItem>
          {frequencies.map((frequency, index) => {
            return (
              <MenuItem value={frequency} key={index}>
                {frequency}
              </MenuItem>
            );
          })}
        </Select>
        <ErrorMsg name="phase"></ErrorMsg>
      </TableCell>
      <TableCell align="left">
        <InputText
          size="small"
          id="quantity"
          type="text"
          placeholder="Quantity"
          name="quantity"
          value={values.quantity}
          onChange={handleChange}
          error={touched.quantity && Boolean(errors.quantity)}
        />
        <ErrorMsg name="quantity"></ErrorMsg>
      </TableCell>
      <TableCell align="left">
        <FormControlLabel
          control={
            <SwitchWrap>
              <NewSwitch
                checked={values.quantityEditable ? values.quantityEditable : ""}
                onChange={(e) => {
                  setFieldValue("quantityEditable", e.target.checked);
                }}
              />
            </SwitchWrap>
          }
          label=""
        />
      </TableCell>

      <TableCell align="left">
        <div className={layout.flex_center}>
          <span className={layout.mr_5}>
            <button
              type="submit"
              style={{
                border: "0",
                background: "none",
                padding: "0",
                margin: "0 15px 0 0",
                cursor: "pointer",
              }}
            >
              <Image alt="" src="/icons/save-icon.svg" width="16" height="16" />
            </button>
          </span>
          <span
            className={layout.ml_5}
            onClick={() => {
              createdeliverables && handleCreateDeliverable();
              setisEditdeliv(false);
              setdelivEdit("");
              resetForm({ values: "" });
            }}
          >
            <button
              style={{
                border: "0",
                background: "none",
                padding: "0",
                cursor: "pointer",
              }}
            >
              <Image
                alt=""
                src="/icons/cancel-icn.svg"
                width="16"
                height="16"
              />
            </button>
          </span>
        </div>
      </TableCell>
    </TableRow>
  );
};
