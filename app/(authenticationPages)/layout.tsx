import style from "./styles.module.css";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`border-t-0.5 sm:max-md mx-auto my-2 flex min-h-[90vh] flex-col justify-center shadow-[2px_2px_4px_var(--lighter-base)]`}
    >
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
