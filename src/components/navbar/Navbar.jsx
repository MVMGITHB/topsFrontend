"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/context/auth";
import SerachCategory from "./searchbar";

// Lazy useCategories for client-only
let useCategories = () => [];
if (typeof window !== "undefined") {
  useCategories = require("@/components/helper/useCategorieshook").default;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [auth, setAuth] = useAuth();
  const mobileSearchRef = useRef(null);

  const categories = useCategories();
  const router = useRouter();

  // Use ref safely in client component
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (showMobileSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showMobileSearch]);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        showMobileSearch &&
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(e.target)
      ) {
        setShowMobileSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMobileSearch]);

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    setIsOpen(false);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
    setShowMobileSearch(false);
  };

  const handleCategoryClick = (slug) => {
    setIsOpen(false);
    setShowDropdown(false);
    setShowMobileSearch(false);
    router.push(`/${slug}`);
  };

  const handleSearch = () => {
    if (search.trim()) {
      router.push(`/search?query=${encodeURIComponent(search.trim())}`);
      setSearch("");
      setIsOpen(false);
      setShowMobileSearch(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <nav className="bg-gray-100 shadow-sm sticky top-0 z-50 border-b border-gray-600 dark:border-gray-800 w-full">
      <div className="max-w-8xl mx-auto px-3 py-3 flex justify-between items-center w-full">
        {/* Logo */}
        <Link href="/" onClick={handleLinkClick} className="flex items-center">
          <img
            src="/images/Top5Logo1.png"
            alt="Top5Shots Logo"
            className="w-[160px] h-[50px]"
          />
        </Link>

        {/* Desktop Search */}
        <div className="relative hidden md:flex items-center bg-white border rounded-full px-2 py-1 shadow-sm w-[230px] max-w-2xl mt-1">
          <SerachCategory />
        </div>

        {/* Mobile Search Icon */}
        <button
          onClick={() => {
            if (showMobileSearch) {
              setShowMobileSearch(false);
              setSearch(""); // clear input if needed
            } else {
              setShowMobileSearch(true);
              setIsOpen(false);
            }
          }}
          className="md:hidden text-black bg-white text-2xl ml-40"
          aria-label="Toggle search"
        >
          {showMobileSearch ? "✖️" : "🔍"}
        </button>

        {/* Mobile Search Input */}
        {showMobileSearch && (
          <div
            ref={mobileSearchRef}
            className="absolute top-full left-0 w-full bg-white border-t border-gray-300 px-4 py-3 z-40 shadow-md md:hidden"
          >
            <SerachCategory />
          </div>
        )}

        {/* Mobile Toggle (Hamburger) */}
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setShowMobileSearch(false);
          }}
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
          } md:flex md:items-center md:space-x-8 absolute md:static left-0 top-16 md:top-0 w-full md:w-auto bg-gray-100 shadow-md md:shadow-none p-4 md:p-0 flex-col md:flex-row space-y-4 md:space-y-0 transition-all duration-300 z-40`}
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
                  setIsOpen(false);
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
