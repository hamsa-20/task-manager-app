import { useState } from "react";
import API from "../api";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    try {
      await API.post("/auth/signup", { name, email, password });
      alert("Signup successful");
      window.location = "/login";
    } catch (err) {
      alert("Error during signup");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg w-80">
        <h2 className="text-white text-xl mb-4 text-center">Signup</h2>

        <input
          className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={signup}
          className="w-full bg-green-500 p-2 rounded text-white"
        >
          Signup
        </button>
      </div>
    </div>
  );
}