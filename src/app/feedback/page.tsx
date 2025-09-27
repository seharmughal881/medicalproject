// "use client";

// import { useEffect, useState, ChangeEvent } from "react";
// import Image from "next/image";

// // Types
// interface Doctor {
//   _id: string;
//   name: string;
//   role: string;
//   phone: string;
//   address: string;
//   profileImg?: string;
// }



// export default function Feedback() {
//   const [doctors, setDoctors] = useState<Doctor[]>([]);
//   const [feedbacks, setFeedbacks] = useState<Record<string, string>>({});

//   // Fetch doctors
//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const response = await fetch("http://localhost:8080/api/doctors");
//         if (!response.ok) throw new Error("Failed to fetch doctors");
//         const data = await response.json();
//         setDoctors(data);
//       } catch (error) {
//         console.error("Error fetching doctors:", error);
//       }
//     };
//     fetchDoctors();
//   }, []);

//   // Handle feedback text change
//   const handleFeedbackChange = (doctorId: string, value: string) => {
//     setFeedbacks({ ...feedbacks, [doctorId]: value });
//   };

//   // Submit feedback
// interface User {
//   id: string;
//   name: string;
// }

// interface FeedbackResponse {
//   success: boolean;
//   message: string;
// }


// const handleFeedbackSubmit = async (doctorId: string) => {
//   try {
//     const feedback = feedbacks[doctorId];
//     if (!feedback) {
//       alert("Please write feedback before submitting!");
//       return;
//     }

//     const token = localStorage.getItem("token");
//     const user: User | null = JSON.parse(localStorage.getItem("user") || "null");

//     if (!user || !token) {
//       alert("User not logged in!");
//       return;
//     }

//     const response = await fetch("http://localhost:8080/api/feedback", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         doctor: doctorId,
//         patient: user.id,
//         patientName: user.name,
//         feedback,
//       }),
//     });

//     const data: FeedbackResponse = await response.json();

//     if (data.success) {
//       alert("Feedback submitted successfully!");
//       setFeedbacks({ ...feedbacks, [doctorId]: "" });
//     } else {
//       throw new Error(data.message);
//     }
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       alert("Error submitting feedback: " + error.message);
//     } else {
//       alert("An unexpected error occurred.");
//     }
//   }
// };


//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       {/* Header */}
//       <header className="flex items-center gap-4 bg-black text-white p-4 rounded-lg shadow-md">
//         <Image
//           src="/assets/dfu_logo.jpeg" // place dfu_logo.jpeg inside /public folder
//           alt="DFU Logo"
//           width={60}
//           height={60}
//           className="rounded-md"
//         />
//         <h1 className="text-2xl font-bold">Diabetic Foot Ulcer Detection (DFU)</h1>
//       </header>

//       {/* Main Content */}
//       <div className="mt-6">
//         <h2 className="text-xl font-semibold">Doctor Feedback</h2>
//         <p className="text-gray-600">Share your feedback with the registered doctors.</p>

//         <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {doctors.map((doctor) => (
//             <div
//               key={doctor._id}
//               className="bg-white rounded-lg shadow-md p-5 flex flex-col gap-3"
//             >
//               {/* Profile Image */}
//               {/* If you later add doctor.profileImg */}
//               {/* <Image
//                 src={doctor.profileImg || "/default.png"}
//                 alt={doctor.name}
//                 width={100}
//                 height={100}
//                 className="rounded-full mx-auto"
//               /> */}

//               <h3 className="text-lg font-bold">{doctor.name}</h3>
//               <p>
//                 <strong>Specialty:</strong> {doctor.role || "General"}
//               </p>
//               <p>
//                 <strong>Contact:</strong> {doctor.phone}
//               </p>
//               <p>
//                 <strong>Address:</strong> {doctor.address}
//               </p>

//               <textarea
//                 placeholder="Write your feedback..."
//                 value={feedbacks[doctor._id] || ""}
//                 onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
//                   handleFeedbackChange(doctor._id, e.target.value)
//                 }
//                 className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-black"
//               ></textarea>

//               <button
//                 onClick={() => handleFeedbackSubmit(doctor._id)}
//                 className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
//               >
//                 Submit Feedback
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }



// "use client";

// import { useEffect, useState, ChangeEvent } from "react";
// import Image from "next/image";

// interface Doctor {
//   _id: string;
//   name: string;
//   role: string;
//   phone: string;
//   address: string;
//   profileImg?: string;
// }

// export default function Feedback() {
//   const [doctors, setDoctors] = useState<Doctor[]>([]);
//   const [feedbacks, setFeedbacks] = useState<Record<string, string>>({});

//   // ✅ Doctors fetch
//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/doctors");
//         if (!response.ok) throw new Error("Failed to fetch doctors");
//         const data = await response.json();
//         setDoctors(data);
//       } catch (error) {
//         console.error("Error fetching doctors:", error);
//       }
//     };
//     fetchDoctors();
//   }, []);

//   // ✅ Handle feedback input
//   const handleFeedbackChange = (doctorId: string, value: string) => {
//     setFeedbacks({ ...feedbacks, [doctorId]: value });
//   };

//   // ✅ Submit feedback
//   const handleFeedbackSubmit = async (doctorId: string) => {
//     try {
//       const feedback = feedbacks[doctorId];
//       if (!feedback) {
//         alert("⚠ Please write feedback before submitting!");
//         return;
//       }

//       const token = localStorage.getItem("token");
//       if (!token) {
//         alert("⚠ Please login first!");
//         return;
//       }

//       const response = await fetch("http://localhost:5000/api/feedback", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           doctor: doctorId,
//           feedback,
//         }),
//       });

//       const data = await response.json();

//       if (data.success) {
//         alert("✅ Feedback submitted successfully!");
//         setFeedbacks({ ...feedbacks, [doctorId]: "" });
//       } else {
//         throw new Error(data.message);
//       }
//     } catch (error: any) {
//       alert("❌ Error submitting feedback: " + error.message);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       {/* Header */}
//       <header className="flex items-center gap-4 bg-black text-white p-4 rounded-lg shadow-md">
//         <Image
//           src="/assets/dfu_logo.jpeg"
//           alt="DFU Logo"
//           width={60}
//           height={60}
//           className="rounded-md"
//         />
//         <h1 className="text-2xl font-bold">Diabetic Foot Ulcer Detection (DFU)</h1>
//       </header>

//       {/* Main Content */}
//       <div className="mt-6">
//         <h2 className="text-xl font-semibold">Doctor Feedback</h2>
//         <p className="text-gray-600">Share your feedback with the registered doctors.</p>

//         <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {doctors.map((doctor) => (
//             <div
//               key={doctor._id}
//               className="bg-white rounded-lg shadow-md p-5 flex flex-col gap-3"
//             >
//               <h3 className="text-lg font-bold">{doctor.name}</h3>
//               <p>
//                 <strong>Specialty:</strong> {doctor.role || "General"}
//               </p>
//               <p>
//                 <strong>Contact:</strong> {doctor.phone}
//               </p>
//               <p>
//                 <strong>Address:</strong> {doctor.address}
//               </p>

//               <textarea
//                 placeholder="Write your feedback..."
//                 value={feedbacks[doctor._id] || ""}
//                 onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
//                   handleFeedbackChange(doctor._id, e.target.value)
//                 }
//                 className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-black"
//               ></textarea>

//               <button
//                 onClick={() => handleFeedbackSubmit(doctor._id)}
//                 className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
//               >
//                 Submit Feedback
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
// app/feedback/page.tsx or src/... GiveFeedbackPage.tsx


"use client";
import { useState } from "react";

export default function GiveFeedbackPage() {
  const [doctors] = useState([
    { name: "Sehar", role: "General Physician" },
    { name: "Ali", role: "Surgeon" },
    { name: "Ruhan", role: "Specialist" },
  ]);

  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoctor || !feedback) {
      setMessage("⚠ Please select a doctor and enter feedback.");
      return;
    }
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`, // patient token
        },
        body: JSON.stringify({ doctor: selectedDoctor, feedback }),
      });

      const data = await res.json();

      // If server returns a standard { success: true, ... }
      if (data?.success) {
        setMessage("✅ Feedback submitted successfully!");
        setFeedback("");
      } else {
        // handle errors (could be { message } or raw array)
        setMessage("❌ " + (data?.message || JSON.stringify(data)));
      }
    } catch (err) {
      console.error("Frontend submit error:", err);
      setMessage("❌ Error submitting feedback.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Give Feedback to Doctor</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          className="w-full border p-2 rounded"
          value={selectedDoctor}
          onChange={(e) => setSelectedDoctor(e.target.value)}
        >
          <option value="">Select Doctor</option>
          {doctors.map((doc) => (
            <option key={doc.name} value={doc.name}>
              {doc.name} ({doc.role})
            </option>
          ))}
        </select>

        <textarea
          className="w-full border p-2 rounded"
          placeholder="Write your feedback..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>

      {message && <p className="mt-4 text-sm">{message}</p>}
    </div>
  );
}
