import React, { useEffect, useState, useCallback } from "react";
import globalLayout from "../../../styles/globalLayout.module.scss";
import TopContent from "../../../components/calculators/TopContent";
import layout from "../../../styles/layout.module.scss";
import LeftMenuBar from "../../../components/layout/LeftMenuBar";
import Breadcrumb from "../../../components/layout/Breadcrumb";
import Listview from "../../../components/calculators/ListView";
import SearchBarNav from "../../../components/calculators/SearchBarNav";
import {
  MainButton,
  InputText,
  TextLink,
} from "../../../components/formControls.style";
import { useRouter } from "next/router";
import Image from "next/image";
import RightDrawer from "../../../components/calculators/RightDrawer";
import withAuth from "../../../components/layout/withAuth/index";
import tokenExpired from "../../../components/layout/withAuth/tokenExpired";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";
import axios from "axios";
import { TextareaAutosize } from "@mui/material";
import FooterNav from "../../../components/layout/FooterNav";
export let allCalculators = [];
const Index = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = React.useState([]);
  const [calculators, setAllCalculators] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [category, setCategory] = React.useState([]);
  const [department, setDepartment] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [nameObj, setNameObj] = React.useState({});
  const [packageNameObj, setPackageNameObj] = React.useState({});
  const [packagePriceObj, setPackagePriceObj] = React.useState({});
  const [deliverables, setDeliverables] = React.useState([]);
  const [deliverableNameObj, setDeliverableNameObj] = React.useState({});
  const [deliverablePriceObj, setDeliverablePriceObj] = React.useState({});
  const [deliverableRoleId, setDeliverableRoleId] = React.useState({});
  const [departments, setDepartments] = React.useState([]);
  const [packages, setPackages] = React.useState([]);
  const [packageAllowAccess, setPackageAllowAccess] = React.useState({});

  const [appliedfilter, setAppliedFilter] = React.useState({
    Category: [],
    Departments: [],
    contractLengthConfig: "",
    setUpFeeConfig: "",
  });
  const handleFilterDisplay = (list) => {
    let depart = [];
    let category = [];

    if (list.length > 0) {
      list.forEach((calculator, index) => {
        if (!depart.includes(calculator.departmentName)) {
          depart.push(calculator.departmentName);
        }
        setDepartment(depart);
        if (!category.includes(calculator.category)) {
          category.push(calculator.category);
        }
        setCategory(category);
      });
    }
    // list.forEach((calculator, index) => {
    //   calculator.calculatorCustomDeliverable.map((element) => {
    //     if (!r.includes(element.roleName)) {
    //       r.push(element.roleName);
    //     }
    //     setRoles(r);
    //   });
    // });
  };
  const fetchAllDelivarable = async () => {
    const authDetails = JSON.parse(localStorage.getItem("authDetails"));
    if (authDetails) {
      const { jwt, userId, orgId } = authDetails;
      setLoading(true);

      try {
        const response = await axios({
          method: "post",
          url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/deliverable`,
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
          data: {
            orgId: orgId,
            userId: userId,
            role: [],
            deliverableName: "",
            department: [],
            vendorName: [],
          },
        });
        // setPackages(response.data.data)
        setDeliverables(response.data.data);

        response.data.data.map((ele) => {
          deliverableNameObj[`${ele.deliverablesId}`] = ele.deliverableName;
          deliverablePriceObj[`${ele.deliverablesId}`] = ele.price;
          ele.department.map((depart) => {
            depart.roles.map((role) => {
              deliverableRoleId[ele.deliverablesId] = role.roleId;
            });
          });
          // packagePriceObj[`${ele.packageId}`]=ele.overallPrice
        });
      } catch (err) {
        console.log(err);
        tokenExpired(err, router);
      }
      setLoading(false);
    } else {
      router.push("/auth/login");
    }
  };
  const fetchAllPackages = async () => {
    const authDetails = JSON.parse(localStorage.getItem("authDetails"));
    if (authDetails) {
      const { jwt, userId, orgId } = authDetails;
      setLoading(true);

      try {
        const response = await axios({
          method: "post",
          url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/packages`,
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
          data: {
            userId: userId,
            orgId: orgId,
            overallPrice: [],
            packageName: [],
            departmentName: [],
            minRoleLevel: [],
            search: "",
          },
        });
        setPackages(response.data.data);
        response.data.data.map((ele) => {
          packageNameObj[`${ele.packageId}`] = ele.packageName;
          packagePriceObj[`${ele.packageId}`] = ele.overallPrice;
        });
      } catch (err) {
        console.log(err);
        tokenExpired(err, router);
      }
      setLoading(false);
    } else {
      router.push("/auth/login");
    }
  };

  const getAllCalculators = async (search = "", filter) => {
    const authDetails = JSON.parse(localStorage.getItem("authDetails"));
    const { jwt, userId, orgId } = authDetails;
    try {
      setLoading(true);
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
          calculatorName: search,
          category: filter ? filter.Category : appliedfilter.Category,
          department: filter ? filter.Departments : appliedfilter.Departments,
          contractlengthConfig: filter
            ? filter.contractLengthConfig
            : appliedfilter.contractLengthConfig,
          setupFee: filter
            ? filter.setUpFeeConfig
            : appliedfilter.setUpFeeConfig,
        },
      });
      if (response.data) {
        allCalculators = response.data.data;
        setAllCalculators(response.data.data);
        setMessage(response.data.message);
        response.data.data.map((element) => {
          element.calculatorPackages.map((ele) => {
            packageAllowAccess[ele.packageId] = ele.allowaccessView;
          });
        });
        // !filter && !search &&
        handleFilterDisplay(response.data.data);
      }
    } catch (err) {
      console.log(err);
      tokenExpired(err, router);
    }
    setLoading(false);
  };
  const deleteRoles = async () => {
    let calculatorId = selected.toString();
    const authDetails = JSON.parse(localStorage.getItem("authDetails"));
    const { jwt, userId, orgId } = authDetails;
    try {
      setLoading(true);
      const response = await axios({
        method: "delete",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/calculator?calculatorIds=${calculatorId}&userId=${userId}`,
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      });
      if (response && response.data) {
        toast.success(response.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        getAllCalculators();
      } else {
        toast.error(
          `${response.data.error ? response.data.error : "error while login"}`,
          {
            position: toast.POSITION.BOTTOM_RIGHT,
          }
        );
      }
    } catch (err) {
      tokenExpired(err, router);
    }
    setLoading(false);
  };
  const handleMultipleDelete = () => {
    deleteRoles();
  };
  const updatingUsers = async (searchValue, filterValue) => {
    const authDetails = JSON.parse(localStorage.getItem("authDetails"));
    if (authDetails) {
      !searchValue && setLoading(true);

      try {
        const response = await axios({
          method: "get",
          url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/fetchAll?userId=${
            authDetails.userId
          }&orgId=${authDetails.orgId}&search=${
            searchValue ? searchValue : ""
          }&userType=${filterValue ? filterValue : ""}`,
          headers: {
            Authorization: `Bearer ${authDetails.jwt}`,
          },
        });
        if (response.data) {
          setUsers(response.data?.data.users);

          response.data.data.users.map((ele) => {
            nameObj[`${ele.userId}`] = ele.fullName;

            // const userName = ele.fullName
            // const newUserId = ele.userId
            // setNameObj({...nameObj,`{ele.userId}`:newUserId})
          });

          // setCount(response.data?.data.count);
          // setMessage(response.data?.message);
        }
      } catch (err) {
        tokenExpired(err, router);
      }
      setLoading(false);
    } else {
      router.push("/auth/login");
    }
  };

  const getDepartments = async () => {
    const authDetails = JSON.parse(localStorage.getItem("authDetails"));
    if (authDetails) {
      const { jwt, userId, orgId } = authDetails;
      setLoading(true);

      try {
        const response = await axios({
          method: "get",
          url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/departments?orgId=${orgId}&userId=${userId}`,
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        });
        setDepartments(response.data.data);
      } catch (err) {
        tokenExpired(err, router);
      }
      setLoading(false);
    } else {
      router.push("/auth/login");
    }
  };

  React.useEffect(() => {
    getAllCalculators();
    getDepartments();
    updatingUsers("", "");
    fetchAllPackages();
    fetchAllDelivarable();
  }, []);

  return (
    <>
      <Loader loading={loading} />

      <section className={layout.container}>
        <LeftMenuBar />
        <section className={globalLayout.right_section}>
          <div className={globalLayout.right_section_wrap}>
            <Breadcrumb element={"Calculators"} />
            <TopContent />
            {(calculators.length > 0 || message === "No Calculators Found") && (
              <SearchBarNav
                calculators={calculators}
                handleMultipleDelete={handleMultipleDelete}
                selected={selected}
                setSelected={setSelected}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                getAllCalculators={getAllCalculators}
                department={department}
                category={category}
                appliedfilter={appliedfilter && appliedfilter}
                setAppliedFilter={setAppliedFilter}
                departments={departments}
                users={users}
                setUsers={setUsers}
                deliverables={deliverables}
                setDeliverables={setDeliverables}
                deliverableNameObj={deliverableNameObj}
                setDeliverableNameObj={setDeliverableNameObj}
                deliverableRoleId={deliverableRoleId}
                setDeliverableRoleId={setDeliverableRoleId}
                deliverablePriceObj={deliverablePriceObj}
                setDeliverablePriceObj={setDeliverablePriceObj}
                packages={packages}
                packageNameObj={packageNameObj}
                packagePriceObj={packagePriceObj}
                setPackages={setPackages}
                users={users}
                departments={departments}
                setDepartments={setDepartments}
                getDepartments={getDepartments}
                setUsers={setUsers}
                nameObj={nameObj}
                setNameObj={setNameObj}
                calculators={calculators}
                getAllCalculators={getAllCalculators}
                packageAllowAccess={packageAllowAccess}
              />
            )}

            {calculators.length === 0 && message !== "No Calculators Found" ? (
              <div className={globalLayout.no_table_data}>
                <span>
                  <Image
                    alt=""
                    src="/icons/no-calculators.svg"
                    width="116"
                    height="116"
                  />
                </span>
                <p>
                  You have no calculators yet. Add your first
                  <br /> calculator by clicking a button below.
                </p>

                <RightDrawer
                  deliverables={deliverables}
                  setDeliverables={setDeliverables}
                  deliverableNameObj={deliverableNameObj}
                  setDeliverableNameObj={setDeliverableNameObj}
                  deliverableRoleId={deliverableRoleId}
                  deliverablePriceObj={deliverablePriceObj}
                  setDeliverablePriceObj={setDeliverablePriceObj}
                  packages={packages}
                  packageNameObj={packageNameObj}
                  packagePriceObj={packagePriceObj}
                  setPackages={setPackages}
                  users={users}
                  departments={departments}
                  setDepartments={setDepartments}
                  getDepartments={getDepartments}
                  setUsers={setUsers}
                  nameObj={nameObj}
                  setNameObj={setNameObj}
                  calculators={calculators}
                  packageAllowAccess={packageAllowAccess}
                />
              </div>
            ) : calculators.length !== 0 ||
              message === "No Calculators Found" ? (
              <Listview
                calculators={calculators}
                selected={selected}
                setSelected={setSelected}
                getAllCalculators={getAllCalculators}
                deliverables={deliverables}
                setDeliverables={setDeliverables}
                deliverableNameObj={deliverableNameObj}
                setDeliverableNameObj={setDeliverableNameObj}
                deliverablePriceObj={deliverablePriceObj}
                setDeliverablePriceObj={setDeliverablePriceObj}
                deliverableRoleId={deliverableRoleId}
                packages={packages}
                packageNameObj={packageNameObj}
                packagePriceObj={packagePriceObj}
                setPackages={setPackages}
                users={users}
                departments={departments}
                setDepartments={setDepartments}
                getDepartments={getDepartments}
                setUsers={setUsers}
                nameObj={nameObj}
                setNameObj={setNameObj}
                packageAllowAccess={packageAllowAccess}
              />
            ) : null}
            <FooterNav
              elements={calculators.length}
              prevRoute="/admin/packages"
              nextRoute="/admin/proposal-contract"
            />
          </div>
        </section>
      </section>
    </>
  );
};

export default withAuth(Index);
