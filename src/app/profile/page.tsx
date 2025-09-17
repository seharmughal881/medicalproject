"use client";
import { useEffect, useState } from "react";

interface ProfileData {
  name: string;
  email: string;
  address: string;
  phone: string;
  gender: string;
}

export default function PatientProfile() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // ✅ token from login
        if (!token) {
          setError("No token found. Please login again.");
          setLoading(false);
          return;
        }

        const res = await fetch("http://localhost:5000/api/patient/profile", {
          headers: {
            "Authorization": `Bearer ${token}`, // ✅ send token
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Unauthorized. Please login again.");
          setLoading(false);
          return;
        }

        setProfile(data.patient); // ✅ backend se patient object
        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Something went wrong while fetching profile.");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p className="p-4">Loading profile...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold">Patient Profile</h2>
      {profile && (
        <div className="space-y-2">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Address:</strong> {profile.address}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
          <p><strong>Gender:</strong> {profile.gender}</p>
        </div>
      )}
    </div>
  );
}
