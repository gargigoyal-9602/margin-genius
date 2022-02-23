import * as React from "react";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import globalLayout from "../../styles/globalLayout.module.scss";
import layout from "../../styles/layout.module.scss";
import Image from "next/image";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "next/link";
import {
  OutlineButton,
  InputText,
  IconButton,
} from "../../components/formControls.style";
import { ModalBox } from "../../components/tableControls.style";
import RightDrawer from "../../components/department-markup/RightDrawer";

const SearchBarNav = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addRow = () => {
    props.setDepartments([{}, ...props.departments]);
    props.setAddedRow(true);
  };
  return (
    <>
      <div className={globalLayout.search_bar_nav}>
        <div className={globalLayout.search_field}>
          <InputText
            onChange={(e) => props.setSearchText(e.target.value)}
            value={props.searchText}
            width="350px"
            id="Search"
            name="Search"
            type="text"
            placeholder="Search for department name"
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
        <div className={layout.flex_center}>
          <div className={layout.mr_20}>
            <IconButton
              disabled={props.selected.length === 0}
              onClick={handleOpen}
            >
              <span className={layout.flex_center}>
                <Image
                  alt=""
                  src="/icons/delete-icon.svg"
                  width="16"
                  height="16"
                />
              </span>
            </IconButton>
          </div>
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
              <ModalBox>
                <span className={layout.model_close} onClick={handleClose}>
                  <Image
                    src="/icons/cancel.svg"
                    height="12"
                    width="12"
                    alt=""
                  />
                </span>
                <div className={layout.mb_20}>
                  <h3>Are you sure you want to delete these Departments?</h3>
                  <p>
                    The Departments will be deleted immediately and this action
                    cannot be undone.
                  </p>
                </div>
                <div className={layout.flex_between_center}>
                  <OutlineButton
                    onClick={handleClose}
                    aligncenter="true"
                    fixwidth="auto"
                    marginbottom="0px"
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
                  <IconButton
                    onClick={() => {
                      const departmentId = props.selected.toString();
                      props.setSelected([]);
                      props.handleMultipleDelete(departmentId);

                      handleClose();
                    }}
                    withText
                  >
                    <span className={layout.flex_center}>
                      <Image
                        alt=""
                        src="/icons/delete-icon-white.svg"
                        width="16"
                        height="16"
                      />{" "}
                      <span className={layout.ml_10}>Delete Departments</span>
                    </span>
                  </IconButton>
                </div>
              </ModalBox>
            </Fade>
          </Modal>
          {/* <OutlineButton aligncenter="true" fixwidth="auto" marginbottom="0px" onClick={() => !props.addedRow && addRow()}><span className={globalLayout.btn_icon}><Image alt="" src="/icons/plus-icon-green.svg" width="16" height="16" /></span>Add a new Department</OutlineButton> */}
          <RightDrawer
            setSelected={props.setSelected}
            departments={props.departments}
            setDepartments={props.setDepartments}
            getDepartments={props.getDepartments}
            addDepartment={props.addDepartment}
          />
        </div>
      </div>
    </>
  );
};

export default SearchBarNav;
