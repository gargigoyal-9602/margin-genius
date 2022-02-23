import globalLayout from "../../styles/globalLayout.module.scss";

const CommanLayout = () => {
  return (
    <>
    <div className={globalLayout.top_content}>
      <div className={globalLayout.top_content_text}>
        <h2>Roles</h2>
        <p>
        In this step, please input the high level information for the specific job<br/> roles that the calculator will help build individual service pricing from.
        </p>
      </div>
      <div className={globalLayout.page_steps}>
        <span>Step </span>
        <span className={globalLayout.page_no}>2</span>
        <span>of</span>
        <span className={globalLayout.page_no}>6</span>
      </div>
    </div>
    </>
  );
};

export default CommanLayout;
