import { Inter } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className="">
      <div class="grid md:grid-cols-2 grid-cols-1 h-screen">
        <div className="lg:w-full lg:h-screen lg:object-cover lg:block hidden">
          <Image src="/index.jpeg" className="object-cover w-full h-full" width={1000} height={200} alt="book" />
        </div>
        <div class="w-full flex items-center justify-center p-10 bg-slate-100">
          <section class="flex flex-col items-center w-full ">
            <h1 class="text-3xl font-bold mb-5">
              <Image src="/img/book.png" width={100} height={100} alt="book" />
            </h1>
            <div class="flex gap-5 items-center mb-5">
              <Link href="/register" class="text-blue-500">
                Register
              </Link>
              <Link href="/login" class="text-blue-500">
                Login
              </Link>
            </div>
            <span class="text-sm text-gray-500 mt-2">
              Al registrarte, aceptas los términos y condiciones de la biblioteca.
            </span>
          </section>
        </div>
      </div>
    </main>
  );
}
