import * as React from "react";
import layout from "../../styles/layout.module.scss";
import SharedComponent from "./SharedComponent";
import {
  ErrorMsg,
  MainButton,
  OutlineButton,
  InputText,
} from "../../components/formControls.style";
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
import ListOfUsers from "./ListOfUsers";
import axios from "axios";
import tokenExpired from "../layout/withAuth/tokenExpired";
import { useRouter } from "next/router";
export const Access = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [selectedSalesMan, setSelectedSalesMan] = React.useState(() => {
    if (props.row) {
      const blankArr = [];
      props.row.calculatorAccess.map((element) => {
        if (element.calculatorType === "Salesman") {
          blankArr.push(element.userId);
        }
      });
      return blankArr;
    } else {
      const blankArr = [];

      props.values.calculatorAccess.map((ele) => {
        if (ele.calculatorType == "Salesman") {
          blankArr.push(ele.userId);
        }
      });
      return blankArr;
    }
  });
  const [salesMan, setSalesMan] = React.useState(false);
  const [selectedAprrovers, setSelectedAprrovers] = React.useState(() => {
    if (props.row) {
      const blankArr = [];
      props.row.calculatorAccess.map((element) => {
        if (element.calculatorType === "Approver") {
          blankArr.push(element.userId);
        }
      });
      return blankArr;
    } else {
      const blankArr = [];
      props.values.calculatorAccess.map((ele) => {
        if (ele.accessType == "Approver") {
          blankArr.push(ele.userId);
        }
      });
      return blankArr;
    }
  });
  const [sValues, setSValues] = React.useState(selectedSalesMan);
  const [pValues, setPValues] = React.useState(selectedAprrovers);

  const [dateSalesMan, setDateSalesMan] = React.useState("");
  const [newState, setNewState] = React.useState(false);
  const [dateApprovers, setDateApprovers] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [salesSearch, setSalesSearch] = React.useState("");
  const [approverSearch, setApproverSearch] = React.useState("");
  const [toggle,setToggle]=React.useState(false)
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);
  const router = useRouter();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setSValues(selectedSalesMan);
    setPValues(selectedAprrovers);
  };
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
    setSValues(selectedSalesMan);
    setPValues(selectedAprrovers);
  };
  const handleClose = () => {
    setSalesMan(false);
    setAnchorEl(null);
    // salesMan&&setSalesMan(false)
  };
  const handleClose2 = () => {
    setSalesMan(false);
    setAnchorEl2(null);

    // salesMan&&setSalesMan(false)
  };
  var removeByAttr = function (arr, attr, value) {
    var i = arr.length;
    while (i--) {
      if (
        arr[i] &&
        arr[i].hasOwnProperty(attr) &&
        arguments.length > 2 &&
        arr[i][attr] === value
      ) {
        arr.splice(i, 1);
      }
    }
    return arr;
  };

  return (
    <>
      <AccordionBox>
        <Accordion defaultExpanded={true}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <div className="title">Salesmen</div>
          </AccordionSummary>
          <AccordionDetails>
            {selectedSalesMan.length == 0 ? (
              <div style={{ textAlign: "center" }}>
                <Image
                  src="/icons/no-user.svg"
                  height="99"
                  width="128"
                  alt=""
                />
                <p className={layout.mt_20}>
                  You haven’t added any salesmen to this calculator yet.
                </p>
                <OutlineButton
                  onClick={(event) => {
                    handleClick(event);
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
                  <span className={layout.ml_10}>Add First Salesmen</span>
                </OutlineButton>
                {/* <ListOfUsers pValues={pValues} setPValues={setPValues} sValues={sValues} setSValues={setSValues} selectedAprrovers={selectedAprrovers} setSelectedAprrovers={setSelectedAprrovers} salesMan={salesMan} selectedSalesMan={selectedSalesMan} setSelectedSalesMan={setSelectedSalesMan} users={users} nameObj={nameObj} setNameObj={setNameObj} anchorEl={anchorEl} open={open} handleClick={handleClick} handleClose={handleClose}/> */}
                <SharedComponent
                  setFieldValue={props.setFieldValue}
                  values={props.values}
                  dateSalesMa={dateSalesMan}
                  setDateSalesMan={setDateSalesMan}
                  salesMan={salesMan}
                  setSalesMan={setSalesMan}
                  anotherArray={selectedAprrovers}
                  sValues={sValues}
                  setSValues={setSValues}
                  selectedSalesMan={selectedSalesMan}
                  setSelectedSalesMan={setSelectedSalesMan}
                  users={props.users}
                  setUsers={props.setUsers}
                  nameObj={props.nameObj}
                  setNameObj={props.setNameObj}
                  anchorEl={anchorEl}
                  open={open}
                  handleClick={handleClick}
                  handleClose={handleClose}
                />
              </div>
            ) : (
              <TabContentWrap>
                <div className={layout.flex_between_center}>
                  <div>
                    <InputText
                      size="small"
                      width="350px"
                      id="Search"
                      name="Search"
                      value={salesSearch}
                      onChange={(e) => setSalesSearch(e.target.value)}
                      type="text"
                      placeholder="Search for Salesman"
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
                      onClick={(event) => {
                        handleClick(event);
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
                      <span className={layout.ml_10}>Add New</span>
                    </OutlineButton>
                    {/* <ListOfUsers pValues={pValues} setPValues={setPValues} sValues={sValues} setSValues={setSValues} selectedAprrovers={selectedAprrovers} setSelectedAprrovers={setSelectedAprrovers} salesMan={salesMan} selectedSalesMan={selectedSalesMan} setSelectedSalesMan={setSelectedSalesMan} users={users} nameObj={nameObj} setNameObj={setNameObj} anchorEl={anchorEl} open={open} handleClick={handleClick} handleClose={handleClose}/> */}
                    <SharedComponent
                      setFieldValue={props.setFieldValue}
                      values={props.values}
                      salesMan={salesMan}
                      setSalesMan={setSalesMan}
                      setUsers={props.setUsers}
                      dateSalesMa={dateSalesMan}
                      setDateSalesMan={setDateSalesMan}
                      anotherArray={selectedAprrovers}
                      sValues={sValues}
                      setSValues={setSValues}
                      selectedSalesMan={selectedSalesMan}
                      setSelectedSalesMan={setSelectedSalesMan}
                      users={props.users}
                      setNameObj={props.setNameObj}
                      anchorEl={anchorEl}
                      open={open}
                      handleClick={handleClick}
                      handleClose={handleClose}
                    />
                    
                  </div>
                </div>

                <div className="tbl-list">
                  <div className="tbl-row">
                    <div className="Name">
                      {/* <Checkbox color="primary" /> */}
                      <p className="color-gray">Name of sales person</p>
                    </div>
                    <div className="date">
                      <p className="color-gray">Date of access</p>
                    </div>
                  </div>
                  {selectedSalesMan.map((ele, index) => {
                    return (
                      props.nameObj[ele]
                        .toLowerCase()
                        .includes(salesSearch.toLowerCase()) && (
                        <div className="tbl-row">
                          <div className="Name">
                            <Checkbox checked={selectedSalesMan.includes(ele)} color="primary" onChange={(e)=>{
                              let tempArr=selectedSalesMan;
                              tempArr.splice(index,1)
                              setSelectedSalesMan(tempArr);
                              setToggle(!toggle)

                            }} />
                            <p>{props.nameObj[ele]}</p>
                          </div>
                          <div className="date">
                            <p>
                              {props.users.map((e) => {
                                if (e.userId == ele) {
                                  return e.registrationDate;
                                }
                              })}
                            </p>
                          </div>
                        </div>
                      )
                    );
                  })}
                </div>
              </TabContentWrap>
            )}
          </AccordionDetails>
        </Accordion>
        <ErrorMsg name="salesMan"></ErrorMsg>

        <Accordion defaultExpanded={true}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <div className="title">Approvers</div>
          </AccordionSummary>
          <AccordionDetails>
            {selectedAprrovers.length == 0 ? (
              <div style={{ textAlign: "center" }}>
                <Image
                  src="/icons/no-user.svg"
                  height="99"
                  width="128"
                  alt=""
                />
                <p className={layout.mt_20}>
                  You haven’t added any approvers to this calculator yet.
                </p>
                <OutlineButton
                  onClick={handleClick2}
                  aligncenter="true"
                  fixwidth="auto"
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
                  <span className={layout.ml_10}>Add First Approver</span>
                </OutlineButton>
                <SharedComponent
                  setFieldValue={props.setFieldValue}
                  values={props.values}
                  salesMan={salesMan}
                  setSalesMan={setSalesMan}
                  setUsers={props.setUsers}
                  setDateSalesMan={setDateApprovers}
                  anotherArray={selectedSalesMan}
                  sValues={pValues}
                  setSValues={setPValues}
                  selectedSalesMan={selectedAprrovers}
                  setSelectedSalesMan={setSelectedAprrovers}
                  users={props.users}
                  anchorEl={anchorEl2}
                  open={open2}
                  handleClick={handleClick2}
                  handleClose={handleClose2}
                />
                {/* <ListOfUsers anchorEl={anchorEl} open={open} handleClick={handleClick} handleClose={handleClose}/> */}
              </div>
            ) : (
              <TabContentWrap>
                <div className={layout.flex_between_center}>
                  <div>
                    <InputText
                      size="small"
                      width="350px"
                      id="Search"
                      name="Search"
                      value={approverSearch}
                      onChange={(e) => setApproverSearch(e.target.value)}
                      type="text"
                      placeholder="Search for Approver"
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
                      onClick={handleClick2}
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
                      <span className={layout.ml_10}>Add New</span>
                    </OutlineButton>
                    <SharedComponent
                      setFieldValue={props.setFieldValue}
                      values={props.values}
                      salesMan={salesMan}
                      setSalesMan={setSalesMan}
                      setUsers={props.setUsers}
                      setDateSalesMan={setDateApprovers}
                      anotherArray={selectedSalesMan}
                      sValues={pValues}
                      setSValues={setPValues}
                      selectedSalesMan={selectedAprrovers}
                      setSelectedSalesMan={setSelectedAprrovers}
                      users={props.users}
                      anchorEl={anchorEl2}
                      open={open2}
                      handleClick={handleClick2}
                      handleClose={handleClose2}
                    />
                  </div>
                </div>

                <div className="tbl-list">
                  <div className="tbl-row">
                    <div className="Name">
                      {/* <Checkbox color="primary" /> */}
                      <p className="color-gray">Name of Approver person</p>
                    </div>
                    <div className="date">
                      <p className="color-gray">Date of access</p>
                    </div>
                  </div>
                  {selectedAprrovers.map((ele, index) => {
                    return (
                      props.nameObj[`${ele}`]
                        .toLowerCase()
                        .includes(approverSearch.toLowerCase()) && (
                        <div className="tbl-row">
                          <div className="Name">
                          <Checkbox checked={selectedAprrovers.includes(ele)} color="primary" onChange={(e)=>{
                              let tempArr=selectedAprrovers;
                              tempArr.splice(index,1)
                              setSelectedAprrovers(tempArr);
                              setToggle(!toggle)

                            }} />
                            <p>{props.nameObj[`${ele}`]}</p>
                          </div>
                          <div className="date">
                            <p>
                              {props.users.map((e) => {
                                if (e.userId == ele) {
                                  return e.registrationDate;
                                }
                              })}
                            </p>
                          </div>
                        </div>
                      )
                    );
                  })}
                  {/* <div className="scroll">
                        <div className="tbl-row">
                           <div className="Name">
                              <Checkbox
                                 color="primary"
                              />
                              <p>Arlene McCoy</p>

                           </div>
                           <div className="date">
                              <p>Sep 7, 2021 23:14</p>
                              <DeleteOutlinedIcon></DeleteOutlinedIcon>
                           </div>
                        </div>
                        <div className="tbl-row">
                           <div className="Name">
                              <Checkbox
                                 color="primary"
                              />
                              <p>Arlene McCoy</p>
                           </div>
                           <div className="date">
                              <p>Sep 7, 2021 23:14</p>
                              <DeleteOutlinedIcon></DeleteOutlinedIcon>
                           </div>
                        </div>
                        <div className="tbl-row">
                           <div className="Name">
                              <Checkbox
                                 color="primary"
                              />
                              <p>Savannah Nguyen</p>
                           </div>
                           <div className="date">
                              <p>Sep 7, 2021 23:14</p>
                              <DeleteOutlinedIcon></DeleteOutlinedIcon>
                           </div>
                        </div>
                        <div className="tbl-row">
                           <div className="Name">
                              <Checkbox
                                 color="primary"
                              />
                              <p>Floyd Miles</p>
                           </div>
                           <div className="date">
                              <p>Sep 7, 2021 23:14</p>
                              <DeleteOutlinedIcon></DeleteOutlinedIcon>
                           </div>
                        </div>
                        <div className="tbl-row">
                           <div className="Name">
                              <Checkbox
                                 color="primary"
                              />
                              <p>Jave Cooker</p>
                           </div>
                           <div className="date">
                              <p>Sep 7, 2021 23:14</p>
                              <DeleteOutlinedIcon></DeleteOutlinedIcon>
                           </div>
                        </div>
                        <div className="tbl-row">
                           <div className="Name">
                              <Checkbox
                                 color="primary"
                              />
                              <p>Darlene Robertson</p>
                           </div>
                           <div className="date">
                              <p>Sep 7, 2021 23:14</p>
                              <DeleteOutlinedIcon></DeleteOutlinedIcon>
                           </div>
                        </div>
                        <div className="tbl-row">
                           <div className="Name">
                              <Checkbox
                                 color="primary"
                              />
                              <p>Cody Fisher</p>
                           </div>
                           <div className="date">
                              <p>Sep 7, 2021 23:14</p>
                              <DeleteOutlinedIcon></DeleteOutlinedIcon>
                           </div>
                        </div>
                        <div className="tbl-row">
                           <div className="Name">
                              <Checkbox
                                 color="primary"
                              />
                              <p>Courtney Henry</p>
                           </div>
                           <div className="date">
                              <p>Sep 7, 2021 23:14</p>
                              <DeleteOutlinedIcon></DeleteOutlinedIcon>
                           </div>
                        </div>
                     </div> */}
                </div>
              </TabContentWrap>
            )}
          </AccordionDetails>
        </Accordion>
        <ErrorMsg name="approvers"></ErrorMsg>
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
            onClick={() => props.setValue("Configurations")}
          >
            Previous
          </OutlineButton>
          <MainButton
            fixwidth="auto"
            marginbottom="0"
            variant="contained"
            // type="submit"
            onClick={() => {
              props.formik.setTouched({
                department: true,
                category: true,
                calculatorName: true,
                calculatorColor: true,
                contractlengthConfig: true,
                setupfeeConfig: true,
                negotiationMargin: true,
                discountfeeConfig: true,
                approvers: true,
                salesMan: true,
              });

              if (Object.keys(props.formik.touched).length != 0) {
                props.formik.errors.salesMan || props.formik.errors.approvers
                  ? props.setValue("Access")
                  : props.setValue("Items");
              }
            }}
          >
            Next
          </MainButton>
        </div>
      </div>
    </>
  );
};

// adding date functionality
