"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface Slot {
  date: string;
  time: string;
  iso?: string; // ISO datetime string (UTC)
  booked?: boolean;
}

export default function AvailabilitySchedule() {
  const [availability, setAvailability] = useState<Slot[]>([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Booking form state
  const [bookingSlotIndex, setBookingSlotIndex] = useState<number | null>(null);
  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    fetchAvailability();
  }, []);

  const fetchAvailability = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please login first");
        return;
      }
      const userId = localStorage.getItem("userId");
      const res = await axios.get(
        `http://localhost:5000/api/availability/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data && res.data.slots) {
        setAvailability(res.data.slots);
      }
    } catch (err) {
      console.error("Error fetching availability:", err);
      setError("Failed to fetch availability");
    }
  };

  const handleAddAvailability = () => {
    if (!date || !time) {
      setError("Please select both date and time");
      return;
    }
    // Create ISO string in local timezone, convert to ISO
    const iso = new Date(`${date}T${time}:00`).toISOString();
    const slotExists = availability.some((slot) => slot.iso === iso);
    if (slotExists) {
      setError("This time slot already exists");
      return;
    }
    setAvailability((prev) => [...prev, { date, time, iso }]);
    setDate("");
    setTime("");
    setError("");
  };

  const handleRemoveSlot = (index: number) => {
    setAvailability((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSaveAvailability = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!token || !userId) {
        setError("Please login first");
        return;
      }

      await axios.post(
        // "http://localhost:5000/api/availability/save",
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/availability/save`,
        { doctorId: userId, slots: availability },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setError("");
      alert("Availability saved successfully!");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Error details:", err.response || err);
        setError(err.response?.data?.message || "Failed to save availability");
      } else {
        console.error("Unexpected error:", err);
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const openBookingForm = (index: number) => {
    setBookingSlotIndex(index);
    setPatientName("");
    setPatientEmail("");
    setPatientPhone("");
    setError("");
  };

  const handleCreateAppointment = async () => {
    if (bookingSlotIndex === null) {
      setError("Select a slot to book");
      return;
    }
    if (!patientName || !patientEmail || !patientPhone) {
      setError("Please fill patient name, email and phone");
      return;
    }

    try {
      setBookingLoading(true);
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!token || !userId) {
        setError("Please login first");
        return;
      }

      const slot = availability[bookingSlotIndex];
      const scheduledAt = slot.iso || new Date(`${slot.date}T${slot.time}:00`).toISOString();

      const payload = {
        doctorId: userId,
        patient: { name: patientName, email: patientEmail, phone: patientPhone },
        scheduledAt,
        slot, // optional: server can also update availability based on iso
      };

      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/appointments/create`, payload, {
        // "http://localhost:5000/api/appointments/create"
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });

      alert("Appointment created — reminders will be sent automatically (3d, 1d, 3h).");
      console.log(res.data); // ✅ now ESLint sees it's used

      // Remove the booked slot locally so doctor doesn't reuse it
      setAvailability((prev) => prev.filter((_, idx) => idx !== bookingSlotIndex));
      setBookingSlotIndex(null);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Booking error:", err.response || err);
        setError(err.response?.data?.message || "Failed to create appointment");
      } else {
        console.error("Unexpected booking error:", err);
        setError("An unexpected error occurred");
      }
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-6">Set Your Availability</h1>

      <div className="bg-gray-900 border border-gray-700 p-6 rounded-2xl shadow-md w-full max-w-lg">
        <div className="flex flex-col gap-4 mb-4">
          <div className="flex flex-col">
            <label htmlFor="date" className="mb-1 font-semibold">Select Date:</label>
            <input
              type="date"
              id="date"
              value={date}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setDate(e.target.value)}
              className="p-2 rounded-md border border-gray-600 bg-black text-white focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="time" className="mb-1 font-semibold">Select Time:</label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="p-2 rounded-md border border-gray-600 bg-black text-white focus:outline-none"
            />
          </div>
        </div>

        <button
          className="w-full bg-white text-black font-bold py-2 px-4 rounded-md hover:bg-gray-200 transition disabled:opacity-50"
          onClick={handleAddAvailability}
          disabled={loading}
        >
          Add Slot
        </button>

        {error && <p className="text-red-400 mt-4">{error}</p>}
      </div>

      {/* Availability List */}
      <div className="bg-gray-900 border border-gray-700 p-6 rounded-2xl shadow-md w-full max-w-lg mt-8">
        <h2 className="text-xl font-bold mb-4">Available Time Slots</h2>
        {availability.length > 0 ? (
          <ul className="space-y-3">
            {availability.map((slot, index) => (
              <li key={index} className="flex justify-between items-center bg-black p-3 rounded-md border border-gray-700">
                <div>
                  <div>{new Date(slot.iso || `${slot.date}T${slot.time}`).toLocaleString()}</div>
                  {slot.booked && <div className="text-yellow-300 text-sm">Booked</div>}
                </div>
                <div className="flex gap-2">
                  <button
                    className="text-green-400 hover:text-green-600 font-bold"
                    onClick={() => openBookingForm(index)}
                    disabled={loading}
                  >
                    Book
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 font-bold"
                    onClick={() => handleRemoveSlot(index)}
                    disabled={loading}
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No availability slots added yet.</p>
        )}
      </div>

      {/* Booking form (shows when doctor clicks 'Book') */}
      {bookingSlotIndex !== null && (
        <div className="bg-gray-900 border border-gray-700 p-6 rounded-2xl shadow-md w-full max-w-lg mt-6">
          <h3 className="text-lg font-bold mb-3">Book Slot — {new Date(availability[bookingSlotIndex].iso || `${availability[bookingSlotIndex].date}T${availability[bookingSlotIndex].time}`).toLocaleString()}</h3>

          <div className="flex flex-col gap-3">
            <input
              placeholder="Patient name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="p-2 rounded-md border border-gray-600 bg-black text-white"
            />
            <input
              placeholder="Patient email"
              value={patientEmail}
              onChange={(e) => setPatientEmail(e.target.value)}
              className="p-2 rounded-md border border-gray-600 bg-black text-white"
            />
            <input
              placeholder="Patient phone (with country code, e.g. +92300...)"
              value={patientPhone}
              onChange={(e) => setPatientPhone(e.target.value)}
              className="p-2 rounded-md border border-gray-600 bg-black text-white"
            />
            <div className="flex gap-2">
              <button
                onClick={handleCreateAppointment}
                disabled={bookingLoading}
                className="bg-white text-black px-4 py-2 rounded-md font-bold"
              >
                {bookingLoading ? "Booking..." : "Create Appointment"}
              </button>
              <button
                onClick={() => setBookingSlotIndex(null)}
                className="bg-gray-700 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save Button */}
      <button
        className="mt-8 bg-white text-black font-bold py-2 px-6 rounded-md hover:bg-gray-200 transition disabled:opacity-50"
        onClick={handleSaveAvailability}
        disabled={loading || availability.length === 0}
      >
        {loading ? "Saving..." : "Save Availability"}
      </button>
    </div>
  );
}

