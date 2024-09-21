import { useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Logo, Button, Input } from "@/app/components";
import { useUI } from "@/app/components/context";
export default function ResetPassword() {
  //const { reset } = useParams();
  const searchParam = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const { setModalView, closeModal } = useUI();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    setMessage("loading");
    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: searchParam.get("reset"), password }),
    });

    //const data = await res.json();
    console.log("resetpassres", res);
    //setMessage(data.message);
    if (res.status == 200) {
      setMessage("success");
      setModalView("LOGIN_VIEW");
    } else {
      // console.log("emailemaildata", data);
      if (res.status == 400) {
        setMessage("Token is invalid or has expired");
      }
      if (res.status == 401) {
        setMessage("error resetting password");
      }
    }
  };

  return (
    <form
      //  action={dispatch}
      onSubmit={handleSubmit}
      className="w-80 flex flex-col justify-between p-3  rounded-lg"
    >
      <div className="flex justify-center pb-12 ">
        <Logo width="64px" height="64px" />
      </div>
      <h2 className="mb-4 text-primary-900  text-center text-xl font-bold">
        Reset Password
      </h2>
      <div className="flex flex-col space-y-3">
        {/* <Input type="email" id="email" name="email" placeholder="Email" /> */}
        {/* <h2 className="mb-4 text-primary-900  text-xl font-bold">
          Reset Password
        </h2> */}
        <Input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter new password"
          required
        />
        <Input
          type="password"
          id="Confirmpassword"
          name="Confirmpassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm new password"
          required
        />

        <Button
          type="submit"
          loading={message == "loading"}
          disabled={message == "loading"}
        >
          Reset Password
        </Button>

        {message && message != "success" && message != "loading" && (
          <div className="text-red-800">
            {message}

            <a
              className="text-primary-900  font-bold hover:underline cursor-pointer"
              onClick={() => setModalView("FORGOT_VIEW")}
            >
              {" "}
              {" resend link "}
            </a>
          </div>
        )}
        {message && message == "success" && (
          <div className="text-primary-900 ">
            {"password resetted successfully"}
          </div>
        )}
      </div>
    </form>
  );
}
