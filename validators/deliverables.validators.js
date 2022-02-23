import * as yup from "yup";

export const validationSchema = yup.object().shape({
  deliverableName: yup
    .string()
    .trim()
    .matches(
      /^(?![0-9]+$)(?![_@./#&$+-]+$)[ A-Za-z0-9_@./#&$+-]{2,}$/,
      "Only numbers and special characters not allowed"
    )
    .required("Please enter deliverable")
    .min(2),
  departmentId: yup
    .string()
    .trim()
    .matches(/^[0-9.$]*$/, "Please enter Department")
    .required("Please enter Department"),
  roleId: yup
    .string()
    .trim()
    .matches(/^[0-9.$]*$/, "Please enter Role")
    .required("Please enter Role"),
  employeeroleLevel: yup
    .string()
    .trim()
    .min(5, "Please enter employee role level")
    .required("Please enter employee role level"),
  description: yup.string().trim().min(10).max(150),
  vendorName: yup
    .string()
    .trim()
    .matches(
      /^(?![0-9]+$)(?![_@./#&$+-]+$)[ A-Za-z0-9_@./#&$+-]{2,}$/,
      "Only numbers and special characters not allowed"
    )
    .min(2),
  deliveryHours: yup
  .string().matches(/^\d+(,\d+)*$/,'only numbers allowed')
    // .number()
    // .typeError("Only numbers allowed")
    // .positive("Field must be Positive")
    .required("Field is Required"),

  turnaroundTime: yup
    .number()
    .typeError("Only numbers allowed")
    .positive("Field must be Positive")
    .required("Field is Required"),
});

export const EditvalidationSchema = yup.object().shape({
  deliverableName: yup
    .string()
    .trim()
    .matches(
      /^(?![0-9]+$)(?![_@./#&$+-]+$)[ A-Za-z0-9_@./#&$+-]{2,}$/,
      "Only numbers and special characters not allowed"
    )
    .required("Please enter deliverable")
    .min(2),
  departmentId: yup
    .string()
    .trim()
    .matches(/^[0-9.$]*$/, "Please enter Department")
    .required("Please enter Department"),
  roleId: yup
    .string()
    .trim()
    .matches(/^[0-9.$]*$/, "Please enter Role")
    .required("Please enter Role"),
  employeeroleLevel: yup
    .string()
    .trim()
    .min(5, "Please enter employee role level")
    .required("Please enter employee role level"),
  vendorName: yup
    .string()
    .trim()
    .matches(
      /^(?![0-9]+$)(?![_@./#&$+-]+$)[ A-Za-z0-9_@./#&$+-]{2,}$/,
      "Only numbers and special characters not allowed"
    )
    .min(2),
});
