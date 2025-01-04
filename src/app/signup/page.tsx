"use client"
import React, { useState } from 'react';
import { saveUser } from './action';
// import { neon } from '@neondatabase/serverless';

// async function create(formData: FormData) {
//   'use server';
//   console.log("test")
//   // console.log("created")
//   // // Connect to the Neon database
//   const sql = neon(`${process.env.DATABASE_URL}`);
//   const comment = formData.get('comment');
//   console.log({sql})
//   console.log(`DATABASE_URL: ${process.env.DATABASE_URL}`);

//   // console.log(`${process.env.DATABASE_URL}`)
//   // Insert the comment from the form into the Postgres database
//   await sql('INSERT INTO comments (comment) VALUES ($1)', [comment]);
// }


function SignupForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    console.log({...formData})
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form data submitted:', formData);


    try {
      // Call the server action
      const result = await saveUser(formData.name, formData.email, formData.password);
      //  setMessage(result.message);
      setFormData({ name: '', email: '', password: '' });
    } catch (error: any) {
      // setMessage(error.message || 'An error occurred');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-black">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Sign Up
          </button>
          <div className= "text-center text-gray-600">
            Already Registered?{' '}
          <a href="/login" className="text-blue-500 hover:underline">Login</a>
      </div>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;


// // File: app/page.tsx

// export default function Page() {
 
//   return (
//     <form action={create}>
//       <input type="text" placeholder="write a comment" name="comment" />
//       <button type="submit">Submit</button>
//     </form>
//   );
// }