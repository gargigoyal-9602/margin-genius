import * as React from "react";
import styled from "styled-components";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButtonMore from "@mui/material/IconButton";
import Image from "next/image";
import layout from "../../styles/layout.module.scss";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import globalLayout from "../../styles/globalLayout.module.scss";

import {
  OutlineButton,  
  MainButton,
  InputText,
  IconButton
} from "../../components/formControls.style";
import { ModalBox } from "../../components/tableControls.style";

const PopMenu = styled(Menu)`
  & .MuiPaper-root {
    border: 1px solid #eff1f1;
    box-shadow: -2px 0px 2px rgba(8, 27, 64, 0.02),
      2px 0px 2px rgba(8, 27, 64, 0.02), 0px -2px 2px rgba(8, 27, 64, 0.02),
      0px 2px 4px rgba(8, 27, 64, 0.04);
    border-radius: 8px;
    min-width: 160px;
  }
`;
export const MenuPopup = (props) => {
  // export const MenuPopup = ({ moduleName }) => {
  //  Open popup Menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const open = Boolean(anchorEl);
  const handleMoreClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuOptions = [
    // { Img: "/icons/invite.svg", Name: "Re-Invite" },
    // { Img: "/icons/deactivate.svg", Name: "Deactivate" },
    { Img: "/icons/edit-icon.svg", Name: "Edit" },
    { Img: "/icons/delete-icon.svg", Name: "Delete" },
  ];
  //  End Open popup Menu
  return (
    <>
      <IconButtonMore
        onClick={handleMoreClick}
        aria-label="more"
        id="long-button"
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
      >
        <MoreVertIcon aria-haspopup="true" sx={{ color: "#D2D4D4" }} />
      </IconButtonMore>
      <PopMenu
        elevation={0}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {menuOptions.map((menuOptions) =>
          menuOptions.Name === "Delete" ? (
            <MenuItem
              key={menuOptions}
              onClick={handleOpenModal}
            >
              <Image src={menuOptions.Img} alt="" height="15" width="15" />
              <span className={layout.ml_10}>{menuOptions.Name}</span>
            </MenuItem>
          ) : (
            <MenuItem
              key={menuOptions}
              onClick={() => {
                handleClose();
                props.setEditId(props.departmentId);
                props.setEdit(true);
                console.log(props.departmentId);
              }}
            >
              <Image src={menuOptions.Img} alt="" height="15" width="15" />
              <span className={layout.ml_10}>{menuOptions.Name}</span>
            </MenuItem>
          )
        )}
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openModal}
            onClose={handleCloseModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={openModal}>
              <ModalBox>
                <span className={layout.model_close} onClick={handleCloseModal}>
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
                    onClick={handleCloseModal}
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
                      handleClose();
                      props.deleteDepartment(props.departmentId);

                      handleCloseModal();
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
      </PopMenu>
    </>
  );
};
