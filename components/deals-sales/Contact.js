import * as React from "react";
import { TabContent, AccordionBox } from './Deals.style';
import InputLabel from "@mui/material/InputLabel";
import layout from "../../styles/layout.module.scss";
import InputAdornment from "@mui/material/InputAdornment";
import Image from "next/image";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
     ErrorMsg,
     OutlineButton,
     InputText,
     MainButton,
} from "../formControls.style";
export const Contact = () => {
     return (
          <>
               <TabContent className="details">

                    <div className="details-tab">
                         <div className="row v2">
                              <div className="col">
                                   <div className={`${layout.flex_top} ${layout.mb_20}`}>
                                        <div className={layout.mr_10} style={{ width: "100%" }}>
                                             <InputLabel htmlFor="Contract Length">Contract Length</InputLabel>

                                             <InputText
                                                  disabled
                                                  size="small"
                                                  id="Calculator"
                                                  type="text"
                                                  placeholder="Enter Contract Length"
                                                  name="CalculatorName"
                                             />
                                             {/* <ErrorMsg name="CalculatorName"></ErrorMsg> */}
                                        </div>
                                   </div>
                              </div>
                              <div className="col">
                                   <div className={`${layout.flex_top} ${layout.mb_20}`}>
                                        <div className={layout.mr_10} style={{ width: "100%" }}>
                                             <InputLabel htmlFor="setup">Set up Fee %</InputLabel>

                                             <InputText
                                                  size="small"
                                                  disabled
                                                  id="Calculator"
                                                  type="text"
                                                  placeholder="Enter set up"
                                                  name="setup"
                                             />
                                             {/* <ErrorMsg name="CalculatorName"></ErrorMsg> */}
                                        </div>
                                   </div>
                              </div>
                              <div className="col">
                                   <div className={`${layout.flex_top} ${layout.mb_20}`}>
                                        <div className={layout.mr_10} style={{ width: "100%" }}>
                                             <InputLabel htmlFor="Negotiation">Negotiation Fee %</InputLabel>

                                             <InputText
                                                  size="small"
                                                  disabled
                                                  id="Calculator"
                                                  type="text"
                                                  placeholder="Enter Negotiation"
                                                  name="CalculatorName"
                                             />
                                             {/* <ErrorMsg name="CalculatorName"></ErrorMsg> */}
                                        </div>
                                   </div>
                              </div>
                              <div className="col">
                                   <div className={`${layout.flex_top} ${layout.mb_20}`}>
                                        <div className={layout.mr_10} style={{ width: "100%" }}>
                                             <InputLabel htmlFor="Discount Fee">Discount Fee $</InputLabel>

                                             <InputText
                                                  size="small"
                                                  disabled
                                                  id="Calculator"
                                                  type="text"
                                                  placeholder="Enter Discount"
                                                  name="CalculatorName"
                                             />
                                             {/* <ErrorMsg name="CalculatorName"></ErrorMsg> */}
                                        </div>
                                   </div>
                              </div>
                         </div>
                         <div className="row v2">
                              <div className="col">
                                   <div className="display">
                                        <span>Monthly Fee</span>
                                        <strong>$400</strong>
                                   </div>
                              </div>
                              <div className="col">
                                   <div className="display">
                                        <span>Set up Amount</span>
                                        <strong>$400</strong>
                                   </div>
                              </div>
                              <div className="col">
                                   <div className="display">
                                        <span>Monthly Fee + Negotiation Fee</span>
                                        <strong>$400</strong>
                                   </div>
                              </div>
                              <div className="col">
                                   <div className="display">
                                        <span>Monthly Fee - Discount Fee</span>
                                        <strong>$400</strong>
                                   </div>
                              </div>
                         </div>
                         <div className="row v3">
                              <div className="col">
                                   <div className="display">
                                        <span>Total Contract Value</span>
                                        <strong>$400</strong>
                                   </div>
                              </div>
                         </div>

                    <div className="sub-title">
                         <h4>Itemized Breakdown</h4>
                         <div>
                              <button>up</button>
                              <button>up</button>
                         </div>
                    </div>
                    <AccordionBox>
                         <Accordion>
                         <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                              >
                              <div className="title">
                                   <span>UX Design</span>
                                   <span className="color-gray">5 items</span>
                                   <strong className="color-green">$3,89,097</strong>
                              </div>
                         </AccordionSummary>
                         <AccordionDetails>
                              content
                         </AccordionDetails>
                         </Accordion>
                    </AccordionBox>
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
     )
}