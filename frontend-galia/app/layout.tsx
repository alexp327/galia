import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import NavMenu from '@/components/navMenu';
import { Button } from '@/components/ui/button';
import { Plus, Twitter } from 'lucide-react';
import Link from 'next/link';
import MobileNav from '@/components/mobileNav';
import { Toaster } from '@/components/ui/toaster';

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
        <header className='mx-auto flex max-w-7xl justify-between px-3 py-3'>
          <div className='flex w-1/6'>
            <div className='mr-2 sm:hidden'>
              <MobileNav />
            </div>
            <Link href='/'>
              <Button className='text-xl font-bold' variant='ghost'>
                Galia
              </Button>
            </Link>
          </div>
          <div className='hidden w-2/3 justify-center sm:inline-flex'>
            <NavMenu />
          </div>
          <div className='flex w-1/6 justify-end gap-1'>
            <Link href='https://twitter.com/pezvstheworld' target='blank'>
              <Button variant='ghost' className='p-2'>
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
        <div className='mx-auto max-w-7xl px-4'>{children}</div>
        <Toaster />
      </body>
    </html>
  );
}

