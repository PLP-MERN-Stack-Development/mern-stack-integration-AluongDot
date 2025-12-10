import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Nav() {
  const { user, signout } = useAuth(); // ✅ get user and signout
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-gray-50 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-[#00BFFF] hover:text-[#0097D6] transition-colors duration-300"
        >
          MERN Blog
        </Link>

        {/* Mobile Toggle */}
        <button
          className="sm:hidden text-gray-600 hover:text-[#00BFFF] transition duration-300"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            open ? "block" : "hidden"
          } sm:flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-6 mt-3 sm:mt-0 text-center sm:text-left`}
        >
          <NavLink
            to="/"
            className="text-gray-700 font-medium hover:text-[#00BFFF] transition duration-300"
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className="text-gray-700 font-medium hover:text-[#00BFFF] transition duration-300"
          >
            About
          </NavLink>

          {user ? (
            <>
              {/* ✅ Dashboard link for logged-in users */}
              <NavLink
                to="/dashboard"
                className="text-gray-700 font-medium hover:text-[#00BFFF] transition duration-300"
              >
                Dashboard
              </NavLink>
              <button
                onClick={signout}
                className="flex items-center justify-center gap-1 border border-gray-400 text-gray-700 px-4 py-2 rounded-lg font-semibold transition duration-300 hover:bg-red-500 hover:text-white hover:shadow-md hover:-translate-y-[1px] active:scale-95"
              >
                <LogOut className="w-4 h-4" /> Sign out
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="border border-gray-400 text-gray-700 px-4 py-2 rounded-lg font-semibold transition duration-300 hover:bg-[#E6F7FF] hover:text-[#00BFFF] hover:shadow-sm hover:-translate-y-[1px] active:scale-95"
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="bg-[#00BFFF] text-white px-4 py-2 rounded-lg font-semibold transition duration-300 hover:bg-[#0097D6] hover:shadow-md hover:-translate-y-[1px] active:scale-95"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}