import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import globalLayout from "../../../styles/globalLayout.module.scss";
import TopContent from "../../../components/user/TopContent";
import layout from "../../../styles/layout.module.scss";
import LeftMenuBar from "../../../components/layout/LeftMenuBar";
import Breadcrumb from "../../../components/layout/Breadcrumb";
import Listview from "../../../components/user/ListView";
import SearchBarNav from "../../../components/user/SearchBarNav";
import {
  MainButton,
  InputText,
  TextLink,
} from "../../../components/formControls.style";
import Image from "next/image";
import withAuth from "../../../components/layout/withAuth/index";
import tokenExpired from "../../../components/layout/withAuth/tokenExpired";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  const authDetails = JSON.parse(localStorage.getItem("authDetails"));
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const handleDeleteAllModal = () => setOpenDelete(!openDelete);
  const [selectedRow, setselectedRow] = React.useState(null);
  const [selectedMultipleRow, setselectedMultipleRow] = React.useState(null);
  const [search, setSearch] = React.useState("");
  const [appliedfilter, setAppliedFilter] = React.useState({
    admin: false,
    user: false,
  });

  const [users, setUsers] = useState(null);
  const [count, setCount] = React.useState(null);
  const [disableDelete, setdisableDelete] = React.useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  //handle invite
  const handleInvite = () => {
    setOpen(!open);
  };
  //updating user
  const updatingUsers = async (searchValue, filterValue) => {
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
        setCount(response.data?.data.count);
        setMessage(response.data?.message);
      }
    } catch (err) {
      tokenExpired(err, router);
    }
    setLoading(false);
  };

  useEffect(() => {
    updatingUsers();
  }, []);

  const handlesingleDeleteUsers = (row) => {
    setselectedRow(row.userId);
    handleDeleteAllModal();
  };
  const handleMultipleDeleteUsers = (rows) => {
    setselectedMultipleRow(rows);
    rows.length > 0 ? setdisableDelete(false) : setdisableDelete(true);
  };

  //handle delete user
  const handledeleteuser = async () => {
    const deleteUserId = selectedRow && selectedRow.toString();
    const deleteMultipleUsersId =
      selectedMultipleRow && selectedMultipleRow.toString();

    const id = deleteUserId ? deleteUserId : deleteMultipleUsersId;
    setLoading(true);

    try {
      const response = await axios({
        method: "delete",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/users?userIds=${id}&userId=${authDetails.userId}`,
        headers: { Authorization: `Bearer ${authDetails.jwt}` },
      });
      if (response && response.data) {
        toast.success(response.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        updatingUsers();
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
  return (
    <>
      <Loader loading={loading} />
      <section className={layout.container}>
        <LeftMenuBar />
        <section className={globalLayout.right_section}>
          <div className={globalLayout.right_section_wrap}>
            <Breadcrumb element={"Users"} />
            <TopContent count={count && count} />

            <SearchBarNav
              userLength={users && users.length}
              users={users}
              open={open}
              search={search}
              setSearch={setSearch}
              appliedfilter={appliedfilter && appliedfilter}
              setAppliedFilter={setAppliedFilter}
              handleInvite={handleInvite}
              updatingUsers={updatingUsers}
              openDelete={openDelete}
              handleDeleteAllModal={handleDeleteAllModal}
              handlesingleDeleteUsers={handlesingleDeleteUsers}
              handledeleteuser={handledeleteuser}
              disableDelete={disableDelete}
              message={message}
            />
            {users && users.length == 0 && message != "No Users Found." && (
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
                <MainButton
                  aligncenter="true"
                  fixwidth="auto"
                  onClick={() => handleInvite()}
                >
                  <span className={globalLayout.btn_icon}>
                    <Image
                      src="/icons/plus-icon.svg"
                      width="16"
                      height="16"
                      alt=""
                    />
                  </span>
                  Add New Users
                </MainButton>
              </div>
            )}
            {users && (users.length > 0 || message == "No Users Found.") && (
              <Listview
                users={users}
                updatingUsers={updatingUsers}
                handledeleteuser={handledeleteuser}
                handlesingleDeleteUsers={handlesingleDeleteUsers}
                handleMultipleDeleteUsers={handleMultipleDeleteUsers}
              />
            )}
          </div>
        </section>
      </section>
    </>
  );
};

export default withAuth(Index);
