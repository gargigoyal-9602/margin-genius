import globalLayout from "../../../styles/globalLayout.module.scss";
import TopContent from "../../../components/department-markup/TopContent";
import layout from "../../../styles/layout.module.scss";
import LeftMenuBar from "../../../components/layout/LeftMenuBar";
import Breadcrumb from "../../../components/layout/Breadcrumb";
import Listview from "../../../components/department-markup/ListView";
import SearchBarNav from "../../../components/department-markup/SearchBarNav";
import RightDrawer from "../../../components/department-markup/RightDrawer";
import tokenExpired from "../../../components/layout/withAuth/tokenExpired";
import Image from "next/image";
import React, { useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";
import { useRouter } from "next/router";
import FooterNav from "../../../components/layout/FooterNav";

const Index = () => {
  const [departments, setDepartments] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");
  const [addedRow, setAddedRow] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const [editId, setEditId] = React.useState(null);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // console.log(data)

  const getDepartments = async (jwt, userId, orgId) => {
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
      console.log(response.data);
    } catch (err) {
      tokenExpired(err, router);
    }
    setLoading(false);
  };

  const deleteDepartment = async (departmentId) => {
    const authDetails = JSON.parse(localStorage.getItem("authDetails"));
    if (authDetails) {
      const { jwt, userId, orgId } = authDetails;
      setLoading(true);
      try {
        const response = await axios({
          method: "delete",
          url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/departments?departmentIds=${departmentId}&userId=${userId}`,
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        });
        if (response && response.data) {
          toast.success(response.data.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
        getDepartments(jwt, userId, orgId);
      } catch (err) {
        tokenExpired(err, router);
      }
      setLoading(false);
    } else {
      router.push("/auth/login");
    }
  };

  const addDepartment = async (values) => {
    const authDetails = JSON.parse(localStorage.getItem("authDetails"));
    if (authDetails) {
      const { jwt, userId, orgId } = authDetails;
      console.log(jwt, userId, orgId);
      setLoading(true);

      try {
        const response = await axios({
          method: "post",
          url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/department`,
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
          data: {
            userId: userId,
            orgId: orgId,
            department: values.Department,
            wholesaleCost: values.WholeSaleCost,
            markupMultiplier: values.markupMultiplier,
            grossmarginPercentage: values.GrossMarginPercentage,
            sellingPrice: values.SellingPrice,
            grossmarginAmount: values.GrossMargin,
          },
        });
        if (response && response.data) {
          toast.success(response.data.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      } catch (err) {
        tokenExpired(err, router);
      }
      setLoading(false);

      getDepartments(jwt, userId, orgId);
    } else {
      router.push("/auth/login");
    }
  };

  const updateDepartment = async (values) => {
    const authDetails = JSON.parse(localStorage.getItem("authDetails"));
    if (authDetails) {
      const { jwt, userId, orgId } = authDetails;
      console.log(jwt, userId, orgId);
      setLoading(true);

      try {
        const response = await axios({
          method: "put",
          url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/department`,
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
          data: {
            userId: userId,
            orgId: orgId,
            departmentId: values.departmentId,
            department: values.Department,
            wholesaleCost: values.WholeSaleCost,
            markupMultiplier: values.markupMultiplier,
            grossmarginPercentage: values.GrossMarginPercentage,
            sellingPrice: values.SellingPrice,
            grossmarginAmount: values.GrossMargin,
          },
        });
        if (response && response.data) {
          toast.success(response.data.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      } catch (err) {
        tokenExpired(err, router);
      }
      setLoading(false);

      getDepartments(jwt, userId, orgId);
    } else {
      router.push("/auth/login");
    }
  };

  const handleMultipleDelete = (departmentId) => {
    deleteDepartment(departmentId);

    const authDetails = JSON.parse(localStorage.getItem("authDetails"));
    if (authDetails) {
      const { jwt, userId, orgId } = authDetails;
      getDepartments(jwt, userId, orgId);
    } else {
      router.push("/auth/login");
    }
  };

  React.useEffect(() => {
    const authDetails = JSON.parse(localStorage.getItem("authDetails"));
    if (authDetails) {
      const { jwt, userId, orgId } = authDetails;
      getDepartments(jwt, userId, orgId);
    } else {
      router.push("/auth/login");
    }
  }, []);

  return (
    <>
      <Loader loading={loading} />

      <section className={layout.container}>
        <LeftMenuBar />
        <section className={globalLayout.right_section}>
          <div className={globalLayout.right_section_wrap}>
            <Breadcrumb element={"Department-markup"} />
            <TopContent />
            {departments.length !== 0 && (
              <SearchBarNav
                handleMultipleDelete={handleMultipleDelete}
                selected={selected}
                setSelected={setSelected}
                searchText={searchText}
                setSearchText={setSearchText}
                departments={departments}
                setDepartments={setDepartments}
                addedRow={addedRow}
                setAddedRow={setAddedRow}
                getDepartments={getDepartments}
                addDepartment={addDepartment}
              />
            )}

            {departments.length ? (
              <Listview
                edit={edit}
                setEdit={setEdit}
                updateDepartment={updateDepartment}
                setEditId={setEditId}
                editId={editId}
                selected={selected}
                setSelected={setSelected}
                searchText={searchText}
                setSearchText={setSearchText}
                deleteDepartment={deleteDepartment}
                setDepartments={setDepartments}
                departments={departments}
                addedRow={addedRow}
                addDepartment={addDepartment}
                setAddedRow={setAddedRow}
              />
            ) : (
              <div className={globalLayout.no_table_data}>
                <span>
                  <Image
                    src="/icons/admin.svg"
                    width="116"
                    height="116"
                    alt=""
                  />
                </span>
                <p>
                  You have no department markups yet.
                  <br />
                  Add your first role by clicking a button below
                </p>
                <RightDrawer
                  setSelected={setSelected}
                  departments={departments}
                  setDepartments={setDepartments}
                  getDepartments={getDepartments}
                  addDepartment={addDepartment}
                />
              </div>
            )}
            <FooterNav
              elements={departments.length}
              nextRoute={"/admin/roles"}
            />
          </div>
        </section>
      </section>
    </>
  );
};

export default Index;
