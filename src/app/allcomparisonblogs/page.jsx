"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import TopShotsAndPopularSection from "@/components/adsection/adsection";
import base_url from "@/components/helper/baseurl";
import TopShorts from "@/components/topshots/topshots";

export default function AllBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubCategory, setSelectedSubCategory] = useState("All");
  const [allCategories, setAllCategories] = useState(["All"]);
  const [allSubCategories, setAllSubCategories] = useState(["All"]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get(`${base_url}/getALlcompblogs`);
        const data = res.data;
        console.log("This compblogs " +data)
        setBlogs(data);

        // Extract unique categories and subcategories
        const categoriesSet = new Set();
        const subcategoriesSet = new Set();

        data.forEach((item) => {
          if (item.categories?.name) {
            categoriesSet.add(item.categories.name);
          }
          if (item.subcategories?.name) {
            subcategoriesSet.add(item.subcategories.name);
          }
        });

        setAllCategories(["All", ...Array.from(categoriesSet)]);
        setAllSubCategories(["All", ...Array.from(subcategoriesSet)]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchdata();
  }, []);

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    setSelectedSubCategory("All");

    const subcategoriesSet = new Set();
    blogs.forEach((item) => {
      if (
        (cat === "All" || item.categories?.name === cat) &&
        item.subcategories?.name
      ) {
        subcategoriesSet.add(item.subcategories.name);
      }
    });

    setAllSubCategories(["All", ...Array.from(subcategoriesSet)]);
  };

  const filteredBlogs = blogs.filter((blog) => {
    const categoryMatch =
      selectedCategory === "All" || blog.categories?.name === selectedCategory;
    const subcategoryMatch =
      selectedSubCategory === "All" ||
      blog.subcategories?.name === selectedSubCategory;
    return categoryMatch && subcategoryMatch;
  });

  return (
    <div className="bg-white dark:bg-gray-950 px-4 sm:px-6 lg:px-12 py-12">
      <h1 className="text-center text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white mb-12">
        All Comparison Blogs
      </h1>
      <TopShorts/>
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {allCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
              selectedCategory === cat
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Subcategory Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {allSubCategories.map((subcat) => (
          <button
            key={subcat}
            onClick={() => setSelectedSubCategory(subcat)}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
              selectedSubCategory === subcat
                ? "bg-green-600 text-white border-green-600"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600"
            }`}
          >
            {subcat}
          </button>
        ))}
      </div>

      {filteredBlogs.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No blogs available.
        </p>
      ) : (
        filteredBlogs.map((blog) => (
          <div key={blog._id} className="mb-20">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                {blog.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
                {blog.mdesc}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {blog.company?.map((comp, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow hover:shadow-xl transition"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={comp.logo || "/fallback-logo.png"}
                      alt={comp.websiteName || "Company"}
                      className="w-14 h-14 object-contain rounded-md"
                    />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {comp.websiteName}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center text-yellow-500">
                      {[...Array(Math.floor(comp.rating || 0))].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      {comp.rating ? comp.rating.toFixed(1) : "No rating"}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                    {comp.features?.[0] || "No feature listed."}
                  </p>

                  <a
                    href={comp.visitSiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Visit Site <ArrowRight size={16} className="ml-1" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))
      )}

      <div className="mt-24">
        <TopShotsAndPopularSection />
      </div>
    </div>
  );
}
