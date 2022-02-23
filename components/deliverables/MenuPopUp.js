import * as React from "react";
import styled from "styled-components";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import layout from "../../styles/layout.module.scss";

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
  const { moduleName, handleMenuClick,row } = props;
  //  Open popup Menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMoreClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const menuOptions = [
    { Img: "/icons/edit-icon.svg", Name: "Edit" },
    { Img: "/icons/delete-icon.svg", Name: "Delete" },
  ];
  //  End Open popup Menu
  return (
    <>
      <IconButton
        onClick={handleMoreClick}
        aria-label="more"
        id="long-button"
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
      >
        <MoreVertIcon aria-haspopup="true" sx={{ color: "#D2D4D4" }} />
      </IconButton>
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
        {menuOptions.map((menuOption,index) => (
          <MenuItem
            key={index}
            onClick={() => {
              handleMenuClick(menuOption,row);
              handleClose();
            }}
          >
            <Image src={menuOption.Img} alt="" height="15" width="15" />
            <span className={layout.ml_10}>{menuOption.Name}</span>
          </MenuItem>
        ))}
      </PopMenu>
    </>
  );
};
