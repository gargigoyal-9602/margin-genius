import React, { useCallback } from "react";
import globalLayout from "../../../styles/globalLayout.module.scss";
import TopContent from "../../../components/roles/TopContent";
import layout from "../../../styles/layout.module.scss";
import LeftMenuBar from "../../../components/layout/LeftMenuBar";
import Breadcrumb from "../../../components/layout/Breadcrumb";

import Listview from "../../../components/roles/ListView";
import SearchBarNav from "../../../components/roles/SearchBarNav";
import Image from "next/image";
import withAuth from "../../../components/layout/withAuth/index";
import axios from "axios";
import RightDrawer from "../../../components/roles/RightDrawer";
import tokenExpired from "../../../components/layout/withAuth/tokenExpired";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Loader from "../../../components/Loader";
import FooterNav from "../../../components/layout/FooterNav";

const Index = () => {
  const router = useRouter();
  const [roles, setRoles] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const getRols = async () => {
    setLoading(true);
    const authDetails = JSON.parse(localStorage.getItem("authDetails"));
    const { jwt, userId, orgId } = authDetails;
    try {
      const response = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/roles?orgId=${orgId}&userId=${userId}`,
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      });
      setRoles(response.data.data);
    } catch (err) {
      tokenExpired(err, router);
    }
    setLoading(false);
  };
  React.useEffect(() => {
    getRols();
  }, []);

  const deleteRoles = async () => {
    let roleId = selected.toString();
    const authDetails = JSON.parse(localStorage.getItem("authDetails"));
    const { jwt, userId, orgId } = authDetails;
    try {
      setLoading(true);
      const response = await axios({
        method: "delete",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/roles?roleIds=${roleId}&userId=${userId}`,
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      });
      if (response && response.data) {
        toast.success(response.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        getRols();
        const rolesSet = new Set(selected);
        setRoles(
          roles.filter((role) => {
            return !rolesSet.has(role.roleId);
          })
        );
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
  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <>
      <Loader loading={loading} />
      <section className={layout.container}>
        <LeftMenuBar />
        <section className={globalLayout.right_section}>
          <div className={globalLayout.right_section_wrap}>
            <Breadcrumb element={"Roles"} />
            <TopContent />
            {roles.length === 0 ? null : (
              <SearchBarNav
                roles={roles}
                setRoles={setRoles}
                searchText={searchText}
                handleMultipleDelete={handleMultipleDelete}
                handleChange={handleChange}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {roles.length === 0 ? (
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
                  You have no roles yet.
                  <br />
                  Add your first role by clicking a button below
                </p>
                <RightDrawer
                  roles={roles}
                  setRoles={setRoles}
                  setSelected={setSelected}
                />
              </div>
            ) : (
              <Listview
                roles={roles}
                setRoles={setRoles}
                selected={selected}
                setSelected={setSelected}
                searchText={searchText}
                getRols={getRols}
              />
            )}
            <FooterNav
              elements={roles.length}
              prevRoute={"/admin/department-markup"}
              nextRoute={"/admin/deliverables"}
            />
          </div>
        </section>
      </section>
    </>
  );
};

export default withAuth(Index);
