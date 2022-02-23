import React, { useState } from "react";
import {
  CardElement,
  ElementsConsumer,
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Grid } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import { PaymentElement } from "@stripe/react-stripe-js";
import { Button, TextField } from "@mui/material";
import tokenExpired from "../withAuth/tokenExpired";
import { useRouter } from "next/router";
import axios from "axios";
import layout from "../../../styles/layout.module.scss";
import {
  CardInputWrapper,
  InputText,
  MainButton,
  OutlineButton,
  StripForm,
} from "../../formControls.style";

import Image from "next/image";

const CheckoutForm = (props) => {
  const router = useRouter();
  const {
    elements,
    stripe,
    closePaymentModal,
    getAllPaymentMethods,
    paymentDetails,
    setEditCard,
    allPaymentMethods
  } = props;

  const editPaymentMethod = async (paymentMethod) => {
   
    try {
      const authDetails = JSON.parse(localStorage.getItem("authDetails"));

      const { jwt, userId, orgId } = authDetails;

      const response = await axios({
        method: "put",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/update-payment-method?userId=${userId}`,
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
        data: {
          orgId: orgId,
          type: paymentMethod.card.funding,
          cardholderName: paymentMethod.billing_details.name,
          cardNumber: `*********${paymentMethod.card.last4}`,
          expiryDate: `${paymentMethod.card.exp_month}/${paymentMethod.card.exp_year}`,
          zipCode: paymentMethod.billing_details.address.postal_code,
          updatedBy: orgId,
          paymentMethodId: paymentDetails.paymentMethodId,
        },
      });
      if (response && response.data) {
       

        toast.success(response.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        closePaymentModal();
        getAllPaymentMethods();
      } else {
        toast.error(
          `${
            response.data.errors ? response.data.errors : "error while login"
          }`,
          {
            position: toast.POSITION.BOTTOM_RIGHT,
          }
        );
      }
    } catch (err) {
     
      tokenExpired(err, router);
    }
  };

  const [name, setName] = useState(paymentDetails.cardholderName);
  const [zipCode, setZipCode] = useState(paymentDetails.zipCode);
  const checkUniqueCards = (paymentMethod) => {
    let cards = new Set();
    allPaymentMethods.map((pm) => {
      cards.add(pm.cardNumber.substr(-4));
    });
    if (cards.has(paymentMethod.card.last4)) {
      return false;
    } else {
      return true;
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
   
    if (!stripe || !elements) {
     
      return;
    }

    const number = elements.getElement(CardNumberElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: number,
      billing_details: { name: name, address: { postal_code: zipCode } },
    });

    if (error || name === "" || zipCode === "") {
      toast.error(
        `${
          error
            ? error.message
            : name === ""
            ? "please enter card holder name"
            : zipCode === ""
            ? "please enter zipcode"
            : ""
        }`,
        {
          position: toast.POSITION.BOTTOM_RIGHT,
        }
      );
    } else {
      if (paymentDetails.cardNumber.substr(-4)===paymentMethod.card.last4) {
        
        editPaymentMethod(paymentMethod);
      }
      else if (checkUniqueCards(paymentMethod)) {
        editPaymentMethod(paymentMethod);
      }
      else{
        toast.error("Please Enter Unique Cards", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
      
    }
  };
  const inputStyle = {
    fontSize: "14px",
    fontWeight: "400",
  };
  return (
    <>
     
        <form
          onSubmit={(event) => handleSubmit(event)}
          className="stripe-payment-details"
          style={props.disable ? { pointerEvents: "none" } : {}}>
          <label
            style={{ fontSize: "14.3px", color: "#b2b3b9", fontWeight: 600 }}>
            Card Number
          </label>

          <CardInputWrapper>
            <CardNumberElement
              options={{
                style: {
                  base: inputStyle,
                },
              }}
            />
          </CardInputWrapper>

          <Grid container direction="row" justify="space-between">
            <Grid xs={12} md={12} style={{ display: "flex", flexWrap: "wrap" }}>
              <Grid xs={12} md={8}>
                <label
                  style={{
                    fontSize: "14.3px",
                    color: "#b2b3b9",
                    fontWeight: 600,
                  }}
                >
                  Expiration Date
                </label>
                <CardInputWrapper>
                  <CardExpiryElement
                    options={{
                      style: {
                        base: inputStyle,
                      },
                    }}
                  />
                </CardInputWrapper>
              </Grid>
              <Grid xs={12} md={4} style={{ paddingLeft: "5px" }}>
                <label
                  style={{
                    fontSize: "14.3px",
                    color: "#b2b3b9",
                    fontWeight: 600,
                  }}
                >
                  CVV
                </label>
                <CardInputWrapper>
                  <CardCvcElement
                    options={{
                      style: {
                        base: inputStyle,
                      },
                    }}
                  />
                </CardInputWrapper>
              </Grid>
            </Grid>
          </Grid>
          <div className="form-group" style={{ margin: "20px 0" }}>
            <label
              htmlFor={name}
              className="paymentcardLabel"
              style={{ fontSize: "14.3px", color: "#b2b3b9", fontWeight: 600 }}
            >
              Card Holder Name
            </label>
            <InputText
              type="text"
              className="form-control"
              style={{ marginTop: "5px" }}
              placeholder="Eg: Mike Robert"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label
              htmlFor={name}
              className="paymentcardLabel"
              style={{ fontSize: "14.3px", color: "#b2b3b9", fontWeight: 600 }}
            >
              Zip Code
            </label>
            <InputText
              type="text"
              className="form-control"
              style={{ marginTop: "5px" }}
              placeholder="Enter Zip code"
              value={zipCode}
              onChange={(e) => {
                setZipCode(e.target.value);
              }}
            />
          </div>
          {/* <Button type="submit">Add</Button> */}
          <div className={`${layout.flex_center} ${layout.mt_30}`}>
            <span className={`${layout.mr_10}`} style={{ width: "50%" }}>
              <OutlineButton
                onClick={() => {
                  closePaymentModal();
                  setEditCard(false);
                }}
                variant="text"
                marginbottom="0"
              >
                <Image
                  alt="Icon"
                  width="14"
                  height="14"
                  src="/icons/cancel-icon.svg"
                />
                <span className={layout.ml_10}>Cancel</span>
              </OutlineButton>
            </span>
            <span className={`${layout.ml_10}`} style={{ width: "50%" }}>
              <MainButton type="submit" variant="contained" marginbottom="0">
                <Image
                  alt="Icon"
                  width="16"
                  height="16"
                  src="/icons/save-icon-white.svg"
                />
                <span className={layout.ml_10}>Save Changes</span>
              </MainButton>
            </span>
          </div>
        </form>
      
    </>
  );
};

const InjectedCheckoutForm = (props) => {
  return (
    <ElementsConsumer>
      {({ elements, stripe }) => (
        <CheckoutForm
          elements={elements}
          stripe={stripe}
          closePaymentModal={props.closePaymentModal}
          getAllPaymentMethods={props.getAllPaymentMethods}
          paymentDetails={props.paymentDetails}
          setEditCard={props.setEditCard}
          allPaymentMethods={props.allPaymentMethods}
        />
      )}
    </ElementsConsumer>
  );
};

// const elements = stripe.elements({"pk_test_51IpoIqSAiV0uEP2lmpc1xxY8UHr4kMMpdvqdvr5cQK6n21y6ZaHCOksEAotk53cI46yGTwTXXW6ldC1BgUcmkCoP005aNLW83X", appearance});
const stripePromise = loadStripe(
  "pk_test_51KBGKZSBwh7oUSZEkRziyIeRNRshynlk8a7MPjy17twvbwBgQKC6GmgsA81dHx2eLYKGx8l1ApVuxz9fYC7fnykx00UNEXjJBe"
);
const EditPayments = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <InjectedCheckoutForm
        closePaymentModal={props.closePaymentModal}
        getAllPaymentMethods={props.getAllPaymentMethods}
        paymentDetails={props.paymentDetails}
        setEditCard={props.setEditCard}
        allPaymentMethods={props.allPaymentMethods}
      />
    </Elements>
  );
};

export default EditPayments;
