"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import base_url from "../helper/baseurl";

export default function useCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${base_url}/category`);
        setCategories(res.data || []);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
  }, []);

  return categories;
}
