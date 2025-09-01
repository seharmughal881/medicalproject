"use client";
import { useState, DragEvent, ChangeEvent } from "react";
import Image from "next/image";

const DiabetesInfoForm: React.FC = () => {
  // ===== States =====
  const [diabetesType, setDiabetesType] = useState("");
  const [bloodSugarControl, setBloodSugarControl] = useState("");
  const [footUlcers, setFootUlcers] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [symptomDuration, setSymptomDuration] = useState(""); // fixed
  const [location, setLocation] = useState("");
  const [painLevel, setPainLevel] = useState<number | null>(null);

  const [diabetesDuration, setDiabetesDuration] = useState(""); // fixed separate
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [notes, setNotes] = useState("");

  // ===== File Upload Handlers =====
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // ===== Form Submit =====
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      diabetesType,
      bloodSugarControl,
      footUlcers,
      symptoms,
      symptomDuration,
      location,
      painLevel,
      diabetesDuration,
      notes,
      file: selectedFile?.name || null,
    };
    console.log("Submitted Data:", payload);
    alert("Your information has been submitted for medical review.");
  };

  return (
    <div className="">
      {/* ===== Navbar ===== */}
      <div className="min-h-screen bg-gray-50">
        <header className="flex justify-between items-center px-6 py-4 border-b bg-white shadow-sm">
          <h1 className="text-xl font-semibold flex items-center gap-2">
            <span className="inline-block w-5 h-5 bg-black rounded-full" />{" "}
            Patient Dashboard
          </h1>
           <div className="flex items-center gap-4">
            <div
              onClick={() => (window.location.href = "/profile")}
              className="bg-gradient-to-br from-white to-black rounded-lg  w-[50px] h-[50px] flex flex-col items-center justify-center text-black font-bold shadow-md cursor-pointer transform transition-transform duration-300 hover:scale-110"
            >
              <Image
                src="/assets/profile_icon.png"
                alt="Profile Icon"
                width={30} // Width badha diya
                height={30} // Height badha diya
                className="mb-2"
              />
            </div>

            <p className="m-0 text-sm">Profile</p>
          </div>
          <div className="flex items-center gap-4">
            <div
              onClick={() => (window.location.href = "/feedback")}
              className="bg-gradient-to-br from-white to-black rounded-lg  w-[50px] h-[50px] flex flex-col items-center justify-center text-black font-bold shadow-md cursor-pointer transform transition-transform duration-300 hover:scale-110"
            >
              <Image
                src="/assets/feedback.png"
                alt="Feedback Icon"
                width={30} // Width badha diya
                height={30} // Height badha diya
                className="mb-2"
              />
            </div>

            <p className="m-0 text-sm">Feedback</p>
          </div>
          <div className="flex items-center gap-4">
            <div
              onClick={() => (window.location.href = "/recommendation")}
              className="bg-gradient-to-br from-black to-white rounded-lg  w-[50px] h-[50px] flex flex-col items-center justify-center text-black font-bold shadow-md cursor-pointer transform transition-transform duration-300 hover:scale-110"
            >
              <Image
                src="/assets/doctor.png"
                alt="Recommendation Icon"
                width={30}
                height={30}
                className="mb-3"
              />
            </div>
            <p className="m-0 text-sm">Recommendation</p>

            <button className="px-4 py-1 border rounded-md hover:bg-gray-100">
              Logout
            </button>
          </div>
        </header>

        {/* ===== Symptoms Section ===== */}
        <main className="max-w-3xl mx-auto px-6 py-10">
          <h2 className="text-2xl font-bold mb-2">Diabetic Foot Assessment</h2>
          <p className="text-gray-600 mb-8">
            Please provide detailed information about your condition and upload
            relevant images for medical review.
          </p>

          <div className="bg-white shadow rounded-xl p-6 space-y-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <span className="inline-block w-5 h-5 bg-gray-700 text-white rounded-md text-center">
                📋
              </span>
              Current Symptoms & Condition
            </h3>
            <p className="text-gray-600 text-sm">
              Describe your current symptoms and concerns in detail
            </p>

            {/* Symptoms */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Current Symptoms
              </label>
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Please describe your current symptoms..."
                className="w-full border rounded-md p-2 h-24"
              />
            </div>

            {/* Symptom Duration & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Symptom Duration
                </label>
                <select
                  value={symptomDuration}
                  onChange={(e) => setSymptomDuration(e.target.value)}
                  className="w-full border rounded-md p-2"
                >
                  <option value="">Select duration</option>
                  <option value="1-3 days">1-3 days</option>
                  <option value="1 week">1 week</option>
                  <option value="2+ weeks">2+ weeks</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Location on Foot
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full border rounded-md p-2"
                >
                  <option value="">Select location</option>
                  <option value="heel">Heel</option>
                  <option value="toes">Toes</option>
                  <option value="sole">Sole</option>
                  <option value="ankle">Ankle</option>
                </select>
              </div>
            </div>

            {/* Pain Level */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Pain Level (0-10)
              </label>
              <div className="flex gap-4 flex-wrap">
                {Array.from({ length: 11 }, (_, i) => (
                  <label key={i} className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="pain"
                      value={i}
                      checked={painLevel === i}
                      onChange={() => setPainLevel(i)}
                    />
                    {i}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ===== Diabetes Info Section ===== */}
      <div className="bg-gray-100 px-4 py-16">
        <div className="bg-white p-8 md:p-10 rounded-lg shadow-md w-full max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-1">Diabetes Information</h2>
          <p className="text-gray-500 mb-6">
            Information about your diabetes management and history
          </p>

          <form className="grid md:grid-cols-2 gap-6">
            {/* Type of Diabetes */}
            <div>
              <label className="block font-semibold mb-2">
                Type of Diabetes
              </label>
              <div className="space-y-2">
                {["Type 1", "Type 2", "Gestational"].map((type) => (
                  <label key={type} className="block">
                    <input
                      type="radio"
                      name="diabetesType"
                      value={type}
                      checked={diabetesType === type}
                      onChange={(e) => setDiabetesType(e.target.value)}
                      className="mr-2"
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            {/* Diabetes Duration */}
            <div>
              <label className="block font-semibold mb-2">
                How long have you had diabetes?
              </label>
              <select
                value={diabetesDuration}
                onChange={(e) => setDiabetesDuration(e.target.value)}
                className="w-full border rounded-md px-3 py-2"
              >
                <option value="">Select duration</option>
                <option value="<1 year">Less than 1 year</option>
                <option value="1-5 years">1-5 years</option>
                <option value="5-10 years">5-10 years</option>
                <option value="10+ years">More than 10 years</option>
              </select>
            </div>

            {/* Medications */}
            <div className="md:col-span-2">
              <label className="block font-semibold mb-2">
                Current Medications
              </label>
              <textarea
                placeholder="List your current medications..."
                className="w-full border rounded-md px-3 py-2 h-24"
              ></textarea>
            </div>

            {/* Blood Sugar Control */}
            <div>
              <label className="block font-semibold mb-2">
                Blood Sugar Control
              </label>
              <div className="space-y-2">
                {[
                  "Well controlled",
                  "Moderately controlled",
                  "Poorly controlled",
                ].map((control) => (
                  <label key={control} className="block">
                    <input
                      type="radio"
                      name="bloodSugar"
                      value={control}
                      checked={bloodSugarControl === control}
                      onChange={(e) => setBloodSugarControl(e.target.value)}
                      className="mr-2"
                    />
                    {control}
                  </label>
                ))}
              </div>
            </div>

            {/* Foot Ulcers */}
            <div>
              <label className="block font-semibold mb-2">
                Previous Foot Ulcers
              </label>
              <div className="space-y-2">
                <label className="block">
                  <input
                    type="radio"
                    name="footUlcers"
                    value="Yes"
                    checked={footUlcers === "Yes"}
                    onChange={(e) => setFootUlcers(e.target.value)}
                    className="mr-2"
                  />
                  Yes, I have had foot ulcers before
                </label>
                <label className="block">
                  <input
                    type="radio"
                    name="footUlcers"
                    value="No"
                    checked={footUlcers === "No"}
                    onChange={(e) => setFootUlcers(e.target.value)}
                    className="mr-2"
                  />
                  No, this is my first time
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* ===== Upload Images ===== */}
      <div className="bg-gray-50 flex items-center justify-center p-6 py-16">
        <div className="bg-white shadow rounded-xl p-6 w-full max-w-2xl">
          <h3 className="text-xl font-semibold flex items-center gap-2 mb-1">
            <span className="inline-block">📷</span> Upload Foot Images
          </h3>
          <p className="text-gray-600 text-sm mb-6">
            Please upload clear photos of the affected area for medical review
          </p>

          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center cursor-pointer hover:border-gray-400 transition"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            {previewUrl ? (
              <div className="flex flex-col items-center gap-4">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-40 h-40 object-cover rounded-lg border"
                />
                <p className="text-sm text-gray-600">{selectedFile?.name}</p>
                <button
                  onClick={() => {
                    setSelectedFile(null);
                    setPreviewUrl(null);
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center cursor-pointer">
                <span className="text-4xl text-gray-400">⬆️</span>
                <span className="mt-2 text-gray-700 font-medium">
                  Upload Image
                </span>
                <span className="text-sm text-gray-500">
                  Click to select or drag and drop your image here
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            )}
          </div>
        </div>
      </div>

      {/* ===== Additional Notes & Submit ===== */}
      <div className="bg-gray-50 flex items-center justify-center p-6 py-16">
        <div className="w-full max-w-3xl space-y-6">
          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-2">
              Additional Information
            </h3>
            <label className="block text-sm font-medium mb-1">
              Additional Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any additional info, concerns, or questions..."
              className="w-full border rounded-md p-3 h-28"
            />
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white shadow rounded-xl p-6 flex flex-col items-center space-y-4"
          >
            <button
              type="submit"
              className="w-full bg-black text-white text-lg font-medium py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Submit for Medical Review
            </button>
            <p className="text-sm text-gray-600 text-center">
              Your information will be reviewed by qualified medical
              professionals
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DiabetesInfoForm;
