import styles from "./footer.module.css";
export default function Footer() {
  return (
    <p className={styles.footer}>
      © {new Date().getFullYear()} Authentication-App1. All rights reserved.
    </p>
  );
}
