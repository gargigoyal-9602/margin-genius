import globalLayout from "../../../styles/globalLayout.module.scss";
import TopContent from "../../../components/roles/TopContent";
import layout from "../../../styles/layout.module.scss";
import LeftMenuBar from "../../../components/layout/LeftMenuBar";
import Breadcrumb from "../../../components/layout/Breadcrumb";
import Listview from "../../../components/user/ListView";
import SearchBarNav from "../../../components/layout/SearchBarNav";
import {
  MainButton,
  InputText,
  TextLink,
} from "../../../components/formControls.style";
import withAuth from "../../../components/layout/withAuth/index";

import Image from "next/image";

const Index = () => {
  return (
    <>
      <section className={layout.container}>
        <LeftMenuBar />
        <section className={globalLayout.right_section}>
          <div className={globalLayout.right_section_wrap}>
            {/* <Breadcrumb /> */}
            <SearchBarNav />
            {/* <div className={globalLayout.no_table_data}>
                <span><Image src="/icons/admin.svg" width="116" height="116" /></span>
                <p>You have no roles yet.<br/>        
                  Add your first role by clicking a button below</p>
                <MainButton aligncenter="true" fixwidth="auto"><span className={globalLayout.btn_icon}><Image src="/icons/plus-icon.svg" width="16" height="16" /></span>Add a new Role</MainButton>
              </div> */}
            {/* <Listview /> */}
            coming soon....
          </div>
        </section>
      </section>
    </>
  );
};

export default withAuth(Index);
