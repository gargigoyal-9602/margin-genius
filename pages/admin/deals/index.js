import React from "react";
import Image from "next/image";
import globalLayout from "../../../styles/globalLayout.module.scss";
import layout from "../../../styles/layout.module.scss";
import LeftMenuBar from "../../../components/layout/LeftMenuBar";
import Breadcrumb from "../../../components/layout/Breadcrumb";
import TabsDetails from "../../../components/deals/TabsDetails";
import ListView from "../../../components/deals/ListView";
import SearchBarNav from "../../../components/deals/SearchBarNav";
import { useRouter } from "next/router";
import {
  MainButton,
  OutlineButton,
} from "../../../components/formControls.style";
//Component
import Link from "next/link";
import axios from "axios";
import tokenExpired from "../../../components/layout/withAuth/tokenExpired";
import SelectCalculatorModal from "../../../components/calculators/SelectCalculatorModal";
// import { BackIcon } from "../../../public/icons/icon-back.svg";
const Index = () => {
  const router = useRouter();
  const [calculators, setAllCalculators] = React.useState([]);
  const [packages, setPackages] = React.useState([]);
  const [isCreateNewDeal, setIsCreateNewDeal] = React.useState(false);
  const [allDeals, setAllDeals] = React.useState([]);
  const [selectedCalculator,setSelectedCalculator]=React.useState({})

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getAllCalculators = async () => {
    const authDetails = JSON.parse(localStorage.getItem("authDetails"));
    const { jwt, userId, orgId } = authDetails;
    try {
      const response = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/calculators`,
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
        data: {
          userId,
          orgId,
          calculatorName: "",
          category: [],
          department: [],
          contractlengthConfig: "",
          setupFee: "",
        },
      });
      if (response.data) {
        setAllCalculators(response.data.data);
        console.log(response.data.data);
      }
    } catch (err) {
      tokenExpired(err, router);
    }
  };
  const getPackages = async () => {
    const authDetails = JSON.parse(localStorage.getItem("authDetails"));
    const postData = {
      userId: authDetails.userId,
      orgId: authDetails.orgId,
      overallPrice: [],
      packageName: [],
      departmentName: [],
      minRoleLevel: [],
      search: "",
    };

    try {
      const response = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/packages`,
        headers: {
          Authorization: `Bearer ${authDetails.jwt}`,
        },
        data: postData,
      });
      if (response.data) {
        setPackages(response.data.data);
        console.log(response.data.data);
      }
    } catch (err) {
      tokenExpired(err, router);
    }
  };
  React.useEffect(() => {
    getAllCalculators();
    getPackages();
  }, []);
  return (
    <>
      <section className={layout.container}>
        <LeftMenuBar />
        <section className={globalLayout.right_section}>
          <div className={globalLayout.right_section_wrap}>
            <Breadcrumb element={"Deals"} />
            {!isCreateNewDeal && (
              <>
                {allDeals.length > 0 ? (
                  <>
                    <SearchBarNav calculators={calculators} setIsCreateNewDeal={setIsCreateNewDeal} />
                    <ListView />
                  </>
                ) : (
                  <div className={globalLayout.no_table_data}>
                    <span>
                      <Image
                        alt=""
                        src="/icons/no-deals.svg"
                        width="116"
                        height="116"
                      />
                    </span>
                    <p>
                      You have no created deals yet. Create your
                      <br /> first deal by clicking a button below.
                    </p>
                    <MainButton
                      onClick={handleOpen}
                      fixwidth="auto"
                      marginbottom="0px"
                    >
                      <span className={layout.flex_center}>
                        <Image
                          src="/icons/plus-icon.svg"
                          width="16"
                          height="16"
                          alt=""
                        />
                        <span className={layout.ml_10}>Create New Deal</span>
                      </span>
                    </MainButton>
                    <SelectCalculatorModal
                      open={open}
                      handleClose={handleClose}
                      calculators={calculators}
                      setIsCreateNewDeal={setIsCreateNewDeal}
                      setSelectedCalculator={setSelectedCalculator}
                    />
                  </div>
                )}
              </>
            )}
            {isCreateNewDeal && (
              <TabsDetails
                calculators={calculators}
                packages={packages}
                setPackages={setPackages}
                setIsCreateNewDeal={setIsCreateNewDeal}
                selectedCalculator={selectedCalculator}
              />
            )}
          </div>
        </section>
      </section>
    </>
  );
};
export default Index;
