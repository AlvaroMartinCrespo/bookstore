import Link from 'next/link';
import { toast } from 'react-toastify';
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  // If there is session, go to the dashboard
  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    }
  }, [session]);
  const handler = async (e) => {
    e.preventDefault();
    // Get info user from form
    const form = document.getElementById('form');
    const data = new FormData(form);
    const { email, password } = Object.fromEntries(data);
    // Req
    try {
      const req = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const res = await req.json();
      if (!req.ok) {
        toast(res.message, {
          hideProgressBar: true,
          autoClose: 2000,
          type: 'error',
          position: 'bottom-right',
        });
      } else {
        setTimeout(async () => {
          const login = await signIn('credentials', {
            email,
            password,
          });
        }, 500);
        toast(`Bienvenido `, {
          hideProgressBar: true,
          autoClose: 2000,
          type: 'success',
          position: 'bottom-right',
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <section className="flex h-screen flex-col justify-center items-center">
      <h1 className="text-3xl font-bold">Login</h1>
      <div className="flex gap-5 items-center my-5 ">
        <form id="form" onSubmit={handler} className="flex flex-col items-center gap-5">
          <label htmlFor="email" className="font-bold">
            Email
          </label>
          <input name="email" type="text" className="border outline-none p-3" />
          <label htmlFor="email" className="font-bold">
            Contraseña
          </label>
          <input name="password" type="password" className="border outline-none p-3" />
          <button className="bg-black text-white p-3" type="submit">
            Login
          </button>
        </form>
      </div>
      <Link href="/">Volver</Link>
    </section>
  );
}
