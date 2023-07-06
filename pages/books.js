import Link from 'next/link';
export default function Books() {
  return (
    <>
      <section className="container mx-auto my-5">
        <Link
          className="border p-2 rounded-lg my-5 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 shadow"
          href="/dashboard"
        >
          Volver
        </Link>
      </section>
    </>
  );
}
