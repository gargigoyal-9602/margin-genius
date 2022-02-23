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
import {
  MainButton,
  OutlineButton,
  InputText,
  RedOutlineButton,
  InputTextArea,
  ErrorMsg,
  EditRowBtn,
} from "../../components/formControls.style";

function EditDeliverables(props) {
  const {
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
  } = props;
  const [role, setRole] = useState("");
  const [employeeLevel, setemployeeLevel] = useState("");
  const [markUp, setMarkUp] = useState("");
  const [hourlySalary, sethourlySalary] = useState("");

  useEffect(() => {
    setRole(roles);
    setemployeeLevel(newemployeeLevel);
  }, [newemployeeLevel]);

  return (
    <TableRow
      hover
      role="checkbox"
      // aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.deliverablesId}
      // selected={isItemSelected}
      className="editMode"
    >
      <TableCell align="left">{""}</TableCell>
      <TableCell component="th" scope="row" padding="none">
        <InputText
          size="small"
          id="deliverableName"
          type="text"
          placeholder="Enter Deliverable Name"
          name="deliverableName"
          value={values.deliverableName}
          onChange={handleChange}
          error={touched.deliverableName && Boolean(errors.deliverableName)}
        />
        <ErrorMsg name="deliverableName"></ErrorMsg>
      </TableCell>

      <TableCell align="left">
        <Select
          size="small"
          style={{ width: "100%" }}
          id="departmentId"
          name="departmentId"
          value={values.departmentId}
          onChange={(e) => {
            const department = departmentRole.filter(
              (item) => item.departmentId == e.target.value
            );
            setMarkUp(Number(department[0].markupMultiplier));
            setFieldValue("Markup", department[0].markupMultiplier);
            setFieldValue("price", "");
            sethourlySalary("");
            setRole(department[0].roles);
            setFieldValue("roleId", "none");
            setFieldValue("employeeroleLevel", "none");
            setFieldValue("departmentId", e.target.value);
          }}
          error={touched.departmentId && Boolean(errors.departmentId)}
        >
          <MenuItem disabled value="none">
            <span style={{ color: "rgba(0, 0, 0, 0.38)" }}>
              Select Department
            </span>
          </MenuItem>
          {departmentRole && departmentRole.length > 0 ? (
            departmentRole.map((item, index) => {
              return (
                <MenuItem value={item.departmentId} key={index}>
                  {item.department}
                </MenuItem>
              );
            })
          ) : (
            <MenuItem value=""> No department found</MenuItem>
          )}
        </Select>
        <ErrorMsg name="departmentId"></ErrorMsg>
      </TableCell>

      <TableCell align="left">
        <Select
          size="small"
          style={{ width: "100%" }}
          id="roleId"
          name="roleId"
          value={values.roleId}
          onChange={(e) => {
            const selectedrole = role.filter(
              (item) => item.roleId == e.target.value
            );
            sethourlySalary("");
            setFieldValue("employeeroleLevel", "none");

            setemployeeLevel(selectedrole[0].employeeLevel.split(","));
            setFieldValue("roleId", e.target.value);
          }}
          error={touched.roleId && Boolean(errors.roleId)}
          disabled={!values.departmentId}
        >
          <MenuItem disabled value="none">
            <span style={{ color: "rgba(0, 0, 0, 0.38)" }}>Select Role</span>
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
      </TableCell>
      <TableCell align="left">
        <Select
          size="small"
          style={{ width: "100%" }}
          id="employeeroleLevel"
          name="employeeroleLevel"
          value={values.employeeroleLevel ? values.employeeroleLevel : "none"}
          onChange={(e) => {
            const selectedrole = role.filter(
              (item) => item.roleId == values.roleId
            );
            const employeeIndex = employeeLevel.indexOf(e.target.value);
            const newhourlySalary =
              selectedrole[0] &&
              selectedrole[0].hourlySalary.split(",")[employeeIndex];
            const price =
              row.hourlyBased == true
                ? Number(row.deliveryHours * newhourlySalary * markUp).toFixed(
                    2
                  )
                : Number(row.internalCost * markUp).toFixed(2);

            setFieldValue("price", price);
            sethourlySalary(newhourlySalary);
            setFieldValue("employeeroleLevel", e.target.value);
          }}
          error={touched.employeeroleLevel && Boolean(errors.employeeroleLevel)}
          disabled={!values.roleId}
        >
          <MenuItem disabled value="none">
            <span style={{ color: "rgba(0, 0, 0, 0.38)" }}>
              Select Role Level
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
      </TableCell>
      <TableCell align="left">
        <InputText
          size="small"
          id="vendorName"
          type="textarea"
          name="vendorName"
          placeholder="Enter Vendor Name"
          value={values.vendorName}
          onChange={handleChange}
          error={touched.vendorName && Boolean(errors.vendorName)}
        />
        <ErrorMsg name="vendorName"></ErrorMsg>
      </TableCell>
      <TableCell align="left">
        <InputText
          size="small"
          id="price"
          type="text"
          name="price"
          value={
            values.price &&
            values.price
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
          }
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
          <span className={layout.ml_5}>
            <EditRowBtn
              onClick={() => {
                //   resetForm();
                handleRowEdit();
              }}
            >
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
}

export default EditDeliverables;
