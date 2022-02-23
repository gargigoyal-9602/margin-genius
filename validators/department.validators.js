import * as yup from "yup";
import React from "react";
export const validationSchema = yup.object().shape({
  department: yup
    .string()
    .trim()
    .matches(
      /^(?![0-9]+$)(?![_@./#&$+-]+$)[ A-Za-z0-9_@./#&$+-]{2,}$/,
      "Only numbers and special characters not allowed"
    )
    .required("Please enter department")
    .min(2),

  wholesaleCost: yup
  .string().matches(/^\d+(,\d+)*$/,'only numbers allowed')
    // .number()
    // .typeError("Only numbers allowed")
    // .positive("Field must be Positive")
    .required("Field is Required"),
  markupMultiplier: yup
    .number()
    .typeError("Only numbers allowed")
    .positive("field must be Positive")
    .required("Enter markup multiplier")
    .min(0.999, "Min value 1 is required"),
  sellingPrice: yup.string().trim(),
  grossmarginAmount: yup.string().trim(),
});
