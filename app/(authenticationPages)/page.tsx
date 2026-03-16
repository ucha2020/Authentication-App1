import PageLink from "../ui/link/pagelink";

const HomePage = async () => {
  return (
    <div className="m-2 flex flex-col text-center">
      <div>
        <h1 className="text-lg font-semibold">
          Welcome to authentication App with{" "}
        </h1>
        <h1 className="text-lg font-semibold">
          Next.js + Auth.js + Prisma + TypeScript
        </h1>
        <h1 className="text-lg font-semibold">and TailWind CSS</h1>
        <div>
          <PageLink href="/dashboard">Proceed to dashboard</PageLink>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-1/6 border-t border-(--base-color)"></div>
          <span className="px-3 text-(--foreground)">OR</span>
          <div className="w-1/6 border-t border-(--base-color)"></div>
        </div>

        <div>
          <PageLink href="/login">Signin to proceed to dashboard</PageLink>
        </div>
        <div>
          <PageLink href="/signup">Signup to create an account</PageLink>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
