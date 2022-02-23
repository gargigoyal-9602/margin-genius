import * as yup from "yup";
import valid from "card-validator";

const regexNum = /^[0-9.$]*$/;
export const editPaymentValidation = yup.object().shape({
  cardholderName: yup.string().trim().required("Please enter card holder name"),
  cardNumber: yup
    .string()
    .test(
      "test-number",
      "Credit Card number is invalid",
      (value) => valid.number(value).isValid
    )
    .trim()
    .required("Please enter card number"),

  expiryDate: yup
    .string()
    .trim()
    .matches(/^(0[1-9]|1[0-2])\/[0-9]{2}$/i, "MM/YY")
    .required("Please enter expiry date"),
  zipCode: yup
    .string()
    .test(
      "test-number1",
      "zip code is invalid",
      (value) => valid.postalCode(value, { minLength: 5 }).isValid
    )
    .trim()
    .required("Please enter zipcode"),
});
