import jwt, { JwtPayload } from "jsonwebtoken";
import { serialize, SerializeOptions  } from "cookie";
import { NextResponse } from "next/server";

// Secret key for signing JWTs
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const JWT_EXPIRATION = "1h"; // 1 hour

// User type for TypeScript
interface User {
  id: string | number; // Adjust based on your user ID type
  role: string;
}

// Create a JWT for the user
export const createToken = (user: User): string => {
  return jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
  });
};

// Verify the JWT
export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (error) {
    return null;
  }
};

// Set the JWT as a cookie
export const setTokenCookie = (res: NextResponse, token: string): void => {
  console.log('token',token)
  const cookieOptions: SerializeOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: "lax",
    maxAge: 3600, // 1 hour
    path: "/",
  };

  const serializedCookie = serialize("session", token, cookieOptions);
  res.headers.set("Set-Cookie", serializedCookie);
};

// Clear the cookie
export const clearTokenCookie = (res: NextResponse): void => {
  const cookieOptions: SerializeOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: "lax",
    maxAge: -1, // Expire immediately
    path: "/",
  };

  const serializedCookie = serialize("session", "", cookieOptions);
  res.headers.set("Set-Cookie", serializedCookie);
};
