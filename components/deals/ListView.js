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
import layout from "../../styles/layout.module.scss";
import Image from "next/image";
import Checkbox from "@mui/material/Checkbox";
import { OutlineButton, StatusButton } from "../formControls.style";
function createData(
  Calculator,
  Category,
  Department,
  DealsScoped,
  ContractLength,
  SetupFee
) {
  return {
    Calculator,
    Category,
    Department,
    DealsScoped,
    ContractLength,
    SetupFee,
  };
}
const CalcBox = styled.div`
  width: 10px;
  height: 54px;
  top: 0;
  position: absolute;
  left: 0;
  border-radius: 5px 0 0 5px;
`;
function Row(props) {
  const { index, row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow  key={index} sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell style={{ position: "relative" }}>
          <CalcBox style={{ background: "#61EC8A" }}></CalcBox>
        </TableCell>
        <TableCell padding="checkbox">
          <Checkbox color="primary" />
        </TableCell>
        <TableCell component="th" scope="row">
          {row.Calculator}
        </TableCell>
        <TableCell>{row.Category}</TableCell>
        <TableCell>{row.Department}</TableCell>
        <TableCell>{row.DealsScoped}</TableCell>
        <TableCell>
          <div className="status_name">
            <StatusButton className="pending">
              <Image alt="" src="/icons/pending.svg" width="11" height="11" />
              <span className={layout.ml_5}>{row.ContractLength}</span>
            </StatusButton>
            <StatusButton className="not-approved">
              <Image
                alt=""
                src="/icons/close-toast.svg"
                width="11"
                height="11"
              />
              <span className={layout.ml_5}>{row.ContractLength}</span>
            </StatusButton>
            <StatusButton className="approved">
              <Image
                alt=""
                src="/icons/successToast.svg"
                width="11"
                height="11"
              />
              <span className={layout.ml_5}>{row.ContractLength}</span>
            </StatusButton>
            <StatusButton className="in-progress">
              <Image
                alt=""
                src="/icons/in-progress.svg"
                width="11"
                height="11"
              />
              <span className={layout.ml_5}>{row.ContractLength}</span>
            </StatusButton>
          </div>
        </TableCell>
        <TableCell>{row.SetupFee}</TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData(
    "Domino’s Pizza Website Redesign",
    "UI/UX Design",
    "$21 978",
    "3 Months",
    "Approval Pending",
    "Kathryn Murphy"
  ),
  createData(
    "Domino’s Pizza Website Redesign",
    "UI/UX Design",
    "$21 978",
    "3 Months",
    "Approval Pending",
    "Kathryn Murphy"
  ),
  createData(
    "Domino’s Pizza Website Redesign",
    "UI/UX Design",
    "$21 978",
    "3 Months",
    "Approval Pending",
    "Kathryn Murphy"
  ),
  createData(
    "Domino’s Pizza Website Redesign",
    "UI/UX Design",
    "$21 978",
    "3 Months",
    "Approval Pending",
    "Kathryn Murphy"
  ),
];

export default function CollapsibleTable() {
  return (
    <>
      <MainTable>
        <TableContainer sx={{ minHeight: "400px", maxHeight: "540px" }}>
          <Table
            stickyHeader
            sx={{ minWidth: 750 }}
            aria-labelledby="collapsible table"
          >
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell padding="checkbox">
                  <Checkbox color="primary" />
                </TableCell>
                <TableCell>Name of the Deal</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Total Contract Value</TableCell>
                <TableCell>Contract Length</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Salesman</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <Row index={index} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </MainTable>
    </>
  );
}
