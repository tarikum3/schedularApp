"use client";

import { Logo, Button, Input } from "@/app/components";

import { useUI } from "@/app/components/context";

import { authenticate } from "@lib/actions/actions";

import { useFormState, useFormStatus } from "react-dom";

const LoginView: React.FC = () => {
  const { setModalView, closeModal } = useUI();
  //const data=  login({ email:"tarikum3@gmail.com", password:"9427230912" });
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <form
      action={dispatch}
      className="w-80 flex flex-col justify-between p-3 border rounded-lg"
    >
      <div className="flex justify-center pb-12 ">
        <Logo width="64px" height="64px" />
      </div>
      <div className="flex flex-col space-y-3">
        {errorMessage && (
          <div className="text-red border border-red p-3">{errorMessage}</div>
        )}
        {/* <Input type="email" placeholder="Email" onChange={setEmail} />
        <Input type="password" placeholder="Password" onChange={setPassword} /> */}

        <Input type="email" id="email" name="email" placeholder="Email" />
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
        />
        <LoginButton />
        <div className="pt-1 text-center text-sm">
          <span className="text-secondary-3">Don't have an account?</span>
          {` `}
          <a
            className="text-secondary font-bold hover:underline cursor-pointer"
            onClick={() => setModalView("SIGNUP_VIEW")}
          >
            Sign Up
          </a>
        </div>
      </div>
    </form>
  );
};
function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" loading={pending} disabled={pending}>
      Log In
    </Button>
  );
}
export default LoginView;
