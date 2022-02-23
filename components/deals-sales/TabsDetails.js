import React, { useEffect, useState, useCallback } from "react";
import {Details} from "./Details";
import {Packages} from "./Packages";
import {CustomDeliverables} from "./CustomDeliverables";
import {Contact} from "./Contact";
import {Comments} from "./Comments";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import SettingsIcon from '@mui/icons-material/Settings';
import {TabContent, PageTitle, TabBox} from './Deals.style';
import InputLabel from "@mui/material/InputLabel";
import layout from "../../styles/layout.module.scss";
import Image from "next/image";
import Link from "next/link";

const TabsDetails = () => {
    const [value, setValue] = React.useState("Details");
    const handleTabChange = (event, newValue) => {
      setValue(newValue);
    };
  return (
    <>
    <PageTitle>
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
        <TabBox>
            <TabContext value={value}>
            <TabList   onChange={handleTabChange}>
                <Tab label={<span className={layout.ml_10}>Details</span>}  value="Details" icon={<Image
                        src="/icons/details-on.svg"
                        height="20"
                        width="20"
                        layout="fixed"
                        alt="icon" />} iconPosition="start" />
                <Tab label={<span className={layout.ml_10}>Packages</span>}  value="Packages" icon={<Image
                        src="/icons/deals_packages.svg"
                        height="20"
                        width="20"
                        layout="fixed"
                        alt="icon" />} iconPosition="start" />
                <Tab label={<span className={layout.ml_10}>Custom Deliverables</span>} value="CustomDeliverables" icon={<Image
                        src="/icons/deals-deliverables.svg"
                        height="20"
                        width="20"
                        layout="fixed"
                        alt="icon" />} iconPosition="start" />
                <Tab label={<span className={layout.ml_10}>Contract</span>}  value="Contract" icon={<Image
                        src="/icons/deals-contract.svg"
                        height="20"
                        width="20"
                        layout="fixed"
                        alt="icon" />} iconPosition="start" />
                <Tab label={<span className={layout.ml_10}>Comments</span>}  value="Comments" icon={<Image
                        src="/icons/deal_comments.svg"
                        height="20"
                        width="20"
                        layout="fixed"
                        alt="icon" />} iconPosition="start" />
            </TabList>
            <TabPanel value="Details">
                <Details />
            </TabPanel>
            <TabPanel value="Packages">
                <Packages />
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
  )
}

export default TabsDetails