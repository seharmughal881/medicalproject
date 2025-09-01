"use client";

import { useEffect, useState } from "react";

interface Doctor {
  _id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  address: string;
}

export default function DoctorsRecommendations() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/doctors", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setDoctors(data);
        } else {
          console.error("Failed to fetch doctors");
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-black text-black px-6 py-10">
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-black">Doctor Recommendations</h1>
        <p className="text-gray-700 mt-2">Find the best specialists for your needs</p>
      </header>

      {/* Doctor List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <div
            key={doctor._id}
            className="bg-white border border-gray-300 shadow-md rounded-2xl p-6 flex flex-col justify-between hover:shadow-xl transition-transform transform hover:scale-105"
          >
            <div className="doctor-details">
              <h2 className="text-xl font-semibold text-black">{doctor.name}</h2>
              <p className="text-gray-700">
                <strong>Specialty:</strong> {doctor.role || "General"}
              </p>
              <p className="text-gray-700">
                <strong>Contact:</strong> {doctor.phone}
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> {doctor.email}
              </p>
              <p className="text-gray-700">
                <strong>Address:</strong> {doctor.address}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
