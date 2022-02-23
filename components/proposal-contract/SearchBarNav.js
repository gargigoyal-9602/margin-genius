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

const SearchBarNav = (props) => {
  const {
    createProposals,
    setCreateProposals,
    editProposals,
    setEditProposals,
    handleDeleteModalClose,
    deleteDisabled,
    search,
    setSearch,
    filterDisplay,
    appliedfilter,
    setAppliedFilter,
    proposals,
    getProposals,
  } = props;

  const [openDelete, setOpenDelete] = React.useState(false);
  const handleDeleteOpen = () => setOpenDelete(true);
  const handleDeleteClose = () => setOpenDelete(false);

  const [filter, setFilter] = React.useState({
    calculators: [],
    format: [],
    pcSettings: [],
    othersConfig: [],
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
                placeholder="Search for title or calculator name"
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
                  getProposals(e.target.value,appliedfilter);
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
                      Showing all of {proposals && proposals.length}{" "}
                      proposals/contracts
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
                          calculators: [],
                          format: [],
                          pcSettings: [],
                          othersConfig: [],
                        });
                        getProposals(search, {
                          calculators: [],
                          format: [],
                          pcSettings: [],
                          othersConfig: [],
                        });
                      }}
                    >
                      Clear All
                    </p>
                    <BorderButton
                      onClick={() => {
                        handleFilterClose();
                        setAppliedFilter(filter);
                        getProposals(search, filter);
                      }}
                    >
                      Apply Filters
                    </BorderButton>
                  </div>
                </div>
                <div className={layout.flex_between}>
                  <div className="filter_box">
                    <p className={layout.mb_10}>Calculators Applied To</p>
                    <div className="filter_wrap">
                      <div className="filter_name">
                        <Image
                          src="/icons/search.svg"
                          height="13"
                          width="13"
                          alt=""
                        />
                        <span className={layout.ml_10}>
                          {filterDisplay && filterDisplay.calculators.length}{" "}
                          calculators
                        </span>
                      </div>
                      {filterDisplay &&
                        filterDisplay.calculators.map((calculator, index) => {
                          return (
                            <div className="simple_check" key={index}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    defaultChecked={
                                      filter &&
                                      filter.calculators.length > 0 &&
                                      filter.calculators.includes(calculator)
                                    }
                                    onChange={(e) => {
                                      let filterCalculators;
                                      e.target.checked
                                        ? (filterCalculators = filter && [
                                            ...filter.calculators,
                                            calculator,
                                          ])
                                        : (filterCalculators =
                                            filter &&
                                            filter.calculators.filter(
                                              (depart) => depart != calculator
                                            ));
                                      setFilter({
                                        ...filter,
                                        ["calculators"]: filterCalculators,
                                      });
                                    }}
                                  />
                                }
                                label={calculator}
                              />
                            </div>
                          );
                        })}
                    </div>
                  </div>
                  <div className="filter_box">
                    <p className={layout.mb_10}>File Format</p>
                    <div className="filter_wrap">
                      <div className="filter_name">
                        <Image
                          src="/icons/search.svg"
                          height="13"
                          width="13"
                          alt=""
                        />
                        <span className={layout.ml_10}>Multiple Options</span>
                      </div>
                      {filterDisplay &&
                        filterDisplay.format.map((item, index) => {
                          return (
                            <div className="simple_check" key={index}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    color="primary"
                                    defaultChecked={
                                      filter &&
                                      filter.format.length > 0 &&
                                      filter.format.includes(item)
                                    }
                                    onChange={(e) => {
                                      let filterFormat;
                                      e.target.checked
                                        ? (filterFormat = filter && [
                                            ...filter.format,
                                            item,
                                          ])
                                        : (filterFormat =
                                            filter &&
                                            filter.format.filter(
                                              (depart) => depart != item
                                            ));
                                      setFilter({
                                        ...filter,
                                        ["format"]: filterFormat,
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
                    <p className={layout.mb_10}>Proposal/Contract Setup</p>
                    <div className="filter_wrap">
                      <div className="filter_name">
                        <Image
                          src="/icons/search.svg"
                          height="13"
                          width="13"
                          alt=""
                        />
                        <span className={layout.ml_10}>
                          Proposal/Contract Setup
                        </span>
                      </div>
                      {filterDisplay &&
                        Object.keys(filterDisplay.pcSettings).map(
                          (setting, index) => {
                            return (
                              <div className="simple_check" key={index}>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      defaultChecked={
                                        filter &&
                                        filter.pcSettings.length > 0 &&
                                        filter.pcSettings.includes(setting)
                                      }
                                      onChange={(e) => {
                                        let filtersetting;
                                        e.target.checked
                                          ? (filtersetting = filter && [
                                              ...filter.pcSettings,
                                              setting,
                                            ])
                                          : (filtersetting =
                                              filter &&
                                              filter.pcSettings.filter(
                                                (depart) => depart != setting
                                              ));
                                        setFilter({
                                          ...filter,
                                          ["pcSettings"]: filtersetting,
                                        });
                                      }}
                                    />
                                  }
                                  label={setting}
                                />
                              </div>
                            );
                          }
                        )}
                    </div>
                  </div>
                  <div className="filter_box">
                    <p className={layout.mb_10}>Other Configurations</p>
                    <div className="filter_wrap">
                      <div className="filter_name">
                        <Image
                          src="/icons/search.svg"
                          height="13"
                          width="13"
                          alt=""
                        />
                        <span className={layout.ml_10}>$</span>
                      </div>

                      {filterDisplay &&
                        filterDisplay.othersConfig.map((config, index) => {
                          return (
                            <div className="simple_check" key={index}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    defaultChecked={
                                      filter &&
                                      filter.othersConfig.length > 0 &&
                                      filter.othersConfig.includes(config)
                                    }
                                    onChange={(e) => {
                                      let filterConfig;
                                      e.target.checked
                                        ? (filterConfig = filter && [
                                            ...filter.othersConfig,
                                            config,
                                          ])
                                        : (filterConfig =
                                            filter &&
                                            filter.othersConfig.filter(
                                              (depart) => depart != config
                                            ));
                                      setFilter({
                                        ...filter,
                                        ["othersConfig"]: filterConfig,
                                      });
                                    }}
                                  />
                                }
                                label={config}
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
          <OutlineButton
            aligncenter="true"
            fixwidth="auto"
            marginbottom="0"
            onClick={() => {
              !createProposals && setCreateProposals(!createProposals);
              editProposals && setEditProposals(!editProposals);
            }}
          >
            <span className={layout.flex_top}>
              <Image
                src="/icons/plus-icon-green.svg"
                width="16"
                height="16"
                alt=""
              />
            </span>
            <span className={layout.ml_10}>Add Another Proposal/Contract</span>
          </OutlineButton>
        </div>
      </div>
    </>
  );
};

const userEmails = [];
export default SearchBarNav;
