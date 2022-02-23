import * as React from "react";
import { TabContent } from './Deals.style';
import Image from "next/image";
import InputLabel from "@mui/material/InputLabel";
import layout from "../../styles/layout.module.scss";
import { ButtonMenu, ModalBox } from "../tableControls.style";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";

import {
     MainButton,
     OutlineButton,
     InputText,
     RedOutlineButton,
     InputTextArea,
     ErrorMsg,
} from "../../components/formControls.style";
export const Comments = () => {

const [anchorEl, setAnchorEl] = React.useState(null);
const handleClick = (event) => {
     setAnchorEl(event.currentTarget);
   };
   const handleMenuClose = () => {
     setAnchorEl(null);
   };
   const MenuOpen = Boolean(anchorEl);
 
   const [open, setOpen] = React.useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);
 
   const [openDissaprove, setopenDissaprove] = React.useState(false);
   const handleOpenDissaprove = () => setopenDissaprove(true);
   const handleCloseDissaprove = () => setopenDissaprove(false);
     return (
          <>
               <TabContent className="details">
                    <div className="details-tab">
                         <div className="comment-box">
                              <Image
                                   src="/icons/img-chat.svg"
                                   width="115"
                                   height="115" alt="chat" />

                              <span>You have no history of comments yet. Leave a comment for salesman or look for comments here later.</span>
                              <div className="buttonwrap">
                                   <div>
                                        <InputLabel htmlFor="description">
                                        Leave a comment for an approver
                                        </InputLabel>
                                        <InputTextArea
                                             minRows={4}
                                             id="description"
                                             name="description"
                                             placeholder="You can add comments on current deal to your approver"
                                        />
                                   </div>
                                   <MainButton
                                        fixwidth="auto"
                                        marginbottom="0"
                                        variant="contained"
                                        style={{ width: "110px" }}
                                        type="submit"
                                   >
                                        send
                                   </MainButton>
                              </div>
                         </div>
                    </div>
                    <div className="buttonWrap">
            <OutlineButton
              variant="text"
              fixwidth="auto"
              marginbottom="0"
              className={layout.mr_10}
              style={{ border: "0", color: "#0A2828" }}
              onClick={() => setIsCreateNewDeal(false)}
            >
              Cancel
            </OutlineButton>
            <MainButton
              fixwidth="auto"
              marginbottom="0"
              variant="contained"
              type="submit"
              onClick={handleClick}
            >
              Create Deal
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
              <div className="item" onClick={handleOpen}>
                <Image
                  src="/icons/save-icon.svg"
                  height="15"
                  width="15"
                  alt=""
                />{" "}
                <span className={layout.ml_10} style={{ color: "#04D68F" }}>
                  Approve
                </span>
              </div>
              <div className="item" onClick={handleOpenDissaprove}>
                <Image
                  src="/icons/cancel-icn.svg"
                  height="15"
                  width="15"
                  alt=""
                />
                <span className={layout.ml_10} style={{ color: "#E05269" }}>
                  Dissaprove
                </span>
              </div>
            </ButtonMenu>
            <Modal
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <ModalBox style={{ width: "450px" }}>
                  <span className={layout.model_close} onClick={handleClose}>
                    <Image
                      src="/icons/cancel.svg"
                      height="12"
                      width="12"
                      alt=""
                    />
                  </span>
                  <div className={layout.mb_20}>
                    <h3>
                      Are you sure you want to <br />
                      change status to Approved?
                    </h3>

                    <p>
                      By changing status of this deal to “Approved”, you confirm
                      that all the information is filled correctly, and the deal
                      is ready to be transformed into proposal/contract and be
                      presented to a client.
                    </p>
                  </div>
                  <div className={layout.flex_between_center}>
                    <OutlineButton
                      onClick={handleClose}
                      aligncenter="true"
                      marginbottom="0px"
                      style={{ marginRight: "20px" }}
                    >
                      <span className={layout.flex_center}>
                        <Image
                          alt=""
                          src="/icons/cancel-icon.svg"
                          width="16"
                          height="16"
                        />
                        <span className={layout.ml_10}>Cancel</span>
                      </span>
                    </OutlineButton>
                    <MainButton marginbottom="0px">
                      <span className={layout.flex_center}>
                        <Image
                          alt=""
                          src="/icons/save-icon-white.svg"
                          width="16"
                          height="16"
                        />
                        <span className={layout.ml_10}>Approve the Deal</span>
                      </span>
                    </MainButton>
                  </div>
                </ModalBox>
              </Fade>
            </Modal>

            <Modal
              open={openDissaprove}
              onClose={handleCloseDissaprove}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={openDissaprove}>
                <ModalBox style={{ width: "450px" }}>
                  <span
                    className={layout.model_close}
                    onClick={handleCloseDissaprove}
                  >
                    <Image
                      src="/icons/cancel.svg"
                      height="12"
                      width="12"
                      alt=""
                    />
                  </span>
                  <div className={layout.mb_20}>
                    <h3>
                      Are you sure you want to <br />
                      change status to Not Approved?
                    </h3>

                    <p>
                      By changing status of this deal to “Approved”, you confirm
                      that all the information is filled correctly, and the deal
                      is ready to be transformed into proposal/contract and be
                      presented to a client.
                    </p>
                    <div className={layout.mt_20}>
                      <InputLabel htmlFor="description">
                        Leave a comment for the salesman
                      </InputLabel>
                      <InputTextArea
                        minRows={4}
                        id="description"
                        name="description"
                        placeholder="You can add comments on current deal to your approver"
                      />
                    </div>
                  </div>
                  <div className={layout.flex_between_center}>
                    <OutlineButton
                      onClick={handleCloseDissaprove}
                      aligncenter="true"
                      marginbottom="0px"
                      style={{ marginRight: "20px" }}
                    >
                      <span className={layout.flex_center}>
                        <Image
                          alt=""
                          src="/icons/cancel-icon.svg"
                          width="16"
                          height="16"
                        />
                        <span className={layout.ml_10}>Cancel</span>
                      </span>
                    </OutlineButton>
                    <MainButton marginbottom="0px" style={{background:'#E05269', borderColor:'#E05269'}}>
                      <span className={layout.flex_center}>
                        <Image
                          alt=""
                          src="/icons/close-toast.svg"
                          width="16"
                          height="16"
                        />
                        <span className={layout.ml_10}>Disapprove</span>
                      </span>
                    </MainButton>
                  </div>
                </ModalBox>
              </Fade>
            </Modal>
          </div>
               </TabContent>
          </>
     )
}