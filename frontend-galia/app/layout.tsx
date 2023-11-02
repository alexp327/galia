import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import NavMenu from '@/components/navMenu';
import { Button } from '@/components/ui/button';
import { Plus, Twitter } from 'lucide-react';
import Link from 'next/link';
import MobileNav from '@/components/mobileNav';

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
        <header className='flex justify-between max-w-6xl mx-auto px-3 py-3'>
          <div className='flex'>
            <div className='sm:hidden mr-2'>
              <MobileNav />
            </div>
            <Link href='/'>
              <Button className='text-xl font-bold' variant='ghost'>
                Galia
              </Button>
            </Link>
          </div>
          <div className='hidden sm:inline-flex'>
            <NavMenu />
          </div>
          <div className='flex gap-1'>
            <Link href='https://twitter.com/pezvstheworld' target='blank'>
              <Button variant='ghost'>
                <Twitter />
              </Button>
            </Link>
            <Link href='/new'>
              <Button variant='ghost' className='flex gap-2'>
                <Plus />
                <span className='hidden sm:inline-flex'>New Review</span>
              </Button>
            </Link>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}

