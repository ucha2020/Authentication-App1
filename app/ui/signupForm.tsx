"use client";
/* Reenter password and forget password to be included later*/
import style from "@/app/styles/link.module.css";
import { useActionState, useState } from "react";
import { signup, authenticateUserWithGitHub } from "@/lib/actions/authActions";
import { FaGithub, FaEye, FaEyeSlash } from "react-icons/fa6";
//import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(signup, undefined);
  const [state_G, formAction_G, isPending_G] = useActionState(
    authenticateUserWithGitHub,
    undefined,
  );

  return (
    <div className="mx-auto">
      <form action={formAction} className="mx-auto">
        <h1 className="text-xl font-medium">Create an account to continue.</h1>
        <div className="flex flex-col items-center">
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
          </div>
          {state?.nameMessage && (
            <p className="mt-2 text-sm text-red-500">{state?.nameMessage} </p>
          )}

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
          {
            state?.emailMessage && (
              <p className="mt-2 text-sm text-red-500">{state?.emailMessage}</p>
            )
            //state?.errors?.email && <p>{state.errors.email}</p>
          }

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
          {state?.passwordMessage && (
            <p className="mt-2 text-sm text-red-500">
              {state?.passwordMessage}
            </p>
          )}
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isPending}
            className={`mt-4 ${style.Btn}`}
          >
            {isPending ? "Creating account..." : "Create Account"}
          </button>
        </div>
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
      </form>
    </div>
  );
}
