import globalLayout from "../../styles/globalLayout.module.scss";

const CommanLayout = () => {
  return (
    <>
    <div className={globalLayout.top_content}>
      <div className={globalLayout.top_content_text}>
        <h2>Department Markup</h2>
        <p>
        Discover best markup for your business! To get started, enter all the<br/> fields below and we will automatically calculate the rest.        </p>
      </div>
      <div className={globalLayout.page_steps}>
        <span>Step </span>
        <span className={globalLayout.page_no}>1</span>
        <span>of</span>
        <span className={globalLayout.page_no}>6</span>
      </div>
    </div>
    </>
  );
};

export default CommanLayout;
