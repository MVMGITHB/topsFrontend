"use client";
import React from "react";
import { User, ShieldCheck, Mail } from "lucide-react";

export default function ProfilePage({ user }) {
  const {
    firstName,
    lastName,
    username,
    email,
    role,
    status,
    createdAt,
  } = user;

  const formattedDate = new Date(createdAt).toLocaleDateString();

  return (
    <div className="min-h-screen bg-white text-black py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-gray-50 shadow-lg rounded-2xl p-8 border border-gray-200">
        <h1 className="text-3xl font-extrabold mb-6">Profile Overview</h1>
        
        <div className="space-y-6 text-sm sm:text-base">
          <div className="flex items-center gap-3">
            <User className="text-gray-600" />
            <span className="font-medium">Name:</span> {firstName} {lastName}
          </div>

          <div className="flex items-center gap-3">
            <Mail className="text-gray-600" />
            <span className="font-medium">Email:</span> {email}
          </div>

          <div className="flex items-center gap-3">
            <User className="text-gray-600" />
            <span className="font-medium">Username:</span> {username}
          </div>

          <div className="flex items-center gap-3">
            <ShieldCheck className="text-gray-600" />
            <span className="font-medium">Role:</span> {role.toUpperCase()}
          </div>

          <div className="flex items-center gap-3">
            <span className="font-medium">Status:</span>
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {status}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-medium">Joined:</span> {formattedDate}
          </div>
        </div>
      </div>
    </div>
  );
}
