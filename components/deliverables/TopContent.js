import globalLayout from "../../styles/globalLayout.module.scss";

const CommanLayout = () => {
  return (
    <>
    <div className={globalLayout.top_content}>
      <div className={globalLayout.top_content_text}>
        <h2>Deliverables</h2>
        <p>
          In this step, please input the individual services that your company offers to your clientele.
        </p>
      </div>
      <div className={globalLayout.page_steps}>
        <span>Step </span>
        <span className={globalLayout.page_no}>3</span>
        <span>of</span>
        <span className={globalLayout.page_no}>6</span>
      </div>
    </div>
    </>
  );
};

export default CommanLayout;
