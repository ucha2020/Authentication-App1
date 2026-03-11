import Link from "next/link";
import styles from "./link.module.css";
import { ReactNode } from "react";

type NavLinkProps = {
  href: string;
  children: ReactNode;
};

export default function NavLink({ href, children }: NavLinkProps) {
  return (
    <Link href={href} className={styles.navlink}>
      {children}
    </Link>
  );
}
