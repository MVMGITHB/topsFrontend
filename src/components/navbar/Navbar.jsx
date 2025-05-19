"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/context/auth";
import useCategories from "@/components/helper/useCategorieshook";
import SerachCategory from "./searchbar";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [auth, setAuth] = useAuth();
  const categories = useCategories();
  const router = useRouter();

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
  };

  const handleLinkClick = () => setIsOpen(false);

  const handleCategoryClick = (slug) => {
    setIsOpen(false);
    setShowDropdown(false);
    router.push(`/${slug}`);
  };

  const handleSearch = () => {
    if (search.trim()) {
      router.push(`/search?query=${encodeURIComponent(search.trim())}`);
      setSearch("");
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 w-full">
      <div className="max-w-8xl mx-auto px-3 py-3 flex justify-between items-center w-full">
        {/* Logo */}
        <Link href="/" onClick={handleLinkClick} className="flex items-center">
          <img
            src="/images/Top5Logo1.png"
            alt="Top5Shots Logo"
            className="w-[160px] h-[50px]"
          />
        </Link>

        {/* Search */}
        <div className="relative hidden md:flex items-center bg-white border rounded-full px-2 py-1 shadow-sm w-[200px] max-w-xs  mt-1">
          <SerachCategory />
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-black text-3xl"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? "✕" : "☰"}
        </button>

        {/* Menu Items */}
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
          ].map((item) => (
            <li key={item.path} className="group">
              <Link
                href={item.path}
                onClick={handleLinkClick}
                className="relative inline-block text-black dark:text-gray-900 text-xl font-serif transition duration-200 hover:text-purple-600"
              >
                {item.name}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}

          {/* Category Dropdown */}
          <li
            className="relative group"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <button className="text-xl font-serif text-black transition duration-200 hover:text-purple-600">
              Category ▾
            </button>
            {showDropdown && (
              <ul className="absolute top-full left-0 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-50 py-2">
                {categories.map((cat) => (
                  <li
                    key={cat.slug}
                    onClick={() => handleCategoryClick(cat.slug)}
                    className="px-4 py-2 text-sm font-serif text-black hover:bg-purple-50 hover:text-purple-700 cursor-pointer transition-colors duration-150"
                  >
                    {cat.title || cat.name}
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Auth Buttons */}
          {auth?.user ? (
            <li className="flex items-center space-x-3">
              <Link
                href={`/profile/${auth.user.firstName}-${auth.user.lastName}`}
                onClick={handleLinkClick}
              >
                <button className="border border-blue-600 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-200">
                  {auth.user.firstName}
                </button>
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false); // ✅ Close mobile menu on logout
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-500 transition"
              >
                Logout
              </button>
            </li>
          ) : (
            <li className="flex items-center space-x-2">
              <Link href="/login" onClick={handleLinkClick}>
                <button className="text-blue-600 border border-blue-600 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-50 transition">
                  Login
                </button>
              </Link>
              <span className="text-3xl mb-2">|</span>
              <Link href="/signup" onClick={handleLinkClick}>
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
