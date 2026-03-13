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
