import PageLink from "../ui/link/pagelink";

const HomePage = async () => {
  return (
    <div className=" flex flex-col  m-2 text-center">
      <div>
        <h1>Welcome to authentication App with Next.js + Auth.js + Prisma</h1>

        <div>
          <PageLink href="/dashboard">
            <button type="button">Proceed to dashboard</button>
          </PageLink>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-1/3 border-t border-(--base-color)"></div>
          <span className="px-3 text-(--foreground)">OR</span>
          <div className="w-1/3 border-t border-(--base-color)"></div>
        </div>

        <div>
          <PageLink href="/login">
            <button type="button">Signin to proceed to dashboard</button>
          </PageLink>
        </div>
        <div>
          <PageLink href="/signup">
            <button type="button">Signup to create an account</button>
          </PageLink>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
