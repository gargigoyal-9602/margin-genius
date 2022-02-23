import React, { useEffect, useState, useCallback } from "react";
import globalLayout from "../../../styles/globalLayout.module.scss";
import TopContent from "../../../components/proposal-contract-sales/TopContent";
import layout from "../../../styles/layout.module.scss";
import LeftMenuBar from "../../../components/layout/LeftMenuBar";
import Breadcrumb from "../../../components/layout/Breadcrumb";
import Listview from "../../../components/proposal-contract-sales/ListView";
import SearchBarNav from "../../../components/proposal-contract-sales/SearchBarNav";
import {
  MainButton,
  InputText,
  TextLink,
} from "../../../components/formControls.style";
import { useRouter } from "next/router";
import Image from "next/image";
import withAuth from "../../../components/layout/withAuth/index";
import tokenExpired from "../../../components/layout/withAuth/tokenExpired";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";
import axios from "axios";

const Index = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Loader loading={loading} />
      <section className={layout.container}>
        <LeftMenuBar />
        <section className={globalLayout.right_section}>
          <div className={globalLayout.right_section_wrap}>
            <Breadcrumb element={"Proposal / Contract"} />
            <TopContent />
            <Listview />
          </div>
        </section>
      </section>
    </>
  );
};

export default withAuth(Index);
