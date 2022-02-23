import { useRouter } from "next/router";
import * as React from "react";
import styled from "styled-components";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButtonNew from "@mui/material/IconButton";
import Image from "next/image";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Switch from "@mui/material/Switch";
import axios from "axios";
import { toast } from "react-toastify";
import tokenExpired from "../layout/withAuth/tokenExpired";
import { Fade, Modal } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import { IconButton, OutlineButton } from "../formControls.style";
import { PopMenu, ModalBox } from "../tableControls.style";

import globalLayout from "../../styles/globalLayout.module.scss";
import layout from "../../styles/layout.module.scss";

export const MenuPopupRole = (props) => {
  let {
    row,
    roles,
    setRoles,
    seteditRoles,
    moduleName,
    editToggle,
    setEditToggle,
  } = { ...props };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMoreClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const router = useRouter();

  const deleteSingleRole = async (roleId) => {
    const authDetails = JSON.parse(localStorage.getItem("authDetails"));
    const { jwt, userId, orgId } = authDetails;
    try {
      const response = await axios({
        method: "delete",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/role?roleId=${roleId}&userId=${userId}`,
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      });
      if (response.data.success) {
        toast.success(response.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        setRoles(
          roles.filter((role) => {
            return role.role !== row.role;
          })
        );
      } else {
        toast.error(
          `${response.data.error ? response.data.error : "error while login"}`,
          {
            position: toast.POSITION.BOTTOM_RIGHT,
          }
        );
      }
    } catch (err) {
      tokenExpired(err, router);
    }
  };
  const handleMenu = (menuOptions) => {
    if (menuOptions.Name === "Delete") {
      handleOpen();
    } else if (menuOptions.Name === "Edit") {
      setEditToggle(!editToggle);

      localStorage.setItem("deptId", row.departmentId);
      const editFormValues = {
        departmentId: JSON.parse(localStorage.getItem("deptId")),
        department: row.department,
        role: row.role,
        roleId: row.roleId,
        employeeLevel: row.employeeLevel,
        yearlySalary: row.yearlySalary,
        hourlySalary: row.hourlySalary,
      };
      seteditRoles(editFormValues);
      setRoles(
        roles.map((role) => {
          if (role.isEdit) {
            return { ...role, isEdit: false };
          }
          if (role.roleId === row.roleId) {
            return { ...role, isEdit: true };
          } else {
            return role;
          }
        })
      );
    } else if (menuOptions.Name === "Deactivate") {
    } else if (menuOptions.Name === "Re-Invite") {
    }
  };
  const menuOptions = [
    { Img: "/icons/edit-icon.svg", Name: "Edit" },
    { Img: "/icons/delete-icon.svg", Name: "Delete" },
  ];
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  // End Open popup Menu
  return (
    <>
      <IconButtonNew
        onClick={handleMoreClick}
        aria-label="more"
        id="long-button"
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
      >
        <MoreVertIcon aria-haspopup="true" sx={{ color: "#D2D4D4" }} />
      </IconButtonNew>
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
        {menuOptions.map((menuOptions, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              if (menuOptions.Name === "Delete") {
                handleOpen();
                handleMenu(menuOptions);
              } else {
                handleMenu(menuOptions);
              }
            }}
          >
            <Image src={menuOptions.Img} alt="" height="15" width="15" />
            <span className={layout.ml_10}>{menuOptions.Name}</span>
          </MenuItem>
        ))}
      </PopMenu>
      <div>
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
                <Image src="/icons/cancel.svg" height="12" width="12" alt="" />
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
                    deleteSingleRole(row.roleId);
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
                    <span className={layout.ml_10}>Delete these Roles</span>
                  </span>
                </IconButton>
              </div>
            </ModalBox>
          </Fade>
        </Modal>
      </div>
    </>
  );
};
