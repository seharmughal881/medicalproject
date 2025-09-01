"use client";

import { useEffect, useState, ChangeEvent } from "react";
import Image from "next/image";

// Types
interface Doctor {
  _id: string;
  name: string;
  role: string;
  phone: string;
  address: string;
  profileImg?: string;
}

interface User {
  id: string;
  name: string;
}

export default function Feedback() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [feedbacks, setFeedbacks] = useState<Record<string, string>>({});

  // Fetch doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/doctors");
        if (!response.ok) throw new Error("Failed to fetch doctors");
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  // Handle feedback text change
  const handleFeedbackChange = (doctorId: string, value: string) => {
    setFeedbacks({ ...feedbacks, [doctorId]: value });
  };

  // Submit feedback
  const handleFeedbackSubmit = async (doctorId: string) => {
    try {
      const feedback = feedbacks[doctorId];
      if (!feedback) {
        alert("Please write feedback before submitting!");
        return;
      }

      const token = localStorage.getItem("token");
      const user: User | null = JSON.parse(localStorage.getItem("user") || "null");

      if (!user || !token) {
        alert("User not logged in!");
        return;
      }

      const response = await fetch("http://localhost:8080/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          doctor: doctorId,
          patient: user.id,
          patientName: user.name,
          feedback,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Feedback submitted successfully!");
        setFeedbacks({ ...feedbacks, [doctorId]: "" });
      } else {
        throw new Error(data.message);
      }
    } catch (error: any) {
      alert("Error submitting feedback: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="flex items-center gap-4 bg-black text-white p-4 rounded-lg shadow-md">
        <Image
          src="/assets/dfu_logo.jpeg" // place dfu_logo.jpeg inside /public folder
          alt="DFU Logo"
          width={60}
          height={60}
          className="rounded-md"
        />
        <h1 className="text-2xl font-bold">Diabetic Foot Ulcer Detection (DFU)</h1>
      </header>

      {/* Main Content */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Doctor Feedback</h2>
        <p className="text-gray-600">Share your feedback with the registered doctors.</p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white rounded-lg shadow-md p-5 flex flex-col gap-3"
            >
              {/* Profile Image */}
              {/* If you later add doctor.profileImg */}
              {/* <Image
                src={doctor.profileImg || "/default.png"}
                alt={doctor.name}
                width={100}
                height={100}
                className="rounded-full mx-auto"
              /> */}

              <h3 className="text-lg font-bold">{doctor.name}</h3>
              <p>
                <strong>Specialty:</strong> {doctor.role || "General"}
              </p>
              <p>
                <strong>Contact:</strong> {doctor.phone}
              </p>
              <p>
                <strong>Address:</strong> {doctor.address}
              </p>

              <textarea
                placeholder="Write your feedback..."
                value={feedbacks[doctor._id] || ""}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  handleFeedbackChange(doctor._id, e.target.value)
                }
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-black"
              ></textarea>

              <button
                onClick={() => handleFeedbackSubmit(doctor._id)}
                className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
              >
                Submit Feedback
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
