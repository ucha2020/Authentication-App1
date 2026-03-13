import Navbar from "../ui/navbar";
import Footer from "../ui/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" max-w-xl flex flex-col min-h-screen justify-between">
      <header>
        <nav>
          <Navbar />
        </nav>
      </header>
      <main className="flex-1 ">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
/*box-shadow: 4px 3px 5px var(--light-base),
    inset 8px 5px 50px var(--light-base);
  margin-block: 10px;
  margin-inline-end: 10px;*/
