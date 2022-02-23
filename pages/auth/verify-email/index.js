import styles from "../../../styles/login.module.scss";
import layout from "../../../styles/layout.module.scss";
import { MainButton } from "../../../components/formControls.style";
import RightSection from "../../../components/layout/rightSection";
import Image from "next/image";
import { toast } from "react-toastify";
import axios from "axios";
import tokenExpired from "../../../components/layout/withAuth/tokenExpired";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loader from "../../../components/Loader";

function Index() {
  const router = useRouter();
  const { email } = router.query;
  const [loading, setLoading] = useState(false);

  //handle resend verify
  const handleresend = async () => {
    setLoading(true);

    try {
      const response =
        email &&
        (await axios({
          method: "post",
          url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/resend?email=${email}`,
        }));
      response &&
        toast.success(response?.data?.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      // router.push(`/auth/verify-email?email=${values.email}`);
    } catch (err) {
      tokenExpired(err, router);
    }
    setLoading(false);
  };

  return (
    <>
      <Loader loading={loading} />

      <section className={styles.container}>
        <section className={styles.left_side}>
          <div className={styles.header}>
            <Image
              src="/mg-logo.svg"
              height="80"
              width="200"
              layout="fixed"
              alt="logo"
            />
          </div>
          <div className={styles.welcome_center}>
            <div className={styles.welcome_content}>
              <div style={{ textAlign: "center", marginTop: "100px" }}>
                <Image
                  src="/icons/varify-email.svg"
                  alt=""
                  height={109}
                  width={128}
                />
                <h1>Verify your email address</h1>
                <p>
                  In order to start using your Margin Genius account, you need
                  to confirm your email address.
                </p>
                <MainButton variant="contained" onClick={() => handleresend()}>
                  Resend Verification Link
                </MainButton>
              </div>
            </div>
          </div>
        </section>
        <RightSection />
      </section>
    </>
  );
}

export default Index;
