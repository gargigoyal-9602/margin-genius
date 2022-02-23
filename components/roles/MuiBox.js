import React from "react";
import { DropDownBox } from "../tableControls.style";
import RightDrawer from "../../components/department-markup/RightDrawer";
import tokenExpired from "../layout/withAuth/tokenExpired";
import axios from "axios";
import { toast } from "react-toastify";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useRouter } from "next/router";

const MuiBox = (props) => {
  const router = useRouter();

  let {
    departments,
    setDepartments,
    handleChange,
    values,
    toggle1,
    setToggle1,
  } = props;

  const getDepartments = async () => {
    const authDetails = JSON.parse(localStorage.getItem("authDetails"));
    const { jwt, userId, orgId } = authDetails;
    try {
      const response = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/departments?orgId=${orgId}&userId=${userId}`,
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      });
      setDepartments(response.data.data);
    } catch (err) {
      tokenExpired(err, router);
    }
  };

  const addDepartment = async (values) => {
    const authDetails = JSON.parse(localStorage.getItem("authDetails"));
    const { jwt, userId, orgId } = authDetails;

    try {
      const response = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/department`,
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
        data: {
          userId: userId,
          orgId: orgId,
          department: values.Department,
          wholesaleCost: values.WholeSaleCost,
          markupMultiplier: values.markupMultiplier,
          grossmarginPercentage: values.GrossMarginPercentage,
          sellingPrice: values.SellingPrice,
          grossmarginAmount: values.GrossMargin,
        },
      });
      if (response && response.data) {
        getDepartments();
        toast.success(response.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    } catch (err) {
      tokenExpired(err, router);
    }
  };
React.useEffect(()=>{
getDepartments()
},[])
  return (
    <>
      <DropDownBox>
        <div style={{ position: "relative", top: 0, padding: "10px" }}>
          {departments.length > 0 ? (
            departments.map((department) => {
              return (
                <>
                  <RadioGroup name="department">
                    <FormControlLabel
                      value={department.department}
                      control={<Radio />}
                      onChange={(e) => {
                        localStorage.setItem("deptId", department.departmentId);
                        setToggle1(!toggle1);
                        handleChange(e);
                      }}
                      checked={values.department === department.department}
                      label={department.department}
                    />
                  </RadioGroup>
                </>
              );
            })
          ) : (
            <p>No Department Found</p>
          )}

          <RightDrawer
            departments={departments}
            setDepartments={setDepartments}
            getDepartments={getDepartments}
            addDepartment={addDepartment}
          />
        </div>
      </DropDownBox>
    </>
  );
};

export default MuiBox;
