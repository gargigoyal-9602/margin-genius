import * as yup from "yup";
import React from "react";
export const validationSchema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .matches(
      /^(?![0-9]+$)(?![_@./#&$+-]+$)[ A-Za-z0-9_@./#&$+-]{2,}$/,
      "Only numbers and special characters not allowed"
    )
    .required("Please Enter Title")
    .min(2),
  calculatorIds: yup
    .array()
    .min(1, "Please select")
    .required("Please Provide Calculator"),
  fileFormat: yup
    .array()
    .min(1, "Please select")
    .required("Please Provide File Format"),
  // pcSettings: yup.object().required("Field is required"),
});
