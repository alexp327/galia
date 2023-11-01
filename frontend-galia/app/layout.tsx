import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import NavMenu from '@/components/navMenu';
import { Button } from '@/components/ui/button';
import { Twitter } from 'lucide-react';

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
          <Button className='text-xl font-bold' variant='ghost'>
            Galia
          </Button>
          <NavMenu />
          <Button variant='ghost'>
            <Twitter />
          </Button>
        </header>
        {children}
      </body>
    </html>
  );
}

