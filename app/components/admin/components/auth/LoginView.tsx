"use client";

import { Logo, Button, Input } from "@/app/components";
//import { useUI } from "@/app/components/context";
import { authenticate } from "@lib/actions/actions";
import { useFormState, useFormStatus } from "react-dom";
import { useState } from "react";
//import { signIn } from "@/auth";
import { signIn } from "next-auth/react";
import { Google } from "@/app/components/icons";

const LoginView: React.FC = () => {
  // const { setModalView, closeModal } = useUI();

  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const [message, setMessage] = useState("");

  return (
    <form
      action={dispatch}
      className="w-80 flex flex-col justify-between p-6 space-y-4 rounded-lg "
    >
      <div className="flex justify-center pb-8">
        <Logo width="64px" height="64px" />
      </div>

      <div className="flex flex-col space-y-4">
        {errorMessage && (
          <div className="text-accent-danger-600 text-sm">{errorMessage}</div>
        )}

        <Input type="email" id="email" name="email" placeholder="Email" />
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
        />

        <div className="flex justify-center pt-4">
          <LoginButton
          // className="w-full bg-primary-700 hover:bg-primary-900 text-primary-100 py-2 rounded-md"
          />
        </div>

        <div className="flex items-center my-6">
          <hr className="w-full border-primary-300" />
          <span className="px-3 text-primary-500 bg-primary-100">or</span>
          <hr className="w-full border-primary-300" />
        </div>

        <button
          type="button"
          className="w-full bg-blue-600 hover:bg-blue-700 text-primary-100 py-2 rounded-md"
          onClick={(event) => {
            event.stopPropagation();
            signIn("google");
          }}
        >
          <span className="flex justify-center items-center space-x-2">
            <Google className="w-5 h-5" />
            <span>Sign in with Google</span>
          </span>
        </button>

        {message && (
          <div className="text-accent-danger-600 text-sm">{message}</div>
        )}

        <div className="pt-2 text-center text-sm">
          <span className="text-primary-500">Don't have an account?</span>
          <a
            className="text-primary-900 font-bold hover:underline cursor-pointer"
            // onClick={() => setModalView("SIGNUP_VIEW")}
            href="/admin/auth/signup"
          >
            Sign Up
          </a>
          {` or `}
          <a
            className="text-primary-900 font-bold hover:underline cursor-pointer"
            //onClick={() => setModalView("FORGOT_VIEW")}
            href="/admin/auth/forgot"
          >
            Forgot password?
          </a>
        </div>
      </div>
    </form>
  );
};

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      // className="w-full bg-primary-600 text-primary-100 py-2 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
      className="w-full bg-primary-700 hover:bg-primary-900 text-primary-100 py-2 rounded-md"
      type="submit"
      loading={pending}
      disabled={pending}
    >
      Log In
    </Button>
  );
}

export default LoginView;
