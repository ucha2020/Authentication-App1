"use client";
import { useActionState } from "react";
import Link from "next/link";
import {
  authenticateUserWithCredencials,
  authenticateUserWithGitHub,
} from "@/app/lib/actions";
import { useSearchParams } from "next/navigation";
import { signIn, auth } from "@/lib/auth.ts";
import { AuthError } from "next-auth";

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
    <>
      <form action={formAction} className="space-y-3">
        <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
          <h1 className=" mb-3 text-2xl">Please log in to continue.</h1>
          <div className="w-full">
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
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

          <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            {state && (
              <>
                <p className="text-sm text-red-500">{state}</p>
              </>
            )}
          </div>
        </div>
      </form>
      <form key="GitHub" action={formAction_G}>
        <button disabled={isPending_G}>
          {isPending ? "Creating..." : "Sign in with GitHub"}
        </button>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {state_G && (
            <>
              <p className="text-sm text-red-500">{state_G}</p>
            </>
          )}
        </div>
      </form>
      <p>Don`t have an account?</p>
      <Link href="/createUser">
        <button>Create a new account</button>
      </Link>
    </>
  );
}
