"use client";
import { FC } from "react";

import { Info } from "@/app/components/icons";
import { useUI } from "@/app/components/context";
import { Logo, Button, Input } from "@/app/components";

// import {
//   useLoginMutation,
//   useSignupMutation,
// } from "@framework/services/customer";
// import { setCustomerToken } from "@framework/utils";
//const [login]=useLoginMutation();
import { register } from "@lib/actions/actions";

import { useFormState, useFormStatus } from "react-dom";
const SignUpView: FC = () => {
  // Form State
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [loading, setLoading] = useState(false);
  // const [message, setMessage] = useState("");
  // const [dirty, setDirty] = useState(false);
  // const [disabled, setDisabled] = useState(false);

  const { setModalView, closeModal } = useUI();

  const [errorMessage, dispatch] = useFormState(register, {} as any);
  // const { pending } = useFormStatus();
  return (
    <form
      action={dispatch}
      className="w-80 flex flex-col justify-between p-3 border rounded-lg"
    >
      <div className="flex justify-center pb-12 ">
        <Logo width="64px" height="64px" />
      </div>
      <div className="flex flex-col space-y-4">
        {errorMessage && (
          // <div className="text-red border border-red p-3">{errorMessage}</div>
          <div className="text-red border border-red p-3">
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
        <span className="text-secondary-2">
          <span className="inline-block align-middle ">
            <Info width="15" height="15" />
          </span>{" "}
          <span className="leading-6 text-sm">
            <strong>Info</strong>: Passwords must be longer than 7 chars and
            include numbers.{" "}
          </span>
        </span>
        <div className="pt-2 w-full flex flex-col">
          {/* <Button type="submit" loading={pending} disabled={pending}>
            Sign Up
          </Button> */}
          <SignupButton />
        </div>

        <span className="pt-1 text-center text-sm">
          <span className="text-secondary-3">Do you have an account?</span>
          {` `}
          <a
            className="text-secondary font-bold hover:underline cursor-pointer"
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
