import { toast } from "react-toastify";
import axios from "axios";
const tokenExpired = (err, router) => {
  if (
    err?.response?.data &&
    err.response?.data?.message ==
      "The authorization Token is Invalid. Please Provide Valid Token."
  ) {
    if (typeof window !== "undefined") {
      toast.error(`The authorization Token is Invalid, Please login again`, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      localStorage.removeItem("authDetails");
      router.push("/auth/login");
    }
    return null;
  } else {
    err?.response?.data
      ? toast.error(err.response?.data?.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        })
      : (toast.error("Some error happened,Please login again", {
          position: toast.POSITION.BOTTOM_RIGHT,
        }),
        localStorage.removeItem("authDetails"),
        router.replace("/auth/login"));
    return null;
  }

  // If we are on server, return null
  return null;
};
export default tokenExpired;
