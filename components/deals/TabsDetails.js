import React, { useEffect, useState, useCallback } from "react";
import { Details } from "./Details";
import { Packages } from "./Packages";
import { CustomDeliverables } from "./CustomDeliverables";
import { Contact } from "./Contact";
import { Comments } from "./Comments";
import globalLayout from "../../styles/globalLayout.module.scss";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import SettingsIcon from "@mui/icons-material/Settings";
import { TabContent, PageTitle, TabBox } from "./Deals.style";
import InputLabel from "@mui/material/InputLabel";
import layout from "../../styles/layout.module.scss";
import Image from "next/image";
import Link from "next/link";
import { OutlineButton, StatusButton, MainButton } from "../formControls.style";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import { ModalBox } from "../tableControls.style";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const TabsDetails = (props) => {
  const { calculators, packages,setPackages, setIsCreateNewDeal, selectedCalculator } =
    props;
  const [value, setValue] = React.useState("Details");
  const [calCulatorPac, setCalculatorPac] = React.useState([]);
  const [selectedCalPac, setSelectedCalPac] = React.useState([]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const Status = [
    'Approval Pending',
    'Not Approved',
    'Approved',
    'In Progress'
  ]
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  React.useEffect(() => {
    console.log("packages tabs ren");
    let calPac = new Set();
    selectedCalculator.calculatorPackages.map((calculatorPackage) => {
      calPac.add(calculatorPackage.packageId);
    });
    setCalculatorPac(
      packages.filter((element) => {
        return calPac.has(element.packageId);
      })
    );
    console.log(packages);
  }, []);
  return (
    <>
    <div className={layout.flex_between_center}>      <PageTitle>
        <Link href="/">
          <a>
            <Image
              src="/icons/back-icon-grey.svg"
              height="25"
              width="25"
              layout="fixed"
              alt="back_icon"
            />
          </a>
        </Link>
        <span className={layout.ml_20}>Domino’s Website Redesign</span>
      </PageTitle>
      <div style={{width:'150px'}}>
      <StatusButton onClick={handleOpen} className="pending">
              <Image alt="" src="/icons/pending.svg" width="11" height="11" />
              <span className={layout.ml_5}>Approval Pending</span>
            </StatusButton>
  <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <ModalBox style={{ width: "450px" }}>
                <span className={layout.model_close} onClick={handleClose}>
                  <Image
                    src="/icons/cancel.svg"
                    height="12"
                    width="12"
                    alt=""
                  />
                </span>
                <div className={layout.mb_20}>
                  <h3>
                  Change Status
                  </h3>
                  <div style={{padding:'15px', margin:'20px 0', borderRadius:'5px', background:'#F8F8F8', display:'flex', alignItems:'center'}}>
                  <p><strong>Domino’s Pizza Website Redesign</strong></p>
                  <StatusButton style={{maxWidth:'150px'}} onClick={handleOpen} className="pending">
                    <Image alt="" src="/icons/pending.svg" width="11" height="11" />
                    <span className={layout.ml_5}>Approval Pending</span>
                  </StatusButton>
                  </div>
                  <p>Add New Status</p>
                  <Autocomplete
                    options={Status}
                    renderInput={(params) => (
                      <TextField
                        size="small"
                        {...params}
                        placeholder="Approved"
                      />
                    )}
                  />
                </div>
                <div className={layout.flex_between_center}>
                  <OutlineButton
                    onClick={handleClose}
                    aligncenter="true"
                    marginbottom="0px"
                    style={{ marginRight: "20px" }}
                  >
                    <span className={globalLayout.btn_icon}>
                      <Image
                        alt=""
                        src="/icons/cancel-icon.svg"
                        width="16"
                        height="16"
                      />
                    </span>
                    Cancel
                  </OutlineButton>
                  <MainButton
                    marginbottom="0px"
                  >
                    <span className={layout.flex_center}>
                      <span className={layout.ml_10}>Save Changes</span>
                    </span>
                  </MainButton>
                </div>
              </ModalBox>
            </Fade>
  </Modal>
            </div>
            </div>
      <TabBox>
        <TabContext value={value}>
          <TabList onChange={handleTabChange}>
            <Tab
              label={<span className={layout.ml_10}>Details</span>}
              value="Details"
              icon={
                <Image
                  src="/icons/details-on.svg"
                  height="20"
                  width="20"
                  layout="fixed"
                  alt="icon"
                />
              }
              iconPosition="start"
            />
            <Tab
              label={<span className={layout.ml_10}>Packages</span>}
              value="Packages"
              icon={
                <Image
                  src="/icons/deals_packages.svg"
                  height="20"
                  width="20"
                  layout="fixed"
                  alt="icon"
                />
              }
              iconPosition="start"
            />
            <Tab
              label={<span className={layout.ml_10}>Custom Deliverables</span>}
              value="CustomDeliverables"
              icon={
                <Image
                  src="/icons/deals-deliverables.svg"
                  height="20"
                  width="20"
                  layout="fixed"
                  alt="icon"
                />
              }
              iconPosition="start"
            />
            <Tab
              label={<span className={layout.ml_10}>Contract</span>}
              value="Contract"
              icon={
                <Image
                  src="/icons/deals-contract.svg"
                  height="20"
                  width="20"
                  layout="fixed"
                  alt="icon"
                />
              }
              iconPosition="start"
            />
            <Tab
              label={<span className={layout.ml_10}>Comments</span>}
              value="Comments"
              icon={
                <Image
                  src="/icons/deal_comments.svg"
                  height="20"
                  width="20"
                  layout="fixed"
                  alt="icon"
                />
              }
              iconPosition="start"
            />
          </TabList>
          <TabPanel value="Details">
            <Details
              setIsCreateNewDeal={setIsCreateNewDeal}
              selectedCalculator={selectedCalculator}
            />
          </TabPanel>
          <TabPanel value="Packages">
            <Packages
              calculators={calculators}
              packages={packages}
              setPackages={setPackages}
              selectedCalculator={selectedCalculator}
              calCulatorPac={calCulatorPac}
              setCalculatorPac={setCalculatorPac}
              selectedCalPac={selectedCalPac}
              setSelectedCalPac={setSelectedCalPac}
            />
          </TabPanel>
          <TabPanel value="CustomDeliverables">
            <CustomDeliverables />
          </TabPanel>
          <TabPanel value="Contract">
            <Contact />
          </TabPanel>
          <TabPanel value="Comments">
            <Comments />
          </TabPanel>
        </TabContext>
      </TabBox>
    </>
  );
};

export default TabsDetails;
