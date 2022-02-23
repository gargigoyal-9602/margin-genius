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
  BorderButton,
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
import RightDrawer from "./RightDrawer";

const SearchBarNav = (props) => {
  const {
    handleDeleteModalClose,
    deleteDisabled,
    handleCreatePackages,
    createPackages,
    departmentRole,
    handleEditPackages,
    isRowEdit,
    rowEdit,
    setRowEdit,
    search,
    setSearch,
    filterDisplay,
    appliedfilter,
    setAppliedFilter,
    getPackages,
  } = props;
 
  const [openDelete, setOpenDelete] = React.useState(false);
  const handleDeleteOpen = () => setOpenDelete(true);
  const handleDeleteClose = () => setOpenDelete(false);

  const [filter, setFilter] = React.useState({
    departments: [],
    scope: [],
    price: [],
    level: [],
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const click = Boolean(anchorEl);
  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleFilterClose = () => {
    setAnchorEl(null);
    setFilter(appliedfilter);
  };
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
                type="text"
                value={search}
                placeholder="Search for package name or deliverable"
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
                onChange={(e) => {
                  setSearch(e.target.value);
                  getPackages(e.target.value);
                }}
              />
            </div>
            <div className={layout.ml_20}>
              <FilterButton
                active="true"
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
                      onClick={() => {
                        handleFilterClose();
                        setAppliedFilter({
                          departments: [],
                          scope: [],
                          price: [],
                          level: [],
                        });
                        getPackages(search, {
                          departments: [],
                          scope: [],
                          price: [],
                          level: [],
                        });
                      }}
                    >
                      Clear All
                    </p>
                    <BorderButton
                      onClick={() => {
                        handleFilterClose();
                        setAppliedFilter(filter);
                        getPackages(search, filter);
                      }}
                    >
                      Apply Filters
                    </BorderButton>
                  </div>
                </div>
                <div className={layout.flex_between}>
                  <div className="filter_box">
                    <p className={layout.mb_10}>Name of Package</p>
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
                      {filterDisplay &&
                        filterDisplay.scope.map((item, index) => {
                          return (
                            <div className="cutome_check" key={index}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    defaultChecked={
                                      filter &&
                                      filter.scope.length > 0 &&
                                      filter.scope.includes(item)
                                    }
                                    onChange={(e) => {
                                      let filterScope;
                                      e.target.checked
                                        ? (filterScope = filter && [
                                            ...filter.scope,
                                            item,
                                          ])
                                        : (filterScope =
                                            filter &&
                                            filter.scope.filter(
                                              (depart) => depart != item
                                            ));
                                      setFilter({
                                        ...filter,
                                        ["scope"]: filterScope,
                                      });
                                    }}
                                  />
                                }
                                label={item}
                              />
                            </div>
                          );
                        })}
                    </div>
                  </div>
                  <div className="filter_box">
                    <p className={layout.mb_10}>Price</p>
                    <div className="filter_wrap">
                      <div className="filter_name">
                        <Image
                          src="/icons/search.svg"
                          height="13"
                          width="13"
                          alt=""
                        />
                        <span className={layout.ml_10}>$ 5000-10K</span>
                      </div>
                      {filterDisplay &&  filterDisplay.price&&
                        filterDisplay.price.map((item, index) => {
                          return (
                            <div className="cutome_check" key={index}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    defaultChecked={
                                      filter &&
                                      filter.price.length > 0 &&
                                      filter.price.includes(item.split("K")[0])
                                    }
                                    onChange={(e) => {
                                      let filterPrice;
                                      e.target.checked
                                        ? (filterPrice = filter && [
                                            ...filter.price,
                                            item.split("K")[0],
                                          ])
                                        : (filterPrice =
                                            filter &&
                                            filter.price.filter(
                                              (depart) =>
                                                depart != item.split("K")[0]
                                            ));
                                      setFilter({
                                        ...filter,
                                        ["price"]: filterPrice,
                                      });
                                    }}
                                  />
                                }
                                label={item}
                              />
                            </div>
                          );
                        })}
                    </div>
                  </div>
                  <div className="filter_box">
                    <p className={layout.mb_10}>Department</p>
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
                      {filterDisplay &&
                        filterDisplay.departments.map((item, index) => {
                          return (
                            <div className="cutome_check" key={index}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    defaultChecked={
                                      filter &&
                                      filter.departments.length > 0 &&
                                      filter.departments.includes(item)
                                    }
                                    onChange={(e) => {
                                      let filterDepartments;
                                      e.target.checked
                                        ? (filterDepartments = filter && [
                                            ...filter.departments,
                                            item,
                                          ])
                                        : (filterDepartments =
                                            filter &&
                                            filter.departments.filter(
                                              (depart) => depart != item
                                            ));
                                      setFilter({
                                        ...filter,
                                        ["departments"]: filterDepartments,
                                      });
                                    }}
                                  />
                                }
                                label={item}
                              />
                            </div>
                          );
                        })}
                    </div>
                  </div>
                  <div className="filter_box">
                    <p className={layout.mb_10}>Minimum Level</p>
                    <div className="filter_wrap">
                      <div className="filter_name">
                        <Image
                          src="/icons/search.svg"
                          height="13"
                          width="13"
                          alt=""
                        />
                        <span className={layout.ml_10}>Senior</span>
                      </div>
                      {filterDisplay &&
                        filterDisplay.level.map((item, index) => {
                          return (
                            <div className="cutome_check" key={index}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    defaultChecked={
                                      filter &&
                                      filter.level.length > 0 &&
                                      filter.level.includes(item)
                                    }
                                    onChange={(e) => {
                                      let filterLevel;
                                      e.target.checked
                                        ? (filterLevel = filter && [
                                            ...filter.level,
                                            item,
                                          ])
                                        : (filterLevel =
                                            filter &&
                                            filter.level.filter(
                                              (depart) => depart != item
                                            ));
                                      setFilter({
                                        ...filter,
                                        ["level"]: filterLevel,
                                      });
                                    }}
                                  />
                                }
                                label={item}
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
              onClick={handleDeleteModalClose}
              disabled={deleteDisabled}
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

          <OutlineButton
            aligncenter="true"
            fixwidth="auto"
            onClick={() => {
              !createPackages && handleCreatePackages();
              setRowEdit("");
              isRowEdit && handleEditPackages();
            }}
            marginbottom="0"
          >
            <span className={layout.flex_top}>
              <Image
                src="/icons/plus-icon-green.svg"
                width="16"
                height="16"
                alt=""
              />
            </span>
            <span className={layout.ml_10}>Add New Package</span>
          </OutlineButton>
        </div>
      </div>
    </>
  );
};

const userEmails = [];
export default SearchBarNav;
