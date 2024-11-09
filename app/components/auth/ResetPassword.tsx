"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Logo, Button, Input } from "@/app/components";
import { useUI } from "@/app/components/context";

export default function ResetPassword() {
  const searchParam = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const { setModalView } = useUI();

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

    if (res.status === 200) {
      setMessage("success");
      setModalView("LOGIN_VIEW");
    } else {
      if (res.status === 400) {
        setMessage("Token is invalid or has expired");
      }
      if (res.status === 401) {
        setMessage("Error resetting password");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-80 flex flex-col justify-between p-6 space-y-4 rounded-lg bg-primary-100"
    >
      <div className="flex justify-center pb-8">
        <Logo width="64px" height="64px" />
      </div>
      <h2 className="mb-4 text-primary-900 text-center text-xl font-bold">
        Reset Password
      </h2>
      <div className="flex flex-col space-y-4">
        <Input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter new password"
          required
          className="p-2 border border-gray-300 rounded-md focus:border-primary-500 focus:ring-primary-500"
        />
        <Input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm new password"
          required
          className="p-2 border border-gray-300 rounded-md focus:border-primary-500 focus:ring-primary-500"
        />

        <Button
          type="submit"
          loading={message === "loading"}
          disabled={message === "loading"}
          className="w-full bg-primary-700 hover:bg-primary-900 text-primary-100 py-2 rounded-md transition-colors duration-150"
        >
          Reset Password
        </Button>

        {message && message !== "success" && message !== "loading" && (
          <div className="text-red-600 text-sm">
            {message}
            <a
              className="text-primary-900 font-bold hover:underline cursor-pointer ml-1"
              onClick={() => setModalView("FORGOT_VIEW")}
            >
              resend link
            </a>
          </div>
        )}
        {message === "success" && (
          <div className="text-primary-700 text-center">
            Password reset successfully!
          </div>
        )}
      </div>
    </form>
  );
}
