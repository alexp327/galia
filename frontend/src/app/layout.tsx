import HeaderAuth from '@/src/components/header-auth';
import { ThemeSwitcher } from '@/src/components/theme-switcher';
import { ThemeProvider } from 'next-themes';
import Link from 'next/link';
import './globals.css';
import { Inter } from 'next/font/google';
import { Toaster } from '../components/ui/toaster';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Galia',
  description: 'Your music review library',
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={inter.className} suppressHydrationWarning>
      <body className='bg-background text-foreground'>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          // enableSystem
          disableTransitionOnChange
        >
          <main className='min-h-screen flex flex-col items-center'>
            <div className='w-full flex flex-col gap-20 items-center'>
              <nav className='w-full flex justify-center border-b border-b-foreground/10 h-16'>
                <div className='w-full max-w-screen-xl flex justify-between items-center py-3 px-4 md:px-20 text-sm'>
                  <div className='flex gap-5 items-center font-semibold text-xl'>
                    <Link href={'/'}>Galia</Link>
                  </div>
                  <HeaderAuth />
                </div>
              </nav>
            </div>

            <div className='flex flex-col flex-1 h-full mx-auto max-w-screen-xl px-4 md:px-20 py-2.5 w-full'>
              {children}
              <Toaster />
            </div>

            <div className='w-full flex flex-col gap-20 items-center'>
              <footer className='w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16 px-4 md:px-20'>
                <p>
                  Created by{' '}
                  <a
                    href='https://x.com/pezvstheworld'
                    target='_blank'
                    className='font-bold hover:underline'
                    rel='noreferrer'
                  >
                    Alex Perry
                  </a>
                </p>
                {/* <ThemeSwitcher /> */}
              </footer>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}

