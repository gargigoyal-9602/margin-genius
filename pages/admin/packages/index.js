import React, { useEffect, useState, useCallback } from "react";
import globalLayout from "../../../styles/globalLayout.module.scss";
import TopContent from "../../../components/packages/TopContent";
import layout from "../../../styles/layout.module.scss";
import LeftMenuBar from "../../../components/layout/LeftMenuBar";
import Breadcrumb from "../../../components/layout/Breadcrumb";
import Listview from "../../../components/packages/ListView";
import SearchBarNav from "../../../components/packages/SearchBarNav";
import {
  MainButton,
  InputText,
  TextLink,
  OutlineButton,
  IconButton,
} from "../../../components/formControls.style";
import { useRouter } from "next/router";
import Image from "next/image";
import RightDrawer from "../../../components/packages/RightDrawer";
import withAuth from "../../../components/layout/withAuth/index";
import tokenExpired from "../../../components/layout/withAuth/tokenExpired";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { ModalBox } from "../../../components/tableControls.style";
import Backdrop from "@mui/material/Backdrop";
import FooterNav from "../../../components/layout/FooterNav";

const Index = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [packages, setPackages] = useState("");
  const [departments, setdepartments] = useState("");
  const [createPackages, setcreatePackages] = useState(false);
  const [isRowEdit, setisRowEdit] = React.useState(false);
  const [rowEdit, setRowEdit] = React.useState("");
  const [createdeliverables, setCreatedeliverables] = useState(false);
  const [isEditdeliv, setisEditdeliv] = React.useState(false);
  const [delivEdit, setdelivEdit] = React.useState("");
  const [delivDelete, setdelivDelete] = React.useState("");
  const [openAccordian, setOpenAccordian] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteIds, setDeleteIds] = useState([]);
  const [deleteDisabled, setDeleteDisabled] = useState(true);
  const [deliverable, setDeliverable] = useState("");
  const [filterPrices, setfilterPrices] = useState("");
  const [search, setSearch] = useState("");
  const [filterDisplay, setFilterDisplay] = useState("");
  const [appliedfilter, setAppliedFilter] = React.useState({
    departments: [],
    scope: [],
    price: [],
    level: [],
  });

  ///handleFilterDisplay
  const handleFilterDisplay = (list, prices) => {
    let departments = [],
      scope = [],
      level = ["Junior Level", "Medium Level", "Senior Level"],
      price = prices;
    list.forEach((item, index) => {
      !departments.includes(item.departmentName) &&
        departments.push(item.departmentName);
      scope.push(item.packageName);
    });
    setFilterDisplay({
      ["departments"]: departments,
      ["scope"]: scope,
      ["level"]: level,
      ["price"]: price,
    });
  };

  //get packages
  const getPackages = async (searchValue, filterValue) => {
    !searchValue && !filterValue && setLoading(true);
    const authDetails = JSON.parse(localStorage.getItem("authDetails"));
    const postData = {
      userId: authDetails.userId,
      orgId: authDetails.orgId,
      overallPrice: filterValue ? filterValue.price : appliedfilter.price,
      packageName: filterValue ? filterValue.scope : appliedfilter.scope,
      departmentName: filterValue
        ? filterValue.departments
        : appliedfilter.departments,
      minRoleLevel: filterValue ? filterValue.level : appliedfilter.level,
      search: searchValue ? searchValue : "",
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
        !filterValue &&
          !searchValue &&
          getPrices().then((res) => {
            handleFilterDisplay(response.data.data, res);
          });

        setPackages(response.data.data);
        setMessage(response.data?.message);
        // !filterValue && !searchValue && handleFilterDisplay(response.data.data);
      }
    } catch (err) {
      tokenExpired(err, router);
    }
    setLoading(false);
  };

  // handle collapse
  const handleCollapse = (packages) => {
    let collapseArr = [];
    packages.forEach((item) => {
      const obj = { [item.packageId]: false };
      collapseArr.push(obj);
    });
    setOpenAccordian(collapseArr);
  };

  // create package
  const PostcreatePackages = async (values) => {
    const authDetails = JSON.parse(localStorage.getItem("authDetails"));
    const postData = {
      userId: authDetails.userId,
      orgId: authDetails.orgId,
      departmentId: values.departmentId,
      packageName: values.packageName,
      overallPrice: "",
      minRoleLevel: values.minRoleLevel,
      packageDeliverables: [],
    };

    try {
      const response = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/package`,
        headers: {
          Authorization: `Bearer ${authDetails.jwt}`,
        },
        data: postData,
      });
      if (response.data) {
        handleCreatePackages();
        toast.success(response.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        getPackages();
        setOpenAccordian({
          ...openAccordian,
          [response.data.data.packageId]: true,
        });
      }
    } catch (err) {
      tokenExpired(err, router);
    }
    setLoading(false);
  };
  // update package
  const UpdatePackages = async (packageRow, values) => {
    const authDetails = JSON.parse(localStorage.getItem("authDetails"));
    const postData = {
      packageId: packageRow.packageId,
      userId: authDetails.userId,
      orgId: authDetails.orgId,
      departmentId: values.departmentId,
      packageName: values.packageName,
      overallPrice: "",
      minRoleLevel: values.minRoleLevel,
      packageDeliverables: packageRow.packageDeliverables,
    };

    try {
      const response = await axios({
        method: "put",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/package`,
        headers: {
          Authorization: `Bearer ${authDetails.jwt}`,
        },
        data: postData,
      });
      if (response.data) {
        toast.success(response.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        getPackages();
        setisRowEdit(false);
      }
    } catch (err) {
      tokenExpired(err, router);
    }
    setLoading(false);
  };
  //create deliverables
  const PostcreateDeliverable = async (packageRow, values) => {
    const authDetails = JSON.parse(localStorage.getItem("authDetails"));
    const postData = {
      packageId: packageRow.packageId,
      userId: authDetails.userId,
      orgId: authDetails.orgId,
      departmentId: packageRow.departmentId,
      packageName: packageRow.packageName,
      overallPrice: "",
      minRoleLevel: packageRow.minRoleLevel,
      packageDeliverables: [...packageRow.packageDeliverables, values],
    };

    try {
      const response = await axios({
        method: "put",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/package`,
        headers: {
          Authorization: `Bearer ${authDetails.jwt}`,
        },
        data: postData,
      });
      if (response.data) {
        toast.success(response.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        setCreatedeliverables(false);
        getPackages();
      }
    } catch (err) {
      tokenExpired(err, router);
    }
    setLoading(false);
  };

  //edit deliverables
  const editDeliverable = async (packageRow, delivEdit, values) => {
    const authDetails = JSON.parse(localStorage.getItem("authDetails"));
    const oldpackageRows = packageRow.packageDeliverables.filter(
      (deliverable) =>
        deliverable.deliverablesPackageId != delivEdit.deliverablesPackageId
    );

    const postData = {
      packageId: packageRow.packageId,
      userId: authDetails.userId,
      orgId: authDetails.orgId,
      departmentId: packageRow.departmentId,
      packageName: packageRow.packageName,
      overallPrice: "",
      minRoleLevel: packageRow.minRoleLevel,
      packageDeliverables: [...oldpackageRows, values],
    };

    try {
      const response = await axios({
        method: "put",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/package`,
        headers: {
          Authorization: `Bearer ${authDetails.jwt}`,
        },
        data: postData,
      });
      if (response.data) {
        toast.success(response.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        setCreatedeliverables(false);
        getPackages();
      }
    } catch (err) {
      tokenExpired(err, router);
    }
    setLoading(false);
  };

  // //get packages
  const getdepartments = async () => {
    setLoading(true);
    const authDetails = JSON.parse(localStorage.getItem("authDetails"));

    try {
      const response = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/departments?userId=${authDetails.userId}&orgId=${authDetails.orgId}`,
        headers: {
          Authorization: `Bearer ${authDetails.jwt}`,
        },
      });
      if (response.data) {
        setdepartments(response.data.data);
        handleCollapse(packages);
      }
    } catch (err) {
      // tokenExpired(err, router);
    }
    setLoading(false);
  };

  // //get price
  const getPrices = async () => {
    setLoading(true);
    const authDetails = JSON.parse(localStorage.getItem("authDetails"));

    try {
      const response = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/overall-price?userId=${authDetails.userId}&orgId=${authDetails.orgId}`,
        headers: {
          Authorization: `Bearer ${authDetails.jwt}`,
        },
      });
      if (response.data) {
        return response.data.data;
        setfilterPrices(response.data.data);
      }
    } catch (err) {
      // tokenExpired(err, router);
    }
    setLoading(false);
  };

  //delete deliverables
  const deletePackages = async () => {
    const deletePackagesId = deleteIds.toString();
    setLoading(true);
    const authDetails = JSON.parse(localStorage.getItem("authDetails"));
    try {
      const response = await axios({
        method: "delete",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/package?packageIds=${deletePackagesId}&userId=${authDetails.userId}`,
        headers: {
          Authorization: `Bearer ${authDetails.jwt}`,
        },
      });
      if (response.data) {
        toast.success(response.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        getPackages();
        setDeleteIds([]);
      }
    } catch (err) {
      tokenExpired(err, router);
    }
    setLoading(false);
  };

  //delete deliverables
  const deleteDeliverbles = async (id, packageId) => {
    setLoading(true);
    const authDetails = JSON.parse(localStorage.getItem("authDetails"));
    try {
      const response = await axios({
        method: "delete",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/packageDeliverable?deliverablesPackageId=${id}&packageId=${packageId}&userId=${authDetails.userId}`,
        headers: {
          Authorization: `Bearer ${authDetails.jwt}`,
        },
      });
      if (response.data) {
        toast.success(response.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        getPackages();
        setdelivDelete("");
      }
    } catch (err) {
      tokenExpired(err, router);
    }
    setLoading(false);
  };

  //handle create packages
  const handleCreatePackages = () => {
    setcreatePackages(!createPackages);
  };
  const handleEditPackages = () => {
    setisRowEdit(!isRowEdit);
  };

  const handleCreateDeliverable = () => {
    setCreatedeliverables(!createdeliverables);
  };
  const handleEditDeliverable = () => {
    setisEditdeliv(!isEditdeliv);
  };

  const handleDeleteModalClose = () => {
    setOpenDelete(!openDelete);
    setdelivDelete("");
  };

  //get deliverables
  const getDeliverables = async (searchValue, filterValue) => {
    setLoading(true);
    const authDetails = JSON.parse(localStorage.getItem("authDetails"));
    const postData = {
      userId: authDetails.userId,
      orgId: authDetails.orgId,
      deliverableName: searchValue ? searchValue : "",
      role: [],
      vendorName: [],
      department: [],
    };

    try {
      const response = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/deliverable`,
        headers: {
          Authorization: `Bearer ${authDetails.jwt}`,
        },
        data: postData,
      });
      if (response.data) {
        setDeliverable(response.data.data);
      }
    } catch (err) {
      // tokenExpired(err, router);
    }
    setLoading(false);
  };
  useEffect(() => {
    getPackages();
    getdepartments();
    getDeliverables();
  }, []);
  return (
    <>
      <Loader loading={loading} />
      <section className={layout.container}>
        <LeftMenuBar />
        <section className={globalLayout.right_section}>
          <div className={globalLayout.right_section_wrap}>
            <Breadcrumb element={"Packages"} />
            <TopContent />
            {(packages.length > 0 ||
              createPackages ||
              message == "No Packages Found.") && (
              <>
                <SearchBarNav
                  handleDeleteModalClose={handleDeleteModalClose}
                  handleCreatePackages={handleCreatePackages}
                  createPackages={createPackages}
                  handleEditPackages={handleEditPackages}
                  isRowEdit={isRowEdit}
                  rowEdit={rowEdit}
                  setRowEdit={setRowEdit}
                  deleteDisabled={deleteDisabled}
                  getPackages={getPackages}
                  setSearch={setSearch}
                  search={search}
                  filterDisplay={filterDisplay}
                  appliedfilter={appliedfilter && appliedfilter}
                  setAppliedFilter={setAppliedFilter}
                />
                <Listview
                  openAccordian={openAccordian}
                  setOpenAccordian={setOpenAccordian}
                  deleteIds={deleteIds}
                  setDeleteIds={setDeleteIds}
                  deleteDisabled={deleteDisabled}
                  setDeleteDisabled={setDeleteDisabled}
                  openDelete={openDelete}
                  setOpenDelete={setOpenDelete}
                  handleCreatePackages={handleCreatePackages}
                  createPackages={createPackages}
                  handleEditPackages={handleEditPackages}
                  isRowEdit={isRowEdit}
                  setisRowEdit={setisRowEdit}
                  rowEdit={rowEdit}
                  setRowEdit={setRowEdit}
                  departments={departments}
                  deliverable={deliverable}
                  packages={packages}
                  PostcreatePackages={PostcreatePackages}
                  isEditdeliv={isEditdeliv}
                  setisEditdeliv={setisEditdeliv}
                  delivEdit={delivEdit}
                  setdelivEdit={setdelivEdit}
                  createdeliverables={createdeliverables}
                  handleCreateDeliverable={handleCreateDeliverable}
                  handleEditDeliverable={handleEditDeliverable}
                  deleteDeliverbles={deleteDeliverbles}
                  PostcreateDeliverable={PostcreateDeliverable}
                  UpdatePackages={UpdatePackages}
                  editDeliverable={editDeliverable}
                  delivDelete={delivDelete}
                  setdelivDelete={setdelivDelete}
                />
              </>
            )}
            {packages &&
              packages.length == 0 &&
              !createPackages &&
              message != "No Packages Found." && (
                <div className={globalLayout.no_table_data}>
                  <span>
                    <Image
                      alt=""
                      src="/icons/no-packages.svg"
                      width="116"
                      height="116"
                    />
                  </span>
                  <p>
                    You have no packages yet. <br />
                    Add your first package by clicking a button below.
                  </p>
                  <OutlineButton
                    aligncenter="true"
                    fixwidth="auto"
                    onClick={() => {
                      handleCreatePackages();
                    }}
                    marginbottom="0"
                  >
                    <span className={layout.flex_top}>
                      <Image
                        src="/icons/plus-icon-green.svg"
                        width="16"
                        height="16"
                        alt=""
                      />
                    </span>
                    <span className={layout.ml_10}>Add New Package</span>
                  </OutlineButton>
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
                      Are you sure you want to delete{" "}
                      {`${
                        delivDelete
                          ? "this deliverable"
                          : "these scopes of work"
                      }`}
                      ?
                    </h3>
                    <p>
                      The {`${delivDelete ? " deliverable" : "scopes of work"}`}{" "}
                      will be deleted immediately and this action cannot be
                      undone.
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
                        delivDelete
                          ? deleteDeliverbles(delivDelete[0], delivDelete[0])
                          : deletePackages();
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
                        <span className={layout.ml_10}>
                          Delete the{" "}
                          {`${delivDelete ? " deliverable" : "Scopes"}`}
                        </span>
                      </span>
                    </IconButton>
                  </div>
                </ModalBox>
              </Fade>
            </Modal>
            <FooterNav
              elements={packages.length}
              prevRoute="/admin/deliverables"
              nextRoute="/admin/calculators"
            />
          </div>
        </section>
      </section>
    </>
  );
};

export default withAuth(Index);
