export default async function getBook(req, res) {
  if (req.method !== 'post') {
    return res.status(500).json({ message: 'Method not allowed' });
  }

  const { id } = req.body;

  try {
    const peticion = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${id}`);
    const data = await peticion.json();
    return res.status(200).json({ message: 'ok', data: data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
