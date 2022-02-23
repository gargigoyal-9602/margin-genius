import Image from 'next/image'
import styles from '../styles/layout.module.scss'
import Welcome from "./auth/welcome"
import { useRouter } from 'next/router'



export default function Home() {
  const router = useRouter()
  return (
    // <div className={styles.container}>
        <Welcome/>
    // </div>
  )
}
