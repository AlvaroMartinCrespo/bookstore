import { useRouter } from 'next/router';
import { useState } from 'react';
import { useEffect } from 'react';
import LoadingPage from '@/components/loadingPage';
import Link from 'next/link';
export default function Book() {
  const [isLoading, setLoading] = useState(true);
  const [book, setBook] = useState();
  const router = useRouter();
  const id = router.query.book;

  useEffect(() => {
    setLoading(true);
    const fetchBook = async () => {
      try {
        const req = await fetch(`/api/getBook`, {
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
      } catch (error) {
        console.log(error);
      }
    };
    fetchBook();
  }, []);
  return (
    <>
      {isLoading ? (
        <>
          <LoadingPage />
        </>
      ) : (
        <section className="container mx-auto py-5">
          <Link
            className="border p-2 rounded-lg my-5 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 shadow"
            href="/search"
          >
            Volver
          </Link>
        </section>
      )}
    </>
  );
}
