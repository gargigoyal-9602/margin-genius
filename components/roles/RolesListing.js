import React from "react";
import TableRow from "@mui/material/TableRow";
import {
  Button,
  Checkbox,
  InputLabel,
  MenuItem,
  Select,
  TableCell,
} from "@mui/material";
import { MenuPopupRole } from "./MenuPopUp.js";
import { ErrorMsg, InputText, EditRowBtn } from "../formControls.style";
import { DropdownButton } from "./DropdownButton";
import MuiBox from "./MuiBox";
import tokenExpired from "../layout/withAuth/tokenExpired";
import axios from "axios";
import layout from "../../styles/layout.module.scss";
import { useRouter } from "next/router";
import InputAdornment from "@mui/material/InputAdornment";
import Image from "next/image";
import currency from "currency.js";
function RolesListing(props) {
  const router = useRouter();

  const {
    row,
    isItemSelected,
    handleClick,
    editRoles,
    seteditRoles,
    handleEditCancel,
    roles,
    setRoles,
    moduleName,
    labelId,
    values,
    errors,
    touched,
    editToggle,
    setEditToggle,
    handleChange,
    handleBlur,
    setFieldValue,
    toggle1,
    setToggle1,
    resetForm,
  } = props;

  const employeeLevels = ["Junior Level", "Middle Level", "Senior Level"];
  const [departments, setDepartments] = React.useState([]);

  const handleToggle = () => {
    setToggle1(!toggle1);
  };
  React.useEffect(() => {
    const authDetails = JSON.parse(localStorage.getItem("authDetails"));
    const { jwt, userId, orgId } = authDetails;
    const getDepartments = async () => {
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
    getDepartments();
  }, []);
  return (
    <TableRow
      className={row.isEdit && "editMode"}
      hover
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.roleId}
      selected={isItemSelected}
    >
      <TableCell padding="checkbox">
        {!row.isEdit && (
          <Checkbox
            onClick={(event) => handleClick(event, row.roleId)}
            color="primary"
            checked={isItemSelected}
            inputProps={{
              "aria-labelledby": labelId,
            }}
          />
        )}
      </TableCell>
      <TableCell
        align="left"
        component="th"
        id={labelId}
        scope="row"
        padding="none"
      >
        {row.isEdit ? (
          <>
            <InputText
              style={{ width: "200px" }}
              value={values.department}
              placeholder="Department"
              name="department"
              onChange={handleChange}
              error={touched.department && Boolean(errors.department)}
              onBlur={handleBlur}
              disabled={true}
              InputProps={{
                endAdornment: (
                  <DropdownButton
                    toggle1={toggle1}
                    handleToggle={handleToggle}
                  />
                ),
              }}
            />
            <ErrorMsg name="department"></ErrorMsg>
          </>
        ) : (
          row.department
        )}
        {toggle1 && row.isEdit && (
          <MuiBox
            departments={departments}
            setDepartments={setDepartments}
            handleChange={handleChange}
            values={values}
            toggle1={toggle1}
            setToggle1={setToggle1}
          />
        )}
      </TableCell>
      <TableCell align="left">
        {" "}
        {row.isEdit ? (
          <>
            <InputText
              value={values.role}
              name="role"
              onChange={handleChange}
              placeholder="Enter Role"
              error={touched.role && Boolean(errors.role)}
              onBlur={handleBlur}
            />
            <ErrorMsg name="role"></ErrorMsg>
            <br />
          </>
        ) : (
          row.role
        )}
      </TableCell>
      <TableCell align="left">
        {row.isEdit ? (
          <>
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={values.employeeLevel}
              onChange={handleChange}
              name="employeeLevel"
              onBlur={handleBlur}
            >
              {employeeLevels.map((empLevel, index) => {
                return (
                  <MenuItem value={empLevel} key={index}>
                    {empLevel}{" "}
                  </MenuItem>
                );
              })}
            </Select>
            <ErrorMsg name="employeeLevel"></ErrorMsg>
            <br />
          </>
        ) : (
          row.employeeLevel
        )}
      </TableCell>
      <TableCell align="left">
        {row.isEdit ? (
          <>
            <InputText
              value={values.yearlySalary}
              name="yearlySalary"
              placeholder="500"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              onChange={(e) => {
                const salary = currency(e.target.value).divide(2080).value;
                setFieldValue("yearlySalary", e.target.value);
                !isNaN(salary) && setFieldValue("hourlySalary", salary);
              }}
              onBlur={(e) => {
                handleBlur(e);
                setFieldValue(
                  "yearlySalary",
                  values.yearlySalary
                    .toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                );
              }}
              error={touched.yearlySalary && Boolean(errors.yearlySalary)}
            />
            <ErrorMsg name="yearlySalary"></ErrorMsg>
            <br />
          </>
        ) : (
          `$ ${row.yearlySalary
            .toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}`
        )}
      </TableCell>
      <TableCell align="left">
        {row.isEdit ? (
          <>
            <InputText
              value={values.hourlySalary
                .toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {values.yearlySalary ? "$" : "$"}
                  </InputAdornment>
                ),
              }}
              name="hourlySalary"
              placeholder="500"
              onChange={handleChange}
              disabled={true}
            />

            <br />
          </>
        ) : (
          `$ ${row.hourlySalary
            .toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}`
        )}
      </TableCell>
      <TableCell align="left">
        {row.isEdit ? (
          <>
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
                    resetForm();
                    handleEditCancel();
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
          </>
        ) : (
          <MenuPopupRole
            row={row}
            roles={roles}
            setRoles={setRoles}
            seteditRoles={seteditRoles}
            moduleName="Role"
            editToggle={editToggle}
            setEditToggle={setEditToggle}
          />
        )}
      </TableCell>
    </TableRow>
  );
}

export default RolesListing;
