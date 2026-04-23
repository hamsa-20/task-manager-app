import { useState } from "react";
import API from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await API.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    window.location = "/";
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-80">
        <h2 className="text-white text-xl mb-4 text-center">Login</h2>

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
          onClick={login}
          className="w-full bg-blue-500 hover:bg-blue-600 p-2 rounded text-white"
        >
          Login
        </button>
        <p className="text-gray-400 text-sm mt-3 text-center">
  Don't have an account?{" "}
  <a href="/signup" className="text-blue-400">Signup</a>
</p>
      </div>
    </div>
  );
}