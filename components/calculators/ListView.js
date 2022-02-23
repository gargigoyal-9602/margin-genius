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
import { OutlineButton } from "../formControls.style";
import FooterNav from "../layout/FooterNav";
import RightDrawer from "./RightDrawer";

const CalcBox = styled.div`
  width: 10px;
  height: 54px;
  top: 0;
  position: absolute;
  left: 0;
  border-radius: 5px 0 0 5px;
`;
function Row(props) {
  const {
    row,
    isItemSelected,
    handleClick,
    labelId,
    getAllCalculators,
    calculators,
  } = props;
  const [open, setOpen] = React.useState(false);
  const [togg, setTogg] = React.useState(false);
  const [Drawerstate, setDrawerstate] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [text, setText] = React.useState("");
  const [editCalculator, setEditCalculator] = React.useState(false);
  const [drawerRow, setDrawerRow] = React.useState("");
  const toggleDrawer = (anchor, open, row) => {
    setDrawerRow(row);
    setDrawerstate({ ...Drawerstate, [anchor]: open });
    setTogg(!togg);
  };
 
  return (
    <React.Fragment>
      <TableRow
        key={row.calculatorName}
        sx={{ "& > *": { borderBottom: "unset" } }}
      >
        <TableCell style={{ position: "relative" }}>
          <CalcBox style={{ background: row.calculatorColor }}></CalcBox>
        </TableCell>
        <TableCell padding="checkbox">
          <Checkbox
            onClick={(event) => handleClick(event, row.calculatorId)}
            color="primary"
            checked={isItemSelected}
            inputProps={{
              "aria-labelledby": labelId,
            }}
          />
        </TableCell>
        <TableCell component="th" scope="row">
          {row.calculatorName}
        </TableCell>
        <TableCell>{row.category}</TableCell>
        <TableCell>{row.departmentName}</TableCell>
        <TableCell>{row.dealScoped}</TableCell>
        <TableCell>{row.contractlengthConfig}</TableCell>
        <TableCell>{row.setupfeeConfig}</TableCell>
        <TableCell>
          <MenuPopup
            row={row}
            getAllCalculators={getAllCalculators}
            calculators={calculators}
            toggleDrawer={toggleDrawer}
            text={text}
            setText={setText}
            setEditCalculator={setEditCalculator}
            togg={togg}
              setTogg={setTogg}
          />
          {text !== "" ? (
            <RightDrawer
              toggleDraw={toggleDrawer}
              Drawerstate={Drawerstate}
              setDrawerstate={setDrawerstate}
              text={text}
              row={row}
              
            />
          ) : (
            <RightDrawer
              toggleDraw={toggleDrawer}
              Drawerstate={Drawerstate}
              setDrawerstate={setDrawerstate}
              text=""
              row={row}
              // calculators={calculators}
              deliverables={props.deliverables}
              setDeliverables={props.setDeliverables}
              deliverableNameObj={props.deliverableNameObj}
              setDeliverableNameObj={props.setDeliverableNameObj}
              deliverableRoleId={props.deliverableRoleId}
              setDeliverableRoleId={props.setDeliverableRoleId}
              deliverablePriceObj={props.deliverablePriceObj}
              setDeliverablePriceObj={props.setDeliverablePriceObj}
              packages={props.packages}
              packageNameObj={props.packageNameObj}
              packagePriceObj={props.packagePriceObj}
              setPackages={props.setPackages}
              users={props.users}
              departments={props.departments}
              setDepartments={props.setDepartments}
              getDepartments={props.getDepartments}
              setUsers={props.setUsers}
              nameObj={props.nameObj}
              setNameObj={props.setNameObj}
              getAllCalculators={props.getAllCalculators}
              calculators={props.calculators}
              togg={togg}
              setTogg={setTogg}
             
            />
          )}
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable(props) {
  const { calculators, selected, setSelected, getAllCalculators } = props;
  
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = calculators.map((n) => n.calculatorId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const handleClick = (event, calculatorId) => {
    const selectedIndex = selected.indexOf(calculatorId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, calculatorId);
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
  };
  const isSelected = (calculatorId) => selected.indexOf(calculatorId) !== -1;
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
                  <Checkbox
                    color="primary"
                    indeterminate={
                      selected.length > 0 &&
                      selected.length < calculators.length
                    }
                    checked={
                      calculators.length > 0 &&
                      selected.length === calculators.length
                    }
                    onChange={handleSelectAllClick}
                    inputProps={{
                      "aria-label": "select all desserts",
                    }}
                  />
                </TableCell>
                <TableCell>Name of Calculator</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Deals Scoped</TableCell>
                <TableCell>Contract Length Config</TableCell>
                <TableCell>Setup Fee</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {calculators.map((row, index) => {
                const isItemSelected = isSelected(row.calculatorId);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <>
                    <Row
                      row={row}
                      isItemSelected={isItemSelected}
                      handleClick={handleClick}
                      labelId={labelId}
                      getAllCalculators={getAllCalculators}
                      calculators={calculators}
                      calculators={calculators}
                      deliverables={props.deliverables}
                      setDeliverables={props.setDeliverables}
                      deliverableNameObj={props.deliverableNameObj}
                      setDeliverableNameObj={props.setDeliverableNameObj}
                      deliverableRoleId={props.deliverableRoleId}
                      setDeliverableRoleId={props.setDeliverableRoleId}
                      deliverablePriceObj={props.deliverablePriceObj}
                      setDeliverablePriceObj={props.setDeliverablePriceObj}
                      packages={props.packages}
                      packageNameObj={props.packageNameObj}
                      packagePriceObj={props.packagePriceObj}
                      setPackages={props.setPackages}
                      users={props.users}
                      departments={props.departments}
                      setDepartments={props.setDepartments}
                      getDepartments={props.getDepartments}
                      setUsers={props.setUsers}
                      nameObj={props.nameObj}
                      setNameObj={props.setNameObj}
                      getAllCalculators={props.getAllCalculators}
                    />
                    
                   
                  </>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </MainTable>
    </>
  );
}
