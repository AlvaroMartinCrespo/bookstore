import { PrismaClient } from '@prisma/client';
export default async function getCurrentUser(req, res) {
  if (req.method !== 'POST') {
    return res.status(500).json({ message: 'Method not allowed' });
  }
  const prisma = new PrismaClient();
  try {
    const { email } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(500).json({ message: 'User doesnt exist ' });
    }
    await prisma.$disconnect();
    return res.status(200).json({ message: 'ok', user: user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
