import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";
import styles from "../styles/layout.module.scss";

const ErrorPage = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 3000);
  }, []);
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Error Page</title>
          <meta name="description" content="Margin Genius" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1>Error Page</h1>
        </main>

        <footer className={styles.footer}></footer>
      </div>
    </>
  );
};

export default ErrorPage;
