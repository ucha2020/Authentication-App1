import Link from "next/link";

const HomePage = async () => {
  return (
    <div>
      <div>
        <h1>
          Welcome to authentication Next.js with app with Auth.js + Prisma
        </h1>
        <div>
          <Link href="/">
            <button type="button">Home</button>
          </Link>
        </div>
        <div>
          <Link href="/about">
            <button type="button">About</button>
          </Link>
        </div>
        <div>
          <Link href="/dashboard">
            <button type="button">Proceed to dashboard</button>
          </Link>
        </div>

        <p>or</p>
        <div>
          <Link href="/login">
            <button type="button">Signin to proceed to dashboard</button>
          </Link>
        </div>
        <div>
          <Link href="/signup">
            <button type="button">Signup to proceed dashboard</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
