"use client";

import { useEffect, useState } from "react";
import axios from "axios";


export default function ViewFeedback() {
  const [feedbacks, setFeedbacks] = useState<
    { patientName: string; feedback: string; createdAt: string }[]
  >([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      if (!token || !user) {
        setError("⚠ Please login first");
        return;
      }

      const parsedUser: { id: string } = JSON.parse(user);

      const response = await axios.get<
        { patientName: string; feedback: string; createdAt: string }[]
      >(`http://localhost:8080/api/feedback/doctor/${parsedUser.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setFeedbacks(response.data);
      setError("");
    } catch (err) {
      const errorMessage =
        (err as { message?: string }).message || "Error fetching feedbacks";
      setError("Error fetching feedbacks: " + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">My Patient Feedbacks</h1>

      {loading && <p className="text-gray-600">Loading feedbacks...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="space-y-6">
        {feedbacks.length > 0 ? (
          feedbacks.map((feedback, index) => (
            <div
              key={index}
              className="bg-white shadow-md border border-gray-200 rounded-lg p-6"
            >
              <h3 className="text-lg font-semibold text-black">
                {feedback.patientName}
              </h3>
              <p className="italic text-gray-700 mt-2">{feedback.feedback}</p>
              <p className="text-sm text-gray-500 mt-3">
                Date: {new Date(feedback.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No feedbacks available.</p>
        )}
      </div>
    </main>
  );
}
