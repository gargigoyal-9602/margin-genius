import * as yup from "yup";

//form validations start
const strongPasswordRegex =
  /^(?=.+[0-9A-Z])(?=.+[0-9])(?=.+[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/gm;

// validation for signup
export const validationSchema = yup.object().shape({
  userId: yup
    .string()
    .trim()
    .email("Please enter valid email")
    .required("Please enter email address"),
  fullName: yup.string().trim().required("Please enter Full Name"),
  phoneNumber: yup
    .string()
    .matches(/^[0-9.$]*$/, "Only positive numbers allowed")
    .min(10, "Min 10 digits required")
    .max(12, "Max 10 digits allowed"),
  companyName: yup
    .string()
    .trim()
    .matches(
      /^(?![0-9]+$)(?![_@./#&$+-]+$)[ A-Za-z0-9_@./#&$+-]{2,}$/,
      "Only numbers and special characters not allowed"
    )
    .required("Please enter company name")
    .min(2),
  country: yup
    .string()
    .matches(/^[A-Za-z ]*$/, "Please enter valid country name")
    .min(2),
  bio: yup.string().min(10).max(150),
});
