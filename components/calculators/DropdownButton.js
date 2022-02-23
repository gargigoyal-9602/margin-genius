import { IconButton } from "@mui/material";
import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
export const DropdownButton = (props) => {
    // let {toggle1,handleToggle}=props
 
  return (
    <>
      {props.open? (
        <IconButton >
          <ExpandLessIcon/>
        </IconButton>
      ) : (
        <IconButton >
          <KeyboardArrowDownIcon />
        </IconButton>
      )}
     
    </>
  );
};
