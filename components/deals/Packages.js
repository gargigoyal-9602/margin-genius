import * as React from "react";
import { TabContent } from "./Deals.style";
import InputLabel from "@mui/material/InputLabel";
import layout from "../../styles/layout.module.scss";
import InputAdornment from "@mui/material/InputAdornment";
import Image from "next/image";

import { AccordionBox, TblPackage } from "./Deals.style";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { InlineInputEdit } from "react-inline-input-edit";
import {
  ErrorMsg,
  OutlineButton,
  InputText,
  MainButton,
} from "../formControls.style";
import {
  Checkbox,
  FormControlLabel,
  Menu,
  MenuItem,
  MenuList,
} from "@mui/material";
import { TextWrap } from "../calculators/Calculators.style";
import { toast } from "react-toastify";

export const Packages = (props) => {
  const {
    calculators,
    packages,
    setPackages,
    selectedCalculator,
    calCulatorPac,
    setCalculatorPac,
    selectedCalPac,
    setSelectedCalPac,
  } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [searchValue, setSearchValue] = React.useState("");
  const [selected, setSelected] = React.useState([]);
  const [isEditable, setIsEditable] = React.useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectAllClick = (event, packageDeliverables) => {
    console.log(packageDeliverables);
    if (event.target.checked) {
      const newSelecteds = packageDeliverables.map((n) => n.deliverableId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const handleClickAll = (event, pacDeliverableId) => {
    const selectedIndex = selected.indexOf(pacDeliverableId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, pacDeliverableId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };
  const isSelected = (pacDeliverableId) =>
    selected.indexOf(pacDeliverableId) !== -1;

  const createDeals = () => {
    if (selected.length === 0) {
      toast.error("Please select atleast one deliverables", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };
  const editQuantity = () => {
    setIsEditable(true);
  };
  const _handleFocus = (text) => {
    console.log(text);
  };
  // const save=(text,deliverableId)=>{
  //   let temp=[...calCulatorPac]
  //   setCalculatorPac(temp.map((element) => {
  //     return element.packageDeliverables.map((pacDel) => {
  //       if (pacDel.deliverablesPackageId === deliverableId) {
  //         console.log(pacDel)
  //         return { ...pacDel, quantity: text };
  //       } else {
  //         return pacDel;
  //       }
  //     });
  //   })
  //   )
  // }
  // const _handleFocusOut = (text, deliverableId) => {
  //   console.log(text);
  //   save(text,deliverableId)

  //   console.log(calCulatorPac);
  // };
  React.useEffect(() => {
    packages.map((element) => {});
  }, []);
  return (
    <>
      <TabContent className="details">
        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="sub-title">
              <h2>List of Packages</h2>
            </div>
            <div className="sub-title">
              <OutlineButton
                aligncenter="true"
                fixwidth="auto"
                marginbottom="0"
                onClick={handleClick}
              >
                <span className={layout.flex_top}>
                  <Image
                    src="/icons/edit-icon.svg"
                    width="16"
                    height="16"
                    alt=""
                  />
                </span>
                <span className={layout.ml_10}>Edit list of Packages</span>
              </OutlineButton>

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <TextWrap>
                  <InputText
                    width="100%"
                    id="Search"
                    name="Search"
                    type="text"
                    className="border-0"
                    placeholder="Search"
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
                </TextWrap>
                <MenuList>
                  {selectedCalPac.length > 0 && (
                    <div className="block">
                      <p>Selected</p>

                      {selectedCalPac.map((element) => {
                        return (
                          <MenuItem>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setCalculatorPac([
                                        ...calCulatorPac,
                                        element,
                                      ]);
                                      setSelectedCalPac(
                                        selectedCalPac.filter((calPac) => {
                                          return (
                                            calPac.packageName !==
                                            element.packageName
                                          );
                                        })
                                      );
                                    }
                                  }}
                                />
                              }
                              label={element.packageName}
                            />
                          </MenuItem>
                        );
                      })}
                    </div>
                  )}

                  <div className="border block">
                    <p>Packages</p>
                    {calCulatorPac.map((element, index) => {
                      return (
                        <MenuItem key={index}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    console.log(element.packageName);
                                    setSelectedCalPac([
                                      ...selectedCalPac,
                                      element,
                                    ]);
                                    setCalculatorPac(
                                      calCulatorPac.filter((calPac) => {
                                        return (
                                          element.packageName !==
                                          calPac.packageName
                                        );
                                      })
                                    );
                                  }
                                }}
                              />
                            }
                            label={element.packageName}
                          />
                        </MenuItem>
                      );
                    })}
                  </div>
                </MenuList>
                <OutlineButton
                  aligncenter="true"
                  fixwidth="auto"
                  marginbottom="0"
                  style={{
                    margin: "25px 13px 20px 13px",
                    width: "-webkit-fill-available",
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
                  <span className={layout.ml_10}>Confirm</span>
                </OutlineButton>
              </Menu>
            </div>
          </div>
          <div className="searchbox-wrap">
            <InputText
              id="Search"
              name="Search"
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search for package name or department"
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
          {selectedCalPac.length === 0
            ? calCulatorPac
                .filter((calPac) => {
                  return (
                    calPac.packageName
                      .toLowerCase()
                      .includes(searchValue.toLowerCase()) ||
                    calPac.departmentName
                      .toLowerCase()
                      .includes(searchValue.toLowerCase())
                  );
                })
                .map((calculatorPackage, index) => {
                  return (
                    <AccordionBox key={index}>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <div className="title">
                            <span>{calculatorPackage.packageName}</span>
                            <span className="color-gray">
                              {calculatorPackage.departmentName}
                            </span>
                            <strong className="color-green">
                              ${calculatorPackage.overallPrice}
                            </strong>
                          </div>
                        </AccordionSummary>
                        <AccordionDetails>
                          <TblPackage>
                            <Table>
                              <TableHead>
                                <TableCell padding="checkbox">
                                  <Checkbox
                                    color="primary"
                                    indeterminate={
                                      selected.length > 0 &&
                                      selected.length <
                                        calculatorPackage.packageDeliverables
                                          .length
                                    }
                                    checked={
                                      calculatorPackage.packageDeliverables
                                        .length > 0 &&
                                      selected.length ===
                                        calculatorPackage.packageDeliverables
                                          .length
                                    }
                                    onChange={(e) =>
                                      handleSelectAllClick(
                                        e,
                                        calculatorPackage.packageDeliverables
                                      )
                                    }
                                    inputProps={{
                                      "aria-label": "select all desserts",
                                    }}
                                  />
                                </TableCell>
                                <TableCell>Name of Delivarable</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Frequency</TableCell>
                                <TableCell>Department</TableCell>
                                <TableCell>Unit Price</TableCell>
                                <TableCell>Total QTY</TableCell>
                              </TableHead>
                              <TableBody>
                                {calculatorPackage.packageDeliverables.map(
                                  (packageDeliverable, index) => {
                                    const isItemSelected = isSelected(
                                      packageDeliverable.deliverableId
                                    );
                                    return (
                                      <TableRow key={index}>
                                        <TableCell padding="checkbox">
                                          <Checkbox
                                            checked={isItemSelected}
                                            onClick={(event) =>
                                              handleClickAll(
                                                event,
                                                packageDeliverable.deliverableId
                                              )
                                            }
                                            color="primary"
                                            inputProps={{
                                              "aria-labelledby": "1",
                                            }}
                                          />
                                        </TableCell>
                                        <TableCell>
                                          <strong>
                                            {packageDeliverable.deliverableName}
                                          </strong>
                                        </TableCell>
                                        <TableCell>
                                          {packageDeliverable.quantityEditable ? (
                                            <>
                                              {/* <span
                                                onClick={() =>
                                                 editQuantity()
                                                }
                                              >
                                                {isEditable ? (
                                                  <input
                                                    value={
                                                      packageDeliverable.quantity
                                                    }
                                                  />
                                                ) : (
                                                  packageDeliverable.quantity
                                                )}
                                              </span> */}
                                              <InlineInputEdit
                                                text={packageDeliverable.quantity.toString()}
                                                inputWidth="200px"
                                                inputHeight="25px"
                                                inputMaxLength={50}
                                                labelFontWeight="bold"
                                                inputFontWeight="bold"
                                                onFocus={(text) =>
                                                  _handleFocus(text)
                                                }
                                                // onFocusOut={(text) =>
                                                //   _handleFocusOut(
                                                //     text,
                                                //     packageDeliverable.deliverablesPackageId
                                                //   )
                                                // }
                                              />

                                              <Image
                                                src="/icons/edit-icon.svg"
                                                alt=""
                                                width={20}
                                                height={10}
                                              />
                                            </>
                                          ) : (
                                            <span>
                                              {packageDeliverable.quantity}
                                            </span>
                                          )}
                                        </TableCell>
                                        <TableCell>
                                          <span>
                                            {packageDeliverable.frequency}
                                          </span>
                                        </TableCell>
                                        <TableCell>
                                          <span>
                                            {calculatorPackage.departmentName}
                                          </span>
                                        </TableCell>
                                        <TableCell>
                                          <strong>
                                            {packageDeliverable.price}
                                          </strong>
                                        </TableCell>
                                        <TableCell>
                                          <span>
                                            {calculatorPackage.noOfDeliverables}
                                          </span>
                                        </TableCell>
                                      </TableRow>
                                    );
                                  }
                                )}
                              </TableBody>
                            </Table>
                          </TblPackage>
                        </AccordionDetails>
                      </Accordion>
                    </AccordionBox>
                  );
                })
            : selectedCalPac.map((calculatorPackage, index) => {
                return (
                  <AccordionBox key={index}>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <div className="title">
                          <span>{calculatorPackage.packageName}</span>
                          <span className="color-gray">
                            {calculatorPackage.departmentName}
                          </span>
                          <strong className="color-green">
                            ${calculatorPackage.overallPrice}
                          </strong>
                        </div>
                      </AccordionSummary>
                      <AccordionDetails>
                        <TblPackage>
                          <Table>
                            <TableHead>
                              <TableCell></TableCell>
                              <TableCell>Name of Delivarable</TableCell>
                              <TableCell>Quantity</TableCell>
                              <TableCell>Frequency</TableCell>
                              <TableCell>Department</TableCell>
                              <TableCell>Unit Price</TableCell>
                              <TableCell>Total QTY</TableCell>
                            </TableHead>
                            <TableBody>
                              {calculatorPackage.packageDeliverables.map(
                                (packageDeliverable, index) => {
                                  const isItemSelected = isSelected(
                                    packageDeliverable.deliverableId
                                  );
                                  return (
                                    <TableRow key={index}>
                                      <TableCell padding="checkbox">
                                        <Checkbox
                                          onClick={(event) =>
                                            handleClickAll(
                                              event,
                                              packageDeliverable.deliverableId
                                            )
                                          }
                                          color="primary"
                                          inputProps={{
                                            "aria-labelledby": "1",
                                          }}
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <strong>
                                          {packageDeliverable.deliverableName}
                                        </strong>
                                      </TableCell>
                                      <TableCell>
                                        <span>
                                          {packageDeliverable.quantity}
                                        </span>
                                      </TableCell>
                                      <TableCell>
                                        <span>
                                          {packageDeliverable.frequency}
                                        </span>
                                      </TableCell>
                                      <TableCell>
                                        <span>
                                          {calculatorPackage.departmentName}
                                        </span>
                                      </TableCell>
                                      <TableCell>
                                        <strong>
                                          {packageDeliverable.price}
                                        </strong>
                                      </TableCell>
                                      <TableCell>
                                        <span>
                                          {calculatorPackage.noOfDeliverables}
                                        </span>
                                      </TableCell>
                                    </TableRow>
                                  );
                                }
                              )}
                            </TableBody>
                          </Table>
                        </TblPackage>
                      </AccordionDetails>
                    </Accordion>
                  </AccordionBox>
                );
              })}
        </div>

        <div className="details-footer">
          <div className="buttonWrap">
            <OutlineButton
              variant="text"
              fixwidth="auto"
              marginbottom="0"
              className={layout.mr_10}
              style={{ border: "0", color: "#0A2828" }}
            >
              Cancel
            </OutlineButton>
            <MainButton
              onClick={createDeals}
              fixwidth="auto"
              marginbottom="0"
              variant="contained"
              type="submit"
            >
              Create Deal
            </MainButton>
          </div>
          <div className="deal-information">
            <div className="cell">
              <p>Monthly Fee</p>
              <strong>$ 40</strong>
            </div>
            <div className="cell">
              <p>Total Contract Value</p>
              <strong>$ 400</strong>
            </div>
            <div className="cell">
              <p>Set up Amount</p>
              <strong>$ 200</strong>
            </div>
            <div className="cell">
              <p>Monthly Fee + Neg Amount</p>
              <strong>$ 200</strong>
            </div>
            <div className="cell">
              <p>Contract Length</p>
              <strong>3 Months</strong>
            </div>
          </div>
        </div>
      </TabContent>
    </>
  );
};
