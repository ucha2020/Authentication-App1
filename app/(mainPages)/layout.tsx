import Navbar from "../ui/navbar";
import Footer from "../ui/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" max-w-xl flex flex-col min-h-[90vh] justify-between shadow-[4px_3px_5px_var(--lighter-base)] m-2 border-t-0.5 border-l-0.5 border-(--lighter-base)">
      <header className="border-b-4 border-(--base-color)">
        <nav className="bg-(--lighter-base)">
          <Navbar />
        </nav>
      </header>
      <main className="flex-1 m-2 text-center ">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
