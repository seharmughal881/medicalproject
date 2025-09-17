"use client";

import { useEffect, useState } from "react";

export default function DoctorDashboard() {
  const [patientEmails, setPatientEmails] = useState<string[]>([]);

  useEffect(() => {
    // 🔹 Step 1: LocalStorage se purana data load karo
    const stored = localStorage.getItem("patientEmails");
    if (stored) {
      setPatientEmails(JSON.parse(stored));
    }

    // 🔹 Step 2: API se current user fetch karo
    const fetchPatientEmail = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/patient", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch patient email");
        }

        const data = await response.json();

        // ✅ Sirf patient ka email add karo
        if (data?.email && data?.role?.toLowerCase() === "patient") {
          const stored = localStorage.getItem("patientEmails");
          const prevEmails = stored ? JSON.parse(stored) : [];

          if (!prevEmails.includes(data.email)) {
            const updated = [...prevEmails, data.email];
            localStorage.setItem("patientEmails", JSON.stringify(updated));
            setPatientEmails(updated);
          } else {
            setPatientEmails(prevEmails);
          }
        }
      } catch (error) {
        console.error("Error fetching patient email:", error);
      }
    };

    fetchPatientEmail();
  }, []);

  // Single email delete
  const handleDelete = (email: string) => {
    const index = patientEmails.indexOf(email);
    if (index !== -1) {
      const updated = [...patientEmails];
      updated.splice(index, 1);
      setPatientEmails(updated);
      localStorage.setItem("patientEmails", JSON.stringify(updated));
    }
  };

  // Clear all emails
  const handleClearAll = () => {
    localStorage.removeItem("patientEmails");
    setPatientEmails([]);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="flex justify-between items-center px-6 py-4 bg-gray-900 shadow-md">
        <h1 className="text-2xl font-bold">Doctor Dashboard</h1>
        {patientEmails.length > 0 && (
          <button
            onClick={handleClearAll}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Clear All
          </button>
        )}
      </header>

      <main className="flex flex-col items-center justify-start flex-1 p-8 w-full">
        <h2 className="text-xl font-semibold mb-6">Patient Emails</h2>

        {patientEmails.length > 0 ? (
          <ul className="space-y-4 w-full max-w-md">
            {patientEmails.map((email, i) => (
              <li
                key={i}
                className="flex justify-between items-center bg-gray-800 p-3 rounded-lg shadow"
              >
                <span className="text-green-400">{email}</span>
                <button
                  onClick={() => handleDelete(email)}
                  className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No patients logged in yet.</p>
        )}
      </main>
    </div>
  );
}
