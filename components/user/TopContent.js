import globalLayout from "../../styles/globalLayout.module.scss";
import layout from "../../styles/layout.module.scss";

const CommanLayout = (props) => {
  const { count } = props;
  return (
    <>
      <div className={globalLayout.top_content}>
        <div className={globalLayout.top_content_text}>
          <h2>List of Users</h2>
        </div>
        <div className={globalLayout.page_steps}>
          <span className={layout.mr_20}>Total Number of Accounts </span>{" "}
          <span>{count}</span>
        </div>
      </div>
    </>
  );
};

export default CommanLayout;
