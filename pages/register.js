import Link from 'next/link';
import { toast } from 'react-toastify';
export default function Login() {
  const handler = async (e) => {
    e.preventDefault();
    // Get info user from form
    const form = document.getElementById('form');
    const data = new FormData(form);
    const { name, email, password } = Object.fromEntries(data);
    // Req
    try {
      const req = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });
      const res = await req.json();
      console.log(res);
      if (!req.ok) {
        toast(res.message, {
          hideProgressBar: true,
          autoClose: 2000,
          type: 'error',
          position: 'bottom-right',
        });
      } else {
        toast(`Bienvenido ${res.user.name}`, {
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
      <h1 className="text-3xl font-bold">Register</h1>
      <div className="flex gap-5 items-center my-5 ">
        <form id="form" onSubmit={handler} className="flex flex-col items-center gap-5">
          <label htmlFor="email" className="font-bold">
            Nombre
          </label>
          <input name="name" type="text" className="border outline-none p-3" />
          <label htmlFor="email" className="font-bold">
            Email
          </label>
          <input name="email" type="text" className="border outline-none p-3" />
          <label htmlFor="email" className="font-bold">
            Contraseña
          </label>
          <input name="password" type="password" className="border outline-none p-3" />
          <button type="submit" className="bg-black text-white p-3">
            Enviar
          </button>
        </form>
      </div>
      <Link href="/">Volver</Link>
    </section>
  );
}
