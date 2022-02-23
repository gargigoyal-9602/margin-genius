import "../styles/globals.css";
import Head from "next/head";
import theme from "../styles/theme";
import { ThemeProvider } from "@mui/material/styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { msalInstance } from "../components/layout/socialLogin/services/msal";
import { MsalProvider } from "@azure/msal-react";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Margin Genius App</title>
        <meta name="description" content="Margin Genius App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MsalProvider instance={msalInstance}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
          <ToastContainer />
        </ThemeProvider>
      </MsalProvider>
    </>
  );
}

export default MyApp;
