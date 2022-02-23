import React, { useEffect, useState, useCallback } from "react";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { ModalBox } from "../../../components/tableControls.style";
import Backdrop from "@mui/material/Backdrop";
import globalLayout from "../../../styles/globalLayout.module.scss";
import TopContent from "../../../components/proposal-contract/TopContent";
import layout from "../../../styles/layout.module.scss";
import LeftMenuBar from "../../../components/layout/LeftMenuBar";
import Breadcrumb from "../../../components/layout/Breadcrumb";
import Listview from "../../../components/proposal-contract/ListView";
import SearchBarNav from "../../../components/proposal-contract/SearchBarNav";
import {
  OutlineButton,
  IconButton,
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
import FooterNav from "../../../components/layout/FooterNav";

const Index = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [proposals, setProposals] = useState("");
  const [calculators, setCalculators] = useState("");
  const [createProposals, setCreateProposals] = useState(false);
  const [editProposals, setEditProposals] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteIds, setDeleteIds] = useState([]);
  const [deleteDisabled, setDeleteDisabled] = useState(true);
  const [search, setSearch] = useState("");
  const [filterDisplay, setFilterDisplay] = useState("");
  const [appliedfilter, setAppliedFilter] = React.useState({
    calculators: [],
    format: [],
    pcSettings: [],
    othersConfig: [],
  });

  ///handleFilterDisplay
  const handleFilterDisplay = (cal) => {
    let calculators = cal,
      format = ["PDF", "PNG/JPEG"],
      //  "Google Sheet", "Excel"],
      pcSettings = {
        "Setup Fees": false,
        "Custom Deliverables": false,
        "Frequency Of Deliverables": false,
        "Phase Of Deliverables": false,
        "Quantity Of Deliverables": false,
        "Itemized Pricing Of Deliverables": false,
      },
      othersConfig = ["Company Name", "TCV", "MCV", "Contract Length"];
    
    setFilterDisplay({
      ["calculators"]: calculators,
      ["format"]: format,
      ["pcSettings"]: pcSettings,
      ["othersConfig"]: othersConfig,
    });
  };

  //get Proposals
  const getProposals = async (searchValue, filterValue) => {
    !searchValue && !filterValue && setLoading(true);
    const authDetails = JSON.parse(localStorage.getItem("authDetails"));
    const postData = {
      userId: authDetails.userId,
      orgId: authDetails.orgId,
      search: searchValue ? searchValue : "",
      calculatorsName: filterValue ? filterValue.calculators : [],
      fileFormat: filterValue ? filterValue.format : [],
      pcSettings: {
        setupFees: filterValue
          ? filterValue.pcSettings.includes("setupFees")
          : false,
        customDeliverables: filterValue
          ? filterValue.pcSettings.includes("customDeliverables")
          : false,
        frequencyOfDeliverables: filterValue
          ? filterValue.pcSettings.includes("frequencyOfDeliverables")
          : false,
        phaseOfDeliverables: filterValue
          ? filterValue.pcSettings.includes("phaseOfDeliverables")
          : false,
        quantityOfDeliverables: filterValue
          ? filterValue.pcSettings.includes("quantityOfDeliverables")
          : false,
        itemizedPricingOfDeliverables: filterValue
          ? filterValue.pcSettings.includes("itemizedPricingOfDeliverables")
          : false,
      },
      companyName: filterValue
        ? filterValue.othersConfig.includes("Company Name")
        : false,
      tvc: filterValue ? filterValue.othersConfig.includes("TCV") : false,
      mvc: filterValue ? filterValue.othersConfig.includes("MCV") : false,
      contractLength: filterValue
        ? filterValue.othersConfig.includes("Contract Length")
        : false,
    };

    try {
      const response = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/fetch-proposal-contract`,
        headers: {
          Authorization: `Bearer ${authDetails.jwt}`,
        },
        data: postData,
      });
      if (response.data) {
        setProposals(response.data.data);
        setMessage(response.data?.message);

      }
    } catch (err) {
      console.log(err)
      tokenExpired(err, router);
    }
    setLoading(false);
  };

  // create package
  const PostcreateProposal = async (values, rowEdit) => {
    const authDetails = JSON.parse(localStorage.getItem("authDetails"));
    const postData = {
      userId: authDetails.userId,
      orgId: authDetails.orgId,
      title: values.title,
      calculatorIds: values.calculatorIds,
      fileFormat: values.fileFormat.toString(),
      pcSettings: values.pcSettings,
      companyLogo: values.companyLogo,
      companyName: values.companyName,
      tvc: values.tvc,
      mvc: values.mvc,
      contractLength: values.contractLength,
    };

    const putData = {
      ...postData,
      ["proposalContractId"]: rowEdit.proposalContractId,
    };

    const payloaddata = editProposals ? putData : postData;

    try {
      const response = await axios({
        method: `${editProposals ? "PUT" : "POST"}`,
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/proposal-contract`,
        headers: {
          Authorization: `Bearer ${authDetails.jwt}`,
        },
        data: payloaddata,
      });
      if (response.data) {
        toast.success(response.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        getProposals();
      }
    } catch (err) {
      tokenExpired(err, router);
    }
    setLoading(false);
  };

  //delete Proposals
  const deleteProposals = async () => {
    const deletePackagesId = deleteIds.toString();
    setLoading(true);
    const authDetails = JSON.parse(localStorage.getItem("authDetails"));
    try {
      const response = await axios({
        method: "delete",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/proposal-contract?userId=${authDetails.userId}&pcIds=${deletePackagesId}`,
        headers: {
          Authorization: `Bearer ${authDetails.jwt}`,
        },
      });
      if (response.data) {
        toast.success(response.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        getProposals();
        setDeleteIds([]);
      }
    } catch (err) {
      tokenExpired(err, router);
    }
    setLoading(false);
  };

  //get calculators
  const getCalculators = async () => {
    const authDetails = JSON.parse(localStorage.getItem("authDetails"));
    const postData = {
      userId: authDetails.userId,
      orgId: authDetails.orgId,
      calculatorName: "",
      role: [],
      department: [],
      contractlengthConfig: "",
      setupFee: "",
    };

    try {
      const response = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/calculators`,
        headers: {
          Authorization: `Bearer ${authDetails.jwt}`,
        },
        data: postData,
      });
      if (response.data) {
        let filterCalculators = [];
        let filterDisplaycalc=[]
        response.data.data.length > 0 &&
          response.data.data.forEach((cal) => {
            filterCalculators = [
              ...filterCalculators,
              { ["name"]: cal.calculatorName, ["id"]: cal.calculatorId },
            ];
            filterDisplaycalc = [...filterDisplaycalc, cal.calculatorName];
          });
        setCalculators(filterCalculators);
        handleFilterDisplay(filterDisplaycalc);
      }
    } catch (err) {
      tokenExpired(err, router);
    }
    setLoading(false);
  };

  const handleDeleteModalClose = () => {
    setOpenDelete(!openDelete);
  };

  useEffect(() => {
    getProposals();
    getCalculators();
  }, []);

  return (
    <>
      <Loader loading={loading} />

      <section className={layout.container}>
        <LeftMenuBar />
        <section className={globalLayout.right_section}>
          <div className={globalLayout.right_section_wrap}>
            <Breadcrumb element={"Proposal / Contract"} />
            <TopContent />
            {(proposals.length > 0 ||
              createProposals ||
              message == "No proposal contract found") && (
              <>
                <SearchBarNav
                  createProposals={createProposals}
                  setCreateProposals={setCreateProposals}
                  editProposals={editProposals}
                  setEditProposals={setEditProposals}
                  handleDeleteModalClose={handleDeleteModalClose}
                  deleteDisabled={deleteDisabled}
                  setSearch={setSearch}
                  search={search}
                  filterDisplay={filterDisplay}
                  appliedfilter={appliedfilter && appliedfilter}
                  setAppliedFilter={setAppliedFilter}
                  proposals={proposals}
                  getProposals={getProposals}
                />
                <Listview
                  proposals={proposals}
                  calculators={calculators}
                  createProposals={createProposals}
                  setCreateProposals={setCreateProposals}
                  editProposals={editProposals}
                  setEditProposals={setEditProposals}
                  PostcreateProposal={PostcreateProposal}
                  deleteIds={deleteIds}
                  setDeleteIds={setDeleteIds}
                  deleteDisabled={deleteDisabled}
                  setDeleteDisabled={setDeleteDisabled}
                  openDelete={openDelete}
                  setOpenDelete={setOpenDelete}
                />
              </>
            )}
            {proposals &&
              proposals.length == 0 &&
              !createProposals &&
              message !=
                "No proposal contract found" &&(
                  <div className={globalLayout.no_table_data}>
                    <span>
                      <Image
                        alt=""
                        src="/icons/no-contract.svg"
                        width="105"
                        height="116"
                      />
                    </span>
                    <p>
                      You have no proposal or contract yet. <br />
                      Add your first proposal/contract by clicking a button
                      below.
                    </p>
                    <MainButton
                      aligncenter="true"
                      fixwidth="auto"
                      marginbottom="0"
                      onClick={() => {
                        setCreateProposals(!createProposals);
                      }}
                    >
                      <span className={layout.flex_top}>
                        <Image
                          src="/icons/plus-icon.svg"
                          width="16"
                          height="16"
                          alt=""
                        />
                      </span>
                      <span className={layout.ml_10}>
                        Add New Proposal/Contract
                      </span>
                    </MainButton>
                  </div>
                )}

            {/* delete close modal */}
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={openDelete}
              onClose={handleDeleteModalClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <ModalBox style={{ opacity: 1, visibility: "visible" }}>
                  <span
                    className={layout.model_close}
                    onClick={handleDeleteModalClose}
                  >
                    <Image
                      src="/icons/cancel.svg"
                      height="12"
                      width="12"
                      alt=""
                    />
                  </span>
                  <div className={layout.mb_20}>
                    <h3>
                      Are you sure you want to delete these proposals/contracts?
                    </h3>
                    <p>
                      The items will be deleted immediately and this action
                      cannot be undone.
                    </p>
                  </div>
                  <div className={layout.flex_between_center}>
                    <OutlineButton
                      onClick={handleDeleteModalClose}
                      aligncenter="true"
                      fixwidth="auto"
                      marginbottom="0px"
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
                    <IconButton
                      onClick={() => {
                        deleteProposals();
                        handleDeleteModalClose();
                      }}
                      withText
                    >
                      <span className={layout.flex_center}>
                        <Image
                          alt=""
                          src="/icons/delete-icon-white.svg"
                          width="16"
                          height="16"
                        />{" "}
                        <span className={layout.ml_10}>Delete the Items</span>
                      </span>
                    </IconButton>
                  </div>
                </ModalBox>
              </Fade>
            </Modal>
            <FooterNav
              elements={proposals.length}
              prevRoute="/admin/calculators"
              nextRoute="/admin/deals"
            />
          </div>
        </section>
      </section>
    </>
  );
};

export default withAuth(Index);
