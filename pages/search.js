import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Card } from '@rewind-ui/core';
import SpinnerLoading from '@/components/spinnerLoading';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Search() {
  const [isLoading, setLoading] = useState();
  const [books, setBooks] = useState();
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session) {
      router.push('/');
    }
  }, [session, router]);
  const handleSubmit = async (e) => {
    https: e.preventDefault();
    setLoading(true);
    setBooks('');
    const form = document.getElementById('form');
    const data = new FormData(form);
    const { nameBook } = Object.fromEntries(data);
    setLoading(true);

    if (nameBook) {
      try {
        const req = await fetch('/api/searchBooks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: nameBook,
          }),
        });
        const res = await req.json();
        setBooks(res);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="container mx-auto my-10 p-5">
        <h1 className="text-3xl font-bold">Buscador de Libros</h1>
        <form onSubmit={handleSubmit} id="form" className="flex justify-center gap-1">
          <input
            type="text"
            name="nameBook"
            className="border w-full p-2 rounded-lg my-5 outline-none"
            placeholder="Introduce nombre del libro"
          />
          <button
            className="border p-2 rounded-lg my-5 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 shadow"
            type="submit"
          >
            Buscar
          </button>
        </form>
        {books ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {books.books.map((el) => {
              return (
                <Link href={`/book/${el.id}`} key={el.isbn}>
                  <Card>
                    <Card.Header>
                      <div className="w-full flex justify-center">
                        <img
                          src={`https://covers.openlibrary.org/b/isbn/${el.isbn}-L.jpg`}
                          width={100}
                          height={100}
                          alt={el.title}
                        />
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <div className="w-full flex justify-center font-bold text-center px-2">{el.title}</div>
                    </Card.Body>
                    <Card.Footer>
                      <div className="w-full flex justify-center">{el.authors}</div>
                    </Card.Footer>
                  </Card>
                </Link>
              );
            })}
          </div>
        ) : (
          <>
            {isLoading ? (
              <>
                <div className="flex justify-center ">
                  <SpinnerLoading />
                </div>
              </>
            ) : (
              <></>
            )}
          </>
        )}

        <div className="flex justify-center mt-10">
          <Link
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow"
            href="/dashboard"
          >
            Volver
          </Link>
        </div>
      </section>
    </>
  );
}
