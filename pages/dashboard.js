import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import LoadingPage from '@/components/loadingPage';
import DashboardUser from '@/components/dashboard';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState();
  const [isLoading, setLoading] = useState(true);
  // Check if the session is active, if not, the page will redirect to index
  const { data: session } = useSession();
  useEffect(() => {
    // If user clicks in sign out button
    if (!session) {
      router.push('/');
    } else {
      // Get current user
      const { email } = session.user;
      const getCurrentUser = async () => {
        try {
          const req = await fetch('/api/getCurrentUser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email,
            }),
          });
          const res = await req.json();
          setUser(res.user);
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      };
      getCurrentUser();
    }
  }, [session]);
  const handlerSignOut = () => {
    signOut();
  };

  return (
    <section className="container mx-auto">
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div className="flex flex-col h-screen py-10 items-center">
          {/* <h1 className="text-5xl font-bold">Bookstore</h1> */}
          {user ? <DashboardUser user={user} /> : <></>}
          <button onClick={handlerSignOut} className="bg-black text-white p-3 m-5">
            Sign Out
          </button>
          <div className="flex justify-center gap-10">
            <Link
              href="/books"
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow"
            >
              Libros leídos
            </Link>
            <Link
              href="/search"
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow"
            >
              Buscar libros
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
