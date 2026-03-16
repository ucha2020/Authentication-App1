"use client";
/* Reenter password and forget password to be included later*/
import Link from "next/link";
import style from "./link/link.module.css";
import { useActionState } from "react";
import { signup, authenticateUserWithGitHub } from "@/lib/actions/authActions";
import { useSearchParams } from "next/navigation";

export default function SignupForm() {
  const searchParams = useSearchParams();
  const [state, formAction, isPending] = useActionState(signup, undefined);
  const [state_G, formAction_G, isPending_G] = useActionState(
    authenticateUserWithGitHub,
    undefined,
  );

  return (
    <div className="mx-auto">
      <Link
        href="/"
        className="hover:shadow-[1px 1px 2px rgba(25, 25, 64, 0.5)] absolute top-0 left-0 m-2 flex items-center gap-2 rounded-2xl border-(--base-color) bg-[#e1e1e1] pr-2 pb-px hover:bg-[#d1d1d1]"
      >
        <svg
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Back
      </Link>
      <form action={formAction} className="mx-auto">
        <h1 className="text-xl font-medium">Create an account to continue.</h1>
        <div>
          <div className="mt-4">
            <label htmlFor="name">Name</label>
            <div>
              <input
                id="name"
                name="name"
                placeholder="Name"
                className="box-border min-w-55 border border-(--base-color) px-0.5 focus:outline-(--darker-base)"
              />
            </div>

            {
              //state?.errors?.name && <p>{state.errors.name}</p>
              state?.message && <p>{state?.message}</p>
            }
          </div>

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
            {
              state?.message && <p>{state?.message}</p>
              //state?.errors?.email && <p>{state.errors.email}</p>
            }
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
                className="box-border min-w-55 border border-(--base-color) px-0.5 focus:outline-(--darker-base)"
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={isPending}
          className={`mt-4 ${style.Btn}`}
        >
          {isPending ? "Creating..." : "Submit"}
        </button>

        <div>
          {
            state?.message && <p>{state?.message}</p>
            /*{state?.errors?.password && (
              <div>
                <p>Password must:</p>
                <ul>
                  {state.errors.password.map((error) => (
                    <li key={error}>- {error}</li>
                  ))}
                </ul>
              </div>
            )}*/
          }
        </div>
      </form>
      <div className="flex items-center justify-center">
        <div className="w-1/6 border-t border-(--base-color)"></div>
        <span className="px-3 text-(--foreground)">OR</span>
        <div className="w-1/6 border-t border-(--base-color)"></div>
      </div>
      <form key="GitHub" action={formAction_G} className="mx-auto text-center">
        <button disabled={isPending_G} className={`${style.Btn}`}>
          {isPending_G ? "Creating..." : "Sign in with GitHub"}
        </button>
      </form>
    </div>
  );
}
