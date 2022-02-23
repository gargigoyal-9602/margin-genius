import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { visuallyHidden } from "@mui/utils";
// Other
import { MainTable } from "../../components/tableControls.style";
import FooterNav from "../../components/layout/FooterNav";
import layout from "../../styles/layout.module.scss";
import Image from "next/image";
import { MenuPopup } from "./MenuPopUp.js";
import EditDeliverables from "./EditDeliverables";
import { EditvalidationSchema } from "../../validators/deliverables.validators";
import { Form, Formik, useFormikContext } from "formik";
import styles from "../../styles/login.module.scss";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "deliverableName",
    disablePadding: true,
    label: "Deliverable / Service Offering Name",
  },
  {
    id: "departmentId",
    disablePadding: false,
    label: "Department",
  },
  {
    id: "roleId",
    disablePadding: false,
    label: "Role",
  },
  {
    id: "employeeroleLevel",
    disablePadding: false,
    label: "Employee",
  },
  {
    id: "vendorName",
    disablePadding: false,
    label: "Vendor Name",
  },
  {
    id: "price",
    disablePadding: false,
    label: "Price",
  },
  {
    id: "More",
    disablePadding: false,
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell, index) => {
          return (
            index < headCells.length - 1 && (
              <TableCell
                key={headCell.id}
                align={headCell.numeric ? "right" : "left"}
                padding={headCell.disablePadding ? "none" : "normal"}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "desc"}
                  onClick={createSortHandler(headCell.id)}
                  // active={true}
                  IconComponent={() => (
                    <Image
                      src="/icons/sort-arrow.svg"
                      height="22"
                      width="12"
                      alt=""
                    />
                  )}
                >
                  <span className={layout.mr_10}>{headCell.label}</span>
                  {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            )
          );
        })}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function EnhancedTable(props) {
  const {
    departmentRole,
    deliverable,
    deleteIds,
    setDeleteIds,
    setOpenDelete,
    openDelete,
    deleteDisabled,
    setDeleteDisabled,
    updateDeliverables,
  } = props;
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("Role");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(500);
  const [rows, setRows] = React.useState(deliverable);
  const [editDeliv, setEditDeliv] = React.useState(false);
  const [rowEditId, setRowEditId] = React.useState("");
  const [roles, setRoles] = React.useState("");
  const [employeeLevel, setemployeeLevel] = React.useState("");

  const [initialFormValues, setinitialFormValues] = React.useState({
    roleId: "",
    departmentId: "",
    deliverableName: "",
    employeeroleLevel: "",
    vendorName: "",
    price: "",
  });

  const handleRowEdit = () => {
    setEditDeliv(false);
    setRowEditId("");
    setRoles("");
    setemployeeLevel;
    ("");
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.deliverablesId);
      setSelected(newSelecteds);
      setDeleteIds(newSelecteds);

      return;
    }
    setSelected([]);
  };

  const handleClick = (event, deliverablesId) => {
    const selectedIndex = selected.indexOf(deliverablesId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, deliverablesId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setDeleteIds(newSelected);
    setSelected(newSelected);
  };
  const isSelected = (deliverablesId) =>
    selected.indexOf(deliverablesId) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleMenuClick = (value, row) => {
    if (value.Name === "Edit") {
      setEditDeliv(true);
      setRowEditId(row);
    }

    if (value.Name === "Delete") {
      setDeleteIds([row.deliverablesId]);
      setOpenDelete(!openDelete);
    }
  };
  React.useEffect(() => {
    console.log(deliverable)
    setRows(deliverable);
  }, [deliverable]);
  React.useEffect(() => {
    if (selected.length > 0) {
      deleteDisabled && setDeleteDisabled(!deleteDisabled);
    } else {
      setDeleteDisabled(true);
    }
  }, [selected]);
  React.useEffect(() => {
    const department =
      departmentRole &&
      rowEditId &&
      departmentRole.filter(
        (item) => item.departmentId == rowEditId.department[0].departmentId
      );

    department && setRoles(department[0].roles);
    const selectedrole =
      department &&
      department[0].roles.filter(
        (item) => item.roleId == rowEditId.department[0].roles[0].roleId
      );
    selectedrole && setemployeeLevel(selectedrole[0].employeeLevel.split(","));
    setinitialFormValues({
      roleId: rowEditId && rowEditId.department[0].roles[0].roleId,
      departmentId: rowEditId && rowEditId.department[0].departmentId,
      deliverableName: rowEditId.deliverableName,
      employeeroleLevel: rowEditId.employeeroleLevel,
      vendorName: rowEditId.vendorName,
      price: rowEditId.price,
    });
  }, [rowEditId]);

  return (
    <>
      <MainTable>
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <TableContainer sx={{ minHeight: "400px", maxHeight: "540px" }}>
              <Formik
                enableReinitialize
                initialValues={initialFormValues}
                validationSchema={EditvalidationSchema}
                onSubmit={(values) => {
                  updateDeliverables(values, rowEditId);
                  handleRowEdit();
                }}
              >
                {({
                  touched,
                  errors,
                  values,
                  handleBlur,
                  handleChange,
                  setFieldValue,
                  resetForm,
                  handleSubmit,
                }) => (
                  <Form className={styles.form}>
                    <Table
                      stickyHeader
                      sx={{ minWidth: 750 }}
                      aria-labelledby="tableTitle"
                      size={dense ? "small" : "medium"}
                    >
                      <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                      />
                      <TableBody>
                        {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                        {stableSort(rows, getComparator(order, orderBy))
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((row, index) => {
                            const isItemSelected = isSelected(
                              row.deliverablesId
                            );
                            const labelId = `enhanced-table-checkbox-${index}`;
                            return editDeliv &&
                              row.deliverablesId == rowEditId.deliverablesId ? (
                              <EditDeliverables
                                departmentRole={departmentRole}
                                row={row}
                                roles={roles}
                                newemployeeLevel={employeeLevel}
                                handleRowEdit={handleRowEdit}
                                values={values}
                                errors={errors}
                                touched={touched}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                setFieldValue={setFieldValue}
                                resetForm={resetForm}
                              />
                            ) : (
                              <TableRow
                                hover
                                role="checkbox"
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                key={row.deliverablesId}
                                selected={isItemSelected}
                              >
                                <TableCell
                                  padding="checkbox"
                                  onClick={(event) =>
                                    handleClick(event, row.deliverablesId)
                                  }
                                >
                                  <Checkbox
                                    color="primary"
                                    checked={isItemSelected}
                                    inputProps={{
                                      "aria-labelledby": labelId,
                                    }}
                                  />
                                </TableCell>
                                <TableCell
                                  component="th"
                                  id={labelId}
                                  scope="row"
                                  padding="none"
                                >
                                  <strong>{row.deliverableName}</strong>
                                </TableCell>
                                <TableCell align="left">
                                  {row.department[0].department}
                                </TableCell>

                                <TableCell align="left">
                                  {row.department[0].roles[0].role}
                                </TableCell>
                                <TableCell align="left">
                                  {row.employeeroleLevel}
                                </TableCell>
                                <TableCell align="left">
                                  <strong>{row.vendorName}</strong>
                                </TableCell>
                                <TableCell align="left">{`$${row.price
                                  .toString()
                                  .replace(
                                    /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                                    ","
                                  )}`}</TableCell>
                                <TableCell align="left">
                                  <MenuPopup
                                    moduleName="Role"
                                    handleMenuClick={handleMenuClick}
                                    row={row}
                                  />
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        {emptyRows > 0 && (
                          <TableRow
                            style={{
                              height: (dense ? 33 : 53) * emptyRows,
                            }}
                          >
                            <TableCell colSpan={6} />
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </Form>
                )}
              </Formik>
            </TableContainer>
          </Paper>
        </Box>
      </MainTable>
     
    </>
  );
}
