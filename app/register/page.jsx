"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterPage = () => {
  const [error, setError] = useState(null);
  const handleRegister = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await fetch("api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      setError(await res.text());
      return;
    } else {
      setError(null);
      useRouter("/api/register");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="mb-4 text-2xl">Register</h1>
      {error && <p className="mb-4 text-red-500">{error}</p>}
      <form onSubmit={handleRegister}>
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
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
