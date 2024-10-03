import { signOutAction } from '@/src/app/actions';
import Link from 'next/link';
import { Button } from './ui/button';
import { createClient } from '@/utils/supabase/server';
import { Profile } from '../lib/types';

export default async function AuthButton() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile = null;
  if (user) {
    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id);
    profile =
      profileData && profileData.length > 0
        ? (profileData[0] as Profile)
        : null;
  }

  return user ? (
    <div className='flex items-center gap-4'>
      Hey, @{profile?.username}!
      <form action={signOutAction}>
        <Button type='submit' variant={'outline'}>
          Sign out
        </Button>
      </form>
    </div>
  ) : (
    <div className='flex gap-2'>
      <Button asChild size='sm' variant={'outline'}>
        <Link href='/sign-in'>Sign in</Link>
      </Button>
      <Button asChild size='sm' variant={'default'}>
        <Link href='/sign-up'>Sign up</Link>
      </Button>
    </div>
  );
}

