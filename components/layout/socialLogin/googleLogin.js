import React from "react";
import { GoogleLogin } from "react-google-login";
import { SocialButton } from "../../formControls.style";
import Image from "next/image";
import layout from "../../../styles/layout.module.scss";

const GoogleLoginApp = ({ router, handleLogin, handleSocialSignUp }) => {
  const route = router.route.split("/")[2];
  const buttonText = route == "login" ? "Log in" : "Sign Up";
  const onSuccess = (res) => {
    console.log(res, "success");
    const loginData = {
      userName: res.profileObj.email,
      password: res.profileObj.googleId,
    };
    const signUpData = {
      email: res.profileObj.email,
      fullName: res.profileObj.email.name,
      country: "",
      companyName: "",
      password: res.profileObj.googleId,
      userRole: "Admin",
      loginType: "Social",
    };
    route == "login"
      ? handleLogin(loginData, "")
      : handleSocialSignUp(signUpData, loginData);
  };
  const onFailure = (res) => {
    console.log(res, "failure");
  };
  return (
    <GoogleLogin
      icon={true}
      clientId={process.env.NEXT_PUBLIC_GOOGLE_LOGIN_CLIENT_KEY}
      render={(renderProps) => (
        <SocialButton
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        >
          <Image
            src="/icons/google-icon.svg"
            height="20"
            width="20"
            layout="fixed"
            alt="google"
          />{" "}
          <span className={layout.ml_5}>{`${buttonText} with Google`}</span>
        </SocialButton>
      )}
      prompt="consent"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={"single_host_origin"}
    />
  );
};
export default GoogleLoginApp;
