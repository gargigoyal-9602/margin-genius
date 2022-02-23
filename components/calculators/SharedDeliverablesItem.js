import React from "react";
import Menu from "@mui/material/Menu";
import {
  AccordionBox,
  TabContentWrap,
  MenuList,
  TextWrap,
} from "./Calculators.style";
import InputAdornment from "@mui/material/InputAdornment";
import Image from "next/image";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import layout from "../../styles/layout.module.scss";
import {
  ErrorMsg,
  MainButton,
  OutlineButton,
  InputText,
} from "../formControls.style";

const PopUpOfDeliverables = (props) => {
  const [search, setSearch] = React.useState("");
  const removeVal = (arr, val) => {
    const newArray = [];
    arr.forEach((ele) => {
      if (ele !== val) {
        newArray.push(ele);
      }
    });
    return newArray;
  };

  return (
    // <Menu
    //   id="basic-menu"
    //   anchorEl={props.anchorEl}
    //   open={props.open}
    //   onClose={props.handleClose}
    //   MenuListProps={{
    //     "aria-labelledby": "basic-button",
    //   }}
    // >
    <>
      <TextWrap>
        <InputText
          size="small"
          id="Search"
          name="Search"
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          className="border-0"
          placeholder="Search for user"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Image src="/icons/search.svg" height="15" width="15" alt="" />
              </InputAdornment>
            ),
          }}
        />
      </TextWrap>
      <MenuList style={{width:'100%'}}>
        <div className="block">
          <p>Selected</p>
          <table style={{width:'100%'}}>
          {props.users.map((ele) => {
            // if (props.salesMan) {
            return (
              props.selectedSalesMan.includes(ele.deliverablesId) && (
                // <MenuItem>
                <tr>
                  <td>
                    <FormControlLabel
                      onChange={(e) => {
                        if (e.target.checked) {
                          if (!props.sValues.includes(ele.deliverablesId)) {
                            props.setSValues([
                              ...props.sValues,
                              ele.deliverablesId,
                            ]);
                          }
                        } else {
                          if (props.sValues.includes(ele.deliverablesId)) {
                            const newArr = removeVal(
                              props.sValues,
                              ele.deliverablesId
                            );
                            props.setSValues(newArr);
                          }
                        }
                      }}
                      control={
                        <Checkbox
                          checked={props.sValues.includes(ele.deliverablesId)}
                        />
                      }
                      label={ele.deliverableName}
                    />
                  </td>
                  <td>{ele.price}$</td>
                </tr>
                // </MenuItem>
              )
            );
          })}
          </table>
        </div>

        <div className="border block">
          <p>Deliverables</p>
          <table style={{width:'100%'}}>
          {props.users.map((ele, index) => {
            if (
              !props.deliverableArr.includes(ele.deliverablesId) &&
              ele.customDropdwon
            ) {
              if (
                ele.deliverableName.toLowerCase().includes(search.toLowerCase())
              ) {
                return (
                  !props.selectedSalesMan.includes(ele.deliverablesId) && (
                    // <MenuItem>
                    <tr>
                      <td>
                        <FormControlLabel
                          onChange={(e) => {
                            if (e.target.checked) {
                              console.log(e.target.checked)
                              if (!props.sValues.includes(ele.deliverablesId)) {
                                const newUsers = props.users;
                                const date = new Date();
                                const newDate = `${date}`;
                                newUsers[index].registrationDate =
                                  newDate.slice(4, 21);
                                props.setUsers(newUsers);

                                props.setSValues([
                                  ...props.sValues,
                                  ele.deliverablesId,
                                ]);
                              }
                            } else {
                              if (props.sValues.includes(ele.deliverablesId)) {
                                const newArr = removeVal(
                                  props.sValues,
                                  ele.deliverablesId
                                );
                                props.setSValues(newArr);
                              }
                            }
                          }}
                          control={<Checkbox />}
                          label={ele.deliverableName}
                        />
                      </td>
                      <td>{ele.price}</td>
                    </tr>
                  )
                );
              }
            }
          })}
          </table>
        </div>
      </MenuList>
      <OutlineButton
        aligncenter="true"
        fixwidth="auto"
        marginbottom="0"
        style={{
          margin: "25px 13px 20px 13px",
          width: "-webkit-fill-available",
        }}
        onClick={(event) => {
          props.setSelectedSalesMan(props.sValues);
          const blankArr = [];
          props.sValues.map((ele) => {
            const obj = {
              deliverableId: ele,
              roleId: props.deliverableRoleId[ele],
              allowaccessView:JSON.parse(localStorage.getItem('checkDel')),
            };
            blankArr.push(obj);
          });
          props.setFieldValue("deliverables", props.sValues);
          props.setFieldValue("calculatorCustomDeliverable", blankArr);
          props.setNewState2(false);
        }}
      >
        <span className={layout.flex_top}>
          <Image
            src="/icons/plus-icon-green.svg"
            width="16"
            height="16"
            alt=""
          />
        </span>
        <span className={layout.ml_10}>Confirm</span>
      </OutlineButton>
    </>
    // </Menu>
  );
};

export default PopUpOfDeliverables;

//adding date functionality
