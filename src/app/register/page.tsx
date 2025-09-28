"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react"; // 👈 Show/Hide password icons
import Image from "next/image";

export default function Registration() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    role: "patient",
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    gender: "",
    dob: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`, {
// "http://localhost:5000/api/auth/register"
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration failed");

      router.push(
        `/login?message=Registration successful! Please login.&role=${formData.role}`
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLoginClick = () => {
    router.push("/login");
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 relative"
      style={{
        backgroundImage: "url('/assets/background_img.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Header */}
      <header className="w-full bg-black py-5 text-center text-white z-10 flex items-center justify-center gap-3">
        <Image
          src="/assets/dfu_logo.jpeg"
          alt="DFU Logo"
          width={50}
          height={50}
          className="rounded"
        />
        <h1 className="text-2xl font-bold">
          Diabetic Foot Ulcer Detection (DFU)
        </h1>
      </header>

      {/* Form Container */}
      <div className="relative z-10 w-full max-w-md bg-white text-black rounded-2xl shadow-lg mt-10 border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-center mb-4 text-gray-800">
          Registration
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 border border-red-400 p-2 rounded mb-3 text-center text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Register as:
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full p-2 rounded border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className="w-full p-2 rounded border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="w-full p-2 rounded border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Password with Show/Hide */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password:
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="w-full p-2 rounded border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-600 hover:text-black"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number:
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              className="w-full p-2 rounded border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address:
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter your address"
              className="w-full p-2 rounded border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender:
            </label>
            <div className="flex gap-4 mt-1">
              {["male", "female", "other"].map((g) => (
                <label key={g} className="flex items-center gap-1 text-gray-700">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={formData.gender === g}
                    onChange={handleInputChange}
                  />
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </label>
              ))}
            </div>
          </div>

          {/* DOB */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date of Birth:
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              className="w-full p-2 rounded border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white font-semibold py-2 rounded hover:bg-gray-800 transition"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-4 flex items-center text-gray-400 text-sm">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-3">ALREADY HAVE ACCOUNT?</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLoginClick}
          className="w-full border rounded-lg py-2 font-medium hover:bg-gray-100 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}
