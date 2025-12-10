import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/api";

export default function ResetPassword() {
  const { token } = useParams(); // Get token from URL
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("❌ Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      const res = await resetPassword(token, password);
      setMessage(res.message || "✅ Password reset successful!");
      setTimeout(() => navigate("/login"), 2500);
    } catch (err) {
      setMessage(
        err.response?.data?.message || "❌ Failed to reset password. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">
          Reset Your Password
        </h2>
        {message && (
          <p
            className={`text-center mb-3 ${
              message.startsWith("✅") ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
        <form onSubmit={handleReset}>
          <div className="mb-4">
            <label className="block mb-2 font-medium">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-medium">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}