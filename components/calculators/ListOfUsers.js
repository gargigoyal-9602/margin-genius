import React from 'react';
import Menu from '@mui/material/Menu';
import { AccordionBox, TabContentWrap, MenuList, TextWrap } from "./Calculators.style";
import InputAdornment from "@mui/material/InputAdornment";
import Image from "next/image";
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from "@mui/material/FormControlLabel";
import layout from "../../styles/layout.module.scss";
import {
    ErrorMsg,
    MainButton,
    OutlineButton,
    InputText,
} from "../../components/formControls.style";
const ListOfUsers = (props) => {

    
    

    // console.log(props.selectedSalesMan)

    const removeVal = (arr,val)=>{
        const newArray = []
        arr.forEach((ele)=>{
            if(ele!==val){
                newArray.push(ele)
            }
        })
        return newArray
    }

    return <Menu
        id="basic-menu"
        anchorEl={props.anchorEl}
        open={props.open}
        onClose={props.handleClose}

        MenuListProps={{
            'aria-labelledby': 'basic-button',
        }}
    >
        <TextWrap>
            <InputText
                size="small"
                id="Search"
                name="Search"
                type="text"
                className="border-0"
                placeholder="Search"
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
        </TextWrap>
        <MenuList>
            <div className="block">
                <p>Selected</p>


                {props.users.map((ele) => {
                    if (props.salesMan) {
                        return props.selectedSalesMan.includes(ele.userId) && <MenuItem>
                            <FormControlLabel onChange={(e)=>{
                                    console.log(e.target.checked)
                                    if(e.target.checked){
                                        if(!props.sValues.includes(ele.userId)){
                                            props.sValues.push(ele.userId)
                                            props.setSValues([...props.sValues,ele.userId])
                                        }
                                    }else{
                                        if(props.sValues.includes(ele.userId)){
                                            const newArr = removeVal(props.sValues,ele.userId)
                                            props.setSValues(newArr)
                                        }
                                    }
                                }}
                                control={<Checkbox checked={props.sValues.includes(ele.userId)} />}
                                label={ele.fullName}
                            />
                        </MenuItem>
                        

                    } else {
                        return props.selectedAprrovers.includes(ele.userId) && <MenuItem>
                            <FormControlLabel onChange={(e)=>{
                                    console.log(e.target.checked)
                                    if(e.target.checked){
                                        if(!props.pValues.includes(ele.userId)){
                                            props.pValues.push(ele.userId)
                                            props.setPValues([...props.pValues,ele.userId])
                                        }
                                    }else{
                                        if(props.pValues.includes(ele.userId)){
                                            const newArr = removeVal(props.pValues,ele.userId)
                                            props.setPValues(newArr)
                                        }
                                    }
                                }}
                                // onClick={()=>alert(ele.fullName)}
                                control={<Checkbox checked={props.pValues.includes(ele.userId)}/>}
                                label={ele.fullName}
                            />
                        </MenuItem>
                    }
                })}
            </div>

            <div className="border block">
                <p>Users</p>
                {props.users.map((ele) => {
                    if (props.salesMan) {
                        return !(props.selectedSalesMan.includes(ele.userId)) && <MenuItem>
                            <FormControlLabel
                             onChange={(e)=>{
                                console.log(e.target.checked)
                                if(e.target.checked){
                                    if(!props.sValues.includes(ele.userId)){
                                        props.setSValues([...props.sValues,ele.userId])
                                    }
                                }else{
                                    if(props.sValues.includes(ele.userId)){
                                        const newArr = removeVal(props.sValues,ele.userId)
                                        props.setSValues(newArr)
                                    }
                                }
                                
                            }}
                                control={<Checkbox/>}
                                label={ele.fullName}
                            />
                        </MenuItem>

                    }else{
                        return !(props.selectedAprrovers.includes(ele.userId)) && <MenuItem>
                            <FormControlLabel
                            onChange={(e)=>{
                                console.log(e.target.checked)
                                if(e.target.checked){
                                    if(!props.pValues.includes(ele.userId)){
                                        props.setPValues([...props.pValues,ele.userId])
                                    }
                                }else{
                                    if(props.pValues.includes(ele.userId)){
                                        const newArr = removeVal(props.PValues,ele.userId)
                                        props.setPValues(newArr)
                                    }
                                }
                                
                            }}
                                // onClick={()=>alert(ele.fullName)}
                                control={<Checkbox />}
                                label={ele.fullName}
                            />
                        </MenuItem>
                    }

                })}
            </div>

        </MenuList>
        <OutlineButton
            aligncenter="true"
            fixwidth="auto"
            marginbottom="0"
            style={{ margin: '25px 13px 20px 13px', width: '-webkit-fill-available' }}
            onClick={(event) => {
                props.handleClick(event)
                props.salesMan ? props.setSelectedSalesMan(props.sValues): props.setSelectedAprrovers(props.pValues)
                props.handleClose()
            }}
        >
            <span className={layout.flex_top}>
                <Image src="/icons/plus-icon-green.svg" width="16" height="16" alt="" />
            </span>
            <span className={layout.ml_10}>Confirm</span>
        </OutlineButton>

    </Menu>;
};

export default ListOfUsers;
