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
  BorderButton
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
    handleDeleteModalClose,
    deleteDisabled,
    createDeliverables,
    toggleDrawer,
    Drawerstate,
    setSearch,
    getDeliverables,
    search,
    filterDisplay,
    appliedfilter,
    setAppliedFilter,
    deliverable,
  } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openDelete, setOpenDelete] = React.useState(false);
  const handleDeleteOpen = () => setOpenDelete(true);
  const handleDeleteClose = () => setOpenDelete(false);

  const [filter, setFilter] = React.useState({
    departments: [],
    roles: [],
    vendors: [],
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
                value={search}
                type="text"
                placeholder="Search by deliverable name"
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
                  getDeliverables(e.target.value);
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
                      Showing all of {deliverable && deliverable.length} users
                    </p>
                  </div>
                  <div className={layout.flex_center}>
                    <p
                      style={{
                        color: "#8E9595",
                        cursor: "pointer",
                        marginRight: "10px",
                      }}
                      onClick={() => {
                        handleFilterClose();
                        setAppliedFilter({
                          departments: [],
                          roles: [],
                          vendors: [],
                        });
                        getDeliverables(search, {
                          departments: [],
                          roles: [],
                          vendors: [],
                        });
                      }}
                    >
                      Clear All
                    </p>
                    <BorderButton
                      onClick={() => {
                        handleFilterClose();
                        setAppliedFilter(filter);
                        getDeliverables(search, filter);
                      }}>
                      Apply Filters
                    </BorderButton>
                  </div>
                </div>
                <div className={layout.flex_between}>
                  <div className="filter_box">
                    <p className={layout.mb_10}>Department</p>
                    <div className="filter_wrap">
                      <div className="filter_name">
                        <Image
                          src="/icons/search.svg"
                          height="15"
                          width="15"
                          alt=""
                        />{" "}
                        <span className={layout.ml_10}>Department</span>
                      </div>
                      {filterDisplay &&
                        filterDisplay.departments.map((department, index) => {
                          return (
                            <div className="cutome_check" key={index}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    defaultChecked={
                                      filter &&
                                      filter.departments.length > 0 &&
                                      filter.departments.includes(department)
                                    }
                                    onChange={(e) => {
                                      let filterDepartment;
                                      e.target.checked
                                        ? (filterDepartment = filter && [
                                            ...filter.departments,
                                            department,
                                          ])
                                        : (filterDepartment =
                                            filter &&
                                            filter.departments.filter(
                                              (depart) => depart != department
                                            ));
                                      setFilter({
                                        ...filter,
                                        ["departments"]: filterDepartment,
                                      });
                                    }}
                                  />
                                }
                                label={department}
                              />
                            </div>
                          );
                        })}
                    </div>
                  </div>
                  <div className="filter_box">
                    <p className={layout.mb_10}>Role</p>
                    <div className="filter_wrap">
                      <div className="filter_name">
                        <Image
                          src="/icons/doller-sign.svg"
                          width="16"
                          height="16"
                          alt=""
                        />{" "}
                        <span className={layout.ml_10}>Role</span>
                      </div>
                      {filterDisplay &&
                        filterDisplay.roles.map((role, index) => {
                          return (
                            <div className="cutome_check" key={index}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    defaultChecked={
                                      filter &&
                                      filter.roles.length > 0 &&
                                      filter.roles.includes(role)
                                    }
                                    onChange={(e) => {
                                      let filterRole;
                                      e.target.checked
                                        ? (filterRole = filter && [
                                            ...filter.roles,
                                            role,
                                          ])
                                        : (filterRole =
                                            filter &&
                                            filter.roles.filter(
                                              (newrole) => newrole != role
                                            ));
                                      setFilter({
                                        ...filter,
                                        ["roles"]: filterRole,
                                      });
                                    }}
                                  />
                                }
                                label={role}
                              />
                            </div>
                          );
                        })}
                    </div>
                  </div>
                  <div className="filter_box">
                    <p className={layout.mb_10}>Vendor Name</p>
                    <div className="filter_wrap">
                      <div className="filter_name">
                        <Image
                          src="/icons/search.svg"
                          height="15"
                          width="15"
                          alt=""
                        />{" "}
                        <span className={layout.ml_10}>Vendor Name</span>
                      </div>
                      {filterDisplay &&
                        filterDisplay.vendors.map((vendor, index) => {
                          return (
                            <div className="cutome_check" key={index}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    defaultChecked={
                                      filter &&
                                      filter.vendors.length > 0 &&
                                      filter.vendors.includes(vendor)
                                    }
                                    onChange={(e) => {
                                      let filterVendor;
                                      e.target.checked
                                        ? (filterVendor = filter && [
                                            ...filter.vendors,
                                            vendor,
                                          ])
                                        : (filterVendor =
                                            filter &&
                                            filter.vendors.filter(
                                              (newvendor) => newvendor != vendor
                                            ));
                                      setFilter({
                                        ...filter,
                                        ["vendors"]: filterVendor,
                                      });
                                    }}
                                  />
                                }
                                label={vendor}
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
              className={layout.mr_20}
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
          <RightDrawer
            departmentRole={departmentRole}
            createDeliverables={createDeliverables}
            toggleDrawer={toggleDrawer}
            Drawerstate={Drawerstate}
          />
        </div>
      </div>
    </>
  );
};

const userEmails = [];
export default SearchBarNav;
