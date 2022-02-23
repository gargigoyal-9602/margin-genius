import globalLayout from "../../styles/globalLayout.module.scss";
import {
  MainButton,
  OutlineButton,
  SecondaryButton,
} from "../../components/formControls.style";
import layout from "../../styles/layout.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";
const ButtonsWrap = styled.div`
  display: flex;
  margin-left: auto;
  & .btn-prev {
    border: none;
    height: 40px;
    width: 160px;
    border: 1px solid #ece9e9;
    border-radius: 5px;
    background: transparent;
    padding-left: 15px;
    cursor: pointer;
    & span {
      width: 100%;
      position: relative;
      margin: 0 10px;
      &:after {
        content: "";
        position: absolute;
        background: url("../../icons/prev-icon.svg");
        background-repeat: no-repeat;
        height: 12px;
        width: 12px;
        left: -15px;
        top: 0;
      }
    }
  }
`;
const FooterWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  & .btn-skip {
    font-size: 16px;
    background: transparent;
    border: none;
  }
`;
const FooterNav = (props) => {
  const router = useRouter();
  const { elements, prevRoute, nextRoute } = props;

  return (
    <>
      <div className={globalLayout.footer_nav}>
        <FooterWrap>
          <OutlineButton
            onClick={() => router.push(nextRoute)}
            variant="text"
            fixwidth="auto"
            marginbottom="0"
            className={layout.mr_10}
            style={{ border: "0", color: "#0A2828" }}
          >
            Skip this Step
          </OutlineButton>

          <ButtonsWrap>
            {nextRoute !== "/admin/roles" && (
              <button
                onClick={() => router.push(prevRoute)}
                className="btn-prev"
              >
                <span>Previous Step</span>
              </button>
            )}
            {prevRoute !== "/admin/calculators" ? (
              <MainButton
                fixwidth="auto"
                variant="contained"
                onClick={() => router.push(nextRoute)}
                disabled={elements === 0}
                style={{ marginBottom: 0, marginLeft: "30px" }}
              >
                Next Step
              </MainButton>
            ) : (
              <MainButton
                fixwidth="auto"
                variant="contained"
                onClick={() => router.push("/admin/deals")}
                disabled={elements === 0}
                style={{ marginBottom: 0, marginLeft: "30px" }}
              >
                Create New Deal
              </MainButton>
            )}
          </ButtonsWrap>
        </FooterWrap>
      </div>
    </>
  );
};

export default FooterNav;
