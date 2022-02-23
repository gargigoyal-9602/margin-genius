import React from "react";
import {
  Autocomplete,
  Backdrop,
  createFilterOptions,
  Fade,
  Modal,
  TextField,
} from "@mui/material";
import { ErrorMsg, MainButton, OutlineButton } from "../formControls.style";
import { ModalBox } from "../tableControls.style";
import layout from "../../styles/layout.module.scss";
import globalLayout from "../../styles/globalLayout.module.scss";
import Image from "next/image";
import { Form, Formik } from "formik";
import { validationSchema } from "../../validators/admindeals.validators";

function SelectCalculatorModal(props) {
  const {
    open,
    handleClose,
    calculators,
    setIsCreateNewDeal,
    setSelectedCalculator,
  } = props;

  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (option) => {
      return option.calculatorName;
    },
  });
  const calName = {
    calculatorName: "",
  };
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
          <ModalBox style={{ width: "450px" }}>
            <Formik
              enableReinitialize
              initialValues={calName}
              validationSchema={validationSchema}
              onSubmit={() => {
                console.log("submit");
                setIsCreateNewDeal(true);
                handleClose();
              }}
            >
              {({
                touched,
                errors,
                values,
                handleBlur,
                handleChange,
                setFieldValue,
                resetForm,
              }) => (
                <Form>
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
                      Choose the calculator for <br />
                      the new deal
                    </h3>
                    <p>Select the Calculator</p>
                    <Autocomplete
                      options={calculators}
                      getOptionLabel={(option) => option.calculatorName}
                      filterOptions={filterOptions}
                      onChange={(e, value) => {
                        setSelectedCalculator(value);
                        setFieldValue("calculatorName", value.calculatorName);
                      }}
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          {...params}
                          placeholder="Select or enter the name"
                          name="calculatorName"
                          onBlur={handleBlur}
                        />
                      )}
                    />
                    <ErrorMsg name="calculatorName"></ErrorMsg>
                  </div>
                  <div className={layout.flex_between_center}>
                    <OutlineButton
                      onClick={handleClose}
                      aligncenter="true"
                      marginbottom="0px"
                      style={{ marginRight: "20px" }}
                    >
                      <span className={globalLayout.btn_icon}>
                        <Image
                          alt=""
                          src="/icons/cancel-icon.svg"
                          width="16"
                          height="16"
                        />
                      </span>
                      Cancel
                    </OutlineButton>
                    <MainButton type="submit" marginbottom="0px">
                      <span className={layout.flex_center}>
                        <span className={layout.ml_10}>Create New Deal</span>
                      </span>
                    </MainButton>
                  </div>
                </Form>
              )}
            </Formik>
          </ModalBox>
        </Fade>
      </Modal>
    </div>
  );
}

export default SelectCalculatorModal;
