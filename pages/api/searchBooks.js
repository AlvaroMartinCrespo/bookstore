export default async function SearchBooks(req, res) {
  if (req.method !== 'POST') {
    return res.status(500).json({ message: 'Method not allowed' });
  }

  const { name } = req.body;
  try {
    const peticion = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${name}`);
    const data = await peticion.json();
    const books = data.items.map((element) => {
      const { title, authors, pageCount } = element.volumeInfo;
      const isbn = element.volumeInfo.industryIdentifiers[0].identifier;
      return {
        title,
        authors,
        pageCount,
        isbn,
      };
    });
    return res.status(200).json({ books });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
