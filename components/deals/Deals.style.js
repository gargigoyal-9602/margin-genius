import styled from "styled-components";

export const PageTitle = styled.h2`
  padding-top: 10px;
  font-size: 30px;
  line-height: 38px;
  margin-bottom: 25px;
  & span.icon{
       margin-right:26px;
  }
`;
export const TabBox = styled.div`
.MuiTabs-root{
  .MuiTabs-flexContainer {
    justify-content: space-around;
    button{
      flex: 1;
      color:#778080;
      text-transform: capitalize;
      font-size: 15px;
      min-height: 52px;
      cursor: pointer;
      &.Mui-selected{
        background:#F1FEF8;
        color:#0A2828;
      }
      &:hover{
           background:#F1FEF8;
           color:#0A2828;
           & svg{
                fill:#04D68F;
           } 
      }
    }
  }
}
  .MuiTabPanel-root {
    padding: 20px;
  }
`;

/*================================Tab Content================================*/
export const TabContent = styled.div`
    padding-top:25px;
    & .sub-title{
        h2{
           font-size: 20px;
           margin-bottom:20px;
        }
    }
    & .searchbox-wrap{
       width:340px;
       margin-bottom: 25px;
       & input{
        height: 36px;
        padding: 0;
       }
    }
    &.details{
      display: flex;
      flex-direction:column;
      min-height:650px;
      justify-content: space-between;
      & .Mui-disabled{
            background-color: #F8F8F8;
            color:#0A2828;
            
            & fieldset{
              border:1px solid transparent;
            }
      }
    }
    & .row{
         display:flex;
         & .col{
              width:300px;
              & .search{
                & input.MuiInputBase-input{
                  height:36.7px;
                  padding:0;
                }
              }
              & .display{
                border: 1px solid #04D68F;
                box-sizing: border-box;
                border-radius: 4px;
                padding: 6px 16px;
                min-height:56px;
                margin-right:10px;
                span{
                    font-size: 12px;
                    line-height: 20px;
                    color:#8E9595;
                    margin-bottom: 7px;
                    display: block;
                }
                strong{
                  font-size: 12px;
                  color:#437FEE;
                  font-weight: 700;
                  display:block;
                }
             }
         }
         &.v2{
           justify-content: space-between;
           & .col{
             width:24%;
           }
         }
         &.v3{
           margin-top:40px;
           justify-content: flex-end;
           & .col{
             width:24%;
           }
         }
       
    }
    & .buttonWrap{
           display: flex;
           justify-content: space-between;
           align-items: center;
    }

    & .deal-information{
      border-top:1px solid #EFF1F1;
      padding:30px 0 15px 0;   
       display: flex;
       margin-top:25px;
       justify-content: space-between;

      & .cell{
          p{
            font-size:15px;
            font-weight: bold;
            color:#0A2828;
            margin-bottom: 10px;
          }
          strong{
            font-size: 22px;
            color:#437FEE;
          }
      }
    }
    //Contact
    & .sub-title{
      margin-top:25px;
      margin-bottom:25px;
      display:flex;
      justify-content: space-between;
      align-items: center;
      h4{
        font-size:20px;
      }
      & div{
        & button{
            border:none;
            background:transparent;
            padding: 10px;
            border: 1px solid #f8f8f8;
            border-radius: 5px;
            margin-left: 12px;
            cursor: pointer;
        }
      }
    }
    //comment
    & .comment-box{
      width: 462px;
      margin: 0 auto;
      height: 555px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      & span{
        font-size: 16px;
        line-height: 24px;
        margin:27px 0 16px 0;
        display:inline-block;
        color:#778080;
        text-align: center;
      }
      & .buttonwrap{
        display:flex;
        align-items: flex-end;
        & button{
          margin-left:25px;
          background:#02665E;
          border:2px solid #02665E;
           
          
        }
      }
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
    font-size: 14px;
    color:#000;
    width:100%;
    display: flex;
    justify-content: space-between;
    padding-right: 10px;
    & span.color-gray{
      color:#778080;
    }
    & strong.color-green{
      color:#17AA78;
      font-size: 16px;
    }
  }
}
`;

export const TblPackage = styled.div`
  & thead{
    & th{
      padding-top:0;
      padding-bottom:0;
      border:none;
      color:#8E9595;
      line-height: 30px;
      & strong{
        font-weight: 700;
      }
    }
  }
  & tbody{
    background:#f8f8f8;
    &.v2{
      background-color: transparent;
    }
  }
`;