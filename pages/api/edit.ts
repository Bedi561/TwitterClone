import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from '@/libs/serverAuth';
import prisma from '@/libs/prisma';

// Define a type for the update data
type UpdateUserData = {
  name: string;
  username: string;
  bio?: string; // Optional property
  profileImage?: string; // Optional property
  coverImage?: string; // Optional property
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'PATCH') {
        return res.status(405).end();
    }

    try {
        const { currentUser } = await serverAuth(req);

        const { name, username, bio, profileImage, coverImage } = req.body;

        if (!name || !username) {
            throw new Error('Missing fields');
        }

        // Construct the data object using the defined type
        const updateData: UpdateUserData = {
            name,
            username,
            bio,
            profileImage,
            coverImage
        };

        const updateUser = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: updateData,
        });

        return res.status(200).json(updateUser);
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}
