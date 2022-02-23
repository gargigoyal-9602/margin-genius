import globalLayout from "../../styles/globalLayout.module.scss";

const CommanLayout = () => {
  return (
    <>
    <div className={globalLayout.top_content}>
      <div className={globalLayout.top_content_text}>
        <h2>Calculators</h2>
        <p>
        In this step you can begin configuring the settings which will create the <br/>calculator that the salesmen will use and manage the settings        </p>
      </div>
      <div className={globalLayout.page_steps}>
        <span>Step </span>
        <span className={globalLayout.page_no}>5</span>
        <span>of</span>
        <span className={globalLayout.page_no}>6</span>
      </div>
    </div>
    </>
  );
};

export default CommanLayout;
