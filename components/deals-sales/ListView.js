import * as React from 'react';
import styled from "styled-components";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow'; 
import {MainTable} from "../tableControls.style";
import layout from "../../styles/layout.module.scss";
import Image from 'next/image';
import Checkbox from "@mui/material/Checkbox";
import { MenuPopup } from "./MenuPopUp.js";
import {
  MainButton,
  OutlineButton,
  StatusButton 
} from "../formControls.style";
function createData(Calculator, Category, Department, DealsScoped, ContractLength,SetupFee, Approver) {
  return {
    Calculator,
    Category,
    Department,
    DealsScoped,
    ContractLength,
    SetupFee,
    Approver
  };
}
const CalcBox = styled.div`
    width: 10px;
    height: 54px;
    top: 0;
    position: absolute;
    left: 0;
    border-radius: 5px 0 0 5px;
`
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell style={{position:'relative'}}>
          <CalcBox style={{background:'#61EC8A'}}></CalcBox>
        </TableCell>
        <TableCell padding="checkbox">
            <Checkbox
              color="primary"
            />
        </TableCell>
        <TableCell component="th" scope="row">
          {row.Calculator}
        </TableCell>
        <TableCell>{row.Category}</TableCell>
        <TableCell>{row.Department}</TableCell>
        <TableCell>{row.DealsScoped}</TableCell>
        <TableCell>
        <StatusButton className='approved'>
            <Image alt=""  src="/icons/successToast.svg" width="11" height="11" />
            <span className={layout.ml_5}>{row.ContractLength}</span>
          </StatusButton>
          {/* <StatusButton className='pending'>
            <Image alt=""  src="/icons/pending.svg" width="11" height="11" />
            <span className={layout.ml_5}>{row.ContractLength}</span>
          </StatusButton> */}
          {/* <StatusButton className='not-approved'>
            <Image alt=""  src="/icons/close-toast.svg" width="11" height="11" />
            <span className={layout.ml_5}>{row.ContractLength}</span>
          </StatusButton>
          
          <StatusButton className='in-progress'>
            <Image alt=""  src="/icons/in-progress.svg" width="11" height="11" />
            <span className={layout.ml_5}>{row.ContractLength}</span>
          </StatusButton> */}
        </TableCell>
        <TableCell>
            <span className={layout.ml_5}>{row.SetupFee}</span>
        </TableCell>
        <TableCell>
        {/* <MainButton size='small' style={{fontSize:'12px'}} marginbottom="0">
            <Image alt=""  src="/icons/plus-icon.svg" width="14" height="14" />
            <span className={layout.ml_5}>{row.Approver}</span>
          </MainButton> */}
          <OutlineButton size='small' style={{fontSize:'12px', borderColor:"#FF6D00"}} marginbottom="0">
            <Image alt=""  src="/icons/resubmit.svg" width="14" height="14" />
            <span className={layout.ml_5} style={{color:"#FF6D00"}}>{row.Approver}</span>
          </OutlineButton>
        </TableCell>
        <TableCell>
          <MenuPopup />
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


const rows = [
  createData('Domino’s Pizza Website Redesign', 'UI/UX Design', '$21 978', '3 Months', 'Approved', 'Kathryn Murphy', 'Resubmit'),
  createData('Domino’s Pizza Website Redesign', 'UI/UX Design', '$21 978', '3 Months', 'Approved', 'Kathryn Murphy', 'Resubmit'),
  createData('Domino’s Pizza Website Redesign', 'UI/UX Design', '$21 978', '3 Months', 'Approved', 'Kathryn Murphy', 'Resubmit'),
  createData('Domino’s Pizza Website Redesign', 'UI/UX Design', '$21 978', '3 Months', 'Approved', 'Kathryn Murphy', 'Resubmit'),
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
          <TableCell/>
          <TableCell padding="checkbox">
              <Checkbox
                color="primary"
              />
            </TableCell>
            <TableCell>Name of the Deal</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Total Contract Value</TableCell>
            <TableCell>Contract Length</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Approver</TableCell>
            <TableCell/>
            <TableCell/>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
      <OutlineButton
                  aligncenter="true"
                  fixwidth="auto"
                  marginbottom="0"
                  style={{ border: 0, margin: "15px 0" }}>
                  <span className={layout.flex_top}>
                    <Image
                      src="/icons/plus-icon-green.svg"
                      width="16"
                      height="16"
                      alt=""
                    />
                  </span>
                  <span className={layout.ml_10}>Create Another Deal</span>
                </OutlineButton>
    </TableContainer>
    </MainTable>
    
    </>
  );
}