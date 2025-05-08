"use client";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../context/auth";

const logo = {
  top5logo: "/images/Top5Logo1.svg",
};

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
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-8xl mx-auto px-3 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-blue-600 flex items-center "
        >
          <img
            src="/images/Top5Logo1.png"
            alt="Top5Shots Logo"
            className="w-[160px] h-[50px]"

          />
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-white border-1 rounded-xl px-4 py-2 shadow-sm mr-60 mt-1">
          <input
            type="text"
            placeholder="Search..."
            className="outline-none bg-transparent text-sm px-2 w-44 text-gray-800 placeholder:text-gray-500"
          />
          <button className="text-gray-500 dark:text-gray-300">🔍</button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="text-black md:text-black dark:text-black md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-xl">{isOpen ? "✕" : "☰"}</span>
        </button>

        {/* Navigation Links */}
        <ul
          className={`text-black md:text-inherit md:flex md:items-center md:space-x-8 absolute md:static left-0 top-12 w-full md:w-auto bg-white shadow-md md:shadow-none p-4 md:p-0 transition-all duration-300 z-40 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          {[
            { name: "Home", path: "/" },
            { name: "Blogs", path: "/blog" },
            { name: "Viral Stories", path: "/viralstories" },
            { name: "Results", path: "/results" },
            { name: "Match Score", path: "/matchscore" },
            { name: "Contest", path: "/contest" },
          ].map((item, index) => (
            <li key={index} className="group py-1 md:py-0">
              {/* <Link
                href={item.path}
                onClick={handleLinkClick}
                className="relative inline-block text-black dark:text-gray-900 text-xl transition duration-200 hover:text-purple-600 dark:hover:text-purple-400 focus:text-purple-600 dark:focus:text-purple-400"
              >
                {item.name}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-600 dark:bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
              </Link> */}
              <Link
                href={item.path}
                onClick={handleLinkClick}
                className="relative inline-block text-black dark:text-gray-900 text-xl font-serif whitespace-nowrap transition duration-200 hover:text-purple-600 dark:hover:text-purple-400 focus:text-purple-600 dark:focus:text-purple-400"
              >
                {item.name}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-600 dark:bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          ))}

          {auth?.user ? (
            <li className="flex items-center space-x-3 mt-4 md:mt-0">
              <Link href="/profile">
                <span className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-4 py-1 rounded-full text-xl font-medium cursor-pointer transition">
                  {auth.user.firstName}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-4 py-1 rounded-full font-semibold transition"
              >
                Logout
              </button>
            </li>
          ) : (
            <li className="flex items-center space-x-2 mt-4 md:mt-0 cursor-pointer">
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
