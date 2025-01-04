'use server';

import { neon } from '@neondatabase/serverless';

// Function to handle saving user data
export async function saveArticle(name: string, title: string, text: string) {
  if (!name || !title || !text) {
    throw new Error('All fields are required');
  }

  const sql = neon(process.env.DATABASE_URL!);
  console.log(process.env.DATABASE_URL)
  try {
    await sql`INSERT INTO articles (name, title, content) VALUES (${name}, ${title}, ${text})`;
    return { success: true, message: 'User registered successfully' };
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to register user');
  }
}
