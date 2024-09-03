import { useState } from "react";
import { Logo, Button, Input } from "@/app/components";
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("loading");
    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    //setMessage(data.message);
    setMessage("");
  };

  return (
    <>
      <form
        //  action={dispatch}
        onSubmit={handleSubmit}
        className="w-80 flex flex-col justify-between p-3 border rounded-lg"
      >
        <div className="flex justify-center pb-12 ">
          <Logo width="64px" height="64px" />
        </div>
        <div className="flex flex-col space-y-3">
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button
            type="submit"
            loading={message == "loading"}
            disabled={message == "loading"}
          >
            Send Reset Link
          </Button>

          {message && message != "loading" && (
            <div className="text-red-800">{message}</div>
          )}
        </div>
      </form>

      {/* <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white rounded-lg shadow-md"
      >
        <h2 className="mb-4 text-xl font-bold">Forgot Password</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg"
          placeholder="Enter your email"
          required
        />
        <button
          type="submit"
          className="w-full p-2 text-white bg-blue-500 rounded-lg"
        >
          Send Reset Link
        </button>
        {message && <p className="mt-4 text-green-500">{message}</p>}
      </form>
    </div> */}
    </>
  );
}
