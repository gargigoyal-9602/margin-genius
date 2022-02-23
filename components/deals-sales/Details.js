import * as React from "react";
import { TabContent } from './Deals.style';
import InputLabel from "@mui/material/InputLabel";
import layout from "../../styles/layout.module.scss";
import InputAdornment from "@mui/material/InputAdornment";
import Image from "next/image";
import {ButtonMenu} from '../tableControls.style';
import {
     ErrorMsg,
     OutlineButton,
     InputText,
     MainButton,
} from "../formControls.style";
export const Details = () => {
     const [anchorEl, setAnchorEl] = React.useState(null);

     const handleClick = (event) => {
       setAnchorEl(event.currentTarget);
     };
     const handleMenuClose = () => {
       setAnchorEl(null);
     };
     const MenuOpen = Boolean(anchorEl);
   
     return (
          <>
               <TabContent className="details">

                    <div className="details-tab">
                         <div className="row">
                              <div className="col">
                                   <div className={`${layout.flex_top} ${layout.mb_20}`}>
                                        <div className={layout.mr_10} style={{ width: "100%" }}>
                                             <InputLabel htmlFor="CalculatorName">Calculator Name</InputLabel>

                                             <InputText
                                                  disabled
                                                  size="small"
                                                  id="Calculator"
                                                  type="text"
                                                  placeholder="Enter Calculator Name"
                                                  name="CalculatorName"
                                             />
                                             {/* <ErrorMsg name="CalculatorName"></ErrorMsg> */}
                                        </div>
                                   </div>
                              </div>
                              <div className="col">
                                   <div className={`${layout.flex_top} ${layout.mb_20}`}>
                                        <div className={layout.mr_10} style={{ width: "100%" }}>
                                             <InputLabel htmlFor="CalculatorName">Deal Name</InputLabel>

                                             <InputText
                                                  size="small"
                                                  disabled
                                                  id="Calculator"
                                                  type="text"
                                                  placeholder="Enter Deal Name"
                                                  name="CalculatorName"
                                             />
                                             {/* <ErrorMsg name="CalculatorName"></ErrorMsg> */}
                                        </div>
                                   </div>
                              </div>
                         </div>
                         <div className="row">
                              <div className="col">
                                   <div className={`${layout.flex_top} ${layout.mb_20}`}>
                                        <div className={layout.mr_10} style={{ width: "100%" }}>
                                             <div className="search">
                                                  <InputLabel htmlFor="CalculatorName">Category</InputLabel>
                                                  <InputText
                                                       disabled
                                                       id="Search"
                                                       name="Search"
                                                       type="text"
                                                       placeholder="Search for approver name"
                                                       InputProps={{
                                                            startAdornment: (
                                                                 <InputAdornment position="start">
                                                                      <Image
                                                                           src="/icons/search.svg"
                                                                           height="15"
                                                                           width="15"
                                                                           alt=""
                                                                      />
                                                                 </InputAdornment>
                                                            ),
                                                       }}
                                                  />
                                             </div>
                                             {/* <ErrorMsg name="CalculatorName"></ErrorMsg> */}
                                        </div>
                                   </div>
                              </div>
                              <div className="col">
                                   <div className={`${layout.flex_top} ${layout.mb_20}`}>
                                        <div className={layout.mr_10} style={{ width: "100%" }}>
                                             <InputLabel htmlFor="CalculatorName">Company Industry</InputLabel>

                                             <InputText
                                                  size="small"
                                                  disabled
                                                  id="Calculator"
                                                  type="text"
                                                  placeholder="Enter Company Industry"
                                                  name="Company Industry"
                                             />
                                             {/* <ErrorMsg name="CalculatorName"></ErrorMsg> */}
                                        </div>
                                   </div>
                              </div>
                         </div>
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
                                   type="submit" onClick={handleClick} >
                                   Change Status
               </MainButton>
               <ButtonMenu
              open={MenuOpen}
              anchorEl={anchorEl}
              onClick={handleMenuClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <div className="item">
                <span className={layout.ml_10}>
                Update
                </span>
              </div>
              <div className="item">
                <span className={layout.ml_10}>
                Update & Start Another
                </span>
              </div>
              <div className="item">
                <span className={layout.ml_10}>
                Update & Duplicate
                </span>
              </div>
            </ButtonMenu>
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