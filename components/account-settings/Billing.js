import * as React from "react";
import {
  MainButton,
  InputText,
  PaymentCardLabel,
  OutlineButton,
} from "../formControls.style";
import { ModalBox } from "../tableControls.style";
import {
  BillingBox,
  BillingHeader,
  BillingTable,
} from "../../components/account-settings/AccountSetting.style";
import globalLayout from "../../styles/globalLayout.module.scss";
import Listview from "./ListView";
import layout from "../../styles/layout.module.scss";
import { FormControlLabel, MenuItem, Radio, Select } from "@mui/material";
import { Modal } from "@mui/material";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import Image from "next/image";
import AddPaymentModal from "../layout/Payments/AddPaymentModal";
import tokenExpired from "../layout/withAuth/tokenExpired";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import FirstModal from "./FirstModal";

const Billing = () => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [cardBrand, setCardBrand] = React.useState("");
  const [editCard, setEditCard] = React.useState(false);
  const [allPaymentMethods, setAllPaymentMethods] = React.useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState("");
  const [billingHistory, setBillingHistory] = React.useState([]);
  const [paymentMethod1, setPaymentMethod1] = React.useState([]);
  const [paymentMethod, setPaymentMethod] = React.useState([
    {
      orgId: "",
      type: "",
      cardholderName: "",
      cardNumber: "",
      expiryDate: "",
      zipCode: "",
      updatedBy: "",
      cardBrand: "",
    },
  ]);
  const [openPaymentModal, setOpenPaymentModal] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePaymentModal = () => setOpenPaymentModal(true);
  const closePaymentModal = () => setOpenPaymentModal(false);

  const [SaveOpen, setSaveOpen] = React.useState(false);
  const handleSaveChangeOpen = () => setSaveOpen(true);
  const handleSaveClose = () => setSaveOpen(false);

  const [year, setYear] = React.useState("");

  const handleChange = (event) => {
    setYear(event.target.value);
  };
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
        let pmId = JSON.parse(localStorage.getItem("pmId"));
        if (pmId !== null) {
          setPaymentMethod1(
            response.data.data["All Payment Methods"].filter(
              (paymentMethod) => {
                return paymentMethod.paymentMethodId === pmId;
              }
            )
          );
        }
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
      tokenExpired(err, router);
    }
  };
  React.useEffect(() => {
    getAllPaymentMethods();
    setAllPaymentMethods(
      allPaymentMethods.map((paymentMethod) => {
        return { ...paymentMethod, brand: "" };
      })
    );
  }, []);
  const showCard = () => {
    let pmId = JSON.parse(localStorage.getItem("pmId"));
    if (pmId !== null) {
      setPaymentMethod1(
        allPaymentMethods.filter((paymentMethod) => {
          return paymentMethod.paymentMethodId === pmId;
        })
      );
    }
  };
  return (
    <>
      <BillingBox>
        <div className="plan_box active">
          <div className={layout.flex_between_center}>
            <h3>Current Plan</h3>
            <MainButton
              size="small"
              fixwidth="auto"
              variant="contained"
              marginbottom="0"
            >
              <span>Change</span>
            </MainButton>
          </div>
          <p className="plan_size">Free</p>
          <p className="plan_amount">Pro Trial</p>
          <div className="bottom_text">
            <span className={layout.mr_10}>10 Days left</span>
            <Image
              alt="Icon"
              width="16"
              height="16"
              src="/icons/edit-icon-green.svg"
            />
          </div>
        </div>

        <div className="plan_box">
          <div className={layout.flex_between_center}>
            <h3>Next Payment</h3>
          </div>
          <p className="plan_size">on January 24, 2022</p>
          <p className="plan_amount">$ 175.89 / month</p>
          <div className="bottom_text">
            <span className={layout.mr_10}>In 28 days</span>
          </div>
        </div>
        <div className="plan_box">
          <div className={layout.flex_between_center}>
            <h3>Payment Information</h3>
            {allPaymentMethods.length > 0 ? (
              <OutlineButton
                onClick={handleOpen}
                size="small"
                fixwidth="auto"
                variant="contained"
                marginbottom="0"
              >
                <span>Edit</span>
              </OutlineButton>
            ) : (
              <OutlineButton
                onClick={handleOpen}
                size="small"
                fixwidth="auto"
                variant="contained"
                marginbottom="0"
              >
                <span>Add</span>
              </OutlineButton>
            )}
            <FirstModal
              open={open}
              handleClose={handleClose}
              allPaymentMethods={allPaymentMethods}
              handlePaymentModal={handlePaymentModal}
              selectedPaymentMethod={selectedPaymentMethod}
              setSelectedPaymentMethod={setSelectedPaymentMethod}
              setPaymentMethod={setPaymentMethod}
              deletePaymentMethod={deletePaymentMethod}
              setEditCard={setEditCard}
              showCard={showCard}
            />
            <AddPaymentModal
              openPaymentModal={openPaymentModal}
              closePaymentModal={closePaymentModal}
              getAllPaymentMethods={getAllPaymentMethods}
              editCard={editCard}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              cardBrand={cardBrand}
              setCardBrand={setCardBrand}
              setEditCard={setEditCard}
              allPaymentMethods={allPaymentMethods}
            />
          </div>
          {allPaymentMethods.length > 0 && (
            <>
              <div>
                {paymentMethod1.map((p, index) => {
                  return (
                    <>
                      <div className="plan_size" key={index}>
                        <div className="card_detail">
                          <span className={layout.flex_center}>
                            <Image
                              alt="Icon"
                              width="50"
                              height="30"
                              src={`/icons/${p.cardType}-img.svg`}
                            />
                            <p className="card_no">{p.cardNumber}</p>;
                          </span>
                          <div className="bottom_text">
                            Expires {p.expiryDate}
                          </div>
                        </div>
                      </div>
                      <div className="bottom_text">
                        <span className={layout.mr_10}>{p.postalAdress}</span>
                      </div>
                    </>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </BillingBox>
      <BillingHeader>
        <h2>Billing History</h2>
        <div className={layout.flex_center}>
          <Image alt="Icon" width="16" height="16" src="/icons/time-icon.svg" />
          <Select
            size="small"
            name="YearDropdown"
            value={year}
            onChange={handleChange}
            displayEmpty
          >
            <MenuItem value="">
              <span>Select Year</span>
            </MenuItem>
            <MenuItem value="This Year">
              <span>This Year</span>
            </MenuItem>
            <MenuItem value="last Year">
              <span>last Year</span>
            </MenuItem>
            <MenuItem value="Year 2020">
              <span>Year 2020</span>
            </MenuItem>
          </Select>
        </div>
      </BillingHeader>
      <BillingTable>
        {billingHistory.length > 0 ? (
          <Listview />
        ) : (
          <div className={globalLayout.no_table_data}>
            <span>
              <Image
                alt=""
                src="/icons/billing-no-data.svg"
                width="150"
                height="150"
              />
            </span>
            <p>
              You have no bills yet. They will appear here after <br />
              your first subscription pay
            </p>
          </div>
        )}
      </BillingTable>
    </>
  );
};
export default Billing;
