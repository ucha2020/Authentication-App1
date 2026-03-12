import SignupForm from "@/app/ui/signupForm";
import { Suspense } from "react";

export default function SignupPage() {
  return (
    <Suspense>
      <SignupForm />
    </Suspense>
  );
}
