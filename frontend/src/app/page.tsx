import Link from 'next/link';

export default async function Index() {
  return (
    <section className='min-w-full flex flex-col gap-6'>
      <h2 className='font-medium text-xl mb-4'>galia home</h2>
      <Link href={'/alex/reviews'}>
        <h4 className='mb-4'>album list</h4>
      </Link>
      <Link href={'/new'}>
        <h4 className='mb-4'>new review</h4>
      </Link>
      <Link href={'/alex/recs'}>
        <h4 className='mb-4'>recs list</h4>
      </Link>
    </section>
  );
}

