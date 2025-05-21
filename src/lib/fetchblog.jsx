// lib/fetchBlogs.js
import axios from "axios";
import base_url from "@/components/helper/baseurl";

export const fetchAllCompBlogs = async () => {
  try {
    const res = await axios.get(`${base_url}/getALlcompblogs`);
    return res.data || [];
  } catch (error) {
    console.error("Error fetching comparison blogs:", error);
    return [];
  }
};

export const fetchBlogsBySubcategorySlug = async (slug) => {
  try {
    const res = await axios.get(`${base_url}/filter1/${slug}`);
    return res.data || [];
  } catch (error) {
    console.error("Error fetching blogs by subcategory slug:", error);
    return [];
  }
};
