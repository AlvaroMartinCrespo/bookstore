import { Inter } from 'next/font/google';
import Link from 'next/link';
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className="">
      <section className="flex flex-col items-center h-screen justify-center">
        <h1 className="text-3xl font-bold">Bookstore</h1>
        <div className="flex gap-5 items-center mt-5">
          <Link href="/register">Register</Link>
          <Link href="/login">Login</Link>
        </div>
      </section>
    </main>
  );
}
