import React from "react";
import Image from "next/image";
import globalLayout from "../../../styles/globalLayout.module.scss";
import layout from "../../../styles/layout.module.scss";
import LeftMenuBar from "../../../components/layout/LeftMenuBar";
import Breadcrumb from "../../../components/layout/Breadcrumb";
import TabsDetails from "../../../components/deals-sales/TabsDetails";
import ListView from "../../../components/deals-sales/ListView";
import SearchBarNav from "../../../components/deals-sales/SearchBarNav";
import { MainButton } from "../../../components/formControls.style";
//Component
import Link from "next/link";
// import { BackIcon } from "../../../public/icons/icon-back.svg";
const Index = () => {
  return (
    <>
      <section className={layout.container}>
        <LeftMenuBar />
        <section className={globalLayout.right_section}>
          <div className={globalLayout.right_section_wrap}>
            <Breadcrumb element={"Deals"} />
            <SearchBarNav />
            <ListView />
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
              <MainButton fixwidth="auto" marginbottom="0px">
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
            </div>
            <TabsDetails />
          </div>
        </section>
      </section>
    </>
  );
};
export default Index;
