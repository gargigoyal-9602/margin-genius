import { IconButton } from "@mui/material";
import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
export const DropdownButton = (props) => {
    let {toggle1,handleToggle}=props
 
  return (
    <>
      {toggle1? (
        <IconButton onClick={handleToggle}>
          <ExpandLessIcon />
        </IconButton>
      ) : (
        <IconButton onClick={handleToggle}>
          <KeyboardArrowDownIcon />
        </IconButton>
      )}
     
    </>
  );
};
