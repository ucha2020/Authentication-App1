import { auth } from "@/lib/auth";
import UpgradeButton from "@/app/ui/upgradeButton";

export const metadata = {
  title: "Admin Dashboard",
};

export default async function Admin() {
  const session = await auth();

  // If user is not admin
  if (!session?.user?.role || session.user.role !== "ADMIN") {
    return (
      <div className="p-8 text-xl">
        <p className="mb-4 font-semibold text-red-600">Not authorized</p>
        <p className="mb-4">You must be an admin to view this page.</p>

        {session?.user?.email ? (
          <UpgradeButton userEmail={session.user.email!} />
        ) : (
          <p>No user session found.</p>
        )}
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold">Admin Page</h1>
      <p>Welcome, Admin! You have full access.</p>
    </div>
  );
}
