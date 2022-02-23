import React from "react";
import layout from "../../styles/layout.module.scss";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import { ModalBox } from "../../components/tableControls.style";
import {
  ErrorMsg,
  MainButton,
  OutlineButton,
  InputText,
  BorderButton,
  IconButton
} from "../../components/formControls.style";
import { AccordianWrap } from "./PraposalContract.style";
import Image from "next/image";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  AccordionBox,
  TabContentWrap,
  MenuList
} from "../calculators/Calculators.style";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { style } from "@mui/system";

const Listview = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [modelOpen, setOpen] = React.useState(false);
  const handleModelOpen = () => setOpen(true);
  const handleModelClose = () => setOpen(false);


  return (
    <>
    <h2 className={`${layout.h2} ${layout.mb_20}`}>Itemized Breakdown</h2>
      <AccordionBox style={{border:0}}>
      <TabContentWrap>
            <AccordianWrap>
              <div className={layout.flex_between_center}>
                <div className={layout.mb_30}>
                  <InputText
                    size="small"
                    width="350px"
                    id="Search"
                    name="Search"
                    type="text"
                    placeholder="Search for role name or department"
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
                
              </div>
              <div className="scroll" style={{maxHeight:'400px'}}>
              <div className="tbl-list">
              <Accordion style={{border:0, margin:0}}>
               <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
               >
                <div className="tbl-row" style={{width:'100%'}}>
                  <div style={{width:'50%'}}>
                    <p><strong>UX Research</strong></p>
                  </div>
                  <div style={{width:'20%'}}>
                    <p><strong>6 items</strong></p>
                  </div>
                  <div style={{width:'20%'}}>
                    <p><strong>5 sub-categories</strong></p>
                  </div>
                  <div style={{width:'10%', textAlign:'right'}}>
                    <p style={{color:'#17AA78'}}><strong>$43 233</strong></p>
                  </div>
                </div>
               </AccordionSummary>
               <AccordionDetails style={{padding:0}}>
              
                <div className="tbl-row">
                    <div style={{width:'50%'}}>
                      <p>Small Business Design Package</p>
                    </div>
                    <div style={{width:'20%'}}>
                      <p>Package</p>
                    </div>
                    <div style={{width:'20%'}}>
                      <p>Usability Testing</p>
                    </div>
                    <div style={{width:'10%', textAlign:'right'}}>
                      <p>$2400</p>
                    </div>
                  </div>
                  <div className="tbl-row">
                    <div style={{width:'50%'}}>
                      <p>Small Business Design Package</p>
                    </div>
                    <div style={{width:'20%'}}>
                      <p>Package</p>
                    </div>
                    <div style={{width:'20%'}}>
                      <p>Usability Testing</p>
                    </div>
                    <div style={{width:'10%', textAlign:'right'}}>
                      <p>$2400</p>
                    </div>
                  </div>
                  <div className="tbl-row">
                    <div style={{width:'50%'}}>
                      <p>Small Business Design Package</p>
                    </div>
                    <div style={{width:'20%'}}>
                      <p>Package</p>
                    </div>
                    <div style={{width:'20%'}}>
                      <p>Usability Testing</p>
                    </div>
                    <div style={{width:'10%', textAlign:'right'}}>
                      <p>$2400</p>
                    </div>
                  </div>
                  <div className="tbl-row">
                    <div style={{width:'50%'}}>
                      <p>Small Business Design Package</p>
                    </div>
                    <div style={{width:'20%'}}>
                      <p>Package</p>
                    </div>
                    <div style={{width:'20%'}}>
                      <p>Usability Testing</p>
                    </div>
                    <div style={{width:'10%', textAlign:'right'}}>
                      <p>$2400</p>
                    </div>
                  </div>
                  <div className="tbl-row">
                    <div style={{width:'50%'}}>
                      <p>Small Business Design Package</p>
                    </div>
                    <div style={{width:'20%'}}>
                      <p>Package</p>
                    </div>
                    <div style={{width:'20%'}}>
                      <p>Usability Testing</p>
                    </div>
                    <div style={{width:'10%', textAlign:'right'}}>
                      <p>$2400</p>
                    </div>
                  </div>
               </AccordionDetails>
               </Accordion>
                </div>
                <div className="tbl-list">
              <Accordion style={{border:0, margin:0}}>
               <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
               >
                <div className="tbl-row" style={{width:'100%'}}>
                  <div style={{width:'50%'}}>
                    <p><strong>UX Research</strong></p>
                  </div>
                  <div style={{width:'20%'}}>
                    <p><strong>6 items</strong></p>
                  </div>
                  <div style={{width:'20%'}}>
                    <p><strong>5 sub-categories</strong></p>
                  </div>
                  <div style={{width:'10%', textAlign:'right'}}>
                    <p style={{color:'#17AA78'}}><strong>$43 233</strong></p>
                  </div>
                </div>
               </AccordionSummary>
               <AccordionDetails style={{padding:0}}>
              
                <div className="tbl-row">
                    <div style={{width:'50%'}}>
                      <p>Small Business Design Package</p>
                    </div>
                    <div style={{width:'20%'}}>
                      <p>Package</p>
                    </div>
                    <div style={{width:'20%'}}>
                      <p>Usability Testing</p>
                    </div>
                    <div style={{width:'10%', textAlign:'right'}}>
                      <p>$2400</p>
                    </div>
                  </div>
                  <div className="tbl-row">
                    <div style={{width:'50%'}}>
                      <p>Small Business Design Package</p>
                    </div>
                    <div style={{width:'20%'}}>
                      <p>Package</p>
                    </div>
                    <div style={{width:'20%'}}>
                      <p>Usability Testing</p>
                    </div>
                    <div style={{width:'10%', textAlign:'right'}}>
                      <p>$2400</p>
                    </div>
                  </div>
                  <div className="tbl-row">
                    <div style={{width:'50%'}}>
                      <p>Small Business Design Package</p>
                    </div>
                    <div style={{width:'20%'}}>
                      <p>Package</p>
                    </div>
                    <div style={{width:'20%'}}>
                      <p>Usability Testing</p>
                    </div>
                    <div style={{width:'10%', textAlign:'right'}}>
                      <p>$2400</p>
                    </div>
                  </div>
                  <div className="tbl-row">
                    <div style={{width:'50%'}}>
                      <p>Small Business Design Package</p>
                    </div>
                    <div style={{width:'20%'}}>
                      <p>Package</p>
                    </div>
                    <div style={{width:'20%'}}>
                      <p>Usability Testing</p>
                    </div>
                    <div style={{width:'10%', textAlign:'right'}}>
                      <p>$2400</p>
                    </div>
                  </div>
                  <div className="tbl-row">
                    <div style={{width:'50%'}}>
                      <p>Small Business Design Package</p>
                    </div>
                    <div style={{width:'20%'}}>
                      <p>Package</p>
                    </div>
                    <div style={{width:'20%'}}>
                      <p>Usability Testing</p>
                    </div>
                    <div style={{width:'10%', textAlign:'right'}}>
                      <p>$2400</p>
                    </div>
                  </div>
               </AccordionDetails>
               </Accordion>
                </div>
                <div className="tbl-list">
              <Accordion style={{border:0, margin:0}}>
               <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
               >
                <div className="tbl-row" style={{width:'100%'}}>
                  <div style={{width:'50%'}}>
                    <p><strong>UX Research</strong></p>
                  </div>
                  <div style={{width:'20%'}}>
                    <p><strong>6 items</strong></p>
                  </div>
                  <div style={{width:'20%'}}>
                    <p><strong>5 sub-categories</strong></p>
                  </div>
                  <div style={{width:'10%', textAlign:'right'}}>
                    <p style={{color:'#17AA78'}}><strong>$43 233</strong></p>
                  </div>
                </div>
               </AccordionSummary>
               <AccordionDetails style={{padding:0}}>
              
                <div className="tbl-row">
                    <div style={{width:'50%'}}>
                      <p>Small Business Design Package</p>
                    </div>
                    <div style={{width:'20%'}}>
                      <p>Package</p>
                    </div>
                    <div style={{width:'20%'}}>
                      <p>Usability Testing</p>
                    </div>
                    <div style={{width:'10%', textAlign:'right'}}>
                      <p>$2400</p>
                    </div>
                  </div>
                  <div className="tbl-row">
                    <div style={{width:'50%'}}>
                      <p>Small Business Design Package</p>
                    </div>
                    <div style={{width:'20%'}}>
                      <p>Package</p>
                    </div>
                    <div style={{width:'20%'}}>
                      <p>Usability Testing</p>
                    </div>
                    <div style={{width:'10%', textAlign:'right'}}>
                      <p>$2400</p>
                    </div>
                  </div>
                  <div className="tbl-row">
                    <div style={{width:'50%'}}>
                      <p>Small Business Design Package</p>
                    </div>
                    <div style={{width:'20%'}}>
                      <p>Package</p>
                    </div>
                    <div style={{width:'20%'}}>
                      <p>Usability Testing</p>
                    </div>
                    <div style={{width:'10%', textAlign:'right'}}>
                      <p>$2400</p>
                    </div>
                  </div>
                  <div className="tbl-row">
                    <div style={{width:'50%'}}>
                      <p>Small Business Design Package</p>
                    </div>
                    <div style={{width:'20%'}}>
                      <p>Package</p>
                    </div>
                    <div style={{width:'20%'}}>
                      <p>Usability Testing</p>
                    </div>
                    <div style={{width:'10%', textAlign:'right'}}>
                      <p>$2400</p>
                    </div>
                  </div>
                  <div className="tbl-row">
                    <div style={{width:'50%'}}>
                      <p>Small Business Design Package</p>
                    </div>
                    <div style={{width:'20%'}}>
                      <p>Package</p>
                    </div>
                    <div style={{width:'20%'}}>
                      <p>Usability Testing</p>
                    </div>
                    <div style={{width:'10%', textAlign:'right'}}>
                      <p>$2400</p>
                    </div>
                  </div>
               </AccordionDetails>
               </Accordion>
                </div>
                <div className="tbl-list">
              <Accordion style={{border:0, margin:0}}>
               <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
               >
                <div className="tbl-row" style={{width:'100%'}}>
                  <div style={{width:'50%'}}>
                    <p><strong>UX Research</strong></p>
                  </div>
                  <div style={{width:'20%'}}>
                    <p><strong>6 items</strong></p>
                  </div>
                  <div style={{width:'20%'}}>
                    <p><strong>5 sub-categories</strong></p>
                  </div>
                  <div style={{width:'10%', textAlign:'right'}}>
                    <p style={{color:'#17AA78'}}><strong>$43 233</strong></p>
                  </div>
                </div>
               </AccordionSummary>
               <AccordionDetails style={{padding:0}}>
              
                <div className="tbl-row">
                    <div style={{width:'50%'}}>
                      <p>Small Business Design Package</p>
                    </div>
                    <div style={{width:'20%'}}>
                      <p>Package</p>
                    </div>
                    <div style={{width:'20%'}}>
                      <p>Usability Testing</p>
                    </div>
                    <div style={{width:'10%', textAlign:'right'}}>
                      <p>$2400</p>
                    </div>
                  </div>
                  <div className="tbl-row">
                    <div style={{width:'50%'}}>
                      <p>Small Business Design Package</p>
                    </div>
                    <div style={{width:'20%'}}>
                      <p>Package</p>
                    </div>
                    <div style={{width:'20%'}}>
                      <p>Usability Testing</p>
                    </div>
                    <div style={{width:'10%', textAlign:'right'}}>
                      <p>$2400</p>
                    </div>
                  </div>
                  <div className="tbl-row">
                    <div style={{width:'50%'}}>
                      <p>Small Business Design Package</p>
                    </div>
                    <div style={{width:'20%'}}>
                      <p>Package</p>
                    </div>
                    <div style={{width:'20%'}}>
                      <p>Usability Testing</p>
                    </div>
                    <div style={{width:'10%', textAlign:'right'}}>
                      <p>$2400</p>
                    </div>
                  </div>
                  <div className="tbl-row">
                    <div style={{width:'50%'}}>
                      <p>Small Business Design Package</p>
                    </div>
                    <div style={{width:'20%'}}>
                      <p>Package</p>
                    </div>
                    <div style={{width:'20%'}}>
                      <p>Usability Testing</p>
                    </div>
                    <div style={{width:'10%', textAlign:'right'}}>
                      <p>$2400</p>
                    </div>
                  </div>
                  <div className="tbl-row">
                    <div style={{width:'50%'}}>
                      <p>Small Business Design Package</p>
                    </div>
                    <div style={{width:'20%'}}>
                      <p>Package</p>
                    </div>
                    <div style={{width:'20%'}}>
                      <p>Usability Testing</p>
                    </div>
                    <div style={{width:'10%', textAlign:'right'}}>
                      <p>$2400</p>
                    </div>
                  </div>
               </AccordionDetails>
               </Accordion>
                </div>
              </div>
              </AccordianWrap>
      </TabContentWrap>
      </AccordionBox>
      <h2 className={`${layout.h2}`} style={{margin:'20px 0'}}>Proposal Options</h2>
      <div className={layout.flex_between}>
      <div className={layout.flex_center}>
      <BorderButton style={{marginRight:"20px"}} onClick={handleModelOpen}>
                      <Image
                          src="/icons/download.svg"
                          height="14"
                          width="14"
                          layout="fixed"
                          alt="icon"
                        />
                      <span className={layout.ml_5}>PNG</span>
                    </BorderButton>
                    <BorderButton style={{marginRight:"20px"}} onClick={handleModelOpen}>
                      <Image
                          src="/icons/download.svg"
                          height="14"
                          width="14"
                          layout="fixed"
                          alt="icon"
                        />
                      <span className={layout.ml_5}>JPG</span>
                    </BorderButton>
                    <BorderButton style={{marginRight:"20px"}} onClick={handleModelOpen}>
                      <Image
                          src="/icons/copy-link.svg"
                          height="14"
                          width="14"
                          layout="fixed"
                          alt="icon"
                        />
                      <span className={layout.ml_5}>Copy Link</span>
                    </BorderButton>
                    <p style={{color:'#17AA78'}}>Link Copied</p>
            <Modal
            open={modelOpen}
            onClose={handleModelClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={modelOpen}>
              <ModalBox>
                <span className={layout.model_close} onClick={handleModelClose}>
                  <Image
                    src="/icons/cancel.svg"
                    height="12"
                    width="12"
                    alt=""
                  />
                </span>
                <div className={layout.mb_20}>
                  <h3>Are you sure you want to<br/> download PNG?</h3>
                  <p>
                  The deal will be exported to your computer in a .png file.
                  </p>
                </div>
                <div className={layout.flex_center}>
                  <OutlineButton
                    onClick={handleModelClose}
                    aligncenter="true"
                    marginbottom="0px"
                  ><span className={layout.flex_center}>
                      <Image
                        alt=""
                        src="/icons/cancel-icon.svg"
                        width="16"
                        height="16"
                      />
                       <span className={layout.ml_10}>Cancel</span>
                    
                    </span>
                  </OutlineButton>
                  <MainButton marginbottom="0px" style={{marginLeft:'20px'}}>
                    <span className={layout.flex_center}>
                      <Image
                        alt=""
                        src="/icons/download-white.svg"
                        width="16"
                        height="16"
                      />{" "}
                      <span className={layout.ml_10}>Download PNG</span>
                    </span>
                  </MainButton>
                </div>
              </ModalBox>
            </Fade>
          </Modal>                    
      </div>
      <MainButton
       onClick={handleClick}
            fixwidth="auto"
            marginbottom="0"
            variant="contained"
            type="submit">
            Present with
          </MainButton>
        </div>
      <h2 className={`${layout.h2}`} style={{margin:'20px 0'}}>Contract Options</h2>
      <div className={layout.flex_between}>
      <div className={layout.flex_center}>
      <BorderButton style={{marginRight:"20px"}}>
                      <Image
                          src="/icons/docusign.png"
                          height="18"
                          width="70"
                          layout="fixed"
                          alt="icon"
                        />
                    </BorderButton>
                    <BorderButton style={{marginRight:"20px"}}>
                      <Image
                          src="/icons/pandadoc.png"
                          height="20"
                          width="76"
                          layout="fixed"
                          alt="icon"
                        />
                    </BorderButton>
      </div>
      <MainButton
       onClick={handleClick}
            fixwidth="auto"
            marginbottom="0"
            variant="contained"
            type="submit">
            Present with
          </MainButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}>
      <MenuList style={{width:'auto'}}>
      <div className="block">
        <MenuItem>
            Present with Google Slides
        </MenuItem>
        <MenuItem>
        Present with Google Docs
        </MenuItem>
        <MenuItem>
        Present with Powerpoint
        </MenuItem>
        <MenuItem>
        Present with Microsoft Word
        </MenuItem>
        <MenuItem>
        Present with PDF
        </MenuItem>
      </div>
      </MenuList>
        </Menu>
        </div>
    </>
  );
};
export default Listview;
