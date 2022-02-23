import * as React from "react";
import layout from "../../styles/layout.module.scss";
import {
  ErrorMsg,
  MainButton,
  OutlineButton,
  InputText,
} from "../../components/formControls.style";
// import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { SwitchWrap, NewSwitch } from "../../components/tableControls.style";
import Image from "next/image";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  AccordionBox,
  TabContentWrap,
  MenuList,
  TextWrap,
} from "./Calculators.style";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Switch from "@mui/material/Switch";
import SharedPackagesItem from "./SharedPackagesItem";
import SharedDeliverablesItem from "./SharedDeliverablesItem";

export const Items = (props) => {
  const [selectedPackages, setSelectedPackeges] = React.useState(() => {
    if (props.row) {
      const blankArr = [];
      props.row.calculatorPackages.map((element) => {
        blankArr.push(element.packageId);
      });
      return blankArr;
    } else {
      const blankArr = [];
      props.values.calculatorPackages.map((ele) => {
        blankArr.push(ele.packageId);
      });
      return blankArr;
    }
  });
  const [packageDeliverables, setPackageDeliverables] = React.useState([]);
  const [searchPackagesText,setSearchPackagesText] = React.useState("")
  const [searchDeliverablesText,setSearchDeliverableText] = React.useState("")
  const [sValues, setSValues] = React.useState(selectedPackages);
  const [toggle, setToggle] = React.useState(false);
  const [selectedDeliverables, setSelectedDeliverables] = React.useState(() => {
    if (props.row) {
      const blankArr = [];
      props.row.calculatorCustomDeliverable.map((element) => {
        blankArr.push(element.deliverableId);
      });
      return blankArr;
    } else {
      const blankArr = [];
      props.values.calculatorCustomDeliverable.map((ele) => {
        blankArr.push(ele.deliverableId);
      });
      return blankArr;
    }
  });
  const [pValues, setPValues] = React.useState(selectedDeliverables);
  const [newState, setNewState] = React.useState(false);
  const [newState2, setNewState2] = React.useState(false);
  const [salesMan, setSalesMan] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [allowaccessView, setAllowAccessView] = React.useState(false);
  const deliverableArr = [];

  selectedPackages.forEach((element) => {
    props.packages.forEach((ele) => {
      if (ele.packageId == element) {
        ele.packageDeliverables.forEach((e) => {
          deliverableArr.push(e.deliverableId);
        });
      }
    });
  });

  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setSValues(selectedPackages);
  };
  const handleClick2 = (event) => {
    setPValues(selectedDeliverables);
    setAnchorEl2(event.currentTarget);
  };
  const handleClose = () => {
    setSalesMan(false);
    setAnchorEl(null);
  };
  const handleClose2 = () => {
    //  setSalesMan(false);
    setAnchorEl2(null);
  };

  const [check, setCheck] = React.useState(false);
  const [checkDel, setCheckDel] = React.useState(false);
  const [togg, setTogg] = React.useState(false);
  const [obj, setObj] = React.useState({
    packageId: "",
    totalPrice: "",
    allowaccessView: null,
  });
  // const [blankPac,setBlankPac]=React.useState([])
  return (
    <>
      <AccordionBox className="border-0">
        <SwitchWrap>
          {props.row ? (
            <NewSwitch
              defaultChecked={
                props.values.calculatorPackages[0] &&
                props.values.calculatorPackages[0]["allowaccessView"]
                  ? props.row.calculatorPackages[0]["allowaccessView"]
                  : check
              }
              onChange={(e) => {
                setNewState(true);
                if (e.target.checked) {
                  console.log(e.target.checked);
                  setCheck(e.target.checked);

                  localStorage.setItem("check", e.target.checked);
                } else {
                  console.log(e.target.checked);
                  setCheck(e.target.checked);

                  localStorage.setItem("check", e.target.checked);
                }
              }}
            />
          ) : (
            <NewSwitch
              onChange={(e) => {
                setCheck(e.target.checked);
                localStorage.setItem("check", e.target.checked);
              }}
            />
          )}{" "}
          <p style={{ marginLeft: "15px" }}>
            Allow to view and have access to selected packages
          </p>
        </SwitchWrap>
        <Accordion defaultExpanded={true} className="mb-0">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <div className="title">Packages</div>
          </AccordionSummary>
          <AccordionDetails>
            {selectedPackages.length == 0 && !newState && (
              <div style={{ textAlign: "center" }}>
                <Image
                  src="/icons/no-user.svg"
                  height="99"
                  width="128"
                  alt=""
                />
                <p className={layout.mt_20}>
                  You haven’t added any packages to this calculator yet.
                </p>
                <OutlineButton
                  onClick={(event) => {
                    //  handleClick(event)
                    setNewState(true);
                    setSalesMan(true);
                  }}
                  aligncenter="true"
                  fixwidth="auto"
                  marginbottom="0"
                  style={{ border: 0, margin: "15px auto" }}
                >
                  <span className={layout.flex_top}>
                    <Image
                      src="/icons/plus-icon-green.svg"
                      width="16"
                      height="16"
                      alt=""
                    />
                  </span>
                  <span className={layout.ml_10}>Add First Package</span>
                </OutlineButton>
              </div>
            )}
            {newState && (
              <SharedPackagesItem
                setFieldValue={props.setFieldValue}
                values={props.values}
                salesMan={salesMan}
                setSalesMan={setSalesMan}
                sValues={sValues}
                setSValues={setSValues}
                packageNameObj={props.packageNameObj}
                packagePriceObj={props.packagePriceObj}
                selectedSalesMan={selectedPackages}
                setSelectedSalesMan={setSelectedPackeges}
                users={props.packages}
                selectedDeliverables={selectedDeliverables}
                deliverableArr={deliverableArr}
                setSelectedDeliverables={setSelectedDeliverables}
                setUsers={props.setPackages}
                anchorEl={anchorEl}
                open={open}
                handleClick={handleClick}
                handleClose={handleClose}
                setNewState={setNewState}
                packageAllowAccess={props.packageAllowAccess}
                check={check}
              />
            )}

            {selectedPackages.length !== 0 && !newState && (
              <TabContentWrap>
                <div className={layout.flex_between_center}>
                  <div>
                    <InputText
                      size="small"
                      width="350px"
                      id="Search"
                      name="Search"
                      type="text"
                      onChange={(e)=>setSearchPackagesText(e.target.value)}
                      placeholder="Search for role name or department"
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
                  </div>
                  <div>
                    <OutlineButton
                      aligncenter="true"
                      fixwidth="auto"
                      marginbottom="0"
                      style={{ border: 0, margin: "15px auto" }}
                      onClick={(event) => {
                        // handleClick(event)
                        setNewState(true);
                        setSalesMan(true);
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
                      <span className={layout.ml_10}>Add New</span>
                    </OutlineButton>
                  </div>
                </div>

                <div className="tbl-list">
                  <div className="tbl-row">
                    <div className="Name">
                      {/* <Checkbox color="primary" /> */}
                      <p className="color-gray">Name of Packages</p>
                    </div>
                    <div className="date">
                      <p className="color-gray">Price</p>
                    </div>
                  </div>
                  <div className="scroll">
                    {selectedPackages.map((ele, index) => {
                      if(props.packageNameObj[`${ele}`].toLowerCase().includes(searchPackagesText.toLowerCase())){
                      return (
                        <div className="tbl-row">
                          <div className="Name">
                            <Checkbox
                              color="primary"
                              onChange={(e) => {
                                setNewState(true);
                                let tempArr = selectedPackages;
                                tempArr.splice(index, 1);
                                setSelectedPackeges(tempArr);
                                setToggle(!toggle);
                              }}
                              checked={selectedPackages.includes(ele)}
                            />
                            <p>{props.packageNameObj[`${ele}`]}</p>
                          </div>
                          <div className="date">
                            <p>{Math.ceil(props.packagePriceObj[`${ele}`])}$</p>
                          </div>
                        </div>
                      );
                            }
                    })}
                  </div>
                </div>
              </TabContentWrap>
            )}
          </AccordionDetails>
        </Accordion>
        <ErrorMsg name="packages"></ErrorMsg>
      </AccordionBox>
      <AccordionBox className="border-0">
        <SwitchWrap>
          {props.row ? (
            <NewSwitch
              defaultChecked={
                props.values.calculatorCustomDeliverable[0] &&
                props.values.calculatorCustomDeliverable[0]["allowaccessView"]
                  ? props.row.calculatorCustomDeliverable[0]["allowaccessView"]
                  : checkDel
              }
              onChange={(e) => {
                setNewState2(true);
                if (e.target.checked) {
                  console.log(e.target.checked);
                  setCheckDel(e.target.checked);
                  localStorage.setItem("checkDel", e.target.checked);
                } else {
                  console.log(e.target.checked);
                  setCheckDel(e.target.checked);
                  localStorage.setItem("checkDel", e.target.checked);
                }
              }}
            />
          ) : (
            <NewSwitch
              onChange={(e) => {
                setCheckDel(e.target.checked);
                localStorage.setItem("checkDel", e.target.checked);
              }}
            />
          )}{" "}
          <p style={{ marginLeft: "15px" }}>
            Allow to view and have access to selected deliverables
          </p>
        </SwitchWrap>
        <Accordion defaultExpanded={true} className="mb-0">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <div className="title">Deliverables</div>
          </AccordionSummary>
          <AccordionDetails>
            {selectedDeliverables.length == 0 && !newState2 && (
              <div style={{ textAlign: "center" }}>
                <Image
                  src="/icons/no-user.svg"
                  height="99"
                  width="128"
                  alt=""
                />
                <p className={layout.mt_20}>
                  You haven’t added any deliverables to this calculator yet.
                </p>
                <OutlineButton
                  onClick={() => setNewState2(true)}
                  aligncenter="true"
                  fixwidth="auto"
                  marginbottom="0"
                  style={{ border: 0, margin: "15px auto" }}
                >
                  <span className={layout.flex_top}>
                    <Image
                      src="/icons/plus-icon-green.svg"
                      width="16"
                      height="16"
                      alt=""
                    />
                  </span>
                  <span className={layout.ml_10}>Add First Deliverable</span>
                </OutlineButton>
              </div>
            )}

            {newState2 && (
              <SharedDeliverablesItem
                deliverableArr={deliverableArr}
                setFieldValue={props.setFieldValue}
                values={props.values}
                salesMan={salesMan}
                setSalesMan={setSalesMan}
                sValues={pValues}
                setSValues={setPValues}
                selectedSalesMan={selectedDeliverables}
                setSelectedSalesMan={setSelectedDeliverables}
                users={props.deliverables}
                setUsers={props.setDeliverables}
                setNewState2={setNewState2}
                deliverableRoleId={props.deliverableRoleId}
                setDeliverableRoleId={props.setDeliverableRoleId}
                checkDel={checkDel}
                // anchorEl={anchorEl2}
                // open={open2}
                // handleClick={handleClick2}
                // handleClose={handleClose2}
              />
            )}

            {selectedDeliverables.length !== 0 && !newState2 && (
              <TabContentWrap>
                <div className={layout.flex_between_center}>
                  <div>
                    <InputText
                      size="small"
                      width="350px"
                      id="Search"
                      name="Search"
                      type="text"
                      onChange={(e)=>setSearchDeliverableText(e.target.value)}
                      placeholder="Search for role name or department"
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
                  </div>
                  <div>
                    <OutlineButton
                      aligncenter="true"
                      fixwidth="auto"
                      marginbottom="0"
                      style={{ border: 0, margin: "15px auto" }}
                      onClick={() => setNewState2(true)}
                    >
                      <span className={layout.flex_top}>
                        <Image
                          src="/icons/plus-icon-green.svg"
                          width="16"
                          height="16"
                          alt=""
                        />
                      </span>
                      <span className={layout.ml_10}>Add New</span>
                    </OutlineButton>
                  </div>
                </div>

                <div className="tbl-list">
                  <div className="tbl-row">
                    <div className="Name">
                      {/* <Checkbox color="primary" /> */}
                      <p className="color-gray">Name of deliverables</p>
                    </div>
                    <div className="date">
                      <p className="color-gray">Price</p>
                    </div>
                  </div>
                  <div className="scroll">
                    {selectedDeliverables.map((ele, index) => {
                      if(props.deliverableNameObj[ele].toLowerCase().includes(searchDeliverablesText.toLowerCase())){
                      return (
                        <div className="tbl-row">
                          <div className="Name">
                            <Checkbox
                              color="primary"
                              onChange={(e) => {
                                setNewState2(true);
                                let tempArr = selectedDeliverables;
                                tempArr.splice(index, 1);
                                setSelectedDeliverables(tempArr);
                                setToggle(!toggle);
                              }}
                              checked={selectedDeliverables.includes(ele)}
                            />
                            <p>{props.deliverableNameObj[ele]}</p>
                          </div>
                          <div className="date">
                            <p>{props.deliverablePriceObj[ele]}</p>
                          </div>
                        </div>
                      );
                            }
                    })}
                  </div>
                </div>
              </TabContentWrap>
            )}
          </AccordionDetails>
        </Accordion>
        <ErrorMsg name="deliverables"></ErrorMsg>
      </AccordionBox>
      <div className={layout.mt_20}>
        <div className={layout.flex_between}>
          <OutlineButton
            variant="text"
            fixwidth="auto"
            marginbottom="0"
            className={layout.mr_10}
            style={{ border: "0", color: "#0A2828" }}
            // onClick={() => props.toggleDrawer(props.anchor, false)}
            onClick={() => props.setValue("Access")}
          >
            Previous
          </OutlineButton>
          <MainButton
            fixwidth="auto"
            marginbottom="0"
            variant="contained"
            type="submit"
          >
            {props.row === undefined ? "Create Calculator" : "Save Changes"}
          </MainButton>
        </div>
      </div>
    </>
  );
};
