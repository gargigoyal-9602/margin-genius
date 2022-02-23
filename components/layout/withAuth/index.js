// HOC/withAuth.jsx
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const WithAuth = (WrappedComponent) => {
  return () => {
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const Router = useRouter();
      const authDetails = JSON.parse(localStorage.getItem("authDetails"));
      const accessToken = authDetails && authDetails.jwt;

      // If there is no access token we redirect to "/" page.
      if (!accessToken) {
        Router.replace("/auth/login");
        return null;
      }

      // If this is an accessToken we just render the component that was passed with all its props

      return <WrappedComponent />;
    }

    // If we are on server, return null
    return null;
  };
};

export default WithAuth;
