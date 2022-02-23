import React, { useEffect, useState } from "react";
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
import { useRouter } from "next/router";

// Other
import { MainTable } from "../tableControls.style";
import FooterNav from "../layout/FooterNav";
import FormDrawer from "./RightDrawer";
import Image from "next/image";
import layout from "../../styles/layout.module.scss";
import { toast } from "react-toastify";
import axios from "axios";
import tokenExpired from "../layout/withAuth/tokenExpired";
import moment from "moment";
import { MenuPopupUser } from "./MenuPopUp.js";
import Loader from "../Loader";

function createData(FullName, Email, UserRole, Registration, LastLogin) {
  return {
    FullName,
    Email,
    UserRole,
    Registration,
    LastLogin,
  };
}

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
    id: "fullName",
    disablePadding: true,
    label: "Full Name",
  },
  {
    id: "email",
    disablePadding: false,
    label: "Email",
  },
  {
    id: "userRole",
    disablePadding: false,
    label: "User Role",
  },
  {
    id: "registrationDate",
    disablePadding: false,
    label: "Registration",
  },
  {
    id: "lastLogin",
    disablePadding: false,
    label: "Last Login",
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
    console.log("working");
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount - 1}
            checked={
              rowCount > 0 && numSelected > 0 && numSelected === rowCount - 1
            }
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
  const router = useRouter();

  const {
    users,
    updatingUsers,
    handlesingleDeleteUsers,
    handleMultipleDeleteUsers,
  } = props;
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("Role");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [isOpen, setIsOpen] = React.useState(false);
  const [rows, setRows] = React.useState(users);
  const [Drawerstate, setDrawerstate] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [userInfo, setUserInfo] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [drawerRow, setdrawerRow] = React.useState("");
  const authDetails = JSON.parse(localStorage.getItem("authDetails"));

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows
        .filter((n) => authDetails.userId != n.userId)
        .map((n) => n.userId);
      setSelected(newSelecteds);
      handleMultipleDeleteUsers(newSelecteds);

      return;
    }
    setSelected([]);
    handleMultipleDeleteUsers([]);
  };

  const handleClick = (event, userId) => {
    const selectedIndex = selected.indexOf(userId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, userId);
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

    setSelected(newSelected);
    handleMultipleDeleteUsers(newSelected);
  };

  const isSelected = (userId) => selected.indexOf(userId) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  // handle menu click
  const handleMenuClick = (value, row, selectedRow, event) => {
    if (value.Name === "Edit") {
      setIsOpen(!isOpen);
      toggleDrawer("right", true, "edit", row);
    }
    if (value.Name === "Deactivate" || value.Name === "Activate") {
      handleActivateDeactivate(row);
    }
    if (value.Name === "Delete") {
      handlesingleDeleteUsers(row);
    }
    if (value.Name === "Re-Invite") {
      handleReInviteUser(row);
    }
  };

  //handle activate and deactivate
  const handleActivateDeactivate = async (row) => {
    setLoading(true);
    try {
      const response = await axios({
        method: "put",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/change-status?userId=${
          row.userId
        }&requestedUserId=${authDetails.userId}&status=${!row.enabled}`,
        headers: { Authorization: `Bearer ${authDetails.jwt}` },
      });
      if (response && response.data) {
        toast.success(response.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        updatingUsers();
      } else {
        toast.error(
          `${response.data.error ? response.data.error : "error while login"}`,
          {
            position: toast.POSITION.BOTTOM_RIGHT,
          }
        );
      }
    } catch (err) {
      tokenExpired(err, router);
    }
    setLoading(false);
  };

  // handleReInviteUser
  const handleReInviteUser = async (row) => {
    setLoading(true);
    try {
      const response = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/reinvite?email=${row.email}&userId=${authDetails.userId}`,
        headers: { Authorization: `Bearer ${authDetails.jwt}` },
      });
      if (response && response.data) {
        toast.success(response.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        updatingUsers();
      } else {
        toast.error(
          `${response.data.error ? response.data.error : "error while login"}`,
          {
            position: toast.POSITION.BOTTOM_RIGHT,
          }
        );
      }
    } catch (err) {
      tokenExpired(err, router);
    }
    setLoading(false);
  };

  useEffect(() => {
    setRows(users);
  }, [users]);

  const toggleDrawer = (anchor, open, edit, row) => {
    open
      ? (setUserInfo(edit ? false : true), setdrawerRow(row))
      : setUserInfo(false);
    setDrawerstate({ ...Drawerstate, [anchor]: open });
  };

  return (
    <>
      <Loader loading={loading} />

      <MainTable>
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <TableContainer sx={{ minHeight: "400px", maxHeight: "540px" }}>
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
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.userId);
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <TableRow
                          hover
                          // onClick={(event) => toggleDrawer("right", true)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={index}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={
                                authDetails.userId != row.userId &&
                                isItemSelected
                              }
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                              onClick={(event) =>
                                handleClick(event, row.userId)
                              }
                              disabled={authDetails.userId == row.userId}
                            />
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            adding="none"
                            onClick={(event) => {
                              toggleDrawer("right", true, "", row);
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            <span className={layout.flex_center}>
                              <Image
                                src={
                                  row.profileLogo
                                    ? row.profileLogo
                                    : "/icons/user-avatar.svg"
                                }
                                width="40"
                                height="40"
                                alt=""
                              />
                              <span className={layout.ml_10}>
                                {row.fullName}
                              </span>
                            </span>
                          </TableCell>
                          <TableCell align="left">{row.email}</TableCell>
                          <TableCell align="left">{row.userRole}</TableCell>
                          <TableCell align="left">
                            {row.registrationDate &&
                              moment(row.registrationDate).format("ll")}
                          </TableCell>
                          <TableCell align="left">
                            {row.lastLogin &&
                              moment(row.lastLogin).format("ll")}
                          </TableCell>
                          <TableCell align="left">
                            <MenuPopupUser
                              moduleName="User"
                              handleMenuClick={handleMenuClick}
                              verified={row.verified}
                              enabled={row.enabled}
                              row={row}
                              selectedRow={selected}
                              authDetails={authDetails}
                            />
                            <FormDrawer
                              toggleDrawer={toggleDrawer}
                              Drawerstate={Drawerstate}
                              setDrawerstate={setDrawerstate}
                              userInfo={userInfo}
                              setUserInfo={setUserInfo}
                              row={drawerRow}
                              handlesingleDeleteUsers={handlesingleDeleteUsers}
                              authDetails={authDetails}
                              updatingUsers={updatingUsers}
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
            </TableContainer>
          </Paper>
        </Box>
      </MainTable>
    </>
  );
}
