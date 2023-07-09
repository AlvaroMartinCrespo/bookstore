import { PrismaClient } from '@prisma/client';
export default async function AddBook(req, res) {
  if (req.method !== 'POST') {
    return res.status(500).json({ message: 'Method not allowed' });
  }
  const prisma = new PrismaClient();
  const { email, book } = req.body;
  const { title, authors } = book;
  const isbn = book.industryIdentifiers[0].identifier;
  const author = authors[0];
  try {
    // Check if the user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
      include: { books: true },
    });
    // Check if exists the book
    const isBookAdded = existingUser.books.some(
      (book) => book.title === title && book.isbn === isbn && book.author === author
    );
    if (!isBookAdded) {
      // Add book
      const user = await prisma.user.update({
        where: { email: email },
        data: {
          books: {
            create: {
              title,
              isbn,
              author,
            },
          },
        },
      });
    } else {
      return res.status(500).json({ message: 'Book already add' });
    }

    await prisma.$disconnect();
    return res.status(200).json({ message: 'ok' });
  } catch (error) {
    return res.status(500).json({ message: error.message, book });
  }
}
