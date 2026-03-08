import Link from "next/link";

const HomePage = async () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-neutral-800 rounded-lg p-6 max-w-xl w-full">
        <h1 className="text-white text-xl mb-4 text-center">
          Welcome to Auth.js + Prisma App
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
