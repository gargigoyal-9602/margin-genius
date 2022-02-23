import * as yup from "yup";
export const EditvalidationSchema = yup.object().shape({
  packageName: yup
    .string()
    .trim()
    .matches(
      /^(?![0-9]+$)(?![_@./#&$+-]+$)[ A-Za-z0-9_@./#&$+-]{2,}$/,
      "Only numbers and special characters not allowed"
    )
    .required("Please enter Package Name")
    .min(2),
  departmentId: yup
    .string()
    .trim()
    .matches(/^[0-9.$]*$/, "Please enter Department")
    .required("Please enter Department"),
  packageDeliverables: yup.string().trim(),
  overallPrice: yup.string().trim(),
  minRoleLevel: yup.string().trim().required("Field is required"),
});

export const deliverablevalidationSchema = yup.object().shape({
  deliverableId: yup
    .string()
    .trim()
    .matches(/^[0-9.$]*$/, "Please enter Deliverable")
    .required("Please enter Deliverable"),
  price: yup
    .number()
    .typeError("Only numbers allowed")
    .positive("Price must be Positive")
    .required("Please enter Price"),
  phase: yup
    .string()
    .trim()
    .min(5, "Please enter phase")
    .required("Please enter phase"),
  frequency: yup
    .string()
    .trim()
    .min(5, "Please enter frequency")
    .required("Please enter frequency"),
  quantity: yup
    .number()
    .typeError("Only numbers allowed")
    .positive("Quantity must be Positive")
    .required("Please enter Quantity"),
});
