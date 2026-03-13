export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col  max-w-xl  min-h-[90vh] justify-center shadow-[4px_3px_5px_var(--lighter-base)] m-2 border-t-0.5 border-l-0.5 border-(--lighter-base)">
      {children}
    </div>
  );
}

//box-shadow: 4px 3px 5px var(--light-base),
//  inset 8px 5px 50px var(--light-base);
