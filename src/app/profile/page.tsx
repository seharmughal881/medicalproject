"use client";

import axios from "axios";
import React, { useEffect, useState, ChangeEvent } from "react";
import { useParams } from "next/navigation";

interface ProfileData {
  name: string;
  email: string;
  address: string;
  phone: string;
  gender: string;
}

export default function Profile() {
  const params = useParams();
  const id = params?.id as string;

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    email: "",
    address: "",
    phone: "",
    gender: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8080/api/auth/patient/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfileData(response.data.data || response.data);
        setLoading(false);
      } catch (err: any) {
        setError(err.response?.data?.message || "Error fetching profile");
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `http://localhost:8080/api/auth/update`,
        {
          name: profileData.name?.trim(),
          email: profileData.email?.trim(),
          phone: profileData.phone?.trim(),
          address: profileData.address?.trim() || "",
          gender: profileData.gender || "",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setProfileData(response.data.updateUser);
        setIsEditing(false);
        alert("Profile updated successfully!");
      }
    } catch (error: any) {
      console.error("Error details:", error.response?.data);
      alert(error.response?.data?.message || "Error updating profile");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-600 mt-10">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-white text-white flex flex-col items-center py-10 px-5">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          My Profile
        </h1>
      </header>

      <div className="bg-white/10 backdrop-blur-md shadow-xl rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-gray-100 mb-6 border-b border-gray-600 pb-2">
          Personal Information
        </h2>

        <div className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Name</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleInputChange}
                className="mt-1 w-full rounded-md border border-gray-600 bg-black text-white px-3 py-2 focus:ring-2 focus:ring-gray-400 outline-none"
              />
            ) : (
              <p className="mt-1 text-lg">{profileData.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Email</label>
            <p className="mt-1 text-lg">{profileData.email}</p>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Address</label>
            {isEditing ? (
              <textarea
                name="address"
                value={profileData.address || ""}
                onChange={handleInputChange}
                className="mt-1 w-full rounded-md border border-gray-600 bg-black text-white px-3 py-2 focus:ring-2 focus:ring-gray-400 outline-none"
              />
            ) : (
              <p className="mt-1 text-lg">{profileData.address}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Phone</label>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={profileData.phone || ""}
                onChange={handleInputChange}
                className="mt-1 w-full rounded-md border border-gray-600 bg-black text-white px-3 py-2 focus:ring-2 focus:ring-gray-400 outline-none"
              />
            ) : (
              <p className="mt-1 text-lg">{profileData.phone}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Gender</label>
            {isEditing ? (
              <select
                name="gender"
                value={profileData.gender || ""}
                onChange={handleInputChange}
                className="mt-1 w-full rounded-md border border-gray-600 bg-black text-white px-3 py-2 focus:ring-2 focus:ring-gray-400 outline-none"
              >
                <option value="">Select Gender</option>
                <option value="male" className="text-black">Male</option>
                <option value="female" className="text-black">Female</option>
                <option value="other" className="text-black">Other</option>
              </select>
            ) : (
              <p className="mt-1 text-lg">{profileData.gender || "Not specified"}</p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4 mt-8">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="px-5 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-5 py-2 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-5 py-2 bg-black text-white border border-gray-400 rounded-lg font-medium hover:bg-gray-900 transition"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
