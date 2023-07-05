import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
export default async function Login(req, res) {
  if (req.method !== 'POST') {
    return res.status(500).json({ message: 'Method not allowed' });
  }
  const prisma = new PrismaClient();
  try {
    // Get information from the req
    const { email, password } = req.body;
    // Check if the user is registered
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    // If not
    if (!user) {
      return res.status(500).json({ message: 'User is not registered' });
    }
    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!passwordMatch) {
      return res.status(500).json({ message: 'Invalid password' });
    }
    await prisma.$disconnect();
    return res.status(200).json({ message: 'ok' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
