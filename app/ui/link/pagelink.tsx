"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./link.module.css";
import { ReactNode } from "react";

type NavLinkProps = {
  href: string;
  children: ReactNode;
};

export default function PageLink({ href, children }: NavLinkProps) {
  const pathName = usePathname();
  return (
    <Link href={href} className={`${styles.Btn} `}>
      {children}
    </Link>
  );
}
