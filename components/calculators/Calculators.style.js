import styled from "styled-components";

export const TabBox = styled.div`
.MuiTabs-root{
  border-bottom: 1px solid #EFF1F1;
  .MuiTabs-flexContainer {
    justify-content: space-around;
  }
}
  .MuiTabPanel-root {
    padding: 20px;
  }
`;

export const AccordionBox = styled.div`
.MuiPaper-root {
  box-shadow: none;
  border-radius: 4px;
  border: 1px solid #EFF1F1;
  margin-bottom: 15px;
  &:before {
    display: none;
  }
  .title {
    font-size: 16px;
    color:#000;
  }
}
&.border-0{
  border-radius: 4px;
  border: 1px solid #EFF1F1;
  margin-bottom: 15px;
  .MuiPaper-root {
    border:none;
  }
  & .mb-0{
    margin-bottom: 0;
    margin-top:0;
  }
}
`

export const TabContentWrap = styled.div`
   & .tbl-list{}
   & .menu-list{
     width:275px;
   }
   & .scroll{
     max-height:190px;
     overflow-y:auto;
     ::-webkit-scrollbar {width: 4px;}
     ::-webkit-scrollbar-track { background: transparent;}
     ::-webkit-scrollbar-thumb {background: #EFF1F1;}
      & .tbl-row{
        outline: 1px solid rgba(239,241,241,1);
        border:1px solid rgba(239,241,241,1);
        margin-right:10px;
        margin-bottom: 1px;
        border-radius: 6px;
        &:hover{
          border:1px solid #A0DBD6;
          cursor: pointer;
          & svg{
            display: block;
          }
        }
      }
   }
   & .tbl-row{
      display: flex;
      padding: 12px;
      justify-content: space-between;
      outline: 1px solid transparent;
      & p.color-gray{
         color:#8E9595;
         font-size: 0.8rem;
      }
      & p{
        margin-left:7px;
        font-size:0.8rem;
      }
      & div.Name{
         width:60%;
         display: flex;
         align-items: center;
         & span.MuiCheckbox-root{
             padding:0;
         }
      }
      & div.date{
        width:40%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        & svg{
          fill:#e05269;
          height: 20px;
          cursor: pointer;
          width: 20px;
          display: none;
        }
      }
   }
   &.history{
     & .tbl-list{
       margin-top:15px;
     }
     & .scroll{
       max-height:400px;
     }
   }
`;

export const MenuList = styled.div`
  width:275px;
  padding: 5px 15px 15px;
  max-height:350px;
  overflow: auto;
  margin-right: 5px;
  ::-webkit-scrollbar {width: 4px;}
     ::-webkit-scrollbar-track { background: transparent;}
     ::-webkit-scrollbar-thumb {background: #EFF1F1;}
  & .MuiTextField-root {
     margin-bottom: 15px;
  }

  & li{
    padding:5px;
     &:hover{
       background:transparent;
     }
  }
  & p{
     margin: 10px 0;
     color:#0A2828;
     font-weight:700;
  }
  & .border.block{
    border-top:1px solid #f1f1f1;
    padding-top: 10px;
    margin-top:10px;
  }
`;

export const TextWrap = styled.div`
   margin:10px 0;
     & .border-0{
    & input{
      padding:0;
      color:#51d790;
    }
    & fieldset{
      border:none;
    }
  }
`;

