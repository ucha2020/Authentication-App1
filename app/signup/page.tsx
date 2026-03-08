import SignupForm from "@/app/ui/signupForm";
import { Suspense } from "react";

export default function SignupPage() {
  return (
    <main>
      <div>
        <Suspense>
          <SignupForm />
        </Suspense>
      </div>
    </main>
  );
}
