import { NextRequest, NextResponse } from 'next/server';
import {verifyToken} from '@utils/auth'
const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret';

// Function to verify the JWT token and extract the payload
// export const verifyToken = (token: string): JwtPayload | null => {
//   try {
//     return jwt.verify(token, JWT_SECRET) as JwtPayload;
//   } catch (error) {
//     console.error('JWT verification failed:', error);
//     return null;
//   }
// };

// Function to handle cookie verification and JWT decoding
export const authenticateAdminUser = async (request: NextRequest) => {
  // Retrieve the session cookie from the request
  const cookie = request.cookies.get('session');
  console.log('Request cookies:', request.headers.get('cookie'));
  console.log('Retrieved session cookie:', cookie);

  // Check if the cookie exists
  if (!cookie) {
    console.log('No cookie found');
    // return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    return;
  }

  // Verify the JWT token
  const decoded = verifyToken(cookie.value);
  console.log('Decoded payload role:', decoded);

  // If the JWT token is invalid or expired, return an error response
  // if (!decoded || decoded?.role !== "admin") {
  //   console.log('right')
  //   return new NextResponse(JSON.stringify({ error: 'Invalid or expired token/No rights' }), { status: 401 });
  // }

  // Return the decoded payload if needed (for further processing)
  return decoded;
};
