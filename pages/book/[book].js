import { useRouter } from 'next/router';
import { useState } from 'react';
import { useEffect } from 'react';
import LoadingPage from '@/components/loadingPage';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
export default function Book() {
  const [isLoading, setLoading] = useState(true);
  const [book, setBook] = useState();
  const router = useRouter();
  const { data: session } = useSession();
  const id = router.query.book;

  // Add a book of the db of user
  const handleAdd = async () => {
    const { email } = session.user;
    try {
      const peticion = await fetch('../api/addBook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          book: book,
        }),
      });
      const respuesta = await peticion.json();
      console.log(respuesta);
      if (peticion.ok) {
        toast(`Libro añadido `, {
          hideProgressBar: true,
          autoClose: 2000,
          type: 'success',
          position: 'bottom-right',
        });
      } else {
        toast(respuesta.message, {
          hideProgressBar: true,
          autoClose: 2000,
          type: 'error',
          position: 'bottom-right',
        });
      }
    } catch (error) {
      toast(error, {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'error',
        position: 'bottom-right',
      });
    }
  };
  // Eliminate a book of the db of user
  const handleEl = async () => {
    const { email } = session.user;
    try {
      const peticion = await fetch('../api/elBook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          book: book,
        }),
      });
      const respuesta = await peticion.json();
      if (peticion.ok) {
        toast(`Libro eliminado `, {
          hideProgressBar: true,
          autoClose: 2000,
          type: 'success',
          position: 'bottom-right',
        });
      } else {
        toast('Hubo un fallo', {
          hideProgressBar: true,
          autoClose: 2000,
          type: 'error',
          position: 'bottom-right',
        });
      }
    } catch (error) {
      toast(error, {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'error',
        position: 'bottom-right',
      });
    }
  };
  // Session, fetch book
  useEffect(() => {
    if (!session) {
      router.push('/');
    }

    setLoading(true);
    const fetchBook = async () => {
      try {
        const req = await fetch('/api/getBook', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: id,
          }),
        });
        const res = await req.json();
        setBook(res);
        setLoading(false);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBook();
  }, [id, session, router]);
  if (book) console.log(book);
  return (
    <>
      {isLoading ? (
        <>
          <LoadingPage />
        </>
      ) : (
        <section className="container mx-auto py-5">
          <div className="flex justify-center flex-col items-center">
            <h1 className="text-3xl font-bold">{book.title}</h1>
            <img
              src={`https://covers.openlibrary.org/b/isbn/${book.industryIdentifiers[0].identifier}-L.jpg`}
              alt={book.title}
            />
            <span className="text-bold">{book.authors[0]}</span>
            <span className="text-sm font-bold">Pages: {book.pageCount}</span>
            <div className="my-5 flex justify-center gap-10">
              <button onClick={handleAdd} className="">
                Añadir
              </button>
              <button onClick={handleEl} className="">
                Eliminar
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <Link
              className="border p-2 rounded-lg my-5 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 shadow"
              href="/search"
            >
              Volver
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
