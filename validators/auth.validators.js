import * as yup from "yup";

//form validations start
const strongPasswordRegex =
  /^(?=.+[0-9A-Z])(?=.+[0-9])(?=.+[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/gm;

//validation for login
export const LoginInitialFormValues = {
  userName: "",
  password: "",
};
export const LoginValidationSchema = yup.object().shape({
  userName: yup
    .string()
    .trim()
    .email("Please enter valid email")
    .required("Please enter email address"),
  password: yup
    .string()
    .trim()
    .matches(
      strongPasswordRegex,
      "Password must be atleast 8 characters long with atleast one uppercase, one lowercase, number and special characters : !@#$%^&*"
    )
    .required("Please enter password"),
});

//validation verify signup
export const SignupInitialFormValues = {
  email: "",
};
export const SignupValidationSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email("Please enter valid email")
    .required("Please enter email address"),
});

// validation for signup
export const validationSchema = yup.object().shape({
  userId: yup
    .string()
    .trim()
    .email("Please enter valid email")
    .required("Please enter email address"),
  CompanyName: yup
    .string()
    .trim()
    .matches(
      /^(?![0-9]+$)(?![_@./#&$+-]+$)[ A-Za-z0-9_@./#&$+-]{2,}$/,
      "Only numbers and special characters not allowed"
    )
    .required("Please enter company name")
    .min(2),
  FName: yup.string().trim().required("Please enter fullname"),
  CountryName: yup.string().trim().required("Please select country"),
  password: yup
    .string()
    .matches(
      strongPasswordRegex,
      "Password must be atleast 8 characters long with atleast one uppercase, one lowercase, number and special characters : !@#$%^&*"
    )
    .required("Please enter password"),
  RePassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password"), null], "Passwords does not match"),
});

//reset password validation
export const ResetPassInitialFormValues = {
  password: "",
  RePassword: "",
};
export const ResetPassValidationSchema = yup.object().shape({
  password: yup
    .string()
    .matches(
      strongPasswordRegex,
      "Password must be atleast 8 characters long with atleast one uppercase, one lowercase, number and special characters : !@#$%^&*"
    )
    .required("Please enter password"),
  RePassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password"), null], "Passwords does not match"),
});
//form validations end
