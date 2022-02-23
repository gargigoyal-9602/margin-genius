import * as React from "react";
import { TabContent } from './Deals.style';
import InputLabel from "@mui/material/InputLabel";
import layout from "../../styles/layout.module.scss";
import InputAdornment from "@mui/material/InputAdornment";
import Image from "next/image";

import {AccordionBox, TblPackage} from './Deals.style';
import Accordion from '@mui/material/Accordion'; 
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {
     ErrorMsg,
     OutlineButton,
     InputText,
     MainButton,
} from "../formControls.style";
export const CustomDeliverables = () => {
     return (
          <>
               <TabContent className="details">
               <div>
                         <TblPackage>
                         <Table>
                              <TableHead>
                                 <TableCell>Name of Delivarable</TableCell>
                                 <TableCell>Quantity</TableCell>
                                 <TableCell>Frequency</TableCell>
                                 <TableCell>Department</TableCell>
                                 <TableCell>Unit Price</TableCell>
                                 <TableCell>Total QTY</TableCell>
                                 <TableCell>Total Price</TableCell>
                              </TableHead>
                              <TableBody className="v2">
                              <TableRow>
                                   <TableCell>
                                      <strong>AB Test Setup & Launch</strong>  
                                   </TableCell>
                                   <TableCell>
                                      <span>1</span>  
                                   </TableCell>
                                   <TableCell>
                                      <span>One-time</span>  
                                   </TableCell>
                                   <TableCell>
                                      <span>UX Design</span>  
                                   </TableCell>
                                   <TableCell>
                                      <strong>$43 233</strong>  
                                   </TableCell>
                                   <TableCell>
                                      <span>1</span>  
                                   </TableCell>
                                   <TableCell>
                                      <strong>$43 233</strong>  
                                   </TableCell>
                              </TableRow>
                              <TableRow>
                                   <TableCell>
                                      <strong>Deep Interviews</strong>  
                                   </TableCell>
                                   <TableCell>
                                      <span>1</span>  
                                   </TableCell>
                                   <TableCell>
                                      <span>One-time</span>  
                                   </TableCell>
                                   <TableCell>
                                      <span>UX Design</span>  
                                   </TableCell>
                                   <TableCell>
                                      <strong>$43 233</strong>  
                                   </TableCell>
                                   <TableCell>
                                      <span>1</span>
                                   </TableCell>
                                   <TableCell>
                                      <strong>$43 233</strong>  
                                   </TableCell>
                              </TableRow>
                              </TableBody>
                         </Table>
                         </TblPackage>
               </div>   
               <div className="details-footer">
                    <div className="buttonWrap">
                         <OutlineButton
                              variant="text"
                              fixwidth="auto"
                              marginbottom="0"
                              className={layout.mr_10}
                              style={{ border: "0", color: "#0A2828" }}
                         >
                              Cancel
                         </OutlineButton>
                         <MainButton
                              fixwidth="auto"
                              marginbottom="0"
                              variant="contained"
                              type="submit"  >
                              Change Status
                         </MainButton>
                    </div>
                    <div className="deal-information">
                         <div className="cell">
                              <p>Monthly Fee</p>
                              <strong>$ 40</strong>
                         </div>
                         <div className="cell">
                              <p>Total Contract Value</p>
                              <strong>$ 400</strong>
                         </div>
                         <div className="cell">
                              <p>Set up Amount</p>
                              <strong>$ 200</strong>
                         </div>
                         <div className="cell">
                              <p>Monthly Fee + Neg Amount</p>
                              <strong>$ 200</strong>
                         </div>
                         <div className="cell">
                              <p>Contract Length</p>
                              <strong>3 Months</strong>
                         </div>
                    </div>
               </div>
               </TabContent>
          </>
     );
}