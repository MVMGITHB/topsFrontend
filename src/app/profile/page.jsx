"use client";

import { useEffect, useState } from "react";
import ProfilePage from "@/components/profilepage/profilepage";

export default function Page() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  // Error state to handle API errors

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("auth");  // Retrieve token from localStorage
        if (!token) {
          setError("No token found");
          setLoading(false);
          return;
        }

        const res = await fetch("https://api.top5shots.com/getUsers", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,  // Use token in the Authorization header
          },
        });

        // Check for non-2xx responses
        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await res.json();
        console.log(data)
        setUserData(data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err.message);  // Set error message
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) {
    return <div className="text-center py-8 text-gray-600">Loading profile...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">Error: {error}</div>;
  }

  if (!userData) {
    return <div className="text-center py-8 text-red-600">User not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <ProfilePage user={userData} />
    </div>
  );
}
