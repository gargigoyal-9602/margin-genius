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

const SharedComponentItems = (props) => {
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
React.useEffect(()=>{
console.log('toggled')
},[props.togg])
  return (
    
    <div>
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

          {props.users.map((ele) => {
            // if (props.salesMan) {
            return (
              props.selectedSalesMan.includes(ele.packageId) && (
                // <MenuItem>
                <tr>
                  <td>
                    <FormControlLabel
                      onChange={(e) => {
                        if (e.target.checked) {
                          if (!props.sValues.includes(ele.packageId)) {
                            props.setSValues([...props.sValues, ele.packageId]);
                          }
                        } else {
                          if (props.sValues.includes(ele.packageId)) {
                            const newArr = removeVal(
                              props.sValues,
                              ele.packageId
                            );
                            props.setSValues(newArr);
                          }
                        }
                      }}
                      control={
                        <Checkbox
                          checked={props.sValues.includes(ele.packageId)}
                        />
                      }
                      label={ele.packageName}
                    />
                  </td>
                  <td>{ele.overallPrice}</td>
                  {/* </MenuItem> */}
                </tr>
              )
            );
          })}
        </div>

        <div className="border block">
          <p>Packages</p>
          <table style={{width:'100%'}}>
          {props.users.map((ele, index) => {
            if (ele.packageName.toLowerCase().includes(search.toLowerCase())) {
              return (
                !props.selectedSalesMan.includes(ele.packageId) && (
                  // <MenuItem>
                  <tr>
                    <td>
                      <FormControlLabel
                        onChange={(e) => {
                          if (e.target.checked) {
                            if (!props.sValues.includes(ele.packageId)) {
                              const newUsers = props.users;
                              const date = new Date();
                              const newDate = `${date}`;
                              newUsers[index].registrationDate = newDate.slice(
                                4,
                                21
                              );
                              props.setUsers(newUsers);

                              props.setSValues([
                                ...props.sValues,
                                ele.packageId,
                              ]);
                            }
                          } else {
                            if (props.sValues.includes(ele.packageId)) {
                              const newArr = removeVal(
                                props.sValues,
                                ele.packageId
                              );
                              props.setSValues(newArr);
                            }
                          }
                        }}
                        control={<Checkbox />}
                        label={ele.packageName}
                      />
                    </td>
                    <td>{ele.overallPrice}</td>
                    {/* </MenuItem> */}
                  </tr>
                )
              );
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
              packageId: ele,
              totalPrice: `${Math.ceil(props.packagePriceObj[ele])}`,
              allowaccessView:JSON.parse(localStorage.getItem('check')),
            };
            blankArr.push(obj);
          });
          props.setFieldValue("packages", props.sValues);
          props.setFieldValue("calculatorPackages", blankArr);

          const deliverableArr = [];

          props.sValues.forEach((element) => {
            props.users.forEach((ele) => {
              if (ele.packageId == element) {
                ele.packageDeliverables.forEach((e) => {
                  deliverableArr.push(e.deliverableId);
                });
              }
            });
          });

          const newArr = props.selectedDeliverables;
          props.selectedDeliverables.forEach((ele, index) => {
            if (deliverableArr.includes(ele)) {
              newArr.splice(index, 1);
            }
          });
          props.setSelectedDeliverables(newArr);
          props.setSalesMan(false);
          props.setNewState(false);
         
          // props.handleClose();
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
      {/* </Menu> */}
    </div>
  );
};

export default SharedComponentItems;

//adding date functionality
