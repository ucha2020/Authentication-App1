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
      <body className="min-h-screen bg-(--background) text-(--foreground)">
        <div className="sm:max-md mx-auto my-2 max-w-xs">{children}</div>
      </body>
    </html>
  );
}
