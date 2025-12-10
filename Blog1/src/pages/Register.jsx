import React, { useState } from "react";
import { Link } from "react-router-dom";
import { register as apiRegister } from "../services/api";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setMessage(" Passwords do not match");
      return;
    }

    setMessage("⏳ Creating account...");

    try {
      // use the api helper which calls /api/auth/register
      const res = await apiRegister({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      // apiRegister should return an object (e.g., { token, user })
      if (res && (res.token || res.user)) {
        // Redirect user to the login page after registration so they can sign in
        setMessage("✅ Account created successfully! Redirecting to login...");
        // Do not auto-store token/user here; let the user log in manually
        setTimeout(() => {
          window.location.href = "/login";
        }, 1200);
      } else {
        setMessage(` ${res?.message || "Registration failed"}`);
      }
    } catch (err) {
      setMessage(" Server error. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">Create Account</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Create Account
        </button>
      </form>

      <p className="text-center mt-4 text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login here
        </Link>
      </p>

      {message && (
        <p className="text-center mt-4 text-sm text-gray-700">{message}</p>
      )}
    </div>
  );
}