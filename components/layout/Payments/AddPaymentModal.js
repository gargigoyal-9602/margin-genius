import React from "react";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import Image from "next/image";
import { ModalBox } from "../../tableControls.style";
import layout from "../../../styles/layout.module.scss";
import StripeForm from "./StripeForm";
import EditPayments from "./EditPayments";

function AddPaymentModal(props) {
  
  const {
    openPaymentModal,
    closePaymentModal,
    getAllPaymentMethods,
    editCard,
    paymentMethod,
    cardBrand,
    setCardBrand,
    setEditCard,
    allPaymentMethods
  } = props;

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openPaymentModal}
        onClose={closePaymentModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openPaymentModal}>
          <ModalBox style={{ minWidth: "600px" }}>
            <span
              className={layout.model_close}
              onClick={() => {
                closePaymentModal();
                setEditCard(false);
              }}
            >
              <Image src="/icons/cancel.svg" height="20" width="12" alt="" />
            </span>
            {!editCard ? (
              <StripeForm
                closePaymentModal={closePaymentModal}
                getAllPaymentMethods={getAllPaymentMethods}
                cardBrand={cardBrand}
                setCardBrand={setCardBrand}
                allPaymentMethods={allPaymentMethods}
              />
            ) : (
              <EditPayments
                closePaymentModal={closePaymentModal}
                getAllPaymentMethods={getAllPaymentMethods}
                paymentDetails={paymentMethod}
                setEditCard={setEditCard}
                allPaymentMethods={allPaymentMethods}
              />
              // <EditPaymentMethod
              //   paymentMethod={paymentMethod}
              //   getAllPaymentMethods={getAllPaymentMethods}
              //   closePaymentModal={closePaymentModal}
              // />
            )}
          </ModalBox>
        </Fade>
      </Modal>
    </div>
  );
}

export default AddPaymentModal;
