"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";
export default function RegistrationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !password || !email) {
      setError("Input field data missing");
      return;
    }
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name, password, email }),
      });
      if (res.ok) {
        setEmail("");
        setName("");
        setPassword("");
      } else {
        console.log("User Registration failed");
      }
    } catch (error) {
      console.log("Error Occured : ", error);
    }
  }
  return (
    <div className="grid place-items-center  h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Register</h1>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            placeholder="Full Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2"
          >
            Register
          </button>
          {error ? (
            <div className="bg-red-500 text-white text-sm px-3 py-1 rounded-md mt-2 w-fit">
              {error}
            </div>
          ) : (
            ""
          )}
          <Link className="text-sm mt-3 text-right" href="/">
            Already have an account? <span className="underline">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
