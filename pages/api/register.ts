import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/libs/prisma';

// Define a type for the user creation data
type UserCreateData = {
  email: string;
  username: string;
  name: string;
  password: string;
  bio?: string; // Make 'bio' property optional
  // Other properties as needed
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const { email, username, name, password, bio }: UserCreateData = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        name,
        hashedPassword,
        bio, // Include 'bio' property when creating the user
      }
    });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
