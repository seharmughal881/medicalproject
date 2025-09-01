"use client";

import Link from "next/link";
import { useRouter } from "next/navigation"; 

import { Brain, Shield, Clock, CheckCircle2 } from "lucide-react";
export default function DFUPage() {
   const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Example action
    console.log("Form submitted ✅");

    // Redirect after submit
    router.push("/register"); 
  };
  const features = [
    {
      icon: <Brain className="w-10 h-10 text-black" />,
      title: "AI Detection",
      desc: "Advanced algorithms for accurate ulcer detection",
    },
    {
      icon: <Shield className="w-10 h-10 text-black" />,
      title: "Secure Platform",
      desc: "HIPAA compliant and secure medical data handling",
    },
    {
      icon: <Clock className="w-10 h-10 text-black" />,
      title: "24/7 Access",
      desc: "Round-the-clock monitoring and analysis",
    },
    {
      icon: <CheckCircle2 className="w-10 h-10 text-black" />,
      title: "Expert Care",
      desc: "Professional medical guidance and support",
    },
  ];
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
     <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 shadow-sm bg-white">
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-md">
      <span className="text-lg">🩺</span>
    </div>
    <h1 className="font-bold text-lg">DFU Detection</h1>
  </div>

  <nav className="flex gap-8 text-gray-700 font-medium">
    <Link href="#about">About</Link>
    <Link href="#features">Features</Link>
    <Link href="#contact">Contact</Link>
  </nav>
</header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center text-center px-6 py-24">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
          Diabetic Foot Ulcer{" "}
          <span className="text-gray-700">Detection Platform</span>
        </h2>

        <p className="mt-6 max-w-2xl text-lg text-gray-600">
          Advanced medical platform for early detection and monitoring of
          diabetic foot ulcers. <br />
          Get professional medical analysis and prevent serious complications.
        </p>
<Link
      href="/register"
      className="mt-10 inline-block px-8 py-3 bg-black text-white text-lg rounded-md hover:bg-gray-800 transition"
    >
      Get Started
    </Link>
      </main>
       <section id="about" className="py-20 bg-white text-center">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
        About DFU Detection
      </h2>
      <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
        Our platform provides comprehensive diabetic foot ulcer detection and
        monitoring services for both patients and healthcare professionals.
      </p>

      {/* Features Grid */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-gray-900">
              {feature.title}
            </h3>
            <p className="mt-2 text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Platform Features</h2>
        <p className="text-gray-600 mb-12">
          Comprehensive tools for diabetic foot ulcer detection, monitoring, and management.
        </p>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-12 text-left">
          {/* For Patients */}
          <div>
            <h3 className="text-xl font-semibold mb-6">For Patients</h3>
            <ul className="space-y-4">
              {[
                "Easy photo upload and analysis",
                "Real-time risk assessment",
                "Personalized care recommendations",
                "Progress tracking and monitoring",
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-green-600 mr-3">✔</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* For Doctors */}
          <div>
            <h3 className="text-xl font-semibold mb-6">For Doctors</h3>
            <ul className="space-y-4">
              {[
                "Patient management dashboard",
                "Advanced diagnostic tools",
                "Treatment planning assistance",
                "Clinical data analytics",
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-green-600 mr-3">✔</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
    <section className="bg-black text-white py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Start Your Medical Journey
        </h2>

        {/* Description */}
        <p className="text-lg text-gray-300 mb-10">
          Join thousands of patients and healthcare professionals using our
          platform for better diabetic foot care management.
        </p>

        {/* Button */}
        <Link
          href="/register"
          className="inline-block bg-white text-black font-medium px-8 py-4 rounded-lg shadow-md hover:bg-gray-200 transition"
        >
          Get Started Now
        </Link>
      </div>
    </section>
    <footer className="bg-[#0e1525] text-gray-300 py-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand Info */}
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-white text-black p-2 rounded">
              {/* Icon placeholder */}
              <span>🩺</span>
            </div>
            <h2 className="text-xl font-bold text-white">DFU Detection</h2>
          </div>
          <p className="text-gray-400">
            Advanced diabetic foot ulcer detection platform for better patient care.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">About</a></li>
            <li><a href="#" className="hover:underline">Features</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Terms of Service</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact</h3>
          <p>Email: <a href="mailto:support@dfudetection.com" className="hover:underline">support@dfudetection.com</a></p>
          <p>Phone: 1-800-DFU-HELP</p>
          <p>Address: Medical Center, USA</p>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-500 text-sm border-t border-gray-800 pt-6">
        © 2025 DFU Detection. All rights reserved.
      </div>
    </footer>
    </div>
  );
}
