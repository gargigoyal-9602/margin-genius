import React from "react";
import { DropDownBox } from "../tableControls.style";
import layout from "../../styles/layout.module.scss";
import Image from "next/image";
import { TextField } from "@mui/material";
import {
  OutlineButton,
  InputText,
  MainButton,
  RedOutlineButton,
  InputTextArea,
  ErrorMsg,
} from "../formControls.style";
import RightDrawer from "../../components/department-markup/RightDrawer";

import axios from "axios";
import { toast } from "react-toastify";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useRouter } from "next/router";
import tokenExpired from "../layout/withAuth/tokenExpired";

const MuiBox = (props) => {
  const router = useRouter();
  const [showCategory, setShowCategory] = React.useState([]);
  const getAllCalculators = async () => {
    const authDetails = JSON.parse(localStorage.getItem("authDetails"));
    const { jwt, userId, orgId } = authDetails;
    try {
      const response = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/calculators`,
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
        data: {
          userId,
          orgId,
          calculatorName: "",
          category: [],
          department: [],
          contractlengthConfig: "",
          setupFee: "",
        },
      });
      if (response.data) {
        let tempSet = [];
        const depId = JSON.parse(localStorage.getItem("depId"));
        response.data.data.map((element) => {
          if (element.departmentId === depId) {
            tempSet.push(element.category);
          }
        });
        setShowCategory(tempSet);
      }
    } catch (err) {
      console.log(err);
      tokenExpired(err, router);
    }
  };
  React.useEffect(() => {
    let tempSet = new Set();
    const depId = JSON.parse(localStorage.getItem("depId"));
    props.calculators.map((element) => {
      if (element.departmentId === depId) {
        tempSet.add(element.category);
      }
    });
    let uniqueCategory = [...tempSet];
    setShowCategory(uniqueCategory);
  }, []);
  return (
    <>
      <DropDownBox style={{ zIndex: "99", width: "100%" }}>
        {showCategory.length > 0
          ? showCategory.map((e) => {
              return (
                <div
                  onClick={() => {
                    props.setCat(e);
                    props.setFieldValue("category", e);
                    props.handleToggle();
                  }}
                  style={{ margin: "20px 10px", cursor: "pointer" }}
                >
                  {e}
                </div>
              );
            })
          : "No Category Found"}
        {props.newOpen && (
          <div>
            <InputText
              size="small"
              onChange={(e) => props.setNewCat(e.target.value)}
              placeholder="Create Category"
            />
            <div
              className={layout.flex_between}
              style={{ margin: "10px 0 0 0" }}
            >
              <MainButton
                size="small"
                marginbottom="0"
                style={{ fontSize: "12px" }}
                onClick={() => {
                  // let arr = props.values.categoryOptions;
                  // arr.push(props.newCat);
                  // props.setFieldValue("categoryOptions", arr);
                  // arr = [];
                  setShowCategory([...showCategory, props.newCat]);
                  props.setNewOpen(false);
                }}
              >
                Create
              </MainButton>
              <OutlineButton
                size="small"
                marginbottom="0"
                style={{ marginLeft: "10px", fontSize: "12px" }}
                onClick={() => props.setNewOpen(false)}
              >
                Cancel
              </OutlineButton>
            </div>
          </div>
        )}
        {!props.newOpen && (
          <OutlineButton
            size="small"
            marginbottom="0"
            onClick={() => {
              props.setNewOpen(true);
            }}
          >
            <Image
              alt="Icon"
              width="14"
              height="14"
              src="/icons/plus-icon-green.svg"
            />
            <span className={layout.ml_10} style={{ fontSize: "12px" }}>
              Create
            </span>
          </OutlineButton>
        )}
      </DropDownBox>
    </>
  );
};

export default MuiBox;
