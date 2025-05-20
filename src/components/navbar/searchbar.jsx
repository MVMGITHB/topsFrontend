"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

export default function SerachCategory() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);

  const fetchResults = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setError(null);
      setResults(null);
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const res = await fetch(
        `https://api.top5shots.com/search?q=${encodeURIComponent(searchTerm)}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch results");
      setResults(data);
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useCallback(debounce(fetchResults, 500), []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  const clearInput = () => {
    setQuery("");
    setResults(null);
    setError(null);
  };

  return (
    <div className="w-full relative z-50">
      {/* Input Bar */}
      <div className="relative w-full bg-white text-gray-800 rounded-md px-3 py-1 text-sm flex items-center border shadow-sm">
        <input
          type="text"
          placeholder="Search..."
          className="w-full pr-8 bg-transparent outline-none placeholder-gray-400 text-sm"
          value={query}
          onChange={handleInputChange}
        />

        {loading ? (
          <span className="absolute right-3 text-xs text-gray-500 animate-pulse">
            Loading...
          </span>
        ) : query ? (
          <button
            onClick={clearInput}
            className="absolute right-3 text-gray-600 font-semibold hover:text-gray-900 focus:outline-none cursor-pointer"
            aria-label="Clear search"
          >
            ✕
          </button>
        ) : (
          <button
            type="submit"
            className="absolute right-3 text-gray-600 text-sm flex items-center justify-center cursor-pointer"
            aria-label="Search"
          >
            🔍
          </button>
        )}
      </div>

      {/* Search Results */}
      {results && (
        <div
          className="
            absolute top-full left-0 mt-2
            w-full sm:max-w-2xl bg-white
            border border-gray-200 rounded-lg shadow-lg
            max-h-80 overflow-y-auto p-4 space-y-4
            text-sm font-serif z-50
          "
        >
          <h3 className="font-semibold text-gray-900 text-base">Results</h3>

          {results.blogs?.length > 0 && (
            <div>
              <h4 className="font-medium text-purple-600 mb-1">Blogs</h4>
              {results.blogs.map((item, index) => (
                <Link key={item.id || index} href={`/blog/${item.slug}`}>
                  <div className="px-2 py-1 rounded hover:bg-gray-100 cursor-pointer text-gray-800">
                    {item.title}
                  </div>
                </Link>
              ))}
            </div>
          )}

          {results.compBlogs?.length > 0 && (
            <div>
              <h4 className="font-medium text-blue-600 mb-1">Comp Blogs</h4>
              {results.compBlogs.map((item, index) => (
                <Link
                  key={item.id || index}
                  href={`/${item.subcategories?.slug}/${item.slug}`}
                >
                  <div className="px-2 py-1 rounded hover:bg-gray-100 cursor-pointer text-gray-800">
                    {item.title}
                  </div>
                </Link>
              ))}
            </div>
          )}

          {results.companies?.length > 0 && (
            <div>
              <h4 className="font-medium text-green-600 mb-1">Companies</h4>
              {results.companies.map((item, index) => (
                <Link key={item.id || index} href={`/company/${item.slug}`}>
                  <div className="px-2 py-1 rounded hover:bg-gray-100 cursor-pointer text-gray-800">
                    {item.websiteName}
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!results.blogs?.length &&
            !results.compBlogs?.length &&
            !results.companies?.length &&
            !loading && (
              <p className="text-gray-500 text-xs">No results found.</p>
            )}
        </div>
      )}
    </div>
  );
}
