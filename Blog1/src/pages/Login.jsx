import React, { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { user, signin } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signin({ email, password });
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-xl ring-1 ring-gray-200"
      >
        <h2 className="text-3xl font-bold mb-2 text-center text-blue-600">
          Welcome
        </h2>
        <p className="text-center text-gray-500 mb-6 text-sm sm:text-base">
          Sign in to continue to your MERN Blog account
        </p>

        <label className="block mb-4">
          <span className="text-sm text-gray-600 font-medium">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#00BFFF]"
          />
        </label>

        <label className="block mb-6">
          <span className="text-sm text-gray-600 font-medium">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#00BFFF]"
          />
        </label>

        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-white ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-[#00BFFF] hover:bg-[#0097D6]"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <Link
            to="/forgot-password"
            className="text-sm text-[#00BFFF] hover:text-[#0097D6]"
          >
            Forgot password?
          </Link>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-[#00BFFF] hover:text-[#0097D6] font-medium"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
