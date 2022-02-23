import * as React from "react";
import layout from "../../styles/layout.module.scss";
import {
  ErrorMsg,
  MainButton,
  OutlineButton,
  InputText,
} from "../../components/formControls.style";
import Image from "next/image";
import InputAdornment from "@mui/material/InputAdornment";
import {
  AccordionBox,
  TabContentWrap,
  MenuList,
  TextWrap,
  SwitchWrap,
} from "./Calculators.style";
import axios from "axios";
import { toast } from "react-toastify";
import tokenExpired from "../layout/withAuth/tokenExpired";
import { useRouter } from "next/router";

export const History = (props) => {
  const router = useRouter();
  const [history, setHistory] = React.useState([]);

  const getHistory = async () => {
    const authDetails = JSON.parse(localStorage.getItem("authDetails"));
    const { jwt, userId, orgId } = authDetails;
    const calId = JSON.parse(localStorage.getItem("calId"));
    try {
      const response = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/calculator-history?calculatorId=${calId}&userId=${userId}&orgId=${orgId}`,
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      });
      if (response && response.data) {
        setHistory(response.data.data);
        toast.success(response.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    } catch (err) {
      console.log(err);
      tokenExpired(err, router);
    }
  };
  React.useEffect(() => {
    getHistory();
  }, []);
  return (
    <>
      <TabContentWrap className="history">
        <div className="tbl-list">
          <div className="tbl-row">
            <div className="Name">
              <p className="color-gray">History</p>
            </div>
            <div className="date">
              <p className="color-gray">Date of addition</p>
            </div>
          </div>
          <div className="scroll">
            {history.map((element, index) => {
              return (
                <div key={index} className="tbl-row">
                  <div className="Name">
                    <p>{element.history}</p>
                  </div>
                  <div className="date">
                    <p>{element.createDate}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </TabContentWrap>
      <div className={layout.mt_20}>
        <div className={layout.flex_between}></div>
      </div>
    </>
  );
};
