import styles from '../../styles/login.module.scss';
import Drawer from '@mui/material/Drawer';
import Image from 'next/image';

const rightSection = () => {
    return (
      <>
      {/* <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          > */}
        <section className={styles.right_side}>
          <div className={styles.icons}>
            <div className={styles.right_icons}>
              <Image
                src="/icons/ico1.svg"
                height="100"
                width="100"
                className={styles.right_ico}
                alt="icon"
              />
              <Image
                src="/icons/ico2.svg"
                height="100"
                width="100"
                className={styles.right_ico}
                alt="icon"
              />
              <Image
                src="/icons/ico3.svg"
                height="100"
                width="100"
                className={styles.right_ico}
                alt="icon"
              />
              <Image
                src="/icons/ico4.svg"
                height="100"
                width="100"
                className={styles.right_ico}
                alt="icon"
              />
              <Image
                src="/icons/ico5.svg"
                height="100"
                width="100"
                className={styles.right_ico}
                alt="icon"
              />
            </div>
            <div className={styles.right_icons}>
              <Image
                src="/icons/ico6.svg"
                height="100"
                width="100"
                className={styles.right_ico}
                alt="icon"
              />
              <Image
                src="/icons/ico7.svg"
                height="100"
                width="100"
                className={styles.right_ico}
                alt="icon"
              />
              <Image
                src="/icons/ico8.svg"
                height="100"
                width="100"
                className={styles.right_ico}
                alt="icon"
              />
              <Image
                src="/icons/ico9.svg"
                height="100"
                width="100"
                className={styles.right_ico}
                alt="icon"
              />
              <Image
                src="/icons/ico10.svg"
                height="100"
                width="100"
                className={styles.right_ico}
                alt="icon"
              />
              <Image
                src="/icons/ico11.svg"
                height="100"
                width="100"
                className={styles.right_ico}
                alt="icon"
              />
            </div>
          </div>
        </section>
        {/* </Drawer> */}
      </>
    );
}

export default rightSection

