import * as React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { MainTable } from "../tableControls.style";
import { MenuPopup } from "./MenuPopUp.js";
import layout from "../../styles/layout.module.scss";
import Image from "next/image";
import Checkbox from "@mui/material/Checkbox";
import { MenuList, TextWrap } from "../calculators/Calculators.style";
import { SwitchWrap, NewSwitch } from "../../components/tableControls.style";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Form, Formik, useFormikContext } from "formik";
import { OutlineButton, InputText } from "../formControls.style";
import styles from "../../styles/login.module.scss";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import { ProposalEdit } from "./EditProposal";
import { validationSchema } from "../../validators/proposal.validators";
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
    id: "title",
    disablePadding: true,
    label: "Title",
  },
  {
    id: "calculatorIds",
    disablePadding: false,
    label: "Calculators",
  },
  {
    id: "fileFormat",
    disablePadding: false,
    label: "File Format",
  },
  {
    id: "pcSettings",
    disablePadding: false,
    label: "P/C Settings",
  },
  {
    id: "companyLogo",
    disablePadding: false,
    label: "Company Logo",
  },
  {
    id: "companyName",
    disablePadding: false,
    label: "Company Name",
  },
  {
    id: "tvc",
    disablePadding: false,
    label: "TCV",
  },
  {
    id: "mvc",
    disablePadding: false,
    label: "MCV",
  },
  {
    id: "contractLength",
    disablePadding: false,
    label: "Contract Length",
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

export default function CollapsibleTable(props) {
  const {
    proposals,
    createProposals,
    setCreateProposals,
    editProposals,
    setEditProposals,
    PostcreateProposal,
    deleteIds,
    setDeleteIds,
    setOpenDelete,
    openDelete,
    deleteDisabled,
    setDeleteDisabled,
    calculators,
  } = props;
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("Role");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(500);
  const [rows, setRows] = React.useState(proposals);
  const [rowEditId, setRowEditId] = React.useState("");
  const [initialFormValues, setinitialFormValues] = React.useState({
    title: "",
    calculatorIds: [],
    fileFormat: [],
    pcSettings: {
      setupFees: false,
      customDeliverables: false,
      frequencyOfDeliverables: false,
      phaseOfDeliverables: false,
      quantityOfDeliverables: false,
      itemizedPricingOfDeliverables: false,
    },
    companyLogo: false,
    companyName: false,
    tvc: false,
    mvc: false,
    contractLength: false,
  });
  const [open, setOpen] = React.useState(false);

  const [selectList, setSelectList] = React.useState(null);
  const openMenu = Boolean(selectList);
  const handleClick1 = (event) => {
    setSelectList(event.currentTarget);
  };
  const handleClose = () => {
    setSelectList(null);
  };

  const [selectList2, setSelectList2] = React.useState(null);
  const openMenu2 = Boolean(selectList2);
  const handleClick2 = (event) => {
    setSelectList2(event.currentTarget);
  };
  const handleClose2 = () => {
    setSelectList2(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.proposalContractId);
      setSelected(newSelecteds);
      setDeleteIds(newSelecteds);

      return;
    }
    setSelected([]);
  };

  const handleClick = (event, proposalContractId) => {
    const selectedIndex = selected.indexOf(proposalContractId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, proposalContractId);
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
  const isSelected = (proposalContractId) =>
    selected.indexOf(proposalContractId) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleMenuClick = (value, row) => {
    if (value.Name === "Edit") {
      createProposals && setCreateProposals(!createProposals);
      setEditProposals(true);
      setRowEditId(row);
    }

    if (value.Name === "Delete") {
      setDeleteIds([row.proposalContractId]);
      setOpenDelete(!openDelete);
    }
  };

  React.useEffect(() => {
    setRows(proposals);
  }, [proposals]);
  React.useEffect(() => {
    editProposals
      ? setinitialFormValues({
          title: rowEditId.title,
          calculatorIds: rowEditId.calculatorIds,
          fileFormat: rowEditId.fileFormat.split(","),
          pcSettings: rowEditId.pcSettings,
          companyLogo: rowEditId.companyLogo,
          companyName: rowEditId.companyName,
          tvc: rowEditId.tvc,
          mvc: rowEditId.mvc,
          contractLength: rowEditId.contractLength,
        })
      : setinitialFormValues({
          title: "",
          calculatorIds: [],
          fileFormat: [],
          pcSettings: {
            setupFees: false,
            customDeliverables: false,
            frequencyOfDeliverables: false,
            phaseOfDeliverables: false,
            quantityOfDeliverables: false,
            itemizedPricingOfDeliverables: false,
          },
          companyLogo: false,
          companyName: false,
          tvc: false,
          mvc: false,
          contractLength: false,
        });
  }, [editProposals, rowEditId]);

  React.useEffect(() => {
    if (selected.length > 0) {
      deleteDisabled && setDeleteDisabled(!deleteDisabled);
    } else {
      setDeleteDisabled(true);
    }
  }, [selected]);
  return (
    <MainTable>
      <TableContainer sx={{ minHeight: "400px", maxHeight: "540px" }}>
        <Formik
          enableReinitialize
          initialValues={initialFormValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            PostcreateProposal(values, rowEditId);
            createProposals && setCreateProposals(!createProposals);
            editProposals && setEditProposals(!editProposals);
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
                  {createProposals && (
                    <ProposalEdit
                      createProposals={createProposals}
                      values={values}
                      errors={errors}
                      touched={touched}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      setFieldValue={setFieldValue}
                      resetForm={resetForm}
                      createProposals={createProposals}
                      setCreateProposals={setCreateProposals}
                      editProposals={editProposals}
                      setEditProposals={setEditProposals}
                      rowEditId={rowEditId}
                      initialFormValues={initialFormValues}
                      calculators={calculators}
                    />
                  )}
                  {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.proposalContractId);
                      const pcSetting = Object.keys(row.pcSettings).filter(
                        (item) => row.pcSettings[item] != false
                      );
                      const calculatorName =
                        calculators &&
                        calculators.filter(
                          (calc) => calc.id == row.calculatorIds[0]
                        )[0];

                      const labelId = `enhanced-table-checkbox-${index}`;
                      return editProposals &&
                        rowEditId.proposalContractId ==
                          row.proposalContractId ? (
                        <ProposalEdit
                          createProposals={createProposals}
                          values={values}
                          errors={errors}
                          touched={touched}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          setFieldValue={setFieldValue}
                          resetForm={resetForm}
                          createProposals={createProposals}
                          setCreateProposals={setCreateProposals}
                          editProposals={editProposals}
                          setEditProposals={setEditProposals}
                          calculators={calculators}
                        />
                      ) : (
                        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                          <TableCell
                            padding="checkbox"
                            onClick={(event) =>
                              handleClick(event, row.proposalContractId)
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
                          <TableCell component="th" scope="row">
                            {row.title}
                          </TableCell>
                          <TableCell>
                            {row.calculatorIds && row.calculatorIds.length > 1
                              ? `${row.calculatorIds.length} Calculators`
                              : calculatorName && calculatorName.name}
                          </TableCell>
                          <TableCell>
                            {row.fileFormat.split(",").length > 1
                              ? `${
                                  row.fileFormat.split(",").length
                                } File Formats`
                              : row.fileFormat}
                          </TableCell>
                          <TableCell>
                            {pcSetting.length > 1
                              ? `${pcSetting.length} P/C Settings`
                              : pcSetting[0]}
                          </TableCell>
                          <TableCell>
                            <SwitchWrap style={{ margin: 0 }}>
                              {" "}
                              <NewSwitch checked={row.companyLogo} />
                            </SwitchWrap>
                          </TableCell>
                          <TableCell>
                            <SwitchWrap style={{ margin: 0 }}>
                              {" "}
                              <NewSwitch checked={row.companyName} />
                            </SwitchWrap>
                          </TableCell>
                          <TableCell>
                            <SwitchWrap style={{ margin: 0 }}>
                              {" "}
                              <NewSwitch checked={row.tvc} />
                            </SwitchWrap>
                          </TableCell>
                          <TableCell>
                            <SwitchWrap style={{ margin: 0 }}>
                              {" "}
                              <NewSwitch checked={row.mvc} />
                            </SwitchWrap>
                          </TableCell>
                          <TableCell>
                            <SwitchWrap style={{ margin: 0 }}>
                              {" "}
                              <NewSwitch checked={row.contractLength} />
                            </SwitchWrap>
                          </TableCell>
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
                </TableBody>
              </Table>
            </Form>
          )}
        </Formik>
      </TableContainer>
    </MainTable>
  );
}
