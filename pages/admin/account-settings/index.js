import * as React from "react";
import globalLayout from "../../../styles/globalLayout.module.scss";
import TopContent from "../../../components/account-settings/TopContent";
import layout from "../../../styles/layout.module.scss";
import LeftMenuBar from "../../../components/layout/LeftMenuBar";
import Breadcrumb from "../../../components/layout/Breadcrumb";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { TabBox } from "../../../components/account-settings/AccountSetting.style";
import MyProfile from "../../../components/account-settings/MyProfile";
import CompanyProfile from "../../../components/account-settings/CompanyProfile";
import Billing  from "../../../components/account-settings/Billing";
import MySubscription  from "../../../components/account-settings/MySubscription";
import Image from "next/image";
import withAuth from "../../../components/layout/withAuth/index";


const Index = () => {
 
  const [userData, setUserData] = React.useState({
    fullName: "",
    profileLogo: "",
  });
  const [value, setValue] = React.useState("My Profile");
  const [access, setAcces] = React.useState(false);

  React.useEffect(() => {
    const authDetails = localStorage.getItem("authDetails");
    authDetails.userType == "Admin";
    setAcces(true);
  }, [access]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <section className={layout.container}>
        <LeftMenuBar
          fullname={userData.fullName}
          profilelogo={userData.profileLogo}
        />
        <section className={globalLayout.right_section}>
          <div className={globalLayout.right_section_wrap}>
            <Breadcrumb element={"Account Settings"} />
            <TopContent />
            <TabBox>
              <TabContext value={value && value}>
                <TabList onChange={handleChange} aria-label="">
                  {access && (
                    <Tab
                      icon={
                        <Image
                          alt="Icon"
                          width="16"
                          height="16"
                          src="/icons/profile-tab.svg"
                        />
                      }
                      iconPosition="start"
                      label={<span className={layout.ml_10}>My Profile</span>}
                      value="My Profile"
                    />
                  )}
                  <Tab
                    icon={
                      <Image
                        alt="Icon"
                        width="16"
                        height="16"
                        src="/icons/company-profile-tab.svg"
                      />
                    }
                    iconPosition="start"
                    label={
                      <span className={layout.ml_10}>Company Profile</span>
                    }
                    value="Company Profile"
                  />
                  <Tab
                    icon={
                      <Image
                        alt="Icon"
                        width="16"
                        height="16"
                        src="/icons/billing-tab.svg"
                      />
                    }
                    iconPosition="start"
                    label={<span className={layout.ml_10}>Billing</span>}
                    value="Billing"
                  />
                  <Tab
                    icon={
                      <Image
                        alt="Icon"
                        width="16"
                        height="16"
                        src="/icons/subcription-tab.svg"
                      />
                    }
                    iconPosition="start"
                    label={
                      <span className={layout.ml_10}>My Subscription</span>
                    }
                    value="My Subscription"
                  />
                </TabList>
                <TabPanel value="My Profile">
                  <MyProfile userData={userData} setUserData={setUserData} />
                </TabPanel>
                <TabPanel value="Company Profile">
                  <CompanyProfile />
                </TabPanel>
                <TabPanel value="Billing">
                  <Billing />
                </TabPanel>
                <TabPanel value="My Subscription">
                  <MySubscription />
                </TabPanel>
              </TabContext>
            </TabBox>
          </div>
        </section>
      </section>
    </>
  );
};

export default withAuth(Index);
