import layout from "../../styles/layout.module.scss";
import Image from "next/image";
import Link from "next/link";

const CommanLayout = () => {
  return (
    <>
    <div className={layout.mb_20}>
      <h1 className={layout.h1}>
      <Link href="/">
                      <a>
                        <Image
                          src="/icons/back-icon-grey.svg"
                          height="25"
                          width="25"
                          layout="fixed"
                          alt="back_icon"
                        />
                      </a>
                    </Link>
        <span className={layout.ml_20}>Domino’s Pizza Website Redesign</span></h1>
    </div>
    </>
  );
};

export default CommanLayout;
