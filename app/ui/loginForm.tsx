"use client";
import { FaGithub, FaEye, FaEyeSlash } from "react-icons/fa";
import { useActionState, useState } from "react";
import Link from "next/link";
import style from "@/app/styles/link.module.css";
import {
  authenticateUserWithCredencials,
  authenticateUserWithGitHub,
} from "@/lib/actions/authActions";
import { useSearchParams } from "next/navigation";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="mx-auto">
      <form action={formAction} className="flex flex-col items-center">
        <h1 className="text-xl font-medium">Please log in to continue.</h1>
        <div>
          {state && (
            <p className="mt-2 text-sm text-red-400">{state.message}</p>
          )}
        </div>
        <div>
          <div className="mt-4">
            <label htmlFor="email">Email</label>
            <div>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
                className="box-border min-w-55 border border-(--base-color) px-0.5 focus:outline-(--darker-base)"
              />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="password">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
                className="box-border min-w-55 border border-(--base-color) px-0.5 focus:outline-(--darker-base)"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-0 right-0 h-full px-2 text-(--foreground)"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
        </div>
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <button disabled={isPending} className={`${style.Btn}`}>
          {isPending ? "Creating..." : "Submit"}
        </button>
      </form>
      <div className="flex items-center justify-center">
        <div className="w-1/3 border-t border-(--base-color)"></div>
        <span className="px-3 text-(--foreground)">OR</span>
        <div className="w-1/3 border-t border-(--base-color)"></div>
      </div>
      <form key="GitHub" action={formAction_G} className="mx-auto text-center">
        <button disabled={isPending_G} className={`${style.Btn}`}>
          {isPending_G ? "Signing in..." : "Sign in with GitHub"}
          <FaGithub className="ml-3 inline text-(--light-base) dark:text-(--darker-base)" />
        </button>
        <div>
          {state_G && (
            <>
              <p>{state_G}</p>
            </>
          )}
        </div>
      </form>
      <p className="text-center">Don`t have an account?</p>
      <Link href="/signup" className={`${style.Btn}`}>
        Create a new account
      </Link>
    </div>
  );
}
