import { useRouter } from 'next/router';
export default function Book() {
  const router = useRouter();
  const title = router.query.book;
  return (
    <>
      <h1>{title}</h1>
    </>
  );
}
