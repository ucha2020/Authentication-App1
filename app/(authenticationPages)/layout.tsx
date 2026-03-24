import Link from "next/link";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`border-t-0.5 sm:max-md relative mx-auto my-2 flex min-h-[90vh] flex-col justify-center shadow-[2px_2px_4px_var(--lighter-base)]`}
    >
      <Link
        href="/"
        className="hover:shadow-[1px 1px 2px rgba(25, 25, 64, 0.5)] absolute top-0 left-0 m-2 flex items-center gap-2 rounded-2xl border-(--base-color) bg-[#e1e1e1] pr-2 pb-px hover:bg-[#d1d1d1] dark:bg-(--base-color) dark:hover:bg-(--base-color) dark:hover:text-[#a2ff33]"
      >
        <svg
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Back
      </Link>
      {children}
    </div>
  );
}

/*button {
  letter-spacing: 0.1em;
  text-align: center;
  line-height: 100%;
  font-size: medium;
  padding: 0.75em 1.5em;
  border: none;
  /*border-radius: calc(2.5em * 0.75);
  border-bottom-left-radius: 30%;
  border-bottom-right-radius: 30%;
  border-top-left-radius: 30%;
  border-top-right-radius: 30%;
  cursor: pointer;
  background-image: linear-gradient(to bottom right, #777777, #dddddd);
  box-shadow: 1px 1px 1px black, inset 2px 3px 5px rgb(0 0 0 / 30%),
    inset -2px -3px 5px rgb(255 255 255 / 50%);
  transition: box-shadow 0.5s, background-image 0.5s, translateY 0.3s ease;
}
.a-btn:active button ul {
  box-shadow: inset 2px 2px 1px black, inset 3px 5px rgb(0 0 0 / 30%),
    inset -2px -3px 5px rgb(255 255 255 / 50%);
  background-image: linear-gradient(to bottom right, #dddddd, #777777);
}
.btn-only:hover,
.a-btn:hover button {
  transform: translateY(-2px);
  box-shadow: 2px 2px 2px;
}*/
