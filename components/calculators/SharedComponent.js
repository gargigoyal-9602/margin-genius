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
} from "../../components/formControls.style";
import { toast } from "react-toastify";

const SharedComponent = (props) => {
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
    <Menu
      id="basic-menu"
      anchorEl={props.anchorEl}
      open={props.open}
      onClose={props.handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
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
      <MenuList>
        <div className="block">
          <p>Selected</p>

          {props.users.map((ele) => {
            // if (props.salesMan) {
            return (
              props.selectedSalesMan.includes(ele.userId) && (
                <MenuItem>
                  <FormControlLabel
                    onChange={(e) => {
                      console.log(e.target.checked);
                      if (e.target.checked) {
                        if (!props.sValues.includes(ele.userId)) {
                          props.setSValues([...props.sValues, ele.userId]);
                        }
                      } else {
                        if (props.sValues.includes(ele.userId)) {
                          const newArr = removeVal(props.sValues, ele.userId);
                          props.setSValues(newArr);
                        }
                      }
                    }}
                    control={
                      <Checkbox checked={props.sValues.includes(ele.userId)} />
                    }
                    label={ele.fullName}
                  />
                </MenuItem>
              )
            );

            // }
            //  else {
            //     return props.selectedAprrovers.includes(ele.userId) && <MenuItem>
            //         <FormControlLabel onChange={(e)=>{
            //                 console.log(e.target.checked)
            //                 if(e.target.checked){
            //                     if(!props.pValues.includes(ele.userId)){
            //                         props.pValues.push(ele.userId)
            //                         props.setPValues([...props.pValues,ele.userId])
            //                     }
            //                 }else{
            //                     if(props.pValues.includes(ele.userId)){
            //                         const newArr = removeVal(props.pValues,ele.userId)
            //                         props.setPValues(newArr)
            //                     }
            //                 }
            //             }}
            //             // onClick={()=>alert(ele.fullName)}
            //             control={<Checkbox checked={props.pValues.includes(ele.userId)}/>}
            //             label={ele.fullName}
            //         />
            //     </MenuItem>
            // }
          })}
        </div>

        <div className="border block">
          <p>Users</p>
          {props.users.map((ele, index) => {
            if (ele.fullName===null) {
              toast.error('please verify user',{
                position: toast.POSITION.BOTTOM_RIGHT,
              })
            }
            else if (ele.fullName.toLowerCase().includes(search.toLowerCase())) {
              return (
                !props.selectedSalesMan.includes(ele.userId) && (
                  <MenuItem>
                    <FormControlLabel
                      onChange={(e) => {
                        console.log(e.target.checked);
                        if (e.target.checked) {
                          if (!props.sValues.includes(ele.userId)) {
                            const newUsers = props.users;
                            const date = new Date();
                            const newDate = `${date}`;
                            newUsers[index].registrationDate = newDate.slice(
                              4,
                              21
                            );
                            props.setUsers(newUsers);
                            console.log(newUsers, "newUsers");
                            props.setSValues([...props.sValues, ele.userId]);
                          }
                        } else {
                          if (props.sValues.includes(ele.userId)) {
                            const newArr = removeVal(props.sValues, ele.userId);
                            props.setSValues(newArr);
                          }
                        }
                      }}
                      control={
                        <Checkbox
                          disabled={props.anotherArray.includes(ele.userId)}
                        />
                      }
                      label={ele.fullName}
                    />
                  </MenuItem>
                ))
              
            }
              
              
            
            
          })}
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
          props.handleClick(event);
          props.setSelectedSalesMan(props.sValues);
        //   const today = new Date();
        //   var date =
        //     today.toLocaleString("default", { month: "short" }) +
        //     " " +
        //     today.getDate() +
        //     "," +
        //     today.getFullYear() +
        //     " " +
        //     today.getHours() +
        //     ":" +
        //     today.getMinutes() +
        //     ":" +
        //     today.getSeconds();
        //   props.setDateSalesMan(date);
          if(props.salesMan){
              console.log(props.salesMan,"salesMan")
              const blankArr = []
              props.sValues.map((ele)=>{
                  const obj={userId:ele,calculatorType:"Salesman"}
                  blankArr.push(obj)
              })
              props.anotherArray.map((ele)=>{
                const obj={userId:ele,calculatorType:"Approver"}
                blankArr.push(obj)
              })
              console.log(blankArr,"blankArr")
              props.setFieldValue("calculatorAccess",blankArr)
              props.setFieldValue("approvers",props.anotherArray)
              props.setFieldValue("salesMan",props.sValues)
          }else{
            const blankArr = []
            props.sValues.map((ele)=>{
                const obj={userId:ele,calculatorType:"Approver"}
                blankArr.push(obj)
            })
            props.anotherArray && props.anotherArray.map((ele)=>{
              const obj={userId:ele,calculatorType:"Salesman"}
              blankArr.push(obj)
            })
            console.log(blankArr,"blankArr")
            props.setFieldValue("calculatorAccess",blankArr)
            props.setFieldValue("salesMan",props.anotherArray)
            props.setFieldValue("approvers",props.sValues)
          }
          
          props.setSalesMan(false)
          props.handleClose();
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
    </Menu>
  );
};

export default SharedComponent;

//adding date functionality
