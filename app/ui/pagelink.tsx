"use client";
import Link from "next/link";
import styles from "@/app/styles/link.module.css";
import { ReactNode } from "react";

type NavLinkProps = {
  href: string;
  children: ReactNode;
};

export default function PageLink({ href, children }: NavLinkProps) {
  return (
    <Link href={href} className={`${styles.Btn} `}>
      {children}
    </Link>
  );
}
