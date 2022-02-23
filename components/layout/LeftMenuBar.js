import React, { useEffect, useState } from "react";
import globalLayout from "../../styles/globalLayout.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import tokenExpired from "../layout/withAuth/tokenExpired";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../Loader";

const LeftMenuBar = (props) => {
  const { fullname, profilelogo } = props;
  const [userData, setUserData] = React.useState({
    fullName: "",
    profileLogo: "",
  });

  const getUserAccountInfo = async () => {
    // setLoading(true);
    try {
      const authDetails = JSON.parse(localStorage.getItem("authDetails"));
      const { jwt, userId, orgId } = authDetails;
      const response = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/user?userId=${userId}`,
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      });

      setUserData({
        ...userData,
        fullName: response.data.data.fullName,
        profileLogo: response.data.data.profileLogo,
      });
    } catch (err) {
      tokenExpired(err, router);
    }
    // setLoading(false);
  };
  React.useEffect(() => {
    getUserAccountInfo();
  }, [fullname, profilelogo]);

  const [open, setOpen] = React.useState(true);

  const handleMenuOpen = () => {
    setOpen(true);
  };
  const handleMenuClose = () => {
    setOpen(false);
  };

  const router = useRouter();
  const path = router.pathname.split("/")[2];
  const [userType, setUserType] = useState("");
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState("");
  useEffect(() => {
    const authDetails = JSON.parse(localStorage.getItem("authDetails"));
    setDetails(authDetails);
    const { userType } = authDetails && authDetails;
    setUserType(userType == "Admin");
  }, []);
  const handleLogout = async () => {
    const authDetails = JSON.parse(localStorage.getItem("authDetails"));
    setLoading(true);

    try {
      const response =
        authDetails &&
        (await axios({
          method: "post",
          url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/logout?userId=${
            authDetails && authDetails.userId
          }`,
          headers: {
            Authorization: `Bearer ${authDetails.jwt}`,
          },
        }));
      if (response.data) {
        response &&
          toast.success(response?.data?.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        localStorage.removeItem("authDetails");
        setLoading(false);
        router.replace("/auth/login");
      }
    } catch (err) {
      tokenExpired(err, router);
      setLoading(false);
    }
  };
  return (
    <>
      <Loader loading={loading} />
      <section
        className={`${globalLayout.left_section} ${
          !open && globalLayout.closed
        }`}
      >
        <div
          className={`${globalLayout.sidebar} ${!open && globalLayout.closed}`}
        >
          <div className={globalLayout.logo_sec}>
            {open ? (
              <Image
                src="/mg-logo.svg"
                height="30"
                width="193"
                layout="fixed"
                alt=""
              />
            ) : (
              <Image
                src="/mg-logo-icon.svg"
                height="30"
                width="30"
                layout="fixed"
                alt=""
              />
            )}
          </div>
          <nav className={globalLayout.left_nav}>
            <ul>
              <li className={`${path == "dashboard" && globalLayout.active}`}>
                <Link href="/admin/dashboard" className={globalLayout.nav_link}>
                  <a>
                    <span className={globalLayout.icon}>
                      <Image
                        src={`${
                          path == "dashboard"
                            ? "/icons/dashboard-on.svg"
                            : "/icons/dashboard.svg"
                        }`}
                        height="22"
                        width="22"
                        alt="Dashboard"
                        title="Dashboard"
                      />
                    </span>
                    <span className={globalLayout.nav_item}>DASHBOARD</span>
                  </a>
                </Link>
              </li>
              {userType && (
                <>
                  <li
                    className={`${
                      path == "department-markup" && globalLayout.active
                    }`}
                  >
                    <Link
                      href="/admin/department-markup"
                      className={globalLayout.nav_link}
                    >
                      <a>
                        <span className={globalLayout.icon}>
                          <Image
                            src={`${
                              path == "department-markup"
                                ? "/icons/markup-on.svg"
                                : "/icons/markup.svg"
                            }`}
                            height="22"
                            width="22"
                            alt="Department markup"
                            title="Department markup"
                          />
                        </span>
                        <span className={globalLayout.nav_item}>
                          Department Markup
                        </span>
                      </a>
                    </Link>
                  </li>
                  <li className={`${path == "roles" && globalLayout.active}`}>
                    <Link href="/admin/roles" className={globalLayout.nav_link}>
                      <a>
                        <span className={globalLayout.icon}>
                          <Image
                            src={`${
                              path == "roles"
                                ? "/icons/dolloar-on.svg"
                                : "/icons/dolloar.svg"
                            }`}
                            height="22"
                            width="22"
                            alt="Roles"
                            title="Roles"
                          />
                        </span>
                        <span className={globalLayout.nav_item}>ROLES</span>
                      </a>
                    </Link>
                  </li>
                  <li
                    className={`${
                      path == "deliverables" && globalLayout.active
                    }`}
                  >
                    <Link
                      href="/admin/deliverables"
                      className={globalLayout.nav_link}
                    >
                      <a>
                        <span className={globalLayout.icon}>
                          <Image
                            src={`${
                              path == "deliverables"
                                ? "/icons/deliverables-on.svg"
                                : "/icons/deliverables.svg"
                            }`}
                            height="22"
                            width="22"
                            alt="Deliverables"
                            title="Deliverables"
                          />
                        </span>
                        <span className={globalLayout.nav_item}>
                          DELIVERABLES
                        </span>
                      </a>
                    </Link>
                  </li>
                  <li
                    className={`${path == "packages" && globalLayout.active}`}
                  >
                    <Link href="/admin/packages">
                      <a>
                        <span className={globalLayout.icon}>
                          <Image
                            src={`${
                              path == "packages"
                                ? "/icons/packages-on.svg"
                                : "/icons/packages.svg"
                            }`}
                            height="22"
                            width="22"
                            alt="Packages"
                            title="Packages"
                          />
                        </span>
                        <span className={globalLayout.nav_item}>PACKAGES</span>
                      </a>
                    </Link>
                  </li>
                  <li
                    className={`${
                      path == "calculators" && globalLayout.active
                    }`}
                  >
                    <Link href="/admin/calculators">
                      <a>
                        <span className={globalLayout.icon}>
                          <Image
                            src={`${
                              path == "calculators"
                                ? "/icons/calculators-on.svg"
                                : "/icons/calculators.svg"
                            }`}
                            height="22"
                            width="22"
                            alt="Calculators"
                            title="Calculators"
                          />
                        </span>
                        <span className={globalLayout.nav_item}>
                          CALCULATORS
                        </span>
                      </a>
                    </Link>
                  </li>
                </>
              )}
              <li
                className={`${
                  path == "proposal-contract" && globalLayout.active
                }`}
              >
                <Link
                  href="/admin/proposal-contract"
                  className={globalLayout.nav_link}
                >
                  <a>
                    <span className={globalLayout.icon}>
                      <Image
                        src={`${
                          path == "proposal-contract"
                            ? "/icons/proposal-on.svg"
                            : "/icons/proposal.svg"
                        }`}
                        height="22"
                        width="22"
                        alt="Proposal/Contract"
                        title="Proposal/Contract"
                      />
                    </span>
                    <span className={globalLayout.nav_item}>
                      PROPOSAL/CONTRACT
                    </span>
                  </a>
                </Link>
              </li>
              {userType && (
                <li className={`${path == "users" && globalLayout.active}`}>
                  <Link href="/admin/users" className={globalLayout.nav_link}>
                    <a>
                      <span className={globalLayout.icon}>
                        <Image
                          src={`${
                            path == "users"
                              ? "/icons/users-on.svg"
                              : "/icons/users.svg"
                          }`}
                          height="22"
                          width="22"
                          alt="Users"
                          title="Users"
                        />
                      </span>
                      <span className={globalLayout.nav_item}>USERS</span>
                    </a>
                  </Link>
                </li>
              )}

              <li className={`${path == "deals" && globalLayout.active}`}>
                <Link href="/admin/deals" className={globalLayout.nav_link}>
                  <a>
                    <span className={globalLayout.icon}>
                      <Image
                        src={`${
                          path == "deals"
                            ? "/icons/deals-on.svg"
                            : "/icons/deals.svg"
                        }`}
                        height="22"
                        width="22"
                        alt="Deals"
                        title="Deals"
                      />
                    </span>
                    <span className={globalLayout.nav_item}>DEALS</span>
                  </a>
                </Link>
              </li>
              {userType && (
                <li>
                  <Link href="#" className={globalLayout.nav_link}>
                    <a>
                      <span className={globalLayout.icon}>
                        <Image
                          src={`${
                            path == "integrations"
                              ? "/icons/integrations-on.svg"
                              : "/icons/integrations.svg"
                          }`}
                          height="22"
                          width="22"
                          alt="Integrations"
                          title="Integrations"
                        />
                      </span>
                      <span className={globalLayout.nav_item}>
                        INTEGRATIONS
                      </span>
                    </a>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
          <div className={globalLayout.bottom_links}>
            <ul className={globalLayout.imgsidemenu}>
              <li>
                <Link href="#" className={globalLayout.nav_link}>
                  <a>
                    <span className={globalLayout.icon}>
                      <Image
                        src="/icons/notifications.svg"
                        height="22"
                        width="22"
                        alt="Notifications"
                        title="Notifications"
                      />
                    </span>
                    <span className={globalLayout.nav_item}>NOTIFICATIONS</span>
                  </a>
                </Link>
              </li>
              <li
                className={globalLayout.johngolt}
                className={`${
                  path == "account-settings" && globalLayout.active
                }`}
                // onClick={() => {
                //   handleLogout();
                // }}
              >
                <Link
                  href="/admin/account-settings"
                  className={globalLayout.nav_link}
                >
                  <a>
                    <span className={globalLayout.profile_img}>
                      <Image
                        src={
                          userData.profileLogo === null ||
                          userData.profileLogo === ""
                            ? "/icons/user-avatar.svg"
                            : userData.profileLogo
                        }
                        height="48"
                        width="48"
                        alt="User Profile"
                        title="User Profile"
                      />
                    </span>
                    <span className={globalLayout.nav_item}>
                      {!userData.fullName &&
                      details &&
                      details.loginType == "Social"
                        ? "Full Name"
                        : userData.fullName}
                    </span>
                  </a>
                </Link>
              </li>
              <li
                className={globalLayout.johngolt}
                // className={`${
                //   path == "account-settings" && globalLayout.active
                // }`}
                onClick={() => {
                  handleLogout();
                }}
              >
                <Link href="#" className={globalLayout.nav_link}>
                  <a>
                    <span className={globalLayout.icon}>
                      <Image
                        src="/icons/logout.svg"
                        height="20"
                        width="20"
                        alt="Logout"
                        title="Logout"
                      />
                    </span>
                    <span className={globalLayout.nav_item}>LOGOUT</span>
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {open ? (
            <div onClick={handleMenuClose} className={globalLayout.toggle_btn}>
              <span>
                {" "}
                <Image
                  src="/icons/toggle-icon-close.svg"
                  height="16"
                  width="16"
                  alt=""
                />{" "}
              </span>
            </div>
          ) : (
            <div onClick={handleMenuOpen} className={globalLayout.toggle_btn}>
              <span>
                {" "}
                <Image
                  src="/icons/toggle-icon.svg"
                  height="16"
                  width="16"
                  alt=""
                />{" "}
              </span>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default LeftMenuBar;
