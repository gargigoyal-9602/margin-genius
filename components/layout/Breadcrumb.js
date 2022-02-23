import globalLayout from "../../styles/globalLayout.module.scss";
import Image from "next/image";
import Link from "next/link";

const Breadcrumb = (props) => {
  const { element } = props;
  return (
    <>
      <div className={globalLayout.breadcrumb}>
        <ul>
          <li>
            <Image
              src="/icons/home.svg"
              width="15"
              height="15"
              alt=""
              className={globalLayout.home}
              
            />
            <Link href="/admin/dashboard" className={globalLayout.nav_link}>
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Image
              src="/icons/greaterthan.svg"
              width="10"
              height="10"
              alt=""
              className={globalLayout.greaterthan}
            />
            <Link href="/" className={globalLayout.nav_link}>
              <a>{element}</a>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Breadcrumb;
