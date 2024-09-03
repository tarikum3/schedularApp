// "use client";

// import { Logo, Button, Input } from "@/app/components";

// import { useUI } from "@/app/components/context";

// import { authenticate } from "@lib/actions/actions";

// import { useFormState, useFormStatus } from "react-dom";

// const LoginView: React.FC = () => {
//   const { setModalView, closeModal } = useUI();

//   const [errorMessage, dispatch] = useFormState(authenticate, undefined);

//   return (
//     <form
//       action={dispatch}
//       className="w-80 flex flex-col justify-between p-3 border rounded-lg"
//     >
//       <div className="flex justify-center pb-12 ">
//         <Logo width="64px" height="64px" />
//       </div>
//       <div className="flex flex-col space-y-3">
//         {errorMessage && <div className="text-red-800">{errorMessage}</div>}
//         {/* <Input type="email" placeholder="Email" onChange={setEmail} />
//         <Input type="password" placeholder="Password" onChange={setPassword} /> */}

//         <Input type="email" id="email" name="email" placeholder="Email" />
//         <Input
//           type="password"
//           id="password"
//           name="password"
//           placeholder="Password"
//         />
//         <LoginButton />
//         <div className="pt-1 text-center text-sm">
//           <span className="text-secondary-3">Don't have an account?</span>
//           {` `}
//           <a
//             className="text-secondary font-bold hover:underline cursor-pointer"
//             onClick={() => setModalView("SIGNUP_VIEW")}
//           >
//             Sign Up.
//           </a>
//           {` `}
//           <a
//             className="text-secondary font-bold hover:underline cursor-pointer"
//             onClick={() => setModalView("FORGOT_VIEW")}
//           >
//             forgot password ?
//           </a>
//         </div>
//       </div>
//     </form>
//   );
// };
// function LoginButton() {
//   const { pending } = useFormStatus();

//   return (
//     <Button type="submit" loading={pending} disabled={pending}>
//       Log In
//     </Button>
//   );
// }
// export default LoginView;
"use client";

import { Logo, Button, Input } from "@/app/components";
import { useUI } from "@/app/components/context";
import { authenticate } from "@lib/actions/actions";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useState } from "react";
import { signIn } from "@/auth";
import { useParams } from "next/navigation";
const LoginView: React.FC = () => {
  const { setModalView, closeModal } = useUI();
  const { notRegistered } = useParams();
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (notRegistered) {
    }
  }, [notRegistered]);
  return (
    <form
      action={dispatch}
      className="w-80 flex flex-col justify-between p-3 border rounded-lg"
    >
      <div className="flex justify-center pb-12 ">
        <Logo width="64px" height="64px" />
      </div>
      <div className="flex flex-col space-y-3">
        {errorMessage && <div className="text-red-800">{errorMessage}</div>}
        <Input type="email" id="email" name="email" placeholder="Email" />
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
        />
        <LoginButton />
        <div className="relative my-4">
          <hr className="border-gray-300" />
          <span className="absolute inset-x-0 top-2/4 transform -translate-y-1/2 bg-white px-2 text-gray-500">
            or
          </span>
        </div>
        <Button
          onClick={async () => {
            "use server";
            await signIn("google");
          }}
          className="w-full"
        >
          Sign in with Google
        </Button>
        {message && <div className="text-red-800">{message}</div>}
        <div className="pt-1 text-center text-sm">
          <span className="text-secondary-3">Don't have an account?</span>
          {` `}
          <a
            className="text-secondary font-bold hover:underline cursor-pointer"
            onClick={() => setModalView("SIGNUP_VIEW")}
          >
            Sign Up.
          </a>
          {` `}
          <a
            className="text-secondary font-bold hover:underline cursor-pointer"
            onClick={() => setModalView("FORGOT_VIEW")}
          >
            forgot password ?
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
