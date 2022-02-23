import * as yup from "yup";
import React from "react";
export const validationSchema = yup.object().shape({
  companyName: yup
    .string()
    // .required("Enter department")
    .matches(
      /^[a-zA-Z]([a-zA-Z0-9]|[- @\.#&!])*$/,
      "Enter Valid Company Name"
    )
  
});

