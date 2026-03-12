"use client";
import { useActionState } from "react";
import Link from "next/link";
import {
  authenticateUserWithCredencials,
  authenticateUserWithGitHub,
} from "@/lib/actions/authActions";
import { useSearchParams } from "next/navigation";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [state, formAction, isPending] = useActionState(
    authenticateUserWithCredencials,
    undefined,
  );
  const [state_G, formAction_G, isPending_G] = useActionState(
    authenticateUserWithGitHub,
    undefined,
  );

  return (
    <div>
      <form action={formAction}>
        <div>
          <h1>Please log in to continue.</h1>
          <div>
            <div>
              <label htmlFor="email">Email</label>
              <div>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="password">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  required
                  minLength={6}
                />
              </div>
            </div>
          </div>
          <input type="hidden" name="redirectTo" value={callbackUrl} />
          <button disabled={isPending}>
            {isPending ? "Creating..." : "Submit"}
          </button>

          <div>
            {state && (
              <>
                <p>{state.message}</p>
              </>
            )}
          </div>
        </div>
      </form>
      <form key="GitHub" action={formAction_G}>
        <button disabled={isPending_G}>
          {isPending ? "Creating..." : "Sign in with GitHub"}
        </button>
        <div>
          {state_G && (
            <>
              <p>{state_G}</p>
            </>
          )}
        </div>
      </form>
      <p>Don`t have an account?</p>
      <Link href="/signup">
        <button>Create a new account</button>
      </Link>
    </div>
  );
}
