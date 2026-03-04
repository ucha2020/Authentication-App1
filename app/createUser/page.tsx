import UserCreationForm from "@/app/ui/userCreationForm ";
import { Suspense } from "react";

export default function CreateUserPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <Suspense>
          <UserCreationForm />
        </Suspense>
      </div>
    </main>
  );
}
