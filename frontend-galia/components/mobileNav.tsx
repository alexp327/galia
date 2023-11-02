import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from './ui/button';
import { Menu, Plus } from 'lucide-react';
import Link from 'next/link';

const mobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost' className='p-2'>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side='left'>
        <SheetHeader className='border-b-2 pb-4'>
          <SheetTitle className='text-3xl'>
            <Link href='/'>
              <SheetClose>Galia</SheetClose>
            </Link>
          </SheetTitle>
        </SheetHeader>
        <nav className='my-4 flex flex-col gap-1'>
          <Link href='/'>
            <SheetClose>
              <Button
                variant='link'
                type='submit'
                className='text-primary-foreground'
              >
                Home
              </Button>
            </SheetClose>
          </Link>
          <Link href='/list'>
            <SheetClose>
              <Button variant='link' className='text-primary-foreground'>
                Reviews
              </Button>
            </SheetClose>
          </Link>
          <Link href='/new'>
            <SheetClose>
              <Button variant='link' className='text-primary-foreground'>
                New Review
              </Button>
            </SheetClose>
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default mobileNav;

