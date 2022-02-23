import * as msal from "@azure/msal-browser";
const msalConfig = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_OUTLOOK_LOGIN_CLIENT_KEY,
    authority: `https://login.microsoftonline.com/common`,
   
  },
};
const msalInstance = new msal.PublicClientApplication(msalConfig);
export { msalInstance };
