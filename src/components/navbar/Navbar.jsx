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

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center ">
        {/* Logo */}
        <div className="text-xl font-bold text-black tracking-tight font-serif mr-3">
          <Link href="/">Top5shots</Link>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1 shadow-sm mr-50">
          <input
            type="text"
            placeholder="Search..."
            className="outline-none bg-transparent text-sm px-2 w-44 text-gray-800 dark:text-white placeholder:text-gray-500"
          />
          <button className="text-gray-500 dark:text-gray-300">🔍</button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-800 dark:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-xl">{isOpen ? "✕" : "☰"}</span>
        </button>

      
       
           <ul
          className={`md:flex md:items-center md:space-x-6 absolute md:static left-0 top-12 w-full md:w-auto bg-white dark:bg-gray-900 shadow-md md:shadow-none p-4 md:p-0 transition-all duration-300 z-40 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          {[
  { name: "Home", path: "/" },
  { name: "News", path: "/news" },
  { name: "Viral Stories", path: "/viralstories" },
  { name: "Results", path: "/results" },
  { name: "Match Score", path: "/matchscore" },
  { name: "Contest", path: "/contest" },
].map((item, index) => (
  <li key={index} className="group py-1 md:py-0">
    <Link
      href={item.path}
      className="relative inline-block text-gray-700 dark:text-gray-300 font-medium transition duration-200 hover:text-purple-600 dark:hover:text-purple-400"
    >
      {item.name}
      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-600 dark:bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
    </Link>
  </li>
))}


          {auth?.user ? (
            <li className="flex items-center space-x-2 mt-4 md:mt-0">
              <span className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-white px-3 py-1 rounded-full text-sm font-medium">
                {auth?.user?.firstName}
              </span>
              <button
                onClick={handleLogout}
                className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-4 py-1 rounded-full font-semibold transition"
              >
                Logout
              </button>
            </li>
          ) : (
            <li className="flex items-center space-x-2 mt-4 md:mt-0">
              <Link href="/login">
                <button className="text-blue-600 border border-blue-600 px-4 py-1 rounded-full text-sm font-semibold hover:bg-blue-50 dark:hover:bg-blue-900 transition">
                  Login
                </button>
              </Link>
              <Link href="/signup">
                <button className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold hover:bg-blue-500 transition">
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
