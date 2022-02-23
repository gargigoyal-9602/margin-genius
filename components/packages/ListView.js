import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  MainTable,
  InsideTable,
  TooltipBox,
  NewSwitch,
  SwitchWrap
} from "../../components/tableControls.style";
import { MenuPopup } from "./MenuPopUp.js";
import layout from "../../styles/layout.module.scss";
import Image from "next/image";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";
import { EditPackages } from "./EditPackages";
import { EditDeliverables } from "./EditDeliverables";
import { OutlineButton } from "../formControls.style";
import {
  EditvalidationSchema,
  deliverablevalidationSchema,
} from "../../validators/packages.validators";
import { Form, Formik, useFormikContext } from "formik";
import { AntSwitch } from "../../components/tableControls.style";
import FormControlLabel from "@mui/material/FormControlLabel";
import FooterNav from "../layout/FooterNav";

const Row = (props) => {
  const {
    deliverables,
    row,
    handleMenuClick,
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
    isRowEdit,
    rowEdit,
    handleEditPackages,
    isItemSelected,
    handleClick,
    deleteIds,
    setDeleteIds,
    deleteDisabled,
    setDeleteDisabled,
    isEditdeliv,
    setisEditdeliv,
    delivEdit,
    setdelivEdit,
    createdeliverables,
    handleCreateDeliverable,
    handleEditDeliverable,
    deleteDeliverbles,
    createPackageId,
    setCreatePackageId,
    setinitialFormValuesDeliverables,
    setCreatedeliverablesRow,
    openDelete,
    setOpenDelete,
    delivDelete,
    setdelivDelete,
    openAccordian,
    setOpenAccordian,
  } = props;
  
  return (
    <React.Fragment>
      {isRowEdit && rowEdit.packageId == row.packageId ? (
        <EditPackages
          createPackages={createPackages}
          handleCreatePackages={handleCreatePackages}
          departments={departments}
          values={values}
          errors={errors}
          touched={touched}
          handleChange={handleChange}
          handleBlur={handleBlur}
          setFieldValue={setFieldValue}
          resetForm={resetForm}
          isRowEdit={isRowEdit}
          rowEdit={rowEdit}
          handleEditPackages={handleEditPackages}
        />
      ) : (
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell style={{ width: 30, padding: 0 }}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() =>
                setOpenAccordian({
                  ...openAccordian,
                  [row.packageId]: !openAccordian[row.packageId],
                })
              }
            >
              {openAccordian[row.packageId] ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </IconButton>
          </TableCell>
          <TableCell
            padding="checkbox"
            style={{ padding: 0 }}
            onClick={(event) => handleClick(event, row.packageId)}
          >
            <Checkbox color="primary" checked={isItemSelected} />
          </TableCell>
          <TableCell component="th" scope="row">
            <strong>{row.packageName}</strong>
          </TableCell>
          <TableCell>
            <strong>{`${row.overallPrice && "$"}${row.overallPrice
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}`}</strong>
          </TableCell>
          <TableCell>{row.departmentName}</TableCell>
          <TableCell>{row.minRoleLevel}</TableCell>
          <TableCell>{row.noOfDeliverables}</TableCell>
          <TableCell>
            <MenuPopup
              moduleName="Role"
              handleMenuClick={handleMenuClick}
              row={row}
            />
          </TableCell>
        </TableRow>
      )}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse
            in={openAccordian[row.packageId]}
            timeout="auto"
            unmountOnExit
          >
            <Box sx={{ margin: 1 }}>
              <InsideTable>
                <Table
                  sx={{ minWidth: 750 }}
                  aria-labelledby="collapsible table"
                >
                  {(row.packageDeliverables.length > 0 ||
                    createdeliverables) && (
                    <TableHead>
                      <TableRow>
                        <TableCell />
                        <TableCell>Price</TableCell>
                        <TableCell>Phase</TableCell>
                        <TableCell>Department</TableCell>
                        <TableCell>Mandatory</TableCell>
                        <TableCell>Role Level</TableCell>
                        <TableCell>Frequency</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>QTY Editable</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                  )}

                  <TableBody>
                    {createdeliverables && createPackageId == row.packageId && (
                      <EditDeliverables
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        setFieldValue={setFieldValue}
                        resetForm={resetForm}
                        isEditdeliv={isEditdeliv}
                        setisEditdeliv={setisEditdeliv}
                        delivEdit={delivEdit}
                        setdelivEdit={setdelivEdit}
                        createdeliverables={createdeliverables}
                        handleCreateDeliverable={handleCreateDeliverable}
                        handleEditDeliverable={handleEditDeliverable}
                        deliverables={deliverables}
                        row={row}
                      />
                    )}

                    {row.packageDeliverables.length > 0 &&
                      row.packageDeliverables.map((deliverable, index) => {
                        return isEditdeliv &&
                          delivEdit.deliverablesPackageId ==
                            deliverable.deliverablesPackageId ? (
                          <EditDeliverables
                            key={deliverable.deliverableId}
                            values={values}
                            errors={errors}
                            touched={touched}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            setFieldValue={setFieldValue}
                            resetForm={resetForm}
                            isEditdeliv={isEditdeliv}
                            setisEditdeliv={setisEditdeliv}
                            delivEdit={delivEdit}
                            setdelivEdit={setdelivEdit}
                            createdeliverables={createdeliverables}
                            handleCreateDeliverable={handleCreateDeliverable}
                            handleEditDeliverable={handleEditDeliverable}
                            deliverables={deliverables}
                            row={row}
                          />
                        ) : (
                          <TableRow key={deliverable.deliverableId}>
                            <TableCell component="th" scope="row">
                              <strong>{deliverable.deliverableName}</strong>
                            </TableCell>
                            <TableCell>
                              <strong>{`$${deliverable.price
                                .toString()
                                .replace(
                                  /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                                  ","
                                )}`}</strong>
                            </TableCell>
                            <TableCell>{deliverable.phase}</TableCell>
                            <TableCell>{row.departmentName}</TableCell>
                            <TableCell>
                              <FormControlLabel
                                control={
                                  <SwitchWrap>
                                    <NewSwitch
                                      checked={deliverable.mandatory}
                                      disabled
                                    />
                                    </SwitchWrap>
                                }
                                label=""
                              />
                            </TableCell>
                            <TableCell>{deliverable.employeeLevel}</TableCell>
                            <TableCell>{deliverable.frequency}</TableCell>
                            <TableCell>{deliverable.quantity}</TableCell>
                            <TableCell>
                              <FormControlLabel
                                control={
                                  <SwitchWrap>
                                    <NewSwitch
                                      checked={deliverable.quantitEyditable}
                                      disabled
                                    />
                                    </SwitchWrap>
                                }
                                label=""
                              />
                            </TableCell>
                            <TableCell>
                              <div className={layout.flex_center}>
                                <span
                                  className={layout.mr_10}
                                  onClick={() => {
                                    createPackages && handleCreatePackages();
                                    isRowEdit && handleEditPackages();
                                    createdeliverables &&
                                      handleCreateDeliverable();

                                    setisEditdeliv(true);
                                    setCreatePackageId(row.packageId);

                                    setinitialFormValuesDeliverables({
                                      roleId: deliverable.roleId || "",
                                      deliverableId:
                                        deliverable.deliverableId || "",
                                      price: deliverable.price || "",
                                      phase: deliverable.phase || "",
                                      mandatory: deliverable.mandatory || "",
                                      employeeLevel:
                                        deliverable.employeeLevel || "",
                                      frequency: deliverable.frequency || "",
                                      quantity: deliverable.quantity || "",
                                      quantityEditable:
                                        deliverable.quantityEditable || false,
                                    });
                                    setdelivEdit(deliverable);
                                    setCreatedeliverablesRow(row);
                                  }}
                                >
                                  <Image
                                    src="/icons/edit-row.svg"
                                    alt=""
                                    height="15"
                                    width="15"
                                  />
                                </span>
                                <span
                                  className={layout.ml_10}
                                  onClick={() => {
                                    // deleteDeliverbles(
                                    //   deliverable.deliverablesPackageId,
                                    //   row.packageId
                                    // )
                                    setdelivDelete([
                                      deliverable.deliverablesPackageId,
                                      row.packageId,
                                    ]);
                                    setOpenDelete(!openDelete);
                                    setOpenDelete(!openDelete);
                                  }}
                                >
                                  <Image
                                    src="/icons/delete-icon2.svg"
                                    alt=""
                                    height="15"
                                    width="15"
                                  />
                                </span>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </InsideTable>
              <OutlineButton
                aligncenter="true"
                fixwidth="auto"
                marginbottom="0"
                style={{ border: 0, margin: "15px 0" }}
                onClick={() => {
                  createPackages && handleCreatePackages();
                  isRowEdit && handleEditPackages();
                  !createdeliverables && handleCreateDeliverable();
                  setisEditdeliv(false);
                  setCreatePackageId(row.packageId);
                  setCreatedeliverablesRow(row);
                }}
              >
                <span className={layout.flex_top}>
                  <Image
                    src="/icons/plus-icon-green.svg"
                    width="16"
                    height="16"
                    alt=""
                  />
                </span>
                <span className={layout.ml_10}>Add Deliverable</span>
              </OutlineButton>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

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

//table head

const headCells = [
  {
    id: "packageName",
    disablePadding: true,
    label: "Name of Package",
  },
  {
    id: "overallPrice",
    disablePadding: false,
    label: "Overall Price",
  },
  {
    id: "departmentId",
    disablePadding: false,
    label: "Department",
  },
  {
    id: "minRoleLevel",
    disablePadding: false,
    label: "Minimum Role Level",
  },
  {
    id: "packageDeliverables",
    disablePadding: false,
    label: "Deliverables",
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
        <TableCell />
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
            style={{ padding: 0 }}
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

export default function CollapsibleTable(props) {
  const myRef = React.useRef(null);
  const {
    deliverable,
    handleCreatePackages,
    createPackages,
    departments,
    packages,
    isRowEdit,
    setisRowEdit,
    handleEditPackages,
    rowEdit,
    setRowEdit,
    PostcreatePackages,
    deleteIds,
    setDeleteIds,
    deleteDisabled,
    setDeleteDisabled,
    openDelete,
    setOpenDelete,
    isEditdeliv,
    setisEditdeliv,
    delivEdit,
    setdelivEdit,
    createdeliverables,
    handleCreateDeliverable,
    handleEditDeliverable,
    deleteDeliverbles,
    PostcreateDeliverable,
    editDeliverable,
    UpdatePackages,
    delivDelete,
    setdelivDelete,
    openAccordian,
    setOpenAccordian,
  } = props;
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("Role");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);
  const [rows, setRows] = React.useState(packages);
  const [createdeliverablesRow, setCreatedeliverablesRow] = React.useState("");
  const [createPackageId, setCreatePackageId] = React.useState("");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const [initialFormValues, setinitialFormValues] = React.useState({
    packageName: "",
    departmentId: "",
    deliverableName: "",
    packageDeliverables: "",
    minRoleLevel: "",
    overallPrice: "",
  });
  const [initialFormValuesDeliverables, setinitialFormValuesDeliverables] =
    React.useState({
      roleId: "",
      deliverableId: "",
      price: "",
      phase: "",
      mandatory: false,
      employeeLevel: "",
      frequency: "",
      quantity: "",
      quantityEditable: false,
    });
  const handleMenuClick = (value, row) => {
    if (value.Name === "Edit") {
      createPackages && handleCreatePackages();
      setisRowEdit(true);
      setRowEdit(row);
      setinitialFormValues({
        packageName: row.packageName || "",
        departmentId: row.departmentId || "",
        deliverableName: row.deliverableName || "",
        packageDeliverables: row.packageDeliverables.length || "",
        minRoleLevel: row.minRoleLevel || "",
        overallPrice: row.overallPrice || "",
      });
    }

    if (value.Name === "Delete") {
      setDeleteIds([row.packageId]);
      setOpenDelete(!openDelete);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.packageId);
      setSelected(newSelecteds);
      setDeleteIds(newSelecteds);

      return;
    }
    setSelected([]);
  };

  const handleClick = (event, packageId) => {
    const selectedIndex = selected.indexOf(packageId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, packageId);
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
  const isSelected = (packageId) => selected.indexOf(packageId) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  //scroll to view
  const executeScroll = () => {
    myRef && myRef.current && myRef.current.scrollIntoView();
  };
  React.useEffect(() => {
    createPackages &&
      setinitialFormValues({
        packageName: "",
        departmentId: "",
        deliverableName: "",
        packageDeliverables: "",
        minRoleLevel: "",
        overallPrice: "",
      });
    createPackages &&
      (isEditdeliv
        ? handleEditDeliverable()
        : createdeliverables && handleCreateDeliverable());
    // executeScroll();
  }, [createPackages]);
  React.useEffect(() => {
    isRowEdit &&
      (isEditdeliv
        ? handleEditDeliverable()
        : createdeliverables && handleCreateDeliverable());
  }, [isRowEdit]);
  React.useEffect(() => {
    setRows(packages);
  }, [packages]);
  React.useEffect(() => {
    createdeliverables &&
      setinitialFormValuesDeliverables({
        roleId: "",
        deliverableId: "",
        price: "",
        phase: "",
        mandatory: false,
        employeeLevel: "",
        frequency: "",
        quantity: "",
        quantityEditable: false,
      });
  }, [createdeliverables]);
  React.useEffect(() => {
    if (selected.length > 0) {
      deleteDisabled && setDeleteDisabled(!deleteDisabled);
    } else {
      setDeleteDisabled(true);
    }
  }, [selected]);
  return (
    <>
      <MainTable>
        <TableContainer sx={{ minHeight: "400px", maxHeight: "540px" }}>
          <Formik
            enableReinitialize
            initialValues={
              isEditdeliv || createdeliverables
                ? initialFormValuesDeliverables
                : initialFormValues
            }
            validationSchema={
              isEditdeliv || createdeliverables
                ? deliverablevalidationSchema
                : EditvalidationSchema
            }
            onSubmit={(values, { resetForm }) => {
              createPackages && PostcreatePackages(values);
              isRowEdit && UpdatePackages(rowEdit, values);
              createdeliverables &&
                PostcreateDeliverable(createdeliverablesRow, values);
              isEditdeliv &&
                editDeliverable(createdeliverablesRow, delivEdit, values);
              setTimeout(() => {
                resetForm({ values: "" });
              }, [3000]);
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
              <Form className={layout.form}>
                <Table
                  stickyHeader
                  sx={{ minWidth: 750 }}
                  aria-labelledby="collapsible table"
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
                    {createPackages && (
                      // <div ref={myRef}>
                      <EditPackages
                        createPackages={createPackages}
                        handleCreatePackages={handleCreatePackages}
                        departments={departments}
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        setFieldValue={setFieldValue}
                        resetForm={resetForm}
                        isRowEdit={isRowEdit}
                        rowEdit={rowEdit}
                        handleEditPackages={handleEditPackages}
                      />
                      //  </div>
                    )}
                    {stableSort(rows, getComparator(order, orderBy))
                      // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {
                        const isItemSelected = isSelected(row.packageId);
                        const labelId = `enhanced-table-checkbox-${index}`;
                        return (
                          <Row
                            key={row.packageId}
                            row={row}
                            isItemSelected={isItemSelected}
                            handleMenuClick={handleMenuClick}
                            createPackages={createPackages}
                            handleCreatePackages={handleCreatePackages}
                            departments={departments}
                            values={values}
                            errors={errors}
                            touched={touched}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            setFieldValue={setFieldValue}
                            resetForm={resetForm}
                            isRowEdit={isRowEdit}
                            rowEdit={rowEdit}
                            handleEditPackages={handleEditPackages}
                            handleClick={handleClick}
                            deleteIds={deleteIds}
                            setDeleteIds={setDeleteIds}
                            isEditdeliv={isEditdeliv}
                            setisEditdeliv={setisEditdeliv}
                            delivEdit={delivEdit}
                            setdelivEdit={setdelivEdit}
                            createdeliverables={createdeliverables}
                            handleCreateDeliverable={handleCreateDeliverable}
                            handleEditDeliverable={handleEditDeliverable}
                            deleteDeliverbles={deleteDeliverbles}
                            createPackageId={createPackageId}
                            setCreatePackageId={setCreatePackageId}
                            deliverables={deliverable}
                            setinitialFormValuesDeliverables={
                              setinitialFormValuesDeliverables
                            }
                            createdeliverablesRow={createdeliverablesRow}
                            setCreatedeliverablesRow={setCreatedeliverablesRow}
                            openDelete={openDelete}
                            setOpenDelete={setOpenDelete}
                            delivDelete={delivDelete}
                            setdelivDelete={setdelivDelete}
                            index={index}
                            openAccordian={openAccordian}
                            setOpenAccordian={setOpenAccordian}
                          />
                        );
                      })}
                  </TableBody>
                </Table>
                <OutlineButton
                  aligncenter="true"
                  fixwidth="auto"
                  marginbottom="0"
                  style={{ border: 0, margin: "15px 0" }}
                  onClick={() => {
                    !createPackages && handleCreatePackages();
                    setRowEdit("");
                    isRowEdit && handleEditPackages();
                  }}
                >
                  <span className={layout.flex_top}>
                    <Image
                      src="/icons/plus-icon-green.svg"
                      width="16"
                      height="16"
                      alt=""
                    />
                  </span>
                  <span className={layout.ml_10}>Add Another Package</span>
                </OutlineButton>
              </Form>
            )}
          </Formik>
        </TableContainer>
      </MainTable>
    </>
  );
}
