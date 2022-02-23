import React, { useEffect, useState, useCallback } from "react";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import globalLayout from "../../../styles/globalLayout.module.scss";
import TopContent from "../../../components/deliverables/TopContent";
import layout from "../../../styles/layout.module.scss";
import LeftMenuBar from "../../../components/layout/LeftMenuBar";
import Breadcrumb from "../../../components/layout/Breadcrumb";
import Listview from "../../../components/deliverables/ListView";
import SearchBarNav from "../../../components/deliverables/SearchBarNav";
import {
  MainButton,
  InputText,
  TextLink,
  OutlineButton,
  IconButton,
} from "../../../components/formControls.style";
import { useRouter } from "next/router";
import Image from "next/image";
import RightDrawer from "../../../components/deliverables/RightDrawer";
import withAuth from "../../../components/layout/withAuth/index";
import tokenExpired from "../../../components/layout/withAuth/tokenExpired";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";
import axios from "axios";
import { ModalBox } from "../../../components/tableControls.style";
import FooterNav from "../../../components/layout/FooterNav";
import currency from "currency.js";

const Index = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deliverable, setDeliverable] = useState("");
  const [departRole, setdepartRole] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteIds, setDeleteIds] = useState([]);
  const [deleteDisabled, setDeleteDisabled] = useState(true);
  const [search, setSearch] = useState("");
  const [filterDisplay, setFilterDisplay] = useState("");
  const [appliedfilter, setAppliedFilter] = React.useState({
    departments: [],
    roles: [],
    vendors: [],
  });
  const [Drawerstate, setDrawerstate] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const toggleDrawer = (anchor, open) => {
    setDrawerstate({ ...Drawerstate, [anchor]: open });
  };
  //get deliverables
  const getDeliverables = async (searchValue, filterValue) => {
    !searchValue && !filterValue && setLoading(true);
    const authDetails = JSON.parse(localStorage.getItem("authDetails"));
    const postData = {
      userId: authDetails.userId,
      orgId: authDetails.orgId,
      deliverableName: searchValue ? searchValue : "",
      role: filterValue ? filterValue.roles : appliedfilter.roles,
      vendorName: filterValue ? filterValue.vendors : appliedfilter.vendors,
      department: filterValue
        ? filterValue.departments
        : appliedfilter.departments,
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
        setMessage(response.data?.message);
        !filterValue && !searchValue && handleFilterDisplay(response.data.data);
      }
    } catch (err) {
      tokenExpired(err, router);
    }
    setLoading(false);
  };

  ///handleFilterDisplay
  const handleFilterDisplay = (list) => {
    let departments = [],
      roles = [],
      vendors = [];
    list.forEach((deliver, index) => {
      !departments.includes(deliver.department[0].department) &&
        departments.push(deliver.department[0].department);
      !roles.includes(deliver.department[0].roles[0].role) &&
        roles.push(deliver.department[0].roles[0].role);
      !vendors.includes(deliver.vendorName) && vendors.push(deliver.vendorName);
    });
    setFilterDisplay({
      ["departments"]: departments,
      ["roles"]: roles,
      ["vendors"]: vendors,
    });
  };
  // get departmentRole
  const getdepartmentRole = async () => {
    setLoading(true);
    const authDetails = JSON.parse(localStorage.getItem("authDetails"));
    try {
      const response = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/department-roles-detail?userId=${authDetails.userId}&orgId=${authDetails.orgId}`,
        headers: {
          Authorization: `Bearer ${authDetails.jwt}`,
        },
      });
      if (response.data) {
        setdepartRole(response.data.data);
      }
    } catch (err) {
      // tokenExpired(err, router);
    }
    setLoading(false);
  };

  /// create deliverables
  const createDeliverables = async (values) => {
    setLoading(true);
    const authDetails = JSON.parse(localStorage.getItem("authDetails"));
    const postData = {
      userId: authDetails.userId,
      orgId: authDetails.orgId,
      roleId: values.roleId,
      departmentId: values.departmentId,
      deliverableName: values.deliverableName,
      employeeroleLevel: values.employeeroleLevel,
      description: values.description,
      hourlyBased: values.costMeasured == "Hourly Based" ? true : false,
      deliveryHours:
        values.costMeasured == "Hourly Based" ? values.deliveryHours : "",
      turnaroundTime: `${values.turnaroundTime} days`,
      fixedCost: values.costMeasured == "Fixed Cost" ? true : false,
      internalCost:
        values.costMeasured == "Fixed Cost"
          ? currency(values.deliveryHours).value.toString()
          : "",
      internalOutsourced: values.costfulfilled == "Internal" ? true : false,
      customDropdwon: values.customDropdwon,
      vendorName: values.vendorName,
      price: values.price,
    };
    try {
      const response = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/deliverables`,
        headers: {
          Authorization: `Bearer ${authDetails.jwt}`,
        },
        data: postData,
      });
      if (response.data) {
        toast.success(response.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        setSearch("");
        setAppliedFilter({
          departments: [],
          roles: [],
          vendors: [],
        });
        getDeliverables();
        toggleDrawer("right", false);
      }
    } catch (err) {
      tokenExpired(err, router);
    }
    setLoading(false);
  };
  /// create deliverables
  const updateDeliverables = async (values, editrow) => {
    setLoading(true);
    const authDetails = JSON.parse(localStorage.getItem("authDetails"));
    const postData = {
      userId: authDetails.userId,
      orgId: authDetails.orgId,
      roleId: values.roleId,
      deliverablesId: editrow.deliverablesId,
      departmentId: values.departmentId,
      deliverableName: values.deliverableName,
      employeeroleLevel: values.employeeroleLevel,
      description: editrow.description,
      hourlyBased: editrow.hourlyBased,
      deliveryHours: editrow.deliveryHours,
      turnaroundTime: editrow.turnaroundTime,
      fixedCost: editrow.fixedCost,
      internalCost: editrow.internalCost,
      internalOutsourced: editrow.internalOutsourced,
      customDropdwon: editrow.customDropdwon,
      vendorName: values.vendorName,
      price: values.price,
    };
    try {
      const response = await axios({
        method: "put",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/deliverables`,
        headers: {
          Authorization: `Bearer ${authDetails.jwt}`,
        },
        data: postData,
      });
      if (response.data) {
        toast.success(response.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        getDeliverables();
        toggleDrawer("right", false);
      }
    } catch (err) {
      tokenExpired(err, router);
    }
    setLoading(false);
  };

  //delete deliverables
  const deleteDeliverables = async () => {
    const deleteDeliverableId = deleteIds.toString();
    setLoading(true);
    const authDetails = JSON.parse(localStorage.getItem("authDetails"));
    try {
      const response = await axios({
        method: "delete",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/deliverables?deliverablesIds=${deleteDeliverableId}&userId=${authDetails.userId}`,
        headers: {
          Authorization: `Bearer ${authDetails.jwt}`,
        },
      });
      if (response.data) {
        toast.success(response.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        getDeliverables();
        setDeleteIds([]);
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
    getDeliverables();
    getdepartmentRole();
    console.log(currency("25,000").add(1000).multiply(2));
  }, []);

  return (
    <>
      <Loader loading={loading} />

      <section className={layout.container}>
        <LeftMenuBar />
        <section className={globalLayout.right_section}>
          <div className={globalLayout.right_section_wrap}>
            <Breadcrumb element={"Deliverables"} />
            <TopContent />
            {deliverable &&
              (deliverable.length > 0 ||
                message == "No Deliverables Found") && (
                <>
                  <SearchBarNav
                    createDeliverables={createDeliverables}
                    departmentRole={departRole}
                    handleDeleteModalClose={handleDeleteModalClose}
                    deleteDisabled={deleteDisabled}
                    toggleDrawer={toggleDrawer}
                    Drawerstate={Drawerstate}
                    setSearch={setSearch}
                    search={search}
                    getDeliverables={getDeliverables}
                    filterDisplay={filterDisplay}
                    appliedfilter={appliedfilter && appliedfilter}
                    setAppliedFilter={setAppliedFilter}
                    deliverable={deliverable}
                  />
                  <Listview
                    deliverable={deliverable}
                    departmentRole={departRole}
                    deleteDeliverables={deleteDeliverables}
                    openDelete={openDelete}
                    setOpenDelete={setOpenDelete}
                    deleteIds={deleteIds}
                    setDeleteIds={setDeleteIds}
                    deleteDisabled={deleteDisabled}
                    setDeleteDisabled={setDeleteDisabled}
                    updateDeliverables={updateDeliverables}
                  />
                </>
              )}
            {deliverable &&
              deliverable.length == 0 &&
              message != "No Deliverables Found" && (
                <div className={globalLayout.no_table_data}>
                  <span>
                    <Image
                      alt=""
                      src="/icons/no-deliverables.svg"
                      width="116"
                      height="116"
                    />
                  </span>
                  <p>
                    You have no deliverables yet.
                    <br /> Add your first deliverable by clicking a button
                    below.
                  </p>

                  <RightDrawer
                    departmentRole={departRole}
                    createDeliverables={createDeliverables}
                    toggleDrawer={toggleDrawer}
                    Drawerstate={Drawerstate}
                  />
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
                    <h3>Are you sure you want to delete this deliverable?</h3>
                    <p>
                      The deliverable will be deleted immediately and this
                      action cannot be undone.
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
                        deleteDeliverables();
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
                          Delete these deliverables
                        </span>
                      </span>
                    </IconButton>
                  </div>
                </ModalBox>
              </Fade>
            </Modal>
            <FooterNav
              elements={deliverable.length}
              prevRoute="/admin/roles"
              nextRoute={"/admin/packages"}
            />
          </div>
        </section>
      </section>
    </>
  );
};

export default withAuth(Index);
