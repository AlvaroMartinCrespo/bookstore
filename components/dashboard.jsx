import Image from 'next/image';
export default function DashboardUser({ user }) {
  return (
    <>
      <div className="mt-10 flex justify-center flex-col items-center border p-5 rounded-lg bg-slate-300 max-w-2xl">
        <Image src="/img/book.png" width={100} height={100} alt="book" />
        <h1 className="text-3xl font-bold">{user.name}</h1>
        <span className="font-xs">{user.email}</span>

        <span>Libros leídos: {user.books ? <>número de libros leídos:</> : <>0</>}</span>
      </div>
    </>
  );
}
