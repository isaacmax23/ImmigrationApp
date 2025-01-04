import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from "next/server";
import  { createToken, setTokenCookie, verifyToken } from "@utils/auth";
import {authenticateAdminUser} from "@app/lib/dal";
// import { NextApiRequest, NextApiResponse } from "next";
// import { redirect } from 'next/navigation'

type Row = {
    id: number;
    name: string;
    password: string;
    email: string;
  };
  

export  async function GET(request: NextRequest) {
  const client = neon(process.env.DATABASE_URL || "");
  // const result = await client`SELECT * FROM users`;
 

  let response = await authenticateAdminUser(request);
  

  if (response?.role !== 'admin') {
    console.log("name",  response?.role )
    return new NextResponse(JSON.stringify({ error: 'Unauthorized', data1: response?.userId
     }), { status: 403 });
  }

  try {
    // Fetch users from the database
    const result = await client`SELECT * FROM users`;
    console.log(result);

    return new NextResponse(JSON.stringify({ data: result }), { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return new NextResponse(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }


}


const client = neon(process.env.DATABASE_URL || "");

// export  async function (request: Request) {
//   if (req.method === "POST") {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ error: "Email and password are required." });
//     }

//     try {
//       // Query the database for the email
//       const [user] = await client `
//         SELECT * FROM users WHERE email = ${email}
//       `;

//       if (!user) {
//         return res.status(401).json({ error: "Invalid credentials." });
//       }

//       // Compare the provided password with the one in the database
//       if (user.password !== password) {
//         return res.status(401).json({ error: "Invalid credentials." });
//       }

//       // Successful login
//       console.error("Successful login")
//       return res.status(200).json({ message: "Login successful!" });
//     } catch (error) {
//       console.error("Database error:", error);
//       return res.status(500).json({ error: "Internal server error." });
//     }
//   } else {
//     res.setHeader("Allow", ["POST"]);
//     return res.status(405).json({ error: `Method ${req.method} not allowed.` });
//   }
// }


export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    // Fetch user from the database
    const [user] = await client`
      SELECT * FROM users WHERE email = ${email}
    `;

    // If user not found or password doesn't match
    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const token = createToken({ id: user.name, role: user.role});

    // Successful login response
    const response =  NextResponse.json(
      { message: "Login successful!", user: { id: user.id, name: user.name } },
      { status: 200 }
    );

    setTokenCookie(response, token);

    return response;

  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}