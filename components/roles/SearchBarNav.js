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
import RightDrawer from "./RightDrawer";

const SearchBarNav = (props) => {
  const {
    roles,
    setRoles,
    searchText,
    handleMultipleDelete,
    handleChange,
    selected,
    setSelected
  } = props;
  const [open, setOpen] = React.useState(false);
  const [isCreateNewRoles, setIsCreateNewRoles] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addNewRole = () => {
    // setRoles(roles.concat({ id: roles.length + 1, isCreateNewRow: true }));
  };

  return (
    <>
      <div className={globalLayout.search_bar_nav}>
        <div className={globalLayout.search_field}>
          <InputText
            width="350px"
            id="Search"
            name="Search"
            type="text"
            value={searchText}
            onChange={handleChange}
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
        <div className={`${layout.flex_center}`}>
          <span className={layout.mr_20}>
            <IconButton disabled={selected.length === 0} onClick={handleOpen}>
              <span className={layout.flex_center}>
                <Image
                  alt=""
                  src="/icons/delete-icon.svg"
                  width="16"
                  height="16"
                />
              </span>
            </IconButton>
          </span>
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
                  <h3>Are you sure you want to delete these Roles?</h3>
                  <p>
                    The Roles will be deleted immediately and this action cannot
                    be undone.
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
                      handleMultipleDelete();
                      setSelected([])
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
                      <span className={layout.ml_10}>Delete these Roles</span>
                    </span>
                  </IconButton>
                </div>
              </ModalBox>
            </Fade>
          </Modal>
          <RightDrawer roles={roles} setRoles={setRoles} selected={setSelected} />
          {/* <OutlineButton
            onClick={addNewRole}
            aligncenter="true"
            fixwidth="auto"
            marginbottom="0px"
            disabled={roles.length === 0}
          >
            <span className={globalLayout.btn_icon}>
              <Image
                alt=""
                src="/icons/plus-icon-green.svg"
                width="16"
                height="16"
              />
            </span>
            Add a new Role
          </OutlineButton> */}
        </div>
      </div>
    </>
  );
};

export default SearchBarNav;
