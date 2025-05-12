"use client";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../context/auth";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 w-full">
      <div className="max-w-8xl mx-auto px-3 py-3 flex justify-between items-center w-full">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-blue-600 flex items-center"
        >
          <img
            src="/images/Top5Logo1.png"
            alt="Top5Shots Logo"
            className="w-[160px] h-[50px]"
          />
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-white border rounded-lg px-3 py-2 shadow-sm max-w-md w-relative mr-8 mt-1">
          <input
            type="text"
            placeholder="Search..."
            className="outline-none bg-transparent text-xs px-2 w-full text-gray-800 placeholder:text-gray-500"
          />
          <button className="text-gray-500 dark:text-gray-300 text-sm">
            🔍
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-black text-3xl focus:outline-none"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? "✕" : "☰"}
        </button>

        {/* Navigation Links */}
        <ul
          id="mobile-menu"
          className={`${
            isOpen ? "flex" : "hidden"
          } md:flex md:items-center md:space-x-8 absolute md:static left-0 top-16 md:top-0 w-full md:w-auto bg-white shadow-md md:shadow-none p-4 md:p-0 flex-col md:flex-row space-y-4 md:space-y-0 transition-all duration-300 z-40`}
        >
          {[
            { name: "Home", path: "/" },
            { name: "Blogs", path: "/blog" },
            { name: "Viral Stories", path: "/viralstories" },
            { name: "Results", path: "/results" },
            { name: "Match Score", path: "/matchscore" },
            { name: "Contest", path: "/contest" },
          ].map((item, index) => (
            <li key={index} className="group">
              <Link
                href={item.path}
                onClick={handleLinkClick}
                className="relative inline-block text-black dark:text-gray-900 text-xl font-serif whitespace-nowrap transition duration-200 hover:text-purple-600 dark:hover:text-purple-400"
              >
                {item.name}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-600 dark:bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          ))}

          {/* Auth Buttons */}
          {auth?.user ? (
            <li className="flex items-center space-x-3">
              <Link href="/profile">
                <button className="text-black-600 border border-blue-600 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-400 dark:hover:bg-white transition">
                  {auth.user.firstName}
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-500 transition"
              >
                Logout
              </button>
            </li>
          ) : (
            <li className="flex items-center space-x-2">
              <Link href="/login">
                <button className="text-blue-600 border border-blue-600 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-50 dark:hover:bg-blue-900 transition">
                  Login
                </button>
              </Link>
              <span className="text-3xl mb-2">|</span>
              <Link href="/signup">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-500 transition">
                  Signup
                </button>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
