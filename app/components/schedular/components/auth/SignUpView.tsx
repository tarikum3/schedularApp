"use client";
import { FC } from "react";

import { Info } from "@/app/components/icons";
import { useUI } from "@/app/components/context";
import { Logo, Button, Input } from "@/app/components";

import { register } from "@lib/actions/actions";

import { useFormState, useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";

const SignUpView: FC = () => {
  const { setModalView, closeModal } = useUI();
  const searchParam = useSearchParams();
  // const { notRegistered } = useParams();
  const [errorMessage, dispatch] = useFormState(register, {} as any);
  // const { pending } = useFormStatus();

  return (
    <form
      action={dispatch}
      className="w-80 flex flex-col justify-between p-3  rounded-lg"
    >
      <div className="flex justify-center pb-12 ">
        <Logo width="64px" height="64px" />
      </div>
      {searchParam.get("notRegistered") && (
        <span className="text-primary-700 text-lg">
          You are not registered !
        </span>
      )}
      <div className="flex flex-col space-y-4">
        {errorMessage?.message && (
          // <div className="text-red-800">{errorMessage}</div>
          <div className="text-red-800">
            {errorMessage?.message ?? "something went wrong"}
          </div>
        )}
        <Input placeholder="First Name" id="firstName" name="firstName" />
        <Input placeholder="Last Name" id="lastName" name="lastName" />
        <Input type="email" id="email" name="email" placeholder="Email" />
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
        />
        <span className="text-primary-700">
          <span className="inline-block align-middle ">
            <Info width="15" height="15" />
          </span>{" "}
          <span className="leading-6 text-sm">
            <strong>Info</strong>: Passwords must be longer than 7 chars and
            include numbers.{" "}
          </span>
        </span>
        <div className="pt-2 w-full flex flex-col">
          <SignupButton />
        </div>

        <span className="pt-1 text-center text-sm">
          <span className="text-primary-500">Do you have an account?</span>
          {` `}
          <a
            className="text-primary-900  font-bold hover:underline cursor-pointer"
            onClick={() => setModalView("LOGIN_VIEW")}
          >
            Log In
          </a>
        </span>
      </div>
    </form>
  );
};
function SignupButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" loading={pending} disabled={pending}>
      Sign Up
    </Button>
  );
}
export default SignUpView;
