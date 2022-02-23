import * as yup from "yup";
import React from "react";
export const validationSchema = yup.object().shape({
  calculatorName: yup.string().trim().required("Select Calculator")
  
});