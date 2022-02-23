import styled from "styled-components";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ErrorMessage } from "formik";
import Image from "next/image";
import layout from "../styles/layout.module.scss";
import TextareaAutosize from "@mui/material/TextareaAutosize";

export const MainButton = styled(Button)`
  width: ${(props) => props.fixwidth || "100%"};
  box-shadow: none;
  &.MuiButton-root {
    font-size: 14px;
    box-shadow: none;
    background-color: ${(props) => (props.disabled ? "#EFF1F1" : "#04d68f")};
    color: ${(props) => (props.disabled ? "#D2D4D4" : "#ffffff")};
    border-radius: 6px;
    border: ${(props) =>
    props.disabled ? "2px solid #EFF1F1" : "2px solid #04d68f"};
    margin-bottom: ${(props) => props.marginbottom || "25px"};
    text-transform: none;
    display: ${(props) => (props.aligncenter = "true" ? "flex" : "")};
    align-items: ${(props) => (props.aligncenter = "true" ? "center" : "")};
    &:hover {
      background-color: #04d68f;
      color: #fff;
      box-shadow: none;
    }
    &:hover,
    &:focus {
      outline: none;
    }
  }
  &:hover,
  &:focus {
    outline: none;
  }
`;

export const StatusButton = styled(Button)`
  background: #D2D4D4;
  padding: 0px 10px;
  width: 90%;
  font-size: 10px;
  border-radius: 10px;
  border:0;
  font-family: "Comfortaa", cursive;
  color:#fff;
  text-transform: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  &:hover{
    background:#D2D4D4;
  }
  &.pending{
    background: #FF6D00;
  }
  &.not-approved{
    background: #E05269;
  }
  &.approved{
    background: #26D96B;
  }
  &.in-prosess{
    background: #D2D4D4;
  }
`
export const OutlineButton = styled(MainButton)`
  &.MuiButton-root {
    background-color: #ffffff;
    color: ${(props) => (props.disabled ? "#D2D4D4" : "#128A81")};
    border: ${(props) => (props.disabled ? "2px solid #EFF1F1" : "2px solid #128A81")};
    &:hover {
      background-color: #ffffff;
      color: ${(props) => (props.disabled ? "#D2D4D4" : "#128A81")};
    }
  }
`;
export const CardInputWrapper = styled.div`
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    padding: 10px 16px;
    margin: 5px 0 15px 0;
  `;
export const RedOutlineButton = styled(OutlineButton)`
  &.MuiButton-root {
    background-color: #ffffff;
    color: ${(props) => (props.disabled ? "#D2D4D4" : "#E05269")};
    border: ${(props) => (props.disabled ? "2px solid #EFF1F1" : "2px solid #E05269")};
    &:hover {
      background-color: #ffffff;
      color: ${(props) => (props.disabled ? "#D2D4D4" : "#E05269")};
    }
  }
`;

export const SecondaryButton = styled(MainButton)`
  &.MuiButton-root {
    background-color: #ffffff;
    color: ${(props) => (props.disabled ? "#D2D4D4" : "#0A2828")};
    border: ${(props) =>
      props.disabled ? "2px solid #EFF1F1" : "2px solid #EFF1F1"};
    &:hover {
      background-color: #ffffff;
      color: ${(props) => (props.disabled ? "#D2D4D4" : "#0A2828")};
    }
  }
`;

export const InputText = styled(TextField)`
  width: ${(props) => props.width || "100%"};
  &.MuiTextField-root {
    font-size: 12px;
  }
`;
export const PaymentCardLabel = styled.div`
    & .MuiTypography-root
    {
      margin-top:28px;
      margin-left: 10px;
    }
    & .btn-action{
      border:none;
      background:transparent;
      cursor:pointer;
      margin:0px 5px;
    }
    
`;


export const InputTextArea = styled(TextareaAutosize)`
  width: ${(props) => props.width || "100%"};
  outline: 1px solid #d2d4d4;
  border: 0;
  padding: 8.5px 14px;
  box-sizing: border-box;
  border-radius: 4px;
  font-family: "Comfortaa", cursive;
  &:hover {
    outline: 1px solid #222;
  }
  &:focus {
    outline: 2px solid #04d68f;
  }
`;

export const SocialButton = styled(Button)`
  width: 100%;
  box-shadow: none;
  &.MuiButton-root {
    font-size: 14px;
    box-shadow: none;
    background-color: #fff;
    color: #0a2828;
    border-radius: 6px;
    border: 2px solid #d2d4d4;
    margin-bottom: 25px;
    text-transform: none;
    display: inline-flex;
    align-items: center;
  }
  &:hover,
  &:focus {
    outline: none;
  }
`;

export const IconButton = styled(Button)`
    box-shadow: none;
    &.MuiButton-root {
      text-transform: none;
      box-shadow: none;
      background-color: ${(props) => (props.withText ? "#E05269" : "#fff")};
      color: ${(props) => (props.withText ? "#fff" : "#E05269")};
      border-radius: 5px;
      border: 2px solid #e05269;
      align-items: center;
      padding: 11px 15px;
      &:hover {
        background-color: ${(props) => (props.withText ? "#E05269" : "#fff")};
        color: ${(props) => (props.withText ? "#fff" : "#E05269")};
      }
      &.Mui-disabled {
          opacity:0.4;
          }
          &.disabled {
          opacity: 0.4;
        }      
      &:hover,
      &:focus {
        outline: none;
      }
    }
`;

export const EditRowBtn = styled(Button)`
  box-shadow: none;
  &.MuiButton-root {
    background: #f8f8f8;
    border: 1px solid #f8f8f8;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 10px 0;
    width: 30px;
    height: 46px;
    &:hover {
      background: #f8f8f8;
      border: 1px solid #f8f8f8;
    }
  }
  &:hover,
  &:focus {
    outline: none;
  }
`;

const ErrorText = styled.p`
  font-size: 12px;
  padding: 5px;
  display: flex;
  align-items: center;
  color: #e05269;
  span {
    min-width: 15px;
  }
`;
export const ErrorTextBox = styled.p`
  font-size: 12px;
  padding: 5px;
  display: flex;
  align-items: center;
  color: #e05269;
  span {
    min-width: 15px;
  }
`;

export const ErrorMsg = ({ name, className }) => {
  return (
    <ErrorMessage name={name} className={className}>
      {(msg) => (
        <ErrorText className="error">
          <Image
            src="/icons/error-ico.svg"
            height="14"
            width="14"
            className={layout.error_img}
            alt="error"
          />
          <span className={layout.ml_5}>{msg}</span>
        </ErrorText>
      )}
    </ErrorMessage>
  );
};

export const BorderButton = styled.div`
      border: 1px solid #8E9595;
      padding: 10px;
      cursor: pointer;
      border-radius: 4px;
      font-size: 12px,
`;
