import styled from "styled-components";

export const TabBox = styled.div`
  display: flex;
  border-top: 1px solid #eff1f1;
  margin: 20px 0 0 0;
  .MuiTabPanel-root {
    width: 100%;
    padding: 16px;
  }
  .MuiTabs-root {
    width: 250px;
    height: 100%;
    .Mui-selected {
      background: #f1fef8;
      color: #0a2828;
    }
    .MuiTabs-fixed {
      border-right: 1px solid #eff1f1;
    }
  }
  .MuiTabs-flexContainer {
    flex-direction: column;
  }
  .MuiTabs-flexContainer .MuiTab-root {
    width: 100%;
    align-items: center;
    justify-content: flex-start;
    .MuiTab-iconWrapper {
      margin: 0 15px 0 0;
    }
  }
  .MuiTab-root {
    min-height: 52px;
  }
  .MuiTabs-indicator {
    display: none;
  }
`;
/* My Profile styling */
export const MyProfileBox = styled.div`
  width:100%;
  display: flex;
    form {
      flex-grow: 1;
    }
    .input_box{
    width: 100%;
    margin-right: 20px;
    position: relative;
        .error {
          position: absolute;
          left: 0;
        }
      }

    .profile_img {
        position: relative;
        height:150px;
        img {
          border-radius: 50%;
        }
        &:hover {
          .profile_hover{
            display:block;
          }
        }
      }
      .profile_hover{
        display: none;
        position: absolute;
        border: 1px solid #04D68F;
        border-radius: 50%;
        background: rgba(4,214,143,0.8);
        color: #fff;
        top: 0;
        left: 0;
        height: 100px;
        width: 100px;
        .change_img {
          top: 30px;
          position: absolute;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          font-size: 12px;
          left: 5px;
          cursor: pointer;
          z-index: 10;
        }
        .delete_img {
            color: #E05269;
            bottom: -35px;
            position: absolute;
            left: 14px;
            cursor:pointer;
            z-index: 99;
        }
      }
`;
/* Company Profile styling */
export const CompanyProfileBox = styled.div`
  width: 100%;

  .delete_img {
            color: #E05269;
            top: -10px;
            right: -10px;
            position: absolute;
            cursor: pointer;
            background: #fff;
            border-radius: 4px;
            padding: 4px;
            z-index: 99;
            box-shadow: -2px 0px 2px rgb(8 27 64 / 2%), 2px 0px 2px rgb(8 27 64 / 2%), 0px -2px 2px rgb(8 27 64 / 2%), 0px 2px 4px rgb(8 27 64 / 4%);
          }
          h3 {
              font-size: 20px;
            }
      .notes {
        padding: 20px 0;
        color:#437FEE;
        font-size: 12px;
        display: inline-flex;
        align-items: center;
      }
      .size {
          font-size: 10px;
          color:#8E9595;
        }
      .logo_wrap {
        position: relative;
        padding-bottom:30px;
        border-radius: 5px;
        margin-right: 30px;
        &:hover {
          .logo_hover{
            display:block;
          }
        }
        
      }
    
  .main_logo_wrap {
    position: relative;
    padding-bottom: 30px;
    border-radius: 5px;
    margin-right: 30px;
    &:hover {
      .main_logo_hover {
        display: block;
      }
    }
  }

  .logo_hover,
  .main_logo_hover {
    display: none;
    position: absolute;
    border: 1px solid #04d68f;
    border-radius: 5px;
    background: rgba(4, 214, 143, 0.8);
    color: #fff;
    top: 0;
    left: 0;
    height: 48px;
    width: 100%;
    }
    .change_img {
      position: absolute;
      flex-direction: column;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100%;
      font-size: 12px;
      cursor: pointer;
      z-index: 10;
    }
`;

/* Billing styling */
export const BillingBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  .plan_box {
    padding: 15px;
    border: 2px solid #eff1f1;
    border-radius: 4px;
    width: 100%;
    margin-right: 20px;
    &:last-child {
      margin: 0;
    }
    &.active {
      background: #f1fef8;
      border: 2px solid #b4f3dd;
      .bottom_text {
        color: #04d68f;
      }
      p.plan_size {
        color: #128a81;
      }
      h3 {
        color: #04d68f;
      }
    }
    h3 {
      font-size: 12px;
      color: #8e9595;
      min-height: 27px;
    }
    button {
      font-size: 12px;
    }
    p.plan_size {
      font-size: 16px;
      color: #8e9595;
      font-weight: 700;
      padding: 15px 0 10px 0;
    }
    p.plan_amount {
      color: #0a2828;
      font-size: 20px;
      font-weight: 700;
      padding: 0 0 15px 0;
    }
    .card_detail {
      padding: 10px 0;
      .bottom_text {
        margin-left: 37px;
        font-size: 10px;
      }
      .card_no {
        font-size: 18px;
        color: #0a2828;
        font-weight: 700;
        margin-left: 10px;
      }
    }
    .bottom_text {
      display: flex;
      align-items: center;
      color: #8e9595;
      font-size: 12px;
      line-height: 18px;
    }
  }
`;
export const BillingHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 30px 0;
  .MuiOutlinedInput-root {
    &:hover,
    &:focus {
      fieldset {
        border: 0 !important;
      }
    }
    fieldset {
      border: 0 !important;
    }
  }
  h2 {
    font-size: 18px;
  }
`;
export const BillingTable = styled.div`
  .MuiButton-root {
    padding: 5px;
    font-size: 10px;
  }
  .invoice_btn {
    .MuiButton-root {
      border-color: #d2d4d4;
      color: #0a2828;
    }
  }
  .status_btn {
    &.pending {
      .MuiButton-root {
        background: #d2d4d4;
      }
    }
    .MuiButton-root {
      padding: 0px;
      border: 0;
      width: 80px;
      border-radius: 20px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
  }
`;
export const MySubscriptionBox = styled.div`
  .subcription_box {
    margin: 20px 0;
    padding: 15px;
    border: 2px solid #eff1f1;
    border-radius: 4px;
    color: #455252;
    &.suggested {
      background-color: #f1fef8;
    }
    &.default {
      background-color: #eff1f1;
    }
    p.plan_size {
        font-size: 20px;
        color: #128A81;
        font-weight: 700;
        padding: 10px 0;
      }
      .pkg_list {
        margin: 10px 0;
        padding: 10px 0;
        border-bottom: 2px solid #EFF1F1;
      }
      span.canceled {
    text-decoration-line: line-through;
    color: #17AA78;
    font-size: 10px;
}
.suggested {
    color: #0A2828;
    font-size: 18px;
    font-weight: 700;
    @media screen and (max-width:1440px){
      font-size: 14px;
    }
}

.suggested span {
    background: #04D68F;
    color: #fff;
    padding: 2px 10px;
    border-radius: 4px;
    font-size: 20px;
    @media screen and (max-width:1440px){
      font-size: 14px;
    }
}
  }
`;
export const CompanyUploadFile = styled.div`
   min-height:250px;
   & label{
     min-height:250px;
     background: #afa9a9;
     width: 89.99% !important;
   }
`;