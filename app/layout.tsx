import type { Metadata } from "next";
import "./globals.css";
import styles from "./layout.module.css";
import Navbar from "./ui/navbar/navbar";
import Footer from "./ui/footer/footer";
export const metadata: Metadata = {
  title: "Authentication App with Next.js + Auth.js + Prisma",
  description: `This is an authentication app scaffolded with Create Next App 
  and built with Next.js, Auth.js, and Prisma.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={styles.body}>
        <header>
          <nav>
            <Navbar />
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
