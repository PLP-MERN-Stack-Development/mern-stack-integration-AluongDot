import React, { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/api/auth/forgot-password", { email });
      setMessage(res.data.message);
    } catch (err) {
      setMessage("Error sending password reset link. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-12">
      <h2 className="text-2xl font-semibold mb-4 text-center">Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded p-2 mb-4"
          required
        />
        <button
          type="submit"
          className="w-full bg-[#00BFFF] text-white py-2 rounded hover:bg-[#0097D6]"
        >
          Send Reset Link
        </button>
      </form>
      {message && <p className="mt-3 text-center text-sm text-gray-600">{message}</p>}
    </div>
  );
}