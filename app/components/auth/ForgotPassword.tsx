"use client";
import { useState } from "react";
import { Logo, Button, Input } from "@/app/components";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("loading");
    const res = await fetch("/api/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });

    if (res.status == 200) {
      setMessage("success");
    } else {
      setMessage("error sending link");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-80 flex flex-col justify-between p-6 space-y-4 rounded-lg bg-primary-100"
      >
        <div className="flex justify-center pb-8">
          <Logo width="64px" height="64px" />
        </div>

        <div className="flex flex-col space-y-4">
          {message !== "success" && (
            <>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:border-primary-500 focus:ring-primary-500"
              />

              <Button
                type="submit"
                loading={message === "loading"}
                disabled={message === "loading"}
                className="w-full bg-primary-700 hover:bg-primary-800 text-primary-100 py-2 rounded-md transition-colors duration-150"
              >
                Send Reset Link
              </Button>
            </>
          )}

          {message && message !== "success" && message !== "loading" && (
            <div className="text-red-600 text-sm">{message}</div>
          )}

          {message === "success" && (
            <div className="text-primary-700 text-center">
              Email sent successfully! Check your email to reset your password.
            </div>
          )}
        </div>
      </form>
    </>
  );
}
