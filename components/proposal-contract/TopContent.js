import globalLayout from "../../styles/globalLayout.module.scss";

const CommanLayout = () => {
  return (
    <>
    <div className={globalLayout.top_content}>
      <div className={globalLayout.top_content_text}>
        <h2>Proposal / Contract</h2>
        <p>
        In this step you can configure the aesthetics of what the exported<br/> scopes of work will look like when they are presented to a customer.
        </p>
      </div>
      <div className={globalLayout.page_steps}>
        <span>Step </span>
        <span className={globalLayout.page_no}>6</span>
        <span>of</span>
        <span className={globalLayout.page_no}>6</span>
      </div>
    </div>
    </>
  );
};

export default CommanLayout;
