
import React from "react";
import { cookies } from 'next/headers';

type Row = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
};

export default async function Page() {
  let data: Row[] = [];
  let error: string | null = null;
  var user: string = ""

  // Fetch request with credentials
 
  try {
    const sessionCookie = cookies().get('session');
    console.log('sess', sessionCookie)
    const response = await fetch('http://localhost:3000/api/data', {
      method: 'GET',
      credentials: 'include', // Ensures credentials are sent
      headers: {
        'Accept': 'application/json',
        'Cookie': sessionCookie ? `session=${sessionCookie.value}` : '', // Include cookies explicitly if needed
      },
    });

    if (!response.ok) {
      const errorResult = await response.json();
      user = errorResult.data1;
      throw new Error(errorResult.error);
    }



    const result = await response.json();
    data = result.data;
  } catch (err: any) {
    error = err.message;
    // user = err.data;
  }

  if (error) {
    return <div>
      Current User: {user} <br></br>
      Error: {error}
      </div>;
  }

  return (
    <div>
      <h1>Dynamic Data (Server-Side)</h1>

      <ul>
        {data.map((row) => (
          <li key={row.id}>
            ID: {row.id}, Name: {row.name}, email: {row.email}, Pwd: {row.password}, role: {row.role}
          </li>
        ))}
      </ul>
    </div>
  );
}
