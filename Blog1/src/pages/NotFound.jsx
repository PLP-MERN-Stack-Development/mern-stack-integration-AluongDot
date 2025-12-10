// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center py-12">
      <h1 className="text-3xl font-bold mb-4">404 — Not Found</h1>
      <p className="mb-6">The page you were looking for doesn't exist.</p>
      <Link to="/" className="px-4 py-2 bg-blue-600 text-white rounded">Go home</Link>
    </div>
  );
}
