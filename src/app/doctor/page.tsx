"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DoctorDashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-gray-900 shadow-md">
        <h1 className="text-2xl font-bold">Doctor Dashboard</h1>
        <button
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 cursor-pointer rounded-md font-semibold"
          onClick={() => router.push("/login")}
        >
          Logout
        </button>
      </header>

      {/* Content */}
      <main className="flex flex-col items-center justify-center flex-1 p-8">
        <h2 className="text-2xl font-semibold mb-8">Welcome, Doctor</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl">
          {/* Availability Schedule */}
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 shadow-md flex flex-col items-center">
            <h3 className="text-lg font-bold mb-2">Availability Schedule</h3>
            <p className="text-sm text-gray-400 text-center mb-4">
              Set your available times and dates for appointments.
            </p>
            <button className="bg-white text-black font-bold px-4 py-2 rounded-md hover:bg-gray-200">
  <Link href="/schedule">
    Set Schedule
  </Link>
</button>
          </div>

          {/* Patient History */}
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 shadow-md flex flex-col items-center">
            <h3 className="text-lg font-bold mb-2">Access Patient History</h3>
            <p className="text-sm text-gray-400 text-center mb-4">
              Retrieve and view your patients&apos; medical history.
            </p>
             <button className="bg-white text-black font-bold px-4 py-2 rounded-md hover:bg-gray-200">
  <Link href="/history">
    View History
  </Link>
</button>
          </div>

          {/* Patient Records */}
         <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 shadow-md flex flex-col items-center">
            <h3 className="text-lg font-bold mb-2">Access Patient Records</h3>
            <p className="text-sm text-gray-400 text-center mb-4">
View patient by their email and their record           </p>
           <button className="bg-white text-black font-bold px-4 py-2 rounded-md hover:bg-gray-200">
  <Link href="/emailrecord">
    Patient Records
  </Link>
</button>
          </div>

          {/* Feedback */}
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 shadow-md flex flex-col items-center">
            <h3 className="text-lg font-bold mb-2">Access Patient Feedback</h3>
            <p className="text-sm text-gray-400 text-center mb-4">
              Review feedback provided by your patients.
            </p>
           <button className="bg-white text-black font-bold px-4 py-2 rounded-md hover:bg-gray-200">
  <Link href="/feedbacks">
    View Feedback
  </Link>
</button>
          </div>
        </div>
      </main>
    </div>
  );
}
