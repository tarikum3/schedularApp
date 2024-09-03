import { useState } from "react";
import { useParams } from "next/navigation";
import { Logo, Button, Input } from "@/app/components";

export default function ResetPassword() {
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <form
      //  action={dispatch}
      onSubmit={handleSubmit}
      className="w-80 flex flex-col justify-between p-3 border rounded-lg"
    >
      <div className="flex justify-center pb-12 ">
        <Logo width="64px" height="64px" />
      </div>
      <h2 className="mb-4 text-xl font-bold">Reset Password</h2>
      <div className="flex flex-col space-y-3">
        <Input type="email" id="email" name="email" placeholder="Email" />
        <h2 className="mb-4 text-secondary text-xl font-bold">
          Reset Password
        </h2>
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

        {message && <div className="text-red-800">{message}</div>}
      </div>
    </form>
  );
}
