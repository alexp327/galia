import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import NavMenu from '@/components/navMenu';
import { Button } from '@/components/ui/button';
import { Plus, Twitter } from 'lucide-react';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Galia',
  description: 'Music review hub',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <header className='flex justify-between max-w-6xl mx-auto px-4 py-3'>
          <div>
            <div className='inline-block md:hidden mr-2'>hello</div>
            <Button className='text-xl font-bold' variant='ghost'>
              <Link href='/'>Galia</Link>
            </Button>
          </div>
          <div className='hidden md:inline-block'>
            <NavMenu />
          </div>
          <div className='flex gap-1'>
            <Button variant='ghost' className='flex gap-2'>
              <Plus />
              <span className='hidden md:inline-block'>New Review</span>
            </Button>
            <Button variant='ghost'>
              <Twitter />
            </Button>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}

