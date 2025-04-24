"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import base_url from "../helper/baseurl";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/auth";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState(false);
  const router = useRouter();
  const [auth, setAuth] = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const formdata = {
        email: formData.email,
        password: formData.password,
      };

      const response = await axios.post(base_url + "/login", formdata);

      if (response.data) {
        toast.success("Logged in successfully!", { position: "bottom-right" });
        setFormData({ email: "", password: "" });

        setAuth({
          ...auth,
          user: response.data.user,
          token: response.data.token,
        });

        localStorage.setItem("auth", JSON.stringify(response.data));
        setError(false);
        router.push("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed!", {
        position: "bottom-right",
      });
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      {/* Main Box with Image and Form */}

      {/* Left Side (Image) */}
      <div className="w-1/2 hidden md:block">
        <img
          src="https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1095.jpg?ga=GA1.1.170324605.1744353854&semt=ais_hybrid&w=740"
          alt="Login Visual"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right Side (Form) */}
      <div className="w-full md:w-1/2 p-8">
        <h2 className="text-2xl font-bold text-center  text-gray-800 mb-6">
        Welcome to top5Shots !
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Error */}
          {err && (
            <div>
              <h1 className="text-center text-red-500 text-2xl">
                Error In Login
              </h1>
            </div>
          )}
        </form>

        {/* Signup Link */}
        <h1 className="text-blue-400 pt-4 text-center">
          <Link href="/signup">
            Don't have account, please{" "}
            <span className="text-orange-400 font-semibold">Sign Up Now</span>
          </Link>
        </h1>
      </div>
    </div>
  );
}
