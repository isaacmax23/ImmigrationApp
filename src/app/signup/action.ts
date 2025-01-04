'use server';

import { neon } from '@neondatabase/serverless';

// Function to handle saving user data
export async function saveUser(name: string, email: string, password: string) {
  if (!name || !email || !password) {
    throw new Error('All fields are required');
  }

  const sql = neon(process.env.DATABASE_URL!);
  console.log(process.env.DATABASE_URL)
  try {
    await sql`INSERT INTO users (name, email, password) VALUES (${name}, ${email}, ${password})`;
    return { success: true, message: 'User registered successfully' };
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to register user');
  }
}
