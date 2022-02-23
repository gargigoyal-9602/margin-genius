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
import styles from "../../styles/login.module.scss";
import { toast } from "react-toastify";
// Other
import { MainTable } from "../../components/tableControls.style";
import FooterNav from "../../components/layout/FooterNav";
import Image from "next/image";
import layout from "../../styles/layout.module.scss";
import axios from "axios";
import { validationSchema } from "../../validators/roles.validators";
import RolesListing from "./RolesListing";
import { Form, Formik } from "formik";
import tokenExpired from "../layout/withAuth/tokenExpired";
import { useRouter } from "next/router";
import currency from "currency.js";

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
    id: "department",
    disablePadding: false,
    label: "Department",
  },
  {
    id: "role",
    disablePadding: false,
    label: "Role",
  },
  {
    id: "employeeLevel",
    disablePadding: false,
    label: "Employee",
  },
  {
    id: "yearlySalary",
    disablePadding: false,
    label: "Yearly Salary",
  },
  {
    id: "hourlySalary",
    disablePadding: false,
    label: "Hourly Salary",
  },
  {},
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
        {headCells.map(
          (headCell, index) =>
            index < headCells.length - 1 && (
              <TableCell
                key={headCell.id}
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
        )}
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
  const router = useRouter();
  React.useEffect(() => {
    props.setRoles(
      props.roles.map((role) => {
        return { ...role, isCreateNewRow: false, isEdit: false };
      })
    );
  }, []);

  const [editToggle, setEditToggle] = React.useState(false);
  const [toggle1, setToggle1] = React.useState(false);
  const [editRoles, seteditRoles] = React.useState({
    department: "",
    departmentId: "",
    role: "",
    roleId: "",
    employeeLevel: "",
    yearlySalary: "",
    hourlySalary: "",
  });

  const modifyRoles = async (values) => {
    const authDetails = JSON.parse(localStorage.getItem("authDetails"));

    const { jwt, userId, orgId } = authDetails;
    try {
      const response = await axios({
        method: "put",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/role`,
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
        data: {
          userId: userId,
          orgId: orgId,
          departmentId: JSON.parse(localStorage.getItem("deptId")),
          role: values.role,
          roleId: values.roleId,
          employeeLevel: values.employeeLevel,
          yearlySalary: currency(values.yearlySalary).value,
          hourlySalary: values.hourlySalary,
        },
      });
      if (response && response.data) {
        props.getRols();
        props.setRoles(
          props.roles.map((role) => {
            if (role.isEdit) {
              return { ...role, isEdit: false };
            } else {
              return role;
            }
          })
        );
        toast.success(response.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
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

  const handleEditCancel = () => {
    setEditToggle(!editToggle);
    props.setRoles(
      props.roles.map((role) => {
        if (role.isEdit) {
          setToggle1(false);
          return { ...role, isEdit: false };
        } else {
          return role;
        }
      })
    );
  };

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("Role");
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props.roles.map((n) => n.roleId);
      props.setSelected(newSelecteds);
      return;
    }
    props.setSelected([]);
  };

  const handleClick = (event, roleId) => {
    const selectedIndex = props.selected.indexOf(roleId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(props.selected, roleId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(props.selected.slice(1));
    } else if (selectedIndex === props.selected.length - 1) {
      newSelected = newSelected.concat(props.selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        props.selected.slice(0, selectedIndex),
        props.selected.slice(selectedIndex + 1)
      );
    }

    props.setSelected(newSelected);
  };

  const isSelected = (roleId) => props.selected.indexOf(roleId) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <>
      <MainTable>
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <TableContainer sx={{ minHeight: "400px", maxHeight: "500px" }}>
              <Formik
                enableReinitialize
                initialValues={editRoles}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  modifyRoles(values);
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
                }) => (
                  <Form className={styles.form}>
                    <Table
                      stickyHeader
                      sx={{ minWidth: 750 }}
                      aria-labelledby="tableTitle"
                      size={dense ? "small" : "medium"}
                    >
                      <EnhancedTableHead
                        numSelected={props.selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={props.roles.length}
                      />
                      <TableBody>
                        {stableSort(props.roles, getComparator(order, orderBy))
                          .reverse()
                          .filter((role) => {
                            if (role.role === undefined) {
                              return role;
                            } else {
                              return (
                                role.role
                                  .toLowerCase()
                                  .includes(props.searchText.toLowerCase()) ||
                                role.department
                                  .toLowerCase()
                                  .includes(props.searchText.toLowerCase())
                              );
                            }
                          })
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((row, index) => {
                            const isItemSelected = isSelected(row.roleId);
                            const labelId = `enhanced-table-checkbox-${index}`;
                            return (
                              <>
                                <RolesListing
                                  row={row}
                                  isItemSelected={isItemSelected}
                                  handleClick={handleClick}
                                  editRoles={editRoles}
                                  seteditRoles={seteditRoles}
                                  handleEditCancel={handleEditCancel}
                                  roles={props.roles}
                                  setRoles={props.setRoles}
                                  moduleName="Role"
                                  labelId={labelId}
                                  values={values}
                                  errors={errors}
                                  touched={touched}
                                  editToggle={editToggle}
                                  setEditToggle={setEditToggle}
                                  handleChange={handleChange}
                                  handleBlur={handleBlur}
                                  setFieldValue={setFieldValue}
                                  toggle1={toggle1}
                                  setToggle1={setToggle1}
                                  resetForm={resetForm}
                                />
                              </>
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
