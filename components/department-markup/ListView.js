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
import { Form, Formik } from "formik";
import styles from "../../styles/login.module.scss";
import InputAdornment from "@mui/material/InputAdornment";

// Other
import { MainTable } from "../../components/tableControls.style";
import FooterNav from "../../components/layout/FooterNav";
import Image from "next/image";
import layout from "../../styles/layout.module.scss";
import {
  validate,
  validationSchema,
} from "../../validators/department.validators";
import {
  MainButton,
  OutlineButton,
  EditRowBtn,
  InputText,
  RedOutlineButton,
  ErrorMsg,
} from "../../components/formControls.style";
import { MenuPopup } from "./MenuPopUp.js";
import { useFormik } from "formik";
import { set } from "date-fns";
import currency from "currency.js";

function createData(
  DepartmentName,
  WholsaleCost,
  MarkupMultiplier,
  MarginPercentage,
  SellingPrice,
  GrossMargin
) {
  return {
    DepartmentName,
    WholsaleCost,
    MarkupMultiplier,
    MarginPercentage,
    SellingPrice,
    GrossMargin,
  };
}

// const rows = [
//   createData("Web Design 1", "500", "3X", "% 20", "$ 5000", "$ 100"),
//   createData("Web Design 2", "500", "3X", "% 20", "$ 5000", "$ 100"),
//   createData("Web Design 3", "500", "3X", "% 20", "$ 5000", "$ 100"),
//   createData("Web Design 4", "500", "3X", "% 20", "$ 5000", "$ 100"),
//   createData("Web Design 5", "500", "3X", "% 20", "$ 5000", "$ 100"),
//   createData("Web Design 6", "500", "3X", "% 20", "$ 5000", "$ 100"),
// ];

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
    id: "departmentId",
    disablePadding: true,
    label: "Department",
  },
  {
    id: "wholesaleCost",
    disablePadding: false,
    label: "Wholsale Cost",
  },
  {
    id: "markupMultiplier",
    disablePadding: false,
    label: "Markup Multiplier",
  },
  {
    id: "grossmarginPercentage",
    disablePadding: false,
    label: "Margin Percentage",
  },
  {
    id: "sellingPrice",
    disablePadding: false,
    label: "Selling Price",
  },
  {
    id: "grossmarginAmount",
    disablePadding: false,
    label: "Gross Margin",
  },
  {
    sortDirection: false,
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
    check,
    setCheck,
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
            checked={rowCount >= 1 && numSelected === rowCount}
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
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("Role");
  // const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);
  const [dep, setDep] = React.useState("");
  const [wholCost, setWholCost] = React.useState("");
  const [markMul, setMarkMul] = React.useState("");
  const [marPercent, setMarPercent] = React.useState("");
  const [sellPrice, setSellPrice] = React.useState("");
  const [groMar, setGroMar] = React.useState("");
  const [depE, setDepE] = React.useState("");
  const [wholCostE, setWholCostE] = React.useState("");
  const [markMulE, setMarkMulE] = React.useState("");
  const [marPercentE, setMarPercentE] = React.useState("");
  const [sellPriceE, setSellPriceE] = React.useState("");
  const [groMarE, setGroMarE] = React.useState("");
  const [depName, setDepName] = React.useState("");
  const [wc, setWc] = React.useState("");
  const [check, setCheck] = React.useState();
  const [departs, setDeparts] = React.useState({
    department: "",
    wholesaleCost: "",
    markupMultiplier: "",
    grossmarginPercentage: "",
    sellingPrice: "",
    grossmarginAmount: "",
  });

  React.useEffect(() => {
    if (props.editId) {
      props.departments.map((ele) => {
        if (ele.departmentId == props.editId) {
          setDep(ele.department);
          setWholCost(ele.wholesaleCost);
          setMarkMul(ele.markupMultiplier);
          setMarPercent(ele.grossmarginPercentage);
          setSellPrice(ele.sellingPrice);
          setGroMar(ele.grossmarginAmount);
        }
      });
    }
  }, [props.editId, props.departments]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props.departments.map((n) => n.departmentId);
      props.setSelected(newSelecteds);
      return;
    }
    props.setSelected([]);
    setCheck(!check);
  };

  const handleClick = (event, Department) => {
    const selectedIndex = props.selected.indexOf(Department);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(props.selected, Department);
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

  const isSelected = (Department) => props.selected.indexOf(Department) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <>
      <MainTable>
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <TableContainer sx={{ minHeight: "400px", maxHeight: "540px" }}>
              <Formik
                enableReinitialize
                initialValues={
                  props.edit
                    ? {
                        department: dep,
                        wholesaleCost: wholCost,
                        markupMultiplier: markMul,
                        grossmarginPercentage: marPercent,
                        sellingPrice: sellPrice,
                        grossmarginAmount: groMar,
                      }
                    : {
                        department: "",
                        wholesaleCost: "",
                        markupMultiplier: "",
                        grossmarginPercentage: "",
                        sellingPrice: "",
                        grossmarginAmount: "",
                      }
                }
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                  if (props.editId) {
                    props.updateDepartment({
                      departmentId: props.editId,
                      Department: values.department,
                      WholeSaleCost: values.wholesaleCost,
                      markupMultiplier: values.markupMultiplier,
                      GrossMarginPercentage: values.grossmarginPercentage,
                      SellingPrice: values.sellingPrice,
                      GrossMargin: values.grossmarginAmount,
                    });
                    setDep("");
                    setWholCost("");
                    setMarkMul("");
                    setMarPercent("");
                    setSellPrice("");
                    setGroMar("");
                    setDepE("");
                    setWholCostE("");
                    setMarkMulE("");
                    setMarPercentE("");
                    setSellPriceE("");
                    setGroMarE("");
                    props.setEditId(null);
                    props.setEdit(false);
                    resetForm({ values: "" });
                  } else {
                    props.addDepartment({
                      Department: values.department,
                      WholeSaleCost: values.wholesaleCost,
                      markupMultiplier: values.markupMultiplier,
                      GrossMarginPercentage: values.grossmarginPercentage,
                      SellingPrice: values.sellingPrice,
                      GrossMargin: values.grossmarginAmount,
                    });
                    props.setAddedRow(false);
                    resetForm({ values: "" });
                  }
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
                        check={check}
                        setCheck={setCheck}
                        numSelected={props.selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={props.departments.length}
                      />
                      <TableBody>
                        {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                        {stableSort(
                          props.departments,
                          getComparator(order, orderBy)
                        )
                          .reverse()
                          .filter((ele) => {
                            if (ele.department === undefined) {
                              return ele;
                            } else {
                              return ele.department
                                .toLowerCase()
                                .includes(props.searchText.toLowerCase());
                            }
                          })
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((row, index) => {
                            const isItemSelected = isSelected(row.departmentId);
                            const labelId = `enhanced-table-checkbox-${index}`;
                            return (
                              <TableRow
                                className={
                                  row.departmentId == props.editId &&
                                  props.edit &&
                                  "editMode"
                                }
                                hover
                                role="checkbox"
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                key={row.DepartmentName}
                                selected={isItemSelected}
                              >
                                {row.departmentId == props.editId &&
                                props.edit ? (
                                  <>
                                    <TableCell align="left"></TableCell>
                                    <TableCell align="left">
                                      <InputText
                                        value={values.department}
                                        name="department"
                                        placeholder="Enter Department"
                                        type="text"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={
                                          touched.department &&
                                          Boolean(errors.department)
                                        }
                                      />
                                      <ErrorMsg name="department"></ErrorMsg>
                                    </TableCell>
                                    <TableCell align="left">
                                      <InputText
                                        value={values.wholesaleCost}
                                        InputProps={{
                                          startAdornment: (
                                            <InputAdornment position="start">
                                              $
                                            </InputAdornment>
                                          ),
                                        }}
                                        name="wholesaleCost"
                                        placeholder="500"
                                        onBlur={() => {
                                          setFieldValue(
                                            "wholesaleCost",
                                            values.wholesaleCost
                                              .toString()
                                              .replace(
                                                /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                                                ","
                                              )
                                          );
                                        }}
                                        onChange={(e) => {
                                          const Wholesale = e.target.value;
                                          const markup =
                                            values.markupMultiplier;
                                          const selling =
                                            values.markupMultiplier &&
                                            currency(Wholesale).multiply(markup)
                                              .value;
                                          // const selling =
                                          //   values.markupMultiplier &&
                                          //   Number(
                                          //     (Wholesale * markup).toFixed(2)
                                          //   );
                                          // const grossmarginValue =
                                          //   values.markupMultiplier &&
                                          //   selling - Wholesale;
                                          const grossmarginValue =
                                            values.markupMultiplier &&
                                            currency(selling).subtract(
                                              Wholesale
                                            );
                                          const grossmarginper =
                                            values.markupMultiplier &&
                                            (grossmarginValue / selling) * 100;

                                          selling && isNaN(selling) === false
                                            ? setFieldValue(
                                                "sellingPrice",
                                                selling
                                              )
                                            : setFieldValue("sellingPrice", "");
                                          grossmarginValue &&
                                          isNaN(grossmarginValue) === false
                                            ? setFieldValue(
                                                "grossmarginAmount",
                                                grossmarginValue
                                              )
                                            : setFieldValue(
                                                "grossmarginAmount",
                                                ""
                                              );
                                          Wholesale &&
                                          markup != 0 &&
                                          isNaN(grossmarginper) === false
                                            ? setFieldValue(
                                                "grossmarginPercentage",
                                                grossmarginper.toFixed(2)
                                              )
                                            : setFieldValue(
                                                "grossmarginPercentage",
                                                ""
                                              );
                                          setFieldValue(
                                            "wholesaleCost",
                                            Wholesale
                                          );
                                        }}
                                      />
                                      <ErrorMsg name="wholesaleCost"></ErrorMsg>
                                    </TableCell>
                                    <TableCell align="left">
                                      <InputText
                                        value={values.markupMultiplier}
                                        name="markupMultiplier"
                                        placeholder="3x"
                                        onChange={(e) => {
                                          const markup = e.target.value;
                                          // const Wholesale =
                                          //   values.wholesaleCost;
                                          const Wholesale = currency(
                                            values.wholesaleCost
                                          ).value;
                                          // const selling = Number(
                                          //   (Wholesale * markup).toFixed(2)
                                          // );
                                          const selling =
                                            currency(Wholesale).multiply(
                                              markup
                                            ).value;
                                          const grossmarginValue =
                                            selling - Wholesale;
                                          const grossmarginper =
                                            (grossmarginValue / selling) * 100;

                                          selling && isNaN(selling) === false
                                            ? setFieldValue(
                                                "sellingPrice",
                                                selling
                                              )
                                            : setFieldValue("sellingPrice", "");
                                          // grossmarginValue &&
                                          isNaN(grossmarginValue) === false
                                            ? setFieldValue(
                                                "grossmarginAmount",
                                                grossmarginValue.toFixed(2)
                                              )
                                            : setFieldValue(
                                                "grossmarginAmount",
                                                ""
                                              );

                                          Wholesale &&
                                          markup != 0 &&
                                          isNaN(grossmarginper) === false
                                            ? setFieldValue(
                                                "grossmarginPercentage",
                                                grossmarginper.toFixed(2)
                                              )
                                            : setFieldValue(
                                                "grossmarginPercentage",
                                                ""
                                              );
                                          setFieldValue(
                                            "markupMultiplier",
                                            e.target.value
                                          );
                                        }}
                                      />

                                      <ErrorMsg name="markupMultiplier"></ErrorMsg>
                                    </TableCell>
                                    <TableCell align="left">
                                      <InputText
                                        value={values.grossmarginPercentage}
                                        InputProps={{
                                          startAdornment: (
                                            <InputAdornment position="start">
                                              %
                                            </InputAdornment>
                                          ),
                                        }}
                                        name="grossmarginPercentage"
                                        placeholder="20"
                                        onChange={handleChange}
                                        disabled
                                      />
                                      <ErrorMsg name="grossmarginPercentage"></ErrorMsg>
                                    </TableCell>
                                    <TableCell align="left">
                                      <InputText
                                        InputProps={{
                                          startAdornment: (
                                            <InputAdornment position="start">
                                              {values.sellingPrice && "$"}
                                            </InputAdornment>
                                          ),
                                        }}
                                        value={values.sellingPrice
                                          .toString()
                                          .replace(
                                            /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                                            ","
                                          )}
                                        name="sellingPrice"
                                        // placeholder="100"
                                        disabled
                                        onChange={handleChange}
                                      />
                                      <ErrorMsg name="sellingPrice"></ErrorMsg>
                                    </TableCell>
                                    <TableCell align="left">
                                      <InputText
                                        InputProps={{
                                          startAdornment: (
                                            <InputAdornment position="start">
                                              {values.grossmarginAmount && "$"}
                                            </InputAdornment>
                                          ),
                                        }}
                                        value={values.grossmarginAmount
                                          .toString()
                                          .replace(
                                            /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                                            ","
                                          )}
                                        name="grossmarginAmount"
                                        // placeholder="500"
                                        disabled
                                        onChange={handleChange}
                                      />
                                    </TableCell>
                                    <TableCell align="left">
                                      <div className={layout.flex_center}>
                                        <EditRowBtn
                                          type="submit"
                                          className={layout.mr_10}
                                        >
                                          <span className={layout.flex_center}>
                                            <Image
                                              alt=""
                                              src="/icons/save-icon.svg"
                                              width="16"
                                              height="16"
                                            />
                                          </span>
                                        </EditRowBtn>
                                        <EditRowBtn
                                          onClick={() => {
                                            setDeparts({
                                              department: "",
                                              wholesaleCost: "",
                                              markupMultiplier: "",
                                              grossmarginPercentage: "",
                                              sellingPrice: "",
                                              grossmarginAmount: "",
                                            });
                                            props.setEditId(null);
                                            props.setEdit(false);
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
                                      </div>
                                    </TableCell>
                                  </>
                                ) : (
                                  <>
                                    <TableCell padding="checkbox">
                                      <Checkbox
                                        color="primary"
                                        checked={isItemSelected}
                                        onClick={(event) =>
                                          handleClick(event, row.departmentId)
                                        }
                                        inputProps={{
                                          "aria-labelledby": labelId,
                                        }}
                                      />
                                    </TableCell>
                                    {/* <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none">
                        {row.DepartmentName}
                      </TableCell> */}
                                    <TableCell align="left">
                                      {row.department}
                                    </TableCell>
                                    <TableCell align="left">
                                      ${" "}
                                      <strong>
                                        {row.wholesaleCost
                                          .toString()
                                          .replace(
                                            /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                                            ","
                                          )}
                                      </strong>
                                    </TableCell>
                                    <TableCell align="left">
                                      <strong>{row.markupMultiplier}</strong> X
                                    </TableCell>
                                    <TableCell align="left">
                                      %{" "}
                                      <strong>
                                        {row.grossmarginPercentage}
                                      </strong>
                                    </TableCell>
                                    <TableCell align="left">
                                      ${" "}
                                      <span
                                        style={{
                                          color: "#17AA78",
                                          fontWeight: 700,
                                        }}
                                      >
                                        {row.sellingPrice
                                          .toString()
                                          .replace(
                                            /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                                            ","
                                          )}
                                      </span>
                                    </TableCell>
                                    <TableCell align="left">
                                      ${" "}
                                      <span
                                        style={{
                                          color: "#17AA78",
                                          fontWeight: 700,
                                        }}
                                      >
                                        {row.grossmarginAmount
                                          .toString()
                                          .replace(
                                            /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                                            ","
                                          )}
                                      </span>
                                    </TableCell>
                                    <TableCell align="left">
                                      <MenuPopup
                                        setEdit={props.setEdit}
                                        editId={props.editId}
                                        setEditId={props.setEditId}
                                        deleteDepartment={
                                          props.deleteDepartment
                                        }
                                        departmentId={row.departmentId}
                                      />
                                    </TableCell>
                                  </>
                                )}
                              </TableRow>
                            );
                          })}
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
