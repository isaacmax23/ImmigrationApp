// // import { authenticate } from '@/app/lib/actions'

// export default function Page() {
//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <form className="flex flex-col space-y-4 p-6 bg-white shadow-md rounded">
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           required
//           className="p-2 border border-gray-300 rounded w-64"
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           required
//           className="p-2 border border-gray-300 rounded w-64"
//         />
//         <button
//           type="submit"
//           className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           Login
//         </button>
//         <div className= "text-center text-gray-600">
//         No account?{' '}
//           <a href="/signup" className="text-blue-500 hover:underline">Sign Up</a>
//       </div>
//       </form>
  
//     </div>
//   )
// }

"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';


export default function Page() {
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const response = await fetch("/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      console.log(result)

      if (response.ok) {
        setMessage(result.message || "Login successful!");
        router.replace('/user');
      } else {
        setMessage(result.error || "Invalid credentials.");
      }
    } catch (error) {
      setMessage("Something went wrong.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4 p-6 bg-white shadow-md rounded"
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="p-2 border border-gray-300 rounded w-64"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="p-2 border border-gray-300 rounded w-64"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </button>
        {message && <p className="text-center text-gray-600">{message}</p>}
        <div className="text-center text-gray-600">
          No account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </div>
      </form>
      {message}
    </div>

  
  );
}


