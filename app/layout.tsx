import type { Metadata } from "next";
import "./globals.css";

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
      <body className="flex flex-col items-center">{children}</body>
    </html>
  );
}
