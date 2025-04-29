"use client";

import { useEffect, useState } from "react";
import ProfilePage from "@/components/profilepage/profilepage";
import { useAuth } from "@/components/context/auth";

export default function Page() {
  const [auth] = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (!auth?.user?._id) return;
        const res = await fetch(`https://api.top5shots.com/getUsers/${auth.user.username}`);
        const data = await res.json();
        setUserData(data);
      } catch (err) {
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [auth]);

  if (loading) {
    return <div className="text-center py-8 text-gray-600">Loading profile...</div>;
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
