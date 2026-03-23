"use client";

import style from "@/app/styles/link.module.css";
import { useActionState } from "react";
import { upgradeUserToAdmin } from "@/lib/actions/authActions";

export default function UpgradeButton({ userEmail }: { userEmail: string }) {
  const [state, formAction, isPending] = useActionState(
    upgradeUserToAdmin,
    undefined,
  );
  return (
    <form action={formAction}>
      <input type="hidden" name="userEmail" value={userEmail} />
      <button disabled={isPending} className={`mt-4 ${style.Btn}`}>
        {isPending ? "Upgrading..." : "Upgrade to Admin"}
      </button>
      {state && <p>{state}</p>}
    </form>
  );
}
