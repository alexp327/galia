import { createClient } from '@/utils/supabase/server';

export default async function Page() {
  const supabase = createClient();
  const { data: ratings } = await supabase.from('ratings').select();

  return <pre>{JSON.stringify(ratings, null, 2)}</pre>;
}

