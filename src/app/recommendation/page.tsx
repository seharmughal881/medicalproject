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
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/doctors`, {
  // "http://localhost:5000/api/auth/doctors"
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch doctors");
        }

        const data = await response.json();

        // ✅ Safe check + remove duplicates by email
        // if (data && Array.isArray(data.doctors)) {
        //   const uniqueDoctors: Doctor[] = Array.from(
        //     new Map(
        //       data.doctors.map((doc: Doctor) => [doc.email, doc])
        //     ).values()
        //   );
        //   setDoctors(uniqueDoctors);
        // }
        if (data && Array.isArray(data.doctors)) {
  const uniqueDoctors: Doctor[] = Array.from(
    new Map(
      (data.doctors as Doctor[]).map((doc) => [doc.email, doc])
    ).values()
  );

  setDoctors(uniqueDoctors);
}
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

// useEffect(() => {
//   const fetchDoctor = async () => {
//     try {
//       const token = localStorage.getItem("token"); // login ke time save karo

//       const response = await fetch("http://localhost:5000/api/auth/me/doctor", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch doctor data");
//       }

//       const data = await response.json();

//       if (data && data.success && data.doctor) {
//         setDoctors([data.doctor]); // ✅ sirf login wala doctor set hoga
//       }
//     } catch (error) {
//       console.error("Error fetching doctor:", error);
//     }
//   };

//   fetchDoctor();
// }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-black text-black px-6 py-10">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-black">Doctor Recommendations</h1>
        <p className="text-gray-700 mt-2">
          Find the best specialists for your needs
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <div
            key={doctor._id}
            className="bg-white border border-gray-300 shadow-md rounded-2xl p-6"
          >
            <h2 className="text-xl font-semibold">{doctor.name}</h2>
            <p>
              <strong>Role:</strong> {doctor.role}
            </p>
            <p>
              <strong>Contact:</strong> {doctor.phone}
            </p>
            <p>
              <strong>Email:</strong> {doctor.email}
            </p>
            <p>
              <strong>Address:</strong> {doctor.address}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
