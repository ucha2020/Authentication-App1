export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="border-t-0.5 sm:max-md mx-auto my-2 flex min-h-[90vh] flex-col justify-center border-l border-[#e1e1ff] shadow-[4px_3px_5px_var(--lighter-base)]">
      {children}
    </div>
  );
}

//box-shadow: 4px 3px 5px var(--light-base),
//  inset 8px 5px 50px var(--light-base);
