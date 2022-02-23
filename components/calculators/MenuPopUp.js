import * as React from "react";
import styled from "styled-components";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButtonNew from "@mui/material/IconButton";
import Image from "next/image";
import layout from "../../styles/layout.module.scss";
import { Backdrop, Fade, Modal } from "@mui/material";
import { ModalBox } from "../tableControls.style";
import { IconButton, OutlineButton } from "../formControls.style";
import globalLayout from "../../styles/globalLayout.module.scss";
import tokenExpired from "../layout/withAuth/tokenExpired";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import RightDrawer from "./RightDrawer";
const PopMenu = styled(Menu)`
  & .MuiPaper-root {
    border: 1px solid #eff1f1;
    box-shadow: -2px 0px 2px rgba(8, 27, 64, 0.02),
      2px 0px 2px rgba(8, 27, 64, 0.02), 0px -2px 2px rgba(8, 27, 64, 0.02),
      0px 2px 4px rgba(8, 27, 64, 0.04);
    border-radius: 8px;
    min-width: 160px;
  }
`;
export const MenuPopup = (props) => {
  const router = useRouter();
  const {
    row,
    getAllCalculators,
    calculators,
    toggleDrawer,
    text,
    setText,
    setEditCalculator,
  } = props;
  //  Open popup Menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMoreClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuOptions = [
    { Img: "/icons/history.svg", Name: "History" },
    { Img: "/icons/duplicate.svg", Name: "Duplicate" },
    { Img: "/icons/edit-icon.svg", Name: "Edit Calculator" },
    { Img: "/icons/delete-icon.svg", Name: "Delete" },
  ];
  //  End Open popup Menu

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const duplicateCalculator = async (calculatorName) => {
    if (calculatorName.length <= 20) {
      const authDetails = JSON.parse(localStorage.getItem("authDetails"));
      const { jwt, userId, orgId } = authDetails;
      try {
        const response = await axios({
          method: "post",
          url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/copy-calculator`,
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
          data: {
            userId,
            orgId,
            calculatorId: row.calculatorId,
            calculatorName: calculatorName,
          },
        });
        if (response && response.data) {
          toast.success(response.data.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          getAllCalculators();
        }
      } catch (err) {
        tokenExpired(err, router);
      }
    } else {
      toast.error("Calculator name length too long", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const handleMenu = (menuOptions) => {
    let count = 0;
    if (menuOptions.Name === "Delete") {
      handleOpen();
    } else if (menuOptions.Name === "Duplicate") {
      let uniqueCal = new Set();
      calculators.map((calculator) => {
        uniqueCal.add(calculator.calculatorName);
      });
      uniqueCal.forEach((value) => {
        if (
          value.includes(`${row.calculatorName}-copy`) ||
          (value.includes(`${row.calculatorName}-copy(`) &&
            row.calculatorName !== value)
        ) {
          count = count + 1;
        }
      });

      if (count === 0) {
        duplicateCalculator(`${row.calculatorName}-copy`);
      } else {
        duplicateCalculator(`${row.calculatorName}-copy(${count})`);
      }
    } else if (menuOptions.Name === "History") {
      localStorage.setItem("calId", row.calculatorId);
      setText("history");
      toggleDrawer("right", true);
    } else if (menuOptions.Name === "Edit Calculator") {
      localStorage.setItem("calId", row.calculatorId);
      setText("");
      toggleDrawer("right", true,row);
      props.setTogg(!props.togg)
    }
    // setEditCalculator(false)
  };
  const deleteSingleCalculator = async (calculatorId) => {
    const authDetails = JSON.parse(localStorage.getItem("authDetails"));
    const { jwt, userId, orgId } = authDetails;
    try {
      const response = await axios({
        method: "delete",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/calculator?calculatorIds=${calculatorId}&userId=${userId}`,
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      });
      if (response && response.data) {
        toast.success(response.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        getAllCalculators();
      } else {
        toast.error(
          `${response.data.error ? response.data.error : "error while login"}`,
          {
            position: toast.POSITION.BOTTOM_RIGHT,
          }
        );
      }
    } catch (err) {
      tokenExpired(err, router);
    }
  };

  return (
    <>
      <IconButtonNew
        onClick={handleMoreClick}
        aria-label="more"
        id="long-button"
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
      >
        <MoreVertIcon aria-haspopup="true" sx={{ color: "#D2D4D4" }} />
      </IconButtonNew>
      <PopMenu
        elevation={0}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {menuOptions.map((menuOptions) => (
          <MenuItem
            key={menuOptions}
            onClick={() => {
              handleClose();
              handleMenu(menuOptions);
            }}
          >
            <Image src={menuOptions.Img} alt="" height="15" width="15" />
            <span className={layout.ml_10}>{menuOptions.Name}</span>
          </MenuItem>
        ))}
      </PopMenu>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openModal}
          onClose={handleCloseModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openModal}>
            <ModalBox>
              <span className={layout.model_close} onClick={handleCloseModal}>
                <Image src="/icons/cancel.svg" height="12" width="12" alt="" />
              </span>
              <div className={layout.mb_20}>
                <h3>Are you sure you want to delete these calculators?</h3>
                <p>
                The calculators will be deleted immediately and this action cannot be undone.
                </p>
              </div>
              <div className={layout.flex_between_center}>
                <OutlineButton
                  onClick={handleCloseModal}
                  aligncenter="true"
                  fixwidth="auto"
                  marginbottom="0px"
                >
                  <span className={globalLayout.btn_icon}>
                    <Image
                      alt=""
                      src="/icons/cancel-icon.svg"
                      width="16"
                      height="16"
                    />
                  </span>
                  Cancel
                </OutlineButton>
                <IconButton
                  onClick={() => {
                    deleteSingleCalculator(row.calculatorId);
                    handleCloseModal();
                  }}
                  withText
                >
                  <span className={layout.flex_center}>
                    <Image
                      alt=""
                      src="/icons/delete-icon-white.svg"
                      width="16"
                      height="16"
                    />{" "}
                    <span className={layout.ml_10}>Delete the Calculators</span>
                  </span>
                </IconButton>
              </div>
            </ModalBox>
          </Fade>
        </Modal>
      </div>
    </>
  );
};
