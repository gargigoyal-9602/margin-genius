// import { Backdrop, Fade, FormControlLabel, Modal, Radio } from "@mui/material";
import React from "react";
import {
  OutlineButton,
  MainButton,
  PaymentCardLabel,
} from "../formControls.style";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import { ModalBox } from "../tableControls.style";
import layout from "../../styles/layout.module.scss";
import Image from "next/image";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";

const FirstModal = (props) => {
  const {
    open,
    handleClose,
    allPaymentMethods,
    handlePaymentModal,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    setPaymentMethod,
    deletePaymentMethod,
    setEditCard,
    showCard,
  } = props;
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <ModalBox style={{ minWidth: "480px" }}>
            <span className={layout.model_close} onClick={handleClose}>
              <Image src="/icons/cancel.svg" height="12" width="12" alt="" />
            </span>
            {allPaymentMethods.length === 0 ? (
              <div className={layout.mb_20}>
                <h3>Payment Information</h3>
                <div style={{ textAlign: "center", margin: "20px 0 0 0" }}>
                  <Image
                    src="/icons/no-payment.svg"
                    height="105"
                    width="146"
                    alt=""
                  />
                  <p style={{ padding: "30px 0 10px 0" }}>
                    You have no payment methods added. <br /> Add the first one!
                  </p>
                  <OutlineButton
                    onClick={() => {
                      handlePaymentModal();
                      handleClose();
                    }}
                    style={{
                      border: "1px solid #8E9595",
                      padding: "10px",
                      cursor: "pointer",
                      borderRadius: "4px",
                      width: "250px",
                      margin: "0 auto",
                      fontSize: "12px",
                    }}
                  >
                    Add Payment Method
                  </OutlineButton>
                </div>
              </div>
            ) : (
              <div className={layout.mb_20}>
                <h3>Payment Information</h3>
                <div style={{ textAlign: "left", margin: "20px 0 0 0" }}>
                  {allPaymentMethods.map((paymentMethod, index) => {
                    return (
                      <PaymentCardLabel key={index}>
                        <div
                          style={{
                            padding: "10px",
                            border: "2px solid #b4f3dd",
                            borderRadius: "5px",
                            marginBottom: "10px",
                            position: "relative",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <span
                            style={{
                              position: "absolute",
                              left: "9px",
                              top: "10px",
                              zIndex: "9999",
                              marginLeft: "30px",
                            }}
                          >
                            <Image
                              alt="Icon"
                              width="50"
                              height="25"
                              src={`/icons/${paymentMethod.cardType}-img.svg`}
                            />
                          </span>
                          <FormControlLabel
                            id="cardNumberId"
                            control={<Radio />}
                            label={paymentMethod.cardNumber}
                            value={paymentMethod.cardNumber}
                            onChange={(e) => {
                              setSelectedPaymentMethod(e.target.value);
                              setPaymentMethod(paymentMethod);
                              localStorage.setItem(
                                "pmId",
                                paymentMethod.paymentMethodId
                              );
                            }}
                            checked={
                              selectedPaymentMethod === paymentMethod.cardNumber
                            }
                          />
                          <div>
                            <button
                              className="btn-action"
                              onClick={() => {
                                setEditCard(true);
                                handlePaymentModal();
                                handleClose();
                                setPaymentMethod(paymentMethod);
                              }}
                            >
                              <Image
                                src={"/icons/edit-row.svg"}
                                height="18"
                                width="18"
                                alt=""
                              />
                            </button>
                            <button
                              className="btn-action"
                              onClick={() => deletePaymentMethod(paymentMethod)}
                            >
                              <Image
                                src={"/icons/delete-icon2.svg"}
                                height="18"
                                width="18"
                                alt=""
                              />
                            </button>
                          </div>
                        </div>
                      </PaymentCardLabel>
                    );
                  })}
                </div>
                <OutlineButton
                  onClick={() => {
                    setEditCard(false);
                    handlePaymentModal();
                    handleClose();
                  }}
                  style={{
                    border: "0",
                    padding: "0 0 100px 15px",
                    cursor: "pointer",
                    borderdius: "4px",
                    fontSize: "12px",
                    display: "flex",
                    color: "#000",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <AddCircleOutlineIcon style={{ fontSize: "16px" }} />
                  <span
                    style={{
                      paddingLeft: "4px",
                    }}
                  >
                    Add Payment Method
                  </span>
                </OutlineButton>
              </div>
            )}
            <div className={`${layout.flex_center} ${layout.mt_30}`}>
              <span className={`${layout.mr_10}`} style={{ width: "50%" }}>
                <OutlineButton
                  onClick={handleClose}
                  variant="text"
                  marginbottom="0"
                >
                  <Image
                    alt="Icon"
                    width="14"
                    height="14"
                    src="/icons/cancel-icon.svg"
                  />
                  <span className={layout.ml_10}>Cancel</span>
                </OutlineButton>
              </span>
              <span className={`${layout.ml_10}`} style={{ width: "50%" }}>
                <MainButton
                  onClick={() => {
                    showCard();
                    handleClose();
                  }}
                  variant="contained"
                  marginbottom="0"
                >
                  <Image
                    alt="Icon"
                    width="16"
                    height="16"
                    src="/icons/save-icon-white.svg"
                  />
                  <span className={layout.ml_10}>Save Changes</span>
                </MainButton>
              </span>
            </div>
          </ModalBox>
        </Fade>
      </Modal>
    </div>
  );
};

export default FirstModal;
