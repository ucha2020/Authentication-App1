import Navbar from "../ui/navbar";
import Footer from "../ui/footer";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="border-t-0.5 sm:max-md mx-auto my-2 flex min-h-[90vh] flex-col justify-between shadow-[4px_3px_5px_var(--lighter-base)]">
      <header className="border-b-4 border-(--base-color)">
        <nav className="bg-(--lighter-base)">
          <Navbar />
        </nav>
      </header>
      <main className="m-2 flex-1 pt-8 text-center">
        {children}
        <p className="mt-8 flex justify-center">
          <Link
            href="/signout"
            className="hover:shadow-[1px 1px 2px rgba(25, 25, 64, 0.5)] PY-2 m-2 rounded-2xl border-(--base-color) bg-[#e1e1e1] px-4 hover:bg-[#d1d1d1] dark:bg-(--base-color) dark:hover:bg-(--base-color) dark:hover:text-[#a2ff33]"
          >
            Sign out
          </Link>
        </p>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
