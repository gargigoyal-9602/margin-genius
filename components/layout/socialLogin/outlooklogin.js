import React from "react";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { SocialButton } from "../../formControls.style";
import Image from "next/image";
import layout from "../../../styles/layout.module.scss";

function OutlookLoginNew({ router, handleLogin, handleSocialSignUp }) {
  const route = router.route.split("/")[2];
  const buttonText = route == "login" ? "Log in" : "Sign Up";
  const { instance } = useMsal();
  const handleOutLook = () => {
    instance
      .loginPopup({prompt:'select_account'})
      .then((data) => {
        console.log(data.account.username, data.account.localAccountId);
        const loginData = {
          userName: data.account.username,
          password: data.account.localAccountId,
        };
        const signUpData = {
          email: data.account.username,
          fullName: data.account.name,
          country: "",
          companyName: "",
          password: data.account.localAccountId,
          userRole: "Admin",
          loginType: "Social",
        };
        route == "login"
          ? handleLogin(loginData,"")
          : handleSocialSignUp(signUpData,loginData);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <SocialButton onClick={handleOutLook}>
      <Image
        src="/icons/outlook.svg"
        height="20"
        width="20"
        layout="fixed"
        alt="outlook"
      />{" "}
      <span className={layout.ml_5}>{`${buttonText} with Outlook`}</span>
    </SocialButton>
  );
}

export default OutlookLoginNew;
