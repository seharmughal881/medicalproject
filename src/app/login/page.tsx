// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import Image from "next/image";

// const LoginPage: React.FC = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     role: "Patient",
//   });
//   const [loading, setLoading] = useState(false);

//   const router = useRouter();

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: formData.email,
//           password: formData.password,
//         }),
//       });
//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.message || "Login failed");
//         setLoading(false);
//         return;
//       }

//       // ✅ Save token in localStorage
//       localStorage.setItem("token", data.token);
//       // function bana lo login file me
// // Inside handleSubmit after successful login:
// if (data.user.role === "patient" || data.user.role === "Patient") {
//   // save in array instead of single value
//   const stored = localStorage.getItem("patientEmails");
//   const arr: string[] = stored ? JSON.parse(stored) : [];
//   if (!arr.includes(data.user.email)) { // avoid duplicates
//     arr.push(data.user.email);
//     localStorage.setItem("patientEmails", JSON.stringify(arr));
//   }

//   router.push("/diabetes-info");
// }

//       alert("Login successful!");

//       // ✅ role-based redirect (from backend response)
//       if (data.user.role === "patient" || data.user.role === "Patient") {
//           localStorage.setItem("patientEmail", data.user.email);
//           // After login response


//         router.push("/diabetes-info");
        
//       } 
//       // else if (data.user.role === "doctor" || data.user.role === "Doctor") {
//       //   router.push("/doctor");    
//       // } 
//       else
//          if (data.user.role === "doctor" || data.user.role === "Doctor") {
//   // doctor ka sara data save
//   localStorage.setItem("doctorData", JSON.stringify(data.user));

//   router.push("/doctor");  // redirect doctor dashboard pe
// }

//       else if (data.user.role === "admin" || data.user.role === "Admin") {
//         router.push("/dashboard/admin");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       alert("Something went wrong!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen flex flex-col relative"
//       style={{
//         backgroundImage: "url('/assets/background_img.png')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black opacity-50"></div>

//       {/* Header */}
//       <header className="w-full bg-black py-5 text-center text-white z-10 flex items-center justify-center space-x-3">
//         <Image
//     src="/assets/dfu_logo.jpeg"
//     alt="DFU Logo"
//     width={48}   // required by Next.js
//     height={48}  // required by Next.js
//     className="w-12 h-auto"
//   />
//         <h1 className="text-2xl font-bold">
//           Diabetic Foot Ulcer Detection (DFU)
//         </h1>
//       </header>

//       {/* Form */}
//       <div className="flex flex-1 items-center justify-center px-4">
//         <div className="relative w-full max-w-md bg-white text-black p-8 rounded-xl shadow-lg border border-black">
//           <h2 className="text-xl font-bold text-center mb-6 border-b border-black pb-2">
//             Login to Your Account
//           </h2>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Email */}
//             <div>
//               <label className="block text-sm mb-1 font-semibold">Email:</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Enter your email"
//                 className="w-full p-2 rounded border border-black focus:outline-none focus:ring-2 focus:ring-black"
//                 required
//               />
//             </div>

//             {/* Password */}
//             <div>
//               <label className="block text-sm mb-1 font-semibold">Password:</label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="Enter your password"
//                   className="w-full p-2 rounded border border-black focus:outline-none focus:ring-2 focus:ring-black pr-16"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-2 top-2 text-xs border border-black bg-white px-2 py-1 rounded hover:bg-gray-100"
//                 >
//                   {showPassword ? "Hide" : "Show"}
//                 </button>
//               </div>
//             </div>

//             {/* Role */}
//             <div>
//               <label className="block text-sm mb-1 font-semibold">Role:</label>
//               <select
//                 name="role"
//                 value={formData.role}
//                 onChange={handleChange}
//                 className="w-full p-2 rounded border border-black focus:outline-none focus:ring-2 focus:ring-black"
//               >
//                 <option value="Patient">Patient</option>
//                 <option value="Doctor">Doctor</option>
//                 <option value="Admin">Admin</option>
//               </select>
//             </div>

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full border border-black bg-white text-black font-bold py-2 cursor-pointer rounded hover:bg-black hover:text-white transition"
//             >
//               {loading ? "Logging in..." : "Login"}
//             </button>
//           </form>

//           <p className="text-center text-sm mt-4">
//             Don&apos;t have an account?{" "}
//             <Link href="/register" className="font-semibold hover:underline">
//               Register
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;



"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "Patient",
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // ✅ Doctor role restriction (frontend level)
    if (
      (formData.role === "Doctor" || formData.role === "doctor") &&
      formData.email.toLowerCase() !== "seharmughal881@gmail.com"
    ) {
      alert(
        "Please choose Patient role instead of Doctor."
      );
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, {
        
        // "http://localhost:5000/api/auth/login"
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        setLoading(false);
        return;
      }
    localStorage.setItem("token", data.token); /////////////////////////////////////////////////////////////////
      alert("Login successful!");

      // ✅ role-based redirect
      if (data.user.role === "patient" || data.user.role === "Patient") {
        localStorage.setItem("patientEmail", data.user.email);

        // also maintain array of patients
        const stored = localStorage.getItem("patientEmails");
        const arr: string[] = stored ? JSON.parse(stored) : [];
        if (!arr.includes(data.user.email)) {
          arr.push(data.user.email);
          localStorage.setItem("patientEmails", JSON.stringify(arr));
        }

        router.push("/diabetes-info");
      } else if (data.user.role === "doctor" || data.user.role === "Doctor") {
        // ✅ doctor already restricted above
        localStorage.setItem("doctorData", JSON.stringify(data.user));
        router.push("/doctor");
      } else if (data.user.role === "admin" || data.user.role === "Admin") {
        router.push("/dashboard/admin");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col relative"
      style={{
        backgroundImage: "url('/assets/background_img.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Header */}
      <header className="w-full bg-black py-5 text-center text-white z-10 flex items-center justify-center space-x-3">
        <Image
          src="/assets/dfu_logo.jpeg"
          alt="DFU Logo"
          width={48}
          height={48}
          className="w-12 h-auto"
        />
        <h1 className="text-2xl font-bold">
          Diabetic Foot Ulcer Detection (DFU)
        </h1>
      </header>

      {/* Form */}
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="relative w-full max-w-md bg-white text-black p-8 rounded-xl shadow-lg border border-black">
          <h2 className="text-xl font-bold text-center mb-6 border-b border-black pb-2">
            Login to Your Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm mb-1 font-semibold">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full p-2 rounded border border-black focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm mb-1 font-semibold">
                Password:
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full p-2 rounded border border-black focus:outline-none focus:ring-2 focus:ring-black pr-16"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-2 text-xs border border-black bg-white px-2 py-1 rounded hover:bg-gray-100"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm mb-1 font-semibold">Role:</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-2 rounded border border-black focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="Patient">Patient</option>
                <option value="Doctor">Doctor</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full border border-black bg-white text-black font-bold py-2 cursor-pointer rounded hover:bg-black hover:text-white transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-sm mt-4">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-semibold hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
