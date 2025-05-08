
import React, { useEffect, useState } from "react";
import axios from "axios";
import base_url from "../helper/baseurl";

const TopShorts = () => {
  const [shorts, setShorts] = useState([]);
  const [blogs, setBlogs] = useState({});

  useEffect(() => {
    const fetchTopShorts = async () => {
      try {
        const res = await fetch(
          "https://api.top5shots.com/api/trending-shorts/getAllTrendnig"
        );
        const data = await res.json();
        console.log("Top Shorts Raw Data:", data);

        if (Array.isArray(data) && data.length > 0) {
          const allCompBlogs = data.flatMap((item) => item.compBlog || []);
          setShorts(allCompBlogs);

          const blogDetails = await Promise.all(
            allCompBlogs.map(async (blog) => {
              const res = await axios.get(
                `${base_url}/getOnecompblogs/${blog.slug}`
              );
              return res.data;
            })
          );

          const blogMap = {};
          blogDetails.forEach((blog) => {
            blogMap[blog.slug] = blog;
          });

          setBlogs(blogMap);
        }
      } catch (err) {
        console.error("Error fetching top shorts:", err);
      }
    };

    fetchTopShorts();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Top Shorts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {shorts.map((short) => {
          const blog = blogs[short.slug];
          if (!blog) return null;
            // console.log(blog)
            console.log()
          return (
            <div
              key={short.slug}
              className="border rounded-2xl p-4 shadow hover:shadow-lg transition"
            >
                
              <h3 className="text-xl font-semibold">{blog.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{blog.mtitle || blog.mdesc}</p>
              <a
              
                href={`/${blog?.subcategories.slug}/${blog.slug}`}
                className="text-blue-600 mt-3 inline-block hover:underline"
              >
                Read more →
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopShorts;
