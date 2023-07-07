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
    // Check if the book is already associated with the user
    const existingBook = await prisma.user.findUnique({
      where: { email: email },
      include: { books: true },
    });

    if (existingBook.books.some((b) => b.title === title && b.isbn === isbn && b.author === author)) {
      return res.status(500).json({ message: 'Book already exists for the user' });
    }
    // Create a book
    const bookCreated = await prisma.books.create({
      data: {
        title,
        isbn,
        author,
        user: {
          connect: { email: email },
        },
      },
    });
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
    await prisma.$disconnect();
    return res.status(200).json({ message: 'ok', user: user });
  } catch (error) {
    return res.status(500).json({ message: error.message, book });
  }
}
