"use client";
import { useEffect, useState } from "react";

interface FeedbackItem {
  _id?: string;
  patient?: string;
  patientName: string;
  feedback: string;
  createdAt: string;
}

export default function DoctorFeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const doctorName = localStorage.getItem("doctorName"); // stored at login
      const token = localStorage.getItem("token");

      if (!doctorName) {
        setMessage("Please login as a doctor (doctorName not found).");
        setLoading(false);
        return;
      }
      if (!token) {
        setMessage("Please login (token missing).");
        setLoading(false);
        return;
      }

      try {
        const url = `http://localhost:5000/api/feedback/doctor/${encodeURIComponent(
          doctorName
        )}`;

        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        if (data?.success && Array.isArray(data.feedbacks)) {
          setFeedbacks(data.feedbacks);
        } else if (Array.isArray(data)) {
          // fallback in case backend returns raw array
          setFeedbacks(data);
        } else {
          setMessage("No feedbacks found or API returned an unexpected response.");
        }
      } catch (err) {
        console.error("Error fetching feedbacks:", err);
        setMessage("Error fetching feedbacks.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Patient Feedbacks</h1>
      {loading && <p>Loading...</p>}
      {message && <p className="text-red-500">{message}</p>}
      {!loading && feedbacks.length === 0 && <p>No feedbacks yet.</p>}
      <ul className="space-y-3 mt-4">
        {feedbacks.map((f) => (
          <li
            key={f._id || Math.random()}
            className="border p-3 rounded shadow-sm"
          >
            <p className="font-semibold">{f.patientName}</p>
            <p className="text-gray-700">{f.feedback}</p>
            <p className="text-xs text-gray-500">
              {new Date(f.createdAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
