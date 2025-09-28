"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

type DiabetesRecord = {
  _id?: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  gender?: string;
  dob?: string;
  createdAt?: string;

  // History fields
  symptoms?: string;
  symptomDuration?: string;
  location?: string;
  painLevel?: number;
  diabetesType?: string;
  diabetesDuration?: string;
  medications?: string;
  bloodSugarControl?: string;
  footUlcers?: string;
  notes?: string;
  imageUrl?: string; // single image string in your DB
  images?: string[]; // optional array if multiple
};

export default function ViewHistory() {
  const [email, setEmail] = useState("");
  const [records, setRecords] = useState<DiabetesRecord[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Load saved email & records on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem("patientEmail");
    const savedRecords = localStorage.getItem("patientRecords");

    if (savedEmail) setEmail(savedEmail);
    if (savedRecords) setRecords(JSON.parse(savedRecords));

    // ✅ Cleanup when leaving page
    return () => {
      localStorage.removeItem("patientEmail");
      localStorage.removeItem("patientRecords");
    };
  }, []);

  // ✅ Fetch patient history
  const fetchPatientHistory = async () => {
    setError("");
    setRecords([]);

    if (!email.trim()) {
      setError("Please enter a valid email.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please login first");
        return;
      }

      setLoading(true);

      // const url = `http://localhost:5000/api/diabetes/byEmail/${encodeURIComponent(
      //   email.trim()
      // )}`;
 const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/diabetes/byEmail/${encodeURIComponent(
        email.trim()
      )}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = response.data;

      if (!data || (Array.isArray(data) && data.length === 0)) {
        setError("No records found for this email.");
        setRecords([]);
        localStorage.removeItem("patientEmail");
        localStorage.removeItem("patientRecords");
        return;
      }

      const arr = Array.isArray(data) ? data : [data];
      setRecords(arr);

      // ✅ Save in localStorage
      localStorage.setItem("patientEmail", email.trim());
      localStorage.setItem("patientRecords", JSON.stringify(arr));

      setError("");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.error ||
            err.response?.data?.message ||
            "Error fetching patient data"
        );
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error fetching patient data");
      }
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };

  const latest = records.length ? records[0] : null;

  // helper to build image URL
  const imageUrl = (img?: string) => {
    if (!img) return "";
    if (img.startsWith("http")) return img;
    return `http://localhost:5000${img.startsWith("/") ? "" : "/"}${img}`;
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">View Patient History</h1>

      {/* Search Form */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <label className="block font-medium mb-2">Enter Patient Email</label>
        <div className="flex gap-3">
          <input
            type="email"
            className="flex-1 border rounded-md px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
          />
          <button
            onClick={fetchPatientHistory}
            className="bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800 cursor-pointer disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Fetching..." : "Fetch"}
          </button>
        </div>
        {error && <p className="text-red-600 mt-3">{error}</p>}
      </div>

      {/* Patient Info */}
      {latest && (
        <div className="space-y-8">
          {/* Patient Details */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Patient Details</h2>
            <ul className="space-y-1 text-gray-700">
              <li><strong>Name:</strong> {latest.name || "—"}</li>
              <li><strong>Email:</strong> {latest.email || "—"}</li>
              <li><strong>Phone:</strong> {latest.phone || "—"}</li>
              <li><strong>Address:</strong> {latest.address || "—"}</li>
              <li><strong>Gender:</strong> {latest.gender || "—"}</li>
              <li>
                <strong>Date of Birth:</strong>{" "}
                {latest.dob ? new Date(latest.dob).toLocaleDateString() : "—"}
              </li>
              <li>
                <strong>Joined:</strong>{" "}
                {latest.createdAt
                  ? new Date(latest.createdAt).toLocaleDateString()
                  : "—"}
              </li>
            </ul>
          </div>

          {/* History Records */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              History Records ({records.length})
            </h2>

            {records.map((rec, i) => (
              <div key={rec._id ?? i} className="bg-white shadow rounded-lg p-6">
                {/* Record Meta */}
                <p className="text-sm text-gray-500">
                  <strong>Recorded:</strong>{" "}
                  {rec.createdAt
                    ? new Date(rec.createdAt).toLocaleString()
                    : "—"}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Record ID:</strong> {rec._id ?? "—"}
                </p>

                {/* Diabetic Foot Assessment */}
                {(rec.symptoms ||
                  rec.symptomDuration ||
                  rec.location ||
                  rec.painLevel !== undefined) && (
                  <div className="mt-3">
                    <h3 className="font-semibold">Diabetic Foot Assessment</h3>
                    {rec.symptoms && <p><strong>Symptoms:</strong> {rec.symptoms}</p>}
                    {rec.symptomDuration && <p><strong>Duration:</strong> {rec.symptomDuration}</p>}
                    {rec.location && <p><strong>Location:</strong> {rec.location}</p>}
                    {rec.painLevel !== undefined && (
                      <p><strong>Pain Level:</strong> {rec.painLevel}</p>
                    )}
                  </div>
                )}

                {/* Diabetes Info */}
                {(rec.diabetesType ||
                  rec.diabetesDuration ||
                  rec.medications ||
                  rec.bloodSugarControl ||
                  rec.footUlcers) && (
                  <div className="mt-3">
                    <h3 className="font-semibold">Diabetes Info</h3>
                    {rec.diabetesType && <p><strong>Type:</strong> {rec.diabetesType}</p>}
                    {rec.diabetesDuration && <p><strong>Duration:</strong> {rec.diabetesDuration}</p>}
                    {rec.medications && <p><strong>Medications:</strong> {rec.medications}</p>}
                    {rec.bloodSugarControl && <p><strong>Blood Sugar Control:</strong> {rec.bloodSugarControl}</p>}
                    {rec.footUlcers && <p><strong>Previous Foot Ulcers:</strong> {rec.footUlcers}</p>}
                  </div>
                )}

                {/* Images */}
                {/* {((rec.images && rec.images.length > 0) || rec.imageUrl) && (
                  <div className="mt-3">
                    <h3 className="font-semibold">Uploaded Images</h3>
                    <div className="flex gap-4 flex-wrap mt-2">
                      {(rec.images && rec.images.length > 0
                        ? rec.images
                        : rec.imageUrl
                        ? [rec.imageUrl]
                        : []
                      ).map((img, idx) => (
                        <img
                          key={idx}
                          src={imageUrl(img)}
                          alt={`upload-${idx}`}
                          style={{
                            width: 128,
                            height: 128,
                            objectFit: "cover",
                            borderRadius: 8,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )} */}
{((rec.images && rec.images.length > 0) || rec.imageUrl) && (
  <div className="mt-3">
    <h3 className="font-semibold">Uploaded Images</h3>
    <div className="flex gap-4 flex-wrap mt-2">
      {(rec.images && rec.images.length > 0
        ? rec.images
        : rec.imageUrl
        ? [rec.imageUrl]
        : []
      ).map((img, idx) => (
        <Image
          key={idx}
          src={imageUrl(img)}
          alt={`upload-${idx}`}
          width={128}
          height={128}
          unoptimized
          className="object-cover rounded-lg"
        />
      ))}
    </div>
  </div>
)}

                {/* Notes */}
                {rec.notes && (
                  <div className="mt-3">
                    <h3 className="font-semibold">Notes</h3>
                    <p>{rec.notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
