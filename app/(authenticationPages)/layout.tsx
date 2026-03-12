export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col bg-(--background) text-(--foreground) max-w-xl  min-h-screen justify-center">
      {children}
    </div>
  );
}
