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
  BorderButton,
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
import RightDrawer from "./RightDrawer";

const SearchBarNav = (props) => {
  const {
    departmentRole,
    calculators,
    handleMultipleDelete,
    selected,
    setSelected,
    searchValue,
    setSearchValue,
    getAllCalculators,
    department,
    category,
    appliedfilter,
    setAppliedFilter,
    departments,
  } = props;
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
  const [filter, setFilter] = React.useState({
    Category: [],
    Departments: [],
    contractLengthConfig: "",
    setUpFeeConfig: "",
  });
  const contractLengths = ["1 Month", "2 Month", "6 Month", "12 Month"];
  const setUpFee = ["%", "$"];
  React.useEffect(() => {
    setFilter(appliedfilter);
  }, [appliedfilter]);
  return (
    <>
      <div className={globalLayout.search_bar_nav}>
        <div className={globalLayout.search_field}>
          <div className={layout.flex_center}>
            <div>
              <InputText
                width="350px"
                id="Search"
                name="Search"
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                  getAllCalculators(e.target.value);
                }}
                type="text"
                placeholder="Search for calculator name or category"
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
                      Showing all of {calculators.length} calculators
                    </p>
                  </div>
                  <div className={layout.flex_center}>
                    <p
                      onClick={() => {
                        handleFilterClose();
                        setAppliedFilter({
                          Category: [],
                          Departments: [],
                          contractLengthConfig: "",
                          setUpFeeConfig: "",
                        });

                        getAllCalculators(searchValue, {
                          Category: [],
                          Departments: [],
                          contractLengthConfig: "",
                          setUpFeeConfig: "",
                        });
                      }}
                      style={{
                        color: "#8E9595",
                        cursor: "pointer",
                        marginRight: "10px",
                        fontSize: "12px",
                      }}
                    >
                      Clear All
                    </p>
                    <BorderButton
                      onClick={() => {
                        handleFilterClose();
                        setAppliedFilter(filter);
                        getAllCalculators(searchValue, filter);
                      }}
                    >
                      Apply Filters
                    </BorderButton>
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
                        <span className={layout.ml_10}>Website Design</span>
                      </div>

                      {category.map((element, index) => {
                        return (
                          <div key={index} className="cutome_check">
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={filter.Category.includes(element)}
                                  onChange={(e) => {
                                    let filteredCategory = [];
                                    e.target.checked
                                      ? (filteredCategory = [
                                          ...filter.Category,
                                          element,
                                        ])
                                      : (filteredCategory =
                                          filter.Category.filter((category) => {
                                            return category !== element;
                                          }));
                                    setFilter({
                                      ...filter,
                                      Category: filteredCategory,
                                    });
                                  }}
                                />
                              }
                              label={element === null ? "null" : element}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="filter_box">
                    <p className={layout.mb_10}>Contract Length Config</p>
                    <div className="filter_wrap">
                      <div className="filter_name">
                        <Image
                          src="/icons/search.svg"
                          height="13"
                          width="13"
                          alt=""
                        />
                        <span className={layout.ml_10}>1, 2, 6, 12 months</span>
                      </div>
                      {contractLengths.map((element, index) => {
                        return (
                          <div key={index} className="cutome_check">
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={
                                    filter.contractLengthConfig === element
                                  }
                                  onChange={(e) => {
                                    e.target.checked
                                      ? setFilter({
                                          ...filter,
                                          contractLengthConfig: element,
                                        })
                                      : setFilter({
                                          ...filter,
                                          contractLengthConfig: "",
                                        });
                                  }}
                                />
                              }
                              label={`${element}`}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="filter_box">
                    <p className={layout.mb_10}>Department Category</p>
                    <div className="filter_wrap">
                      <div className="filter_name">
                        <Image
                          src="/icons/search.svg"
                          height="13"
                          width="13"
                          alt=""
                        />
                        <span className={layout.ml_10}>UI Design</span>
                      </div>
                      {department.map((element, index) => {
                        return (
                          <div key={index} className="cutome_check">
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={filter.Departments.includes(element)}
                                  onChange={(e) => {
                                    let filteredDepartments = [];
                                    e.target.checked
                                      ? (filteredDepartments = [
                                          ...filter.Departments,
                                          element,
                                        ])
                                      : (filteredDepartments =
                                          filter.Departments.filter(
                                            (department) => {
                                              return department !== element;
                                            }
                                          ));
                                    setFilter({
                                      ...filter,
                                      Departments: filteredDepartments,
                                    });
                                  }}
                                />
                              }
                              label={element}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="filter_box">
                    <p className={layout.mb_10}>Setup Fee</p>
                    <div className="filter_wrap">
                      <div className="filter_name">
                        <Image
                          src="/icons/search.svg"
                          height="13"
                          width="13"
                          alt=""
                        />
                        <span className={layout.ml_10}>%</span>
                      </div>
                      {setUpFee.map((element, index) => {
                        return (
                          <div key={index} className="cutome_check">
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={filter.setUpFeeConfig === element}
                                  onChange={(e) => {
                                    e.target.checked
                                      ? setFilter({
                                          ...filter,
                                          setUpFeeConfig: element,
                                        })
                                      : setFilter({
                                          ...filter,
                                          setUpFeeConfig: "",
                                        });
                                  }}
                                />
                              }
                              label={element}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </FilterBox>
            </div>
          </div>
        </div>

        <div className={layout.flex_center}>
          <span className={layout.mr_20}>
            <IconButton
              disabled={selected.length === 0}
              onClick={handleDeleteOpen}
            >
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
                  <h3>Are you sure you want to delete these calculators?</h3>
                  <p>
                  The calculators will be deleted immediately and this action cannot be undone.
                  </p>
                </div>
                <div className={layout.flex_between_center}>
                  <OutlineButton
                    onClick={handleDeleteClose}
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
                      handleMultipleDelete();
                      handleDeleteClose();
                      setSelected([]);
                    }}
                    withText
                  >
                    <span className={layout.flex_center}>
                      <Image
                        alt=""
                        src="/icons/delete-icon-white.svg"
                        width="16"
                        height="16"
                      />
                      <span className={layout.ml_10}>Delete the Calculators</span>
                    </span>
                  </IconButton>
                </div>
              </ModalBox>
            </Fade>
          </Modal>
          <RightDrawer
            calculators={calculators}
            deliverables={props.deliverables}
            setDeliverables={props.setDeliverables}
            deliverableNameObj={props.deliverableNameObj}
            setDeliverableNameObj={props.setDeliverableNameObj}
            deliverableRoleId={props.deliverableRoleId}
            setDeliverableRoleId={props.setDeliverableRoleId}
            deliverablePriceObj={props.deliverablePriceObj}
            setDeliverablePriceObj={props.setDeliverablePriceObj}
            packages={props.packages}
            packageNameObj={props.packageNameObj}
            packagePriceObj={props.packagePriceObj}
            setPackages={props.setPackages}
            users={props.users}
            departments={props.departments}
            setDepartments={props.setDepartments}
            getDepartments={props.getDepartments}
            setUsers={props.setUsers}
            nameObj={props.nameObj}
            setNameObj={props.setNameObj}
            getAllCalculators={props.getAllCalculators}
            packageAllowAccess={props.packageAllowAccess}
          />
        </div>
      </div>
    </>
  );
};

const userEmails = [];
export default SearchBarNav;
