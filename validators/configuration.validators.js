import * as yup from "yup";
import React from "react";
import { allCalculators } from "../pages/admin/calculators";
export const validationForCalculatorName=()=>{
  React.useEffect(()=>{
    console.log(allCalculators.length)
  },[])
  return (
    <div></div>
  )
}

export const validationSchema = yup.object().shape({
    calculatorName: yup
    .string()
    .required("Enter Calculator Name")
    .matches(
      /^(?![0-9]+$)[a-zA-Z0-9-() ]+([\s](?![0-9]+$)[a-zA-Z0-9 ]+)*$/,
      "Only alphabets allowed"
    ),
    department: yup
    .string()
    .required("field is required"),
    category: yup
    .string()
    .required("select category"),
    // employeeLevel: yup
    // .string()
    // .required("select employee level"),
    // customColor: yup
    // .string()
    // .matches("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$","enter valid color")
    // .required("select color"),
    calculatorColor: yup
    .string()
    .matches("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$","enter valid color")
    .required("select calculator color"),
    setupfeeConfig: yup
    .string()
    .required("select setup fee configuration"),
    discountfeeConfig: yup
    .string()
    .required("select discount fee configuration").nullable(),
    contractlengthConfig: yup
    .array()
    .min(1,"select contract length"),
    negotiationMargin: yup
    .array()
    .min(1,"select negotiation margin"),
    approvers: yup
    .array()
    .min(1,"select approvers"),
    salesMan: yup
    .array()
    .min(1,"select Salesman"),
    packages: yup
    .array()
    .min(1,"select packages"),
    deliverables: yup
    .array()
    .min(1,"select Deliverables"),
});
