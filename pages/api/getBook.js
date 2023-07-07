export default async function getBook(req, res) {
  if (req.method !== 'POST') {
    return res.status(500).json({ message: 'Method not allowed' });
  }

  const { id } = req.body;

  try {
    const peticion = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${id}`);
    const data = await peticion.json();
    const book = data.items[0].volumeInfo;
    const { authors, title, pageCount, industryIdentifiers } = book;
    return res.status(200).json({ message: 'ok', authors, title, pageCount, industryIdentifiers });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
