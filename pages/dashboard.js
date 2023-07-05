import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

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
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-4xl">Cargando</h1>
        </div>
      ) : (
        <div className="flex flex-col h-screen  items-center justify-center ">
          <h1 className="text-5xl font-bold">Dashboard</h1>
          {user ? (
            <div className="my-10 flex justify-center flex-col items-center">
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <span className="font-xs">{user.email}</span>
            </div>
          ) : (
            <></>
          )}
          <button onClick={handlerSignOut} className="bg-black text-white p-3">
            Sign Out
          </button>
        </div>
      )}
    </section>
  );
}
