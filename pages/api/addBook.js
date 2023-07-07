import { PrismaClient } from '@prisma/client';
export default async function AddBook(req, res) {
  if (req.method !== 'POST') {
    return res.status(500).json({ message: 'Method not allowed' });
  }
  const prisma = new PrismaClient();
  try {
    await prisma.$disconnect();
    return res.status(200).json({ message: 'ok' });
  } catch (error) {
    return res.status(200).json({ message: error });
  }
}
