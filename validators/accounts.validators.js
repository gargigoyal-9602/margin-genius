import * as yup from "yup";

//form validations start
const strongPasswordRegex =
  /^(?=.+[0-9A-Z])(?=.+[0-9])(?=.+[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/gm;
const leapYearPattern =
  /((0[13578]|1[02])[\/.](0[1-9]|[12][0-9]|3[01])[\/.](18|19|20)[0-9]{2})|((0[469]|11)[\/.](0[1-9]|[12][0-9]|30)[\/.](18|19|20)[0-9]{2})|((02)[\/.](0[1-9]|1[0-9]|2[0-8])[\/.](18|19|20)[0-9]{2})|((02)[\/.]29[\/.](((18|19|20)(04|08|[2468][048]|[13579][26]))|2000))/;

// validation for signup
export const validationSchema = yup.object().shape({
  fullName: yup
    .string()
    .trim()
    .matches(/^[A-Za-z@!* ]+$/, "Only alphabets allowed")
    .required("Please enter Full Name"),
  birthday: yup
    .string()
    .trim()
    .nullable()
    .required("Please enter Birthday")
    .matches(
      /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(18|19|20)\d{2}$/,
      "Date should be in MM/DD/YYY"
    )
    .matches(leapYearPattern, "The entered year is not a leap year"),
  country: yup
    .string()
    .required("Please enter country")
    .matches(/^[A-Za-z ]*$/, "Please enter valid country name")
    .min(2),
  email: yup
    .string()
    .trim()
    .email("Please enter valid email")
    .required("Please enter email address"),
  phoneNumber: yup
    .string()
    .nullable()
    .matches(/^[0-9.$]*$/, "Only positive numbers allowed")
    .min(10, "Min 10 digits required")
    .max(12, "Max 10 digits allowed")
    .required("Please enter phone number"),
  userRole: yup.string().trim().required("Please enter user role"),
  title: yup.string().trim().nullable().required("Please enter title"),
  companyName: yup
    .string()
    .trim()
    .matches(
      /^(?![0-9]+$)[a-zA-Z0-9 ]{2,}$/,
      "Only numbers and special characters not allowed"
    )
    .required("Please enter company name")
    .min(2),
  language: yup.string().trim().nullable().required("Please enter language"),
  bio: yup
    .string()
    .trim()
    .nullable()
    .min(10)
    .max(150)
    .required("Please enter bio"),
  oldPassword: yup.string().trim().required("Please enter password"),
  profileLogo: yup.string().trim().required("Please select file"),
});

export const passwordValidation = yup.object().shape({
  oldPassword: yup
    .string()
    .trim()
    .matches(
      strongPasswordRegex,
      "Password must be atleast 8 characters long with atleast one uppercase, one lowercase, number and special characters : !@#$%^&*"
    )
    .required("Please enter password"),
  confirmPassword: yup
    .string()
    .trim()
    .matches(
      strongPasswordRegex,
      "Password must be atleast 8 characters long with atleast one uppercase, one lowercase, number and special characters : !@#$%^&*"
    )
    .required("Please enter password"),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("confirmPassword"), null], "Passwords must match")
    .required("Please enter password"),
});
export const oldPasswordValidate = yup.object().shape({
  oldPassword: yup.string().trim().required("Please enter password"),
});
