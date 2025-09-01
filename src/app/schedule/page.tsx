"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Slot {
  date: string;
  time: string;
}

export default function AvailabilitySchedule() {
  const [availability, setAvailability] = useState<Slot[]>([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      const response = await axios.get(
        `http://localhost:8080/api/availability/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.slots) {
        setAvailability(response.data.slots);
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

    const slotExists = availability.some(
      (slot) => slot.date === date && slot.time === time
    );

    if (slotExists) {
      setError("This time slot already exists");
      return;
    }

    setAvailability([...availability, { date, time }]);
    setDate("");
    setTime("");
    setError("");
  };

  const handleRemoveSlot = (index: number) => {
    const updatedSlots = availability.filter((_, idx) => idx !== index);
    setAvailability(updatedSlots);
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

      console.log("Sending request with:", {
        token,
        userId,
        slots: availability,
      });

      const response = await axios.post(
        "http://localhost:8080/api/availability/save",
        { slots: availability },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        setError("");
        alert("Availability saved successfully!");
      }
    } catch (err: any) {
      console.error("Error details:", err.response || err);
      setError(err.response?.data?.message || "Failed to save availability");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-6">Set Your Availability</h1>

      <div className="bg-gray-900 border border-gray-700 p-6 rounded-2xl shadow-md w-full max-w-lg">
        {/* Date & Time Inputs */}
        <div className="flex flex-col gap-4 mb-4">
          <div className="flex flex-col">
            <label htmlFor="date" className="mb-1 font-semibold">
              Select Date:
            </label>
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
            <label htmlFor="time" className="mb-1 font-semibold">
              Select Time:
            </label>
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
              <li
                key={index}
                className="flex justify-between items-center bg-black p-3 rounded-md border border-gray-700"
              >
                <span>
                  {new Date(slot.date).toLocaleDateString()} at {slot.time}
                </span>
                <button
                  className="text-red-500 hover:text-red-700 font-bold"
                  onClick={() => handleRemoveSlot(index)}
                  disabled={loading}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No availability slots added yet.</p>
        )}
      </div>

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
