"use client";
import { signIn } from "next-auth/react";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="mb-4 text-2xl">Login</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const email = e.target.email.value;
          const password = e.target.password.value;
          signIn("credentials", { email, password });
        }}
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="mb-2 p-2 border"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="mb-4 p-2 border"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
