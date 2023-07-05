import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
export default async function Register(req, res) {
  if (req.method !== 'POST') {
    return res.status(500).json({ message: 'Method not allowed' });
  }

  const prisma = new PrismaClient();
  try {
    const { name, email, password } = req.body;
    const userRegistered = prisma.user.findUnique({
      where: {
        email,
      },
    });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });
    await prisma.$disconnect();
    return res.status(200).json({ message: 'ok', user: user });
  } catch (error) {
    return res.status(500).json({ message: 'User already register' });
  }
}
