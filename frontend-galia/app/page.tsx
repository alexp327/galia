import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <ul>
        <li>
          <Link href='/reviews/list' className='text-3xl'>
            List
          </Link>
        </li>
        <li>
          <Link href='/new' className='text-3xl'>
            New
          </Link>
        </li>
      </ul>
    </main>
  );
}

