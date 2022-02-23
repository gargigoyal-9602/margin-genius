import React from "react";
import loader from "../styles/loader.module.scss";
import CircularProgress from "@mui/material/CircularProgress";

export default function Loader(props) {
  return props.loading ? (
    <div className={loader.root}>
      <div className={loader.circularContainer}>
        <CircularProgress size="5rem" color="primary" />
      </div>
    </div>
  ) : (
    ""
  );
}
