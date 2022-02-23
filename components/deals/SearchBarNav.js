import * as React from "react";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import globalLayout from "../../styles/globalLayout.module.scss";
import layout from "../../styles/layout.module.scss";
import Image from "next/image";
import InputAdornment from "@mui/material/InputAdornment";
import {
  IconButton,
  MainButton,
  OutlineButton,
  InputText,
  ErrorMsg,
} from "../formControls.style";
import { ModalBox, FilterButton, FilterBox } from "../tableControls.style";
import styles from "../../styles/login.module.scss";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { PageTitle } from "./Deals.style";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

const SearchBarNav = (props) => {
  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (option) => option.calculatorName,
  });

  const { calculators, setIsCreateNewDeal } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openDelete, setOpenDelete] = React.useState(false);
  const handleDeleteOpen = () => setOpenDelete(true);
  const handleDeleteClose = () => setOpenDelete(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const click = Boolean(anchorEl);
  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  
  return (
    <>
      <PageTitle>
        <span className={layout.ml_20}>Deals</span>
      </PageTitle>
      <div className={globalLayout.search_bar_nav}>
        <div className={globalLayout.search_field}>
          <div className={layout.flex_center}>
            <div>
              <InputText
                width="350px"
                id="Search"
                name="Search"
                type="text"
                placeholder="Search for deal name or category"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Image
                        src="/icons/search.svg"
                        height="15"
                        width="15"
                        alt=""
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className={layout.ml_20}>
              <FilterButton
                active
                id="demo-customized-button"
                aria-controls="demo-customized-menu"
                aria-haspopup="true"
                aria-expanded={click ? "true" : undefined}
                disableElevation
                onClick={handleFilterClick}
                endIcon={<KeyboardArrowDownIcon />}
              >
                <Image
                  alt=""
                  src="/icons/filter-white.svg"
                  width="16"
                  height="16"
                />
                <span className="lable_text">Filter</span>
              </FilterButton>
              <FilterBox
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                anchorEl={anchorEl}
                open={click}
                onClose={handleFilterClose}
              >
                <div className="filter_head">
                  <div className={layout.flex_center}>
                    <h3>Filters</h3>
                    <p
                      style={{
                        color: "#8E9595",
                        marginLeft: "10px",
                        marginRight: "40px",
                        fontSize: "12px",
                      }}
                    >
                      Showing all of 5 users
                    </p>
                  </div>
                  <div className={layout.flex_center}>
                    <p
                      style={{
                        color: "#8E9595",
                        cursor: "pointer",
                        marginRight: "10px",
                        fontSize: "12px",
                      }}
                    >
                      Clear All
                    </p>
                    <div
                      onClick={handleFilterClose}
                      style={{
                        border: "1px solid #8E9595",
                        padding: "10px",
                        cursor: "pointer",
                        borderRadius: "4px",
                        fontSize: "12px",
                      }}
                    >
                      Apply Filters
                    </div>
                  </div>
                </div>
                <div className={layout.flex_between}>
                  <div className="filter_box">
                    <p className={layout.mb_10}>Category</p>
                    <div className="filter_wrap">
                      <div className="filter_name">
                        <Image
                          src="/icons/search.svg"
                          height="13"
                          width="13"
                          alt=""
                        />
                        <span className={layout.ml_10}>Graphic Design</span>
                      </div>
                      <div className="cutome_check">
                        <FormControlLabel
                          control={<Checkbox />}
                          label="Graphic Design"
                        />
                      </div>
                      <div className="cutome_check">
                        <FormControlLabel
                          control={<Checkbox />}
                          label="Marketing"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="filter_box">
                    <p className={layout.mb_10}>Status</p>
                    <div className="filter_wrap">
                      <div className="filter_name">
                        <Image
                          src="/icons/search.svg"
                          height="13"
                          width="13"
                          alt=""
                        />
                        <span className={layout.ml_10}>In Waiting</span>
                      </div>
                      <div className="cutome_check">
                        <FormControlLabel
                          control={<Checkbox />}
                          label="Approved"
                        />
                      </div>
                      <div className="cutome_check">
                        <FormControlLabel
                          control={<Checkbox />}
                          label="Not Approved"
                        />
                      </div>
                      <div className="cutome_check">
                        <FormControlLabel
                          control={<Checkbox />}
                          label="In Waiting"
                        />
                      </div>
                      <div className="cutome_check">
                        <FormControlLabel
                          control={<Checkbox />}
                          label="In Progress"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </FilterBox>
            </div>
          </div>
        </div>

        <div className={layout.flex_center}>
          <span className={layout.mr_20}>
            <IconButton onClick={handleDeleteOpen}>
              <span className={layout.flex_center}>
                <Image
                  alt=""
                  src="/icons/delete-icon.svg"
                  width="16"
                  height="16"
                />
              </span>
            </IconButton>
          </span>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openDelete}
            onClose={handleDeleteClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={openDelete}>
              <ModalBox>
                <span
                  className={layout.model_close}
                  onClick={handleDeleteClose}
                >
                  <Image
                    src="/icons/cancel.svg"
                    height="12"
                    width="12"
                    alt=""
                  />
                </span>
                <div className={layout.mb_20}>
                  <h3>Are you sure you want to delete these deals?</h3>
                  <p>
                    The deals will be deleted immediately and this action cannot
                    be undone.
                  </p>
                </div>
                <div className={layout.flex_between_center}>
                  <OutlineButton
                    onClose={handleDeleteClose}
                    aligncenter="true"
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
                    onClose={handleDeleteClose}
                    withText
                    style={{
                      width: "100%",
                      marginLeft: "20px",
                      height: "40px",
                    }}
                  >
                    <span className={layout.flex_center}>
                      <Image
                        alt=""
                        src="/icons/delete-icon-white.svg"
                        width="16"
                        height="16"
                      />
                      <span className={layout.ml_10}>Delete the Deals</span>
                    </span>
                  </IconButton>
                </div>
              </ModalBox>
            </Fade>
          </Modal>
          <OutlineButton
            aligncenter="true"
            marginbottom="0"
            onClick={handleOpen}
          >
            <span className={layout.flex_top}>
              <Image
                src="/icons/plus-icon-green.svg"
                width="16"
                height="16"
                alt=""
              />
            </span>
            <span className={layout.ml_10}>Create New Deal</span>
          </OutlineButton>
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
              <ModalBox style={{ width: "450px" }}>
                <span className={layout.model_close} onClick={handleClose}>
                  <Image
                    src="/icons/cancel.svg"
                    height="12"
                    width="12"
                    alt=""
                  />
                </span>
                <div className={layout.mb_20}>
                  <h3>
                    Choose the calculator for <br />
                    the new deal
                  </h3>
                  <p>Select the Calculator</p>
                  <Autocomplete
                    options={calculators}
                    getOptionLabel={(option) => option.calculatorName}
                    filterOptions={filterOptions}
                    renderInput={(params) => (
                      <TextField
                        size="small"
                        {...params}
                        placeholder="Select or enter the name"
                      />
                    )}
                  />
                </div>
                <div className={layout.flex_between_center}>
                  <OutlineButton
                    onClick={handleClose}
                    aligncenter="true"
                    marginbottom="0px"
                    style={{ marginRight: "20px" }}
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
                  <MainButton
                    onClick={() => {
                      setIsCreateNewDeal(true);
                      handleClose();
                    }}
                    marginbottom="0px"
                  >
                    <span className={layout.flex_center}>
                      <span className={layout.ml_10}>Create New Deal</span>
                    </span>
                  </MainButton>
                </div>
              </ModalBox>
            </Fade>
          </Modal>
        </div>
      </div>
    </>
  );
};

const userEmails = [];
export default SearchBarNav;
