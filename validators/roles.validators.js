import * as yup from "yup";
import React from "react";
export const validationSchema = yup.object().shape({
  department: yup.string().trim().required("Enter Department"),
  role: yup
    .string()
    .trim()
    .matches(
      /^(?![0-9]+$)(?![_@./#&$+-]+$)[ A-Za-z0-9_@./#&$+-]{2,}$/,
      "Only numbers and special characters not allowed"
    )
    .required("Please enter role")
    .min(2),
  employeeLevel: yup
    .string()
    .trim()
    .required("Enter Employee Level")
    .matches(/^[A-Za-z ]+$/, "Only alphabets allowed"),
  yearlySalary: yup
    .string()
    .matches(/^\d+(,\d+)*$/, "Only numbers allowed")
    // .number()
    // .typeError("Only numbers allowed")
    // .positive("Field must be Positive")
    .required("Field is Required"),
});

export const validate = (roles, setErrors) => {
  const regex = /^[A-Za-z\s]+$/;
  const regexNum = /^[0-9.$]*$/;
  let formIsValid = true;
  let errors = {};
  if (roles.department === "") {
    formIsValid = false;
    errors["department"] = "Enter department";
  } else if (!regex.test(roles.department)) {
    formIsValid = false;
    errors["department"] = "Only alphabets allowed ";
  }
  if (roles.role === "") {
    formIsValid = false;
    errors["role"] = "Please enter role";
  } else if (!regex.test(roles.role)) {
    formIsValid = false;
    errors["role"] = "Only alphabets allowed";
  }
  if (roles.employeeLevel === "") {
    formIsValid = false;
    errors["employeeLevel"] = "Please enter Employee Level";
  } else if (!regex.test(roles.employeeLevel)) {
    formIsValid = false;
    errors["employeeLevel"] = "Only alphabets allowed  ";
  }
  if (roles.yearlySalary === "") {
    formIsValid = false;
    errors["yearlySalary"] = "Please enter Yearly Salary";
  } else if (!regexNum.test(roles.yearlySalary)) {
    formIsValid = false;
    errors["yearlySalary"] = "Only numbers allowed";
  }

  if (roles.hourlySalary === "") {
    formIsValid = false;
    errors["hourlySalary"] = "Please enter Hourly Salary";
  } else if (!regexNum.test(roles.hourlySalary)) {
    formIsValid = false;
    errors["hourlySalary"] = "Only numbers are allowed";
  }

  setErrors(errors);
  return formIsValid;
};
