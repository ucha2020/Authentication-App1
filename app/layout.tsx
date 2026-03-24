import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import ThemeToggle from "./ui/theme-toggle";

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
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[#f2f2f68d]">
        <Providers>
          <div className="relative mx-auto my-2 w-[clamp(320px,90%,500px)] bg-(--background) text-(--foreground)">
            <ThemeToggle />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
