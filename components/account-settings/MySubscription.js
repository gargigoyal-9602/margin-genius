import * as React from "react";
import layout from "../../styles/layout.module.scss";
import InputLabel from "@mui/material/InputLabel";
import tokenExpired from "../layout/withAuth/tokenExpired";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";
import Loader from "../Loader";
import {
  ErrorMsg,
  MainButton,
  OutlineButton,
  InputText,
  PaymentCardLabel,
} from "../formControls.style";
import Image from "next/image";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import { MySubscriptionBox } from "../../components/account-settings/AccountSetting.style";
import AddPaymentModal from "../layout/Payments/AddPaymentModal";
// import { Backdrop, Fade, FormControlLabel, Modal, Radio } from "@mui/material";
import { ModalBox } from "../tableControls.style";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const MySubscription = () => {
  const [editCard, setEditCard] = React.useState(false);
  const [allPaymentMethods, setAllPaymentMethods] = React.useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState("");
  const [paymentMethod, setPaymentMethod] = React.useState({
    orgId: "",
    type: "",
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    zipCode: "",
    updatedBy: "",
  });
  const [cardBrand, setCardBrand] = React.useState("");

  const [loading, setLoading] = React.useState(false);
  const [subscriptions, setSubscriptions] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openPaymentModal, setOpenPaymentModal] = React.useState(false);
  const handlePaymentModal = () => setOpenPaymentModal(true);
  const closePaymentModal = () => setOpenPaymentModal(false);

  const [SaveOpen, setSaveOpen] = React.useState(false);
  const handleSaveChangeOpen = () => setSaveOpen(true);
  const handleSaveClose = () => setSaveOpen(false);

  const router = useRouter();
  const getAllPaymentMethods = async () => {
    try {
      const authDetails = JSON.parse(localStorage.getItem("authDetails"));

      const { jwt, userId, orgId } = authDetails;

      const response = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/all-payment-methods?userId=${userId}&orgId=${orgId}`,
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      });
      if (response && response.data) {
        setAllPaymentMethods(response.data.data["All Payment Methods"]);
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
      console.log(err);
      tokenExpired(err, router);
    }
  };
  const getAllSubscriptions = async () => {
    setLoading(true);
    const authDetails = JSON.parse(localStorage.getItem("authDetails"));
    if (authDetails) {
      const { jwt, userId, orgId } = authDetails;
      setLoading(true);

      try {
        const response = await axios({
          method: "get",
          url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/all-subscriptions?userId=${userId}&orgId=${orgId}`,
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        });

        setSubscriptions(response.data.data.subscriptions);
      } catch (err) {
        tokenExpired(err, router);
      }
      setLoading(false);
    } else {
      router.push("/auth/login");
    }
  };
  const changeSubscriptionPlan = async (subscriptionId) => {
    handleOpen();
    // try {

    //   const authDetails = JSON.parse(localStorage.getItem("authDetails"));

    //   const { jwt, userId, orgId } = authDetails;

    //   const response = await axios({
    //     method: "put",
    //     url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/changeSubscription?userId=${userId}&orgId=${orgId}&subscriptionId=${subscriptionId}&billingType='monthly'`,
    //     headers: {
    //       Authorization: `Bearer ${jwt}`,
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   if (response && response.data) {
    //     toast.success(response.data.message, {
    //       position: toast.POSITION.BOTTOM_RIGHT,
    //     });
    //     getAllSubscriptions();

    //   } else {
    //     toast.error(
    //       `${
    //         response.data.errors ? response.data.errors : "error while login"
    //       }`,
    //       {
    //         position: toast.POSITION.BOTTOM_RIGHT,
    //       }
    //     );
    //   }
    // } catch (err) {
    //   console.log(err);
    //   tokenExpired(err, router);
    // }
  };
  const deletePaymentMethod = async (paymentMethod) => {
    try {
      const authDetails = JSON.parse(localStorage.getItem("authDetails"));

      const { jwt, userId, orgId } = authDetails;

      const response = await axios({
        method: "delete",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/delete-payment-method?userId=${userId}&paymentMethodId=${paymentMethod.paymentMethodId}`,
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      });

      if (response && response.data) {
        toast.success(response.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
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
      // console.log(err);
      tokenExpired(err, router);
    }
  };
  useEffect(() => {
    getAllSubscriptions();
    getAllPaymentMethods();
  }, []);

  return (
    <>
      <Loader loading={loading} />
      <MySubscriptionBox>
        <h3>Choose the right plan for you</h3>
        {subscriptions && (
          <div className={layout.flex_between}>
            <div className="subcription_box default">
              <p className="plan_size">{subscriptions[0].subscriptionName}</p>
              <Image
                alt="Icon"
                width="127"
                height="110"
                src="/subscriptio-img.svg"
              />
              <div className="pkg_list">
                <div
                  className={`${layout.flex_between_center} ${layout.mb_20}`}
                >
                  <span>Sales Reps</span>
                  <span>{subscriptions[0].salesReps}</span>
                </div>
                <div
                  className={`${layout.flex_between_center} ${layout.mb_20}`}
                >
                  <span>Admins</span>
                  <span>{subscriptions[0].admins}</span>
                </div>
                <div
                  className={`${layout.flex_between_center} ${layout.mb_20}`}
                >
                  <span>Packages</span>
                  <span>
                    {subscriptions[0].packages === "infinite" ? (
                      <Image
                        alt="Icon"
                        width="16"
                        height="8"
                        src="/icons/infinite-icon.svg"
                      />
                    ) : (
                      subscriptions[0].packages
                    )}
                  </span>
                </div>
                <div
                  className={`${layout.flex_between_center} ${layout.mb_20}`}
                >
                  <span>Calculators</span>
                  <span>
                    {subscriptions[0].calculators === "infinite" ? (
                      <Image
                        alt="Icon"
                        width="16"
                        height="8"
                        src="/icons/infinite-icon.svg"
                      />
                    ) : (
                      subscriptions[0].calculators
                    )}
                  </span>
                </div>
              </div>
              <div className={`${layout.mt_20}`}>
                <div className={`${layout.mb_10}`}>
                  <span className="canceled">$ 1790</span>
                </div>
                <div className={`${layout.mb_10}`}>
                  <div className="suggested">
                    {subscriptions[0].yearlyAmount}{" "}
                  </div>
                </div>
                <div className={`${layout.mb_10}`}>
                  <span>$ 1790 / Year</span>
                </div>
              </div>
              <div className={`${layout.mt_20}`}>
                <MainButton
                  size="small"
                  fixwidth="auto"
                  variant="contained"
                  marginbottom="0"
                  disabled
                  style={{
                    border: "2px solid #c1c1c1",
                    marginTop: "45px",
                  }}
                >
                  <span>Your Current Plan</span>
                </MainButton>
              </div>
            </div>
            <div className="subcription_box">
              <p className="plan_size">{subscriptions[1].subscriptionName}</p>
              <Image
                alt="Icon"
                width="127"
                height="110"
                src="/subscriptio-img.svg"
              />
              <div className="pkg_list">
                <div
                  className={`${layout.flex_between_center} ${layout.mb_20}`}
                >
                  <span>Sales Reps</span>
                  <span>{subscriptions[1].salesReps}</span>
                </div>
                <div
                  className={`${layout.flex_between_center} ${layout.mb_20}`}
                >
                  <span>Admins</span>
                  <span>{subscriptions[1].admins}</span>
                </div>
                <div
                  className={`${layout.flex_between_center} ${layout.mb_20}`}
                >
                  <span>Packages</span>
                  <span>
                    {subscriptions[1].packages === "infinite" ? (
                      <Image
                        alt="Icon"
                        width="16"
                        height="8"
                        src="/icons/infinite-icon.svg"
                      />
                    ) : (
                      subscriptions[1].packages
                    )}
                  </span>
                </div>
                <div
                  className={`${layout.flex_between_center} ${layout.mb_20}`}
                >
                  <span>Calculators</span>
                  <span>
                    {subscriptions[1].calculators === "infinite" ? (
                      <Image
                        alt="Icon"
                        width="16"
                        height="8"
                        src="/icons/infinite-icon.svg"
                      />
                    ) : (
                      subscriptions[1].calculators
                    )}
                  </span>
                </div>
              </div>
              <div className={`${layout.mt_20}`}>
                <div className={`${layout.mb_10}`}>
                  <span className="canceled">$ 145 / month</span>
                </div>
                <div className={`${layout.mb_10}`}>
                  <div className="suggested">
                    <span>
                      {subscriptions[1].yearlyAmount.slice(
                        0,
                        subscriptions[1].yearlyAmount.length - 5
                      )}
                    </span>{" "}
                    / year
                  </div>
                </div>
                <div className={`${layout.mb_10}`}>
                  <span> {subscriptions[1].monthlyAmount}</span>
                </div>
                <div className={`${layout.mb_10}`}>
                  <span>{subscriptions[1].perUserAmount}</span>
                </div>
              </div>
              <div className={`${layout.mt_20}`}>
                {subscriptions[1].subscribed ? (
                  <MainButton
                    size="small"
                    fixwidth="auto"
                    variant="contained"
                    marginbottom="0"
                    disabled
                  >
                    <span>Your Current Plan</span>
                  </MainButton>
                ) : (
                  <OutlineButton
                    onClick={() => {
                      changeSubscriptionPlan(subscriptions[1].subscriptionId);
                      // handleOpen()
                    }}
                    size="small"
                    fixwidth="auto"
                    variant="contained"
                    marginbottom="0"
                  >
                    <span>Change Plan</span>
                  </OutlineButton>
                )}
              </div>
            </div>
            <div className="subcription_box suggested">
              <p className="plan_size">{subscriptions[2].subscriptionName}</p>
              <Image
                alt="Icon"
                width="127"
                height="110"
                src="/subscriptio-img.svg"
              />
              <div className="pkg_list">
                <div
                  className={`${layout.flex_between_center} ${layout.mb_20}`}
                >
                  <span>Sales Reps</span>
                  <span>{subscriptions[2].salesReps}</span>
                </div>
                <div
                  className={`${layout.flex_between_center} ${layout.mb_20}`}
                >
                  <span>Admins</span>
                  <span>{subscriptions[2].admins}</span>
                </div>
                <div
                  className={`${layout.flex_between_center} ${layout.mb_20}`}
                >
                  <span>Packages</span>
                  <span>
                    {subscriptions[2].packages === "infinite" ? (
                      <Image
                        alt="Icon"
                        width="16"
                        height="8"
                        src="/icons/infinite-icon.svg"
                      />
                    ) : (
                      subscriptions[2].packages
                    )}
                  </span>
                </div>
                <div
                  className={`${layout.flex_between_center} ${layout.mb_20}`}
                >
                  <span>Calculators</span>
                  <span>
                    {subscriptions[2].calculators === "infinite" ? (
                      <Image
                        alt="Icon"
                        width="16"
                        height="8"
                        src="/icons/infinite-icon.svg"
                      />
                    ) : (
                      subscriptions[2].calculators
                    )}
                  </span>
                </div>
              </div>
              <div className={`${layout.mt_20}`}>
                <div className={`${layout.mb_10}`}>
                  <span className="canceled">$ 360 / month</span>
                </div>
                <div className={`${layout.mb_10}`}>
                  <div className="suggested">
                    <span>
                      {subscriptions[2].yearlyAmount.slice(
                        0,
                        subscriptions[2].yearlyAmount.length - 5
                      )}
                    </span>{" "}
                    / year
                  </div>
                </div>
                <div className={`${layout.mb_10}`}>
                  <span>{subscriptions[2].monthlyAmount}</span>
                </div>
                <div className={`${layout.mb_10}`}>
                  <span>{subscriptions[2].perUserAmount}</span>
                </div>
              </div>
              <div className={`${layout.mt_20}`}>
                {subscriptions[2].subscribed ? (
                  <MainButton
                    size="small"
                    fixwidth="auto"
                    variant="contained"
                    marginbottom="0"
                    disabled
                  >
                    <span>Your Current Plan</span>
                  </MainButton>
                ) : (
                  <OutlineButton
                    onClick={() =>
                      changeSubscriptionPlan(subscriptions[2].subscriptionId)
                    }
                    size="small"
                    fixwidth="auto"
                    variant="contained"
                    marginbottom="0"
                  >
                    <span>Change Plan</span>
                  </OutlineButton>
                )}
              </div>
            </div>
            <div className="subcription_box">
              <p className="plan_size">{subscriptions[3].subscriptionName}</p>
              <Image
                alt="Icon"
                width="127"
                height="110"
                src="/subscriptio-img.svg"
              />
              <div className="pkg_list">
                <div
                  className={`${layout.flex_between_center} ${layout.mb_20}`}
                >
                  <span>Sales Reps</span>
                  <span>{subscriptions[3].salesReps}</span>
                </div>
                <div
                  className={`${layout.flex_between_center} ${layout.mb_20}`}
                >
                  <span>Admins</span>
                  <span>{subscriptions[3].admins}</span>
                </div>
                <div
                  className={`${layout.flex_between_center} ${layout.mb_20}`}
                >
                  <span>Packages</span>
                  <span>
                    {subscriptions[3].packages === "infinite" ? (
                      <Image
                        alt="Icon"
                        width="16"
                        height="8"
                        src="/icons/infinite-icon.svg"
                      />
                    ) : (
                      subscriptions[3].packages
                    )}
                  </span>
                </div>
                <div
                  className={`${layout.flex_between_center} ${layout.mb_20}`}
                >
                  <span>Calculators</span>
                  <span>
                    {subscriptions[3].calculators === "infinite" ? (
                      <Image
                        alt="Icon"
                        width="16"
                        height="8"
                        src="/icons/infinite-icon.svg"
                      />
                    ) : (
                      subscriptions[3].calculators
                    )}
                  </span>
                </div>
              </div>
              <div className={`${layout.mt_20}`}>
                <div className={`${layout.mb_10}`}>
                  <span className="canceled">$ 570 / month</span>
                </div>
                <div className={`${layout.mb_10}`}>
                  <div className="suggested">
                    <span>
                      {subscriptions[3].yearlyAmount.slice(
                        0,
                        subscriptions[3].yearlyAmount.length - 5
                      )}
                    </span>{" "}
                    / year
                  </div>
                </div>
                <div className={`${layout.mb_10}`}>
                  <span>{subscriptions[3].monthlyAmount}</span>
                </div>
                <div className={`${layout.mb_10}`}>
                  <span>{subscriptions[3].perUserAmount}</span>
                </div>
              </div>
              <div className={`${layout.mt_20}`}>
                {subscriptions[3].subscribed ? (
                  <MainButton
                    size="small"
                    fixwidth="auto"
                    variant="contained"
                    marginbottom="0"
                    disabled
                  >
                    <span>Your Current Plan</span>
                  </MainButton>
                ) : (
                  <OutlineButton
                    onClick={() =>
                      changeSubscriptionPlan(subscriptions[3].subscriptionId)
                    }
                    size="small"
                    fixwidth="auto"
                    variant="contained"
                    marginbottom="0"
                  >
                    <span>Change Plan</span>
                  </OutlineButton>
                )}
              </div>
            </div>
            <div className="subcription_box">
              <p className="plan_size">Enterprise</p>
              <Image
                alt="Icon"
                width="127"
                height="110"
                src="/subscriptio-img.svg"
              />
              <div className="pkg_list" style={{ minHeight: "160px" }}></div>
              <div className={`${layout.mt_20}`}>
                <div className={`${layout.mb_10}`}>
                  <div className="suggested">Custom</div>
                  <span>pricing</span>
                </div>
              </div>
              <div style={{ marginTop: "78px" }}>
                <OutlineButton
                  size="small"
                  fixwidth="auto"
                  variant="contained"
                  marginbottom="0"
                >
                  <span>Contact Us</span>
                </OutlineButton>
              </div>
            </div>
          </div>
        )}
      </MySubscriptionBox>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <ModalBox style={{ minWidth: "480px" }}>
            <span className={layout.model_close} onClick={handleClose}>
              <Image src="/icons/cancel.svg" height="12" width="12" alt="" />
            </span>
            {allPaymentMethods.length === 0 ? (
              <div className={layout.mb_20}>
                <h3>Payment Information</h3>
                <div style={{ textAlign: "center", margin: "20px 0 0 0" }}>
                  <Image
                    src="/icons/no-payment.svg"
                    height="105"
                    width="146"
                    alt=""
                  />
                  <p style={{ padding: "30px 0 10px 0" }}>
                    You have no payment methods added. <br /> Add the first one!
                  </p>
                  <OutlineButton
                    onClick={() => {
                      handlePaymentModal();
                      handleClose();
                    }}
                    style={{
                      border: "1px solid #8E9595",
                      padding: "10px",
                      cursor: "pointer",
                      borderRadius: "4px",
                      width: "250px",
                      margin: "0 auto",
                      fontSize: "12px",
                    }}
                  >
                    Add Payment Method
                  </OutlineButton>
                </div>
              </div>
            ) : (
              <div className={layout.mb_20}>
                <h3>Payment Information</h3>
                <div style={{ textAlign: "left", margin: "20px 0 0 0" }}>
                  {allPaymentMethods.map((paymentMethod, index) => {
                    return (
                      <PaymentCardLabel key={index}>
                        <div
                          style={{
                            padding: "10px",
                            border: "2px solid #b4f3dd",
                            borderRadius: "5px",
                            marginBottom: "10px",
                            position: "relative",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <span
                            style={{
                              position: "absolute",
                              left: "9px",
                              top: "10px",
                              zIndex: "9999",
                              marginLeft: "30px",
                            }}
                          >
                            <Image
                              alt="Icon"
                              width="50"
                              height="25"
                              src={`/icons/${paymentMethod.cardType}-img.svg`}
                            />
                          </span>
                          <FormControlLabel
                            id="cardNumberId"
                            control={<Radio />}
                            label={paymentMethod.cardNumber}
                            value={paymentMethod.cardNumber}
                            onChange={(e) => {
                              setSelectedPaymentMethod(e.target.value);
                              setPaymentMethod(paymentMethod);
                            }}
                            checked={
                              selectedPaymentMethod === paymentMethod.cardNumber
                            }
                          />
                          <div>
                            <button
                              className="btn-action"
                              onClick={() => {
                                setEditCard(true);
                                handlePaymentModal();
                                handleClose();
                                setPaymentMethod(paymentMethod);
                              }}
                            >
                              <Image
                                src={"/icons/edit-row.svg"}
                                height="18"
                                width="18"
                                alt=""
                              />
                            </button>
                            <button
                              className="btn-action"
                              onClick={() => deletePaymentMethod(paymentMethod)}
                            >
                              <Image
                                src={"/icons/delete-icon2.svg"}
                                height="18"
                                width="18"
                                alt=""
                              />
                            </button>
                          </div>

                          {/* <button
                            onClick={() => deletePaymentMethod(paymentMethod)}
                          >
                            delete
                          </button>
                          <button
                            onClick={() => {
                              setEditCard(true);
                              handlePaymentModal();
                              handleClose();
                              setPaymentMethod(paymentMethod);
                            }}
                          >
                            edit
                          </button> */}
                        </div>
                      </PaymentCardLabel>
                      // <div key={index} style={{ padding: "5px" }}>
                      //   <input
                      //     type="radio"
                      //     value={paymentMethod.cardNumber}
                      //     onChange={(e) => {
                      //       setSelectedPaymentMethod(e.target.value);
                      //       setPaymentMethod(paymentMethod);
                      //     }}
                      //     checked={
                      //       selectedPaymentMethod === paymentMethod.cardNumber
                      //     }
                      //   />
                      //   Card Numbers :{paymentMethod.cardNumber}
                      //   <button
                      //     onClick={() => deletePaymentMethod(paymentMethod)}
                      //   >
                      //     delete
                      //   </button>
                      //   <button
                      //     onClick={() => {
                      //       setEditCard(true);
                      //       handlePaymentModal();
                      //       handleClose();
                      //       setPaymentMethod(paymentMethod);
                      //     }}
                      //   >
                      //     edit
                      //   </button>
                      // </div>
                    );
                  })}
                </div>
                <OutlineButton
                  onClick={() => {
                    setEditCard(false);
                    handlePaymentModal();
                    handleClose();
                  }}
                  style={{
                    border: "0",
                    padding: "0 0 100px 15px",
                    cursor: "pointer",
                    borderdius: "4px",
                    fontSize: "12px",
                    display: "flex",
                    color: "#000",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <AddCircleOutlineIcon style={{ fontSize: "16px" }} />
                  <span
                    style={{
                      paddingLeft: "4px",
                    }}
                  >
                    Add Payment Method
                  </span>
                </OutlineButton>
              </div>
            )}

            <div className={`${layout.flex_center} ${layout.mt_30}`}>
              <span className={`${layout.mr_10}`} style={{ width: "50%" }}>
                <OutlineButton
                  onClick={handleClose}
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
                <MainButton variant="contained" marginbottom="0">
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
          </ModalBox>
        </Fade>
      </Modal>
      <AddPaymentModal
        openPaymentModal={openPaymentModal}
        closePaymentModal={closePaymentModal}
        getAllPaymentMethods={getAllPaymentMethods}
        editCard={editCard}
        paymentMethod={paymentMethod}
        setEditCard={setEditCard}
        allPaymentMethods={allPaymentMethods}
      />
    </>
  );
};
export default MySubscription;
