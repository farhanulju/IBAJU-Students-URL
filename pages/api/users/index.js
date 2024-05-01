// pages/api/users/index.js
import { db } from '@/lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const users = await db.user.findMany({
      select: {
        id: true,
        name: true,
        handle: true,
        bio: true,
      },
    });

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
}
