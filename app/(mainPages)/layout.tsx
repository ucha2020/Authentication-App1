import Navbar from "../ui/navbar";
import Footer from "../ui/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="border-t-0.5 mx-auto my-2 flex min-h-[90vh] max-w-xl flex-col justify-between border-l border-[#e1e1ff] shadow-[4px_3px_5px_var(--lighter-base)]">
      <header className="border-b-4 border-(--base-color)">
        <nav className="bg-(--lighter-base)">
          <Navbar />
        </nav>
      </header>
      <main className="m-2 flex-1 text-center">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
