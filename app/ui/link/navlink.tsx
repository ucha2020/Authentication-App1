"use client";
import Link from "next/link";
import styles from "./link.module.css";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  children: ReactNode;
};

export default function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={`${styles.navlink} ${pathname === href ? styles.activeNav : ""}`}
    >
      {children}
    </Link>
  );
}
