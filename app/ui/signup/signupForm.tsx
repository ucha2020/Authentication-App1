"use client";
/* Reenter password to be included later*/
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
    <>
      <form action={formAction}>
        <div>
          <h1>Create an account to continue.</h1>
          <div>
            <div>
              <label htmlFor="name">Name</label>
              <input id="name" name="name" placeholder="Name" />
              {
                //state?.errors?.name && <p>{state.errors.name}</p>
                state?.message && <p>{state?.message}</p>
              }
            </div>

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
                />
              </div>
            </div>
          </div>
          <button disabled={isPending}>
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
        </div>
      </form>
      <form key="GitHub" action={formAction_G}>
        <button disabled={isPending_G}>
          {isPending_G ? "Creating..." : "Sign in with GitHub"}
        </button>
      </form>
    </>
  );
}
