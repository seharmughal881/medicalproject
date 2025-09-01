"use client";

import { useState } from "react";
import axios from "axios";

interface Patient {
  name: string;
  email: string;
  phone: string;
  address: string;
  gender: string;
  dob: string;
  createdAt: string;

  // History fields (assuming your backend returns them)
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
  images?: string[]; // URLs for uploaded images
}

export default function ViewHistory() {
  const [email, setEmail] = useState("");
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState("");

  const fetchPatientHistory = async () => {
    if (!email.trim()) {
      setError("Please enter a valid email.");
      setPatient(null);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please login first");
        return;
      }

      const response = await axios.get(
        `http://localhost:8080/api/patients/byEmail/${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        setPatient(response.data);
        setError("");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Error fetching patient data");
      setPatient(null);
    }
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
            className="bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800"
          >
            Fetch
          </button>
        </div>
        {error && <p className="text-red-600 mt-3">{error}</p>}
      </div>

      {/* Patient Info */}
      {patient && (
        <div className="space-y-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Patient Details</h2>
            <ul className="space-y-1 text-gray-700">
              <li>
                <strong>Name:</strong> {patient.name}
              </li>
              <li>
                <strong>Email:</strong> {patient.email}
              </li>
              <li>
                <strong>Phone:</strong> {patient.phone}
              </li>
              <li>
                <strong>Address:</strong> {patient.address}
              </li>
              <li>
                <strong>Gender:</strong> {patient.gender}
              </li>
              <li>
                <strong>Date of Birth:</strong>{" "}
                {new Date(patient.dob).toLocaleDateString()}
              </li>
              <li>
                <strong>Joined:</strong>{" "}
                {new Date(patient.createdAt).toLocaleDateString()}
              </li>
            </ul>
          </div>

          {/* Symptoms Section */}
          {patient.symptoms && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-3">
                Diabetic Foot Assessment
              </h2>
              <p className="text-gray-700 mb-2">
                <strong>Symptoms:</strong> {patient.symptoms}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Duration:</strong> {patient.symptomDuration}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Location:</strong> {patient.location}
              </p>
              <p className="text-gray-700">
                <strong>Pain Level:</strong> {patient.painLevel}
              </p>
            </div>
          )}

          {/* Diabetes Info */}
          {patient.diabetesType && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-3">Diabetes Info</h2>
              <p className="text-gray-700 mb-2">
                <strong>Type:</strong> {patient.diabetesType}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Duration:</strong> {patient.diabetesDuration}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Medications:</strong> {patient.medications}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Blood Sugar Control:</strong>{" "}
                {patient.bloodSugarControl}
              </p>
              <p className="text-gray-700">
                <strong>Previous Foot Ulcers:</strong> {patient.footUlcers}
              </p>
            </div>
          )}

          {/* Uploaded Images */}
          {patient.images && patient.images.length > 0 && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-3">Uploaded Images</h2>
              <div className="flex gap-4 flex-wrap">
                {patient.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Foot ${i + 1}`}
                    className="w-32 h-32 object-cover rounded-md border"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          {patient.notes && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-3">Additional Notes</h2>
              <p className="text-gray-700">{patient.notes}</p>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
