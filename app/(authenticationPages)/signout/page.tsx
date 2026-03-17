"use client";
import { signOutCallBack } from "@/lib/actions/authActions";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import style from "@/app/styles/link.module.css";

export default function SignOutPage() {
  const [state, formAction, isPending] = useActionState(
    signOutCallBack,
    undefined,
  );
  const router = useRouter();
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl font-medium">
        Are you sure you want to sign out?
      </h1>
      <form action={formAction}>
        <button type="submit" className={`mt-4 ${style.Btn}`}>
          {isPending ? "Signing out..." : "Sign out"}
        </button>
      </form>
      <div>
        <button onClick={() => router.back()} className={`mt-4 ${style.Btn}`}>
          Cancel
        </button>
      </div>
    </div>
  );
}
