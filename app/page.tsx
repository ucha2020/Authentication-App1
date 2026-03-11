import PageLink from "./ui/link/pagelink";

const HomePage = async () => {
  return (
    <div>
      <div>
        <h1>Welcome to authentication App with Next.js + Auth.js + Prisma</h1>
        <div>
          <PageLink href="/">
            <button type="button">Home</button>
          </PageLink>
        </div>
        <div>
          <PageLink href="/about">
            <button type="button">About</button>
          </PageLink>
        </div>
        <div>
          <PageLink href="/dashboard">
            <button type="button">Proceed to dashboard</button>
          </PageLink>
        </div>

        <div className="flex items-center">
          <div className="flex-grow border-t border-[var(--base-color)]"></div>
          <span className="px-3 text-[var(--base-color)]">OR</span>
          <div className="flex-grow border-t border-[var(--base-color)]"></div>
        </div>

        <div>
          <PageLink href="/login">
            <button type="button">Signin to proceed to dashboard</button>
          </PageLink>
        </div>
        <div>
          <PageLink href="/signup">
            <button type="button">Signup to proceed dashboard</button>
          </PageLink>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
