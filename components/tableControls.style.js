import * as React from "react";
import styled from "styled-components";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButtonNew from "@mui/material/IconButton";
import Image from "next/image";
import Box from "@mui/material/Box";
import layout from "../styles/layout.module.scss";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Switch from "@mui/material/Switch";
import axios from "axios";
import { toast } from "react-toastify";
import tokenExpired from "./layout/withAuth/tokenExpired";
import { Fade, Modal } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import { IconButton, OutlineButton } from "./formControls.style";
import globalLayout from "../styles/globalLayout.module.scss";
import { useSwitch } from '@mui/base/SwitchUnstyled';
import clsx from 'clsx';


//Items
export const SwitchWrap = styled.div`
      margin: 10px;
      display: flex;
      align-items: center;
      & .MuiSwitch-thumb{
        background: #fff;
      }
`;
const BasicSwitchRoot = styled('span')`
  font-size: 0;
  position: relative;
  display: inline-block;
  width: ${(props) => (props.SmallSize ? "28px" : "36px")};
  height: ${(props) => (props.SmallSize ? "14px" : "18px")};
  margin: 4px;
  background: #BFC7CF;
  border-radius: 10px;
  cursor: pointer;

  &.Switch-disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &.Switch-checked {
    background:#04D68F;
  }
`;

const BasicSwitchInput = styled('input')`
  cursor: inherit;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 1;
  margin: 0;
`;

const BasicSwitchThumb = styled('span')`
  display: block;
  width: ${(props) => (props.SmallSize ? "10px" : "12px")};
  height: ${(props) => (props.SmallSize ? "10px" : "12px")};
  top: ${(props) => (props.SmallSize ? "2px" : "3px")};
  left: 3px;
  border-radius: 16px;
  background-color: #fff;
  position: relative;
  transition: all 200ms ease;

  &.Switch-focusVisible {
    background-color: #AAB4BE;
    box-shadow: 0 0 1px 8px rgba(0, 0, 0, 0.25);
  }

  &.Switch-checked {
    left:  ${(props) => (props.SmallSize ? "15px" : "20px")};
    top: ${(props) => (props.SmallSize ? "2px" : "3px")};
    background-color: #fff;
  }
`;

export const NewSwitch = (props) => {
  const { getInputProps, checked, disabled, focusVisible,unchecked } = useSwitch(props);

  const stateClasses = {
    'Switch-checked': checked,
    'Switch-disabled': disabled,
    'Switch-focusVisible': focusVisible,
    'Switch-unchecked':unchecked
  };

  return (
    <BasicSwitchRoot className={clsx(stateClasses)}>
      <BasicSwitchThumb className={clsx(stateClasses)} />
      <BasicSwitchInput {...getInputProps()}/>
    </BasicSwitchRoot>
  );
}

export const SmallSwitch = (props) => {
  const { getInputProps, checked, disabled, focusVisible } = useSwitch(props);
  const stateClasses = {
    'Switch-checked': checked,
    'Switch-disabled': disabled,
    'Switch-focusVisible': focusVisible,
  };
  return (
    <BasicSwitchRoot SmallSize className={clsx(stateClasses)}>
      <BasicSwitchThumb SmallSize className={clsx(stateClasses)} />
      <BasicSwitchInput {...getInputProps()}/>
    </BasicSwitchRoot>
  );
}

export const MainTable = styled.div`
  .MuiPaper-root {
    border-radius: 0px;
    box-shadow: none;
  }
  .MuiTable-root {
    .MuiTableHead-root .MuiTableRow-head {
      border: 0;
      outline: 0;
      .MuiTableCell-root {
        color:#8E9595;
        .MuiOutlinedInput-input {
          font-size: 12px;
        }
      }
    }
    .MuiTableRow-root {
      outline: 1px solid rgba(239, 241, 241, 1);
      &.editMode {
        outline: 1px solid #04d68f;
        .MuiTableCell-root {
          position: relative;
          padding-top: 10px;
          padding-bottom: 26px;
          &:first-child {
            border-left: 1px solid #04d68f;
          }
          &:last-child {
            border-right: 1px solid #04d68f;
          }
          p.error {
          position: absolute;
          width: 100%;
          left: 0;
          font-size: 10px;
        }
        .MuiOutlinedInput-input {
          font-size: 12px;
        }
        }
      }
    }
    .MuiTableCell-root {
      padding: 6px 10px;
      /* outline: 2px solid rgba(239, 241, 241, 1); */
      &:first-child {
        border-radius: 4px 0 0 4px;
      }
      &:last-child {
        border-radius: 0 4px 4px 0;
      }
    }
    .MuiCheckbox-root {
      color: rgba(0, 0, 0, 0.1);
      .MuiSvgIcon-root {
        width: 25px;
        height: 25px;
      }
    }
    .Mui-checked {
      color: #04d68f;
    }
  }
`;

export const InsideTable = styled.div`
  .MuiPaper-root {
    border-radius: 0px;
    box-shadow: none;
  }
  .MuiTable-root {
    .MuiTableHead-root .MuiTableRow-head {
      border: 0;
      outline: 0;
      .MuiTableCell-root {
        background: #fff;
        border: 0;
        color:#8E9595;
      }
    }
    .MuiTableRow-root {
      outline: 0;
      &.editMode {
        outline: 1px solid #04d68f;
        .MuiTableCell-root {
          position: relative;
          padding-top: 10px;
          padding-bottom: 26px;
          &:first-child {
            border-left: 1px solid #04d68f;
          }
          &:last-child {
            border-right: 1px solid #04d68f;
          }
        }
        p.error {
          position: absolute;
          width: 100vw;
          left: 0;
        }
      }
    }
    .MuiTableCell-root {
      padding: 6px 10px;
      background: #F8F8F8;
      border-bottom:2px solid #fff;
      /* outline: 2px solid rgba(239, 241, 241, 1); */
      &:first-child {
        border-radius: 4px 0 0 4px;
      }
      &:last-child {
        border-radius: 0 4px 4px 0;
      }
    }
    .MuiCheckbox-root {
      color: rgba(0, 0, 0, 0.1);
      .MuiSvgIcon-root {
        width: 25px;
        height: 25px;
      }
    }
    .Mui-checked {
      color: #04d68f;
    }
  }
`;

export const PopMenu = styled(Menu)`
  & .MuiPaper-root {
    border: 1px solid #eff1f1;
    box-shadow: -2px 0px 2px rgba(8, 27, 64, 0.02),
      2px 0px 2px rgba(8, 27, 64, 0.02), 0px -2px 2px rgba(8, 27, 64, 0.02),
      0px 2px 4px rgba(8, 27, 64, 0.04);
    border-radius: 8px;
    min-width: 160px;
  }
`;



export const ModalBox = styled(Box)`
  &.MuiBox-root {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #ffffff;
    border: 1px solid #eff1f1;
    box-shadow: 0px 1px 10px rgba(8, 27, 64, 0.1);
    border-radius: 8px;
    min-width: ${(props) => props.minWidth || "300px"};
    max-width: ${(props) => props.manWidth || "420px"};
    padding: 24px;
    /* opacity: 1 !important;
    visibility:visible !important; */
    h3 {
      font-size: 20px;
      line-height: 24px;
      margin-bottom: 15px;
    }
    p {
      font-size: 12px;
      line-height: 20px;
    }
    input#LogoUpload {
        display: none;
    }
    label.file_upload {
        position: absolute;
        width:350px;
        height: 140px;
        border-radius: 4px;
        border: 1px solid #ccc;
    }
    .icon_wrap{
            background: #fff;
            border-radius: 4px;
            position: absolute;
            top: 70px;
            right: 30px;
            z-index: 99;
            padding: 4px;
            display: flex;
    }
    .delete_img, .upload_img {
            color: #E05269;
            cursor: pointer;
            padding: 0 5px;
          }
  }
`;

export const DropDownBox = styled(Box)`
  &.MuiBox-root {
    position: absolute;
    background: #ffffff;
    border: 1px solid #eff1f1;
    box-shadow: 0px 1px 10px rgba(8, 27, 64, 0.1);
    border-radius: 8px;
    min-width: ${(props) => props.minWidth || "200px"};
    max-width: ${(props) => props.maxWidth || "300px"};
    padding: 10px;
    max-height: 200px;
    overflow-y: auto;
  }
`;

export const ChipOption = styled(Chip)`
  &.MuiChip-root {
    background: #f1fef8;
    border-radius: 8px;
    border: 0;
    padding: 0 10px;
    &:hover {
      background: #b4f3dd;
    }
    .MuiChip-label {
      padding-left: 0;
    }
  }
`;

export const Drawer = styled.div`
  min-width: 480px;
  h2 {
    font-size: 20px;
    padding: 25px;
  }
  h3 {
    font-size: 20px;
    padding: 0 0 25px 0;
  }
  div.DrawerWrap {
    padding: 25px;
  }
  &.MuiTextField-root {
    font-size: 12px;
  }
`;

export const FilterButton = styled(Button)`
  box-shadow: none;
  &.MuiButton-root {
    font-size: 13px;
    box-shadow: none;
    background-color: ${(props) => (props.active ? "#128A81" : "#fff")};
    color: ${(props) => (props.active ? "#fff" : "#455252")};
    border-radius: 4px;
    text-transform: none;
    padding: 6px 10px;
    &:hover {
      background-color: ${(props) => (props.active ? "#128A81" : "#fff")};
      color: ${(props) => (props.active ? "#fff" : "#455252")};
      box-shadow: none;
    }
    .lable_text {
      color: ${(props) => (props.active ? "#fff" : "#455252")};
      margin: 0 10px;
      &:after {
        content: "";
        position: absolute;
        right: 30px;
        top: 0;
        border-right: 1px solid #fff;
        height: 100%;
      }
    }
    &:hover,
    &:focus {
      outline: none;
    }
  }
  &:hover,
  &:focus {
    outline: none;
  }
`;

export const FilterBox = styled(Popover)`
  .MuiPaper-root {
    padding: 25px;
    border: 1px solid #eff1f1;
    box-shadow: 0px 1px 10px rgba(8, 27, 64, 0.1);
    border-radius: 16px;
    .filter_head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 15px;
      h3 {
        font-size: 18px;
      }
    }
    .filter_box {
      margin-left: 15px;
      font-size: 12px;
      .filter_wrap {
        border: 1px solid #d2d4d4;
        border-radius: 4px;
        padding: 11px 8px;
        min-width: 170px;
        height:150px;
        overflow-y: auto;
        .filter_name {
          margin-bottom: 15px;
        }
        .MuiFormControlLabel-root {
          .MuiFormControlLabel-label {
            background: #fff;
            border: 1px solid #fff;
            padding: 2px 12px;
          }
        }
      }
      &:first-child {
        margin: 0;
      }
    }
    .cutome_check {
      position: relative;
      .check_count {
        position: absolute;
        right: 20px;
        z-index: 99;
        top: 13px;
      }
      .MuiCheckbox-root {
        padding: 0;
      }
      .MuiFormControlLabel-root {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0;
        .MuiFormControlLabel-label {
          background: #f8f8f8;
          border: 1px solid #eff1f1;
          border-radius: 4px;
          padding: 8px 12px;
          margin-bottom: 8px;
          width: 100%;
          cursor: pointer;
          font-size: 12px;
        }
        .Mui-checked + .MuiFormControlLabel-label {
          background: #128a81;
          border: 1px solid #128a81;
          color: #fff;
        }
      }
      .MuiCheckbox-root > svg {
        display: none;
      }
    }
    .simple_check {
      padding:4px 0;
      .MuiCheckbox-root {
        padding: 0 0 0 10px;
      }
    }
  }
`;

export const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 42,
  height: 22,
  padding: 0,
  display: "flex",
  marginRight: 15,
  marginLeft: 13,
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 4,
    "&.Mui-checked": {
      transform: "translateX(20px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#04d68f",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 14,
    height: 14,
    borderRadius: 15,
  },
  "& .MuiSwitch-track": {
    borderRadius: 30 / 2,
    opacity: 1,
    backgroundColor: "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

export const ButtonMenu = styled(Popover)`
.MuiPaper-root {
    padding: 15px;
    margin: 0 0 15px 0;
    border: 1px solid #eff1f1;
    box-shadow: 0px 1px 10px rgba(8, 27, 64, 0.1);
    border-radius: 8px;
    .item {
      padding: 10px 0;
      cursor: pointer;
    }
  }
`