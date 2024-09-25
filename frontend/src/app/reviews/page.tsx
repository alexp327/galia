import RatingResult from '@/src/components/rating-result';
import { Button } from '@/src/components/ui/button';
import { Separator } from '@/src/components/ui/separator';
import { Rating } from '@/src/lib/types';
import { createClient } from '@/utils/supabase/server';
import { FilterIcon, Image } from 'lucide-react';

export default async function Page() {
  const supabase = createClient();
  const { data } = await supabase.from('ratings').select(`
      *,
      release_group (
        *
      )
    `);

  const ratings: Rating[] = data as Rating[];

  if (!ratings || ratings.length === 0) {
    return <div>No ratings available</div>;
  }

  return (
    <section>
      <div className='mb-2.5'>
        <Button variant='outline' size={'sm'} className='gap-1'>
          <FilterIcon className='w-5' />
          Filters
        </Button>
      </div>
      <div className='border p-1 rounded-sm'>
        <div className='flex gap-2 p-1 text-foreground/70'>
          <h4 className='w-12 flex justify-center'>
            <Image className='w-5' />
          </h4>
          <h4 className='flex-1'>Title</h4>
          <h4 className='flex justify-center items-center w-12'>Rating</h4>
          <h4 className='w-1/3 text-right pr-3'>Last Updated</h4>
        </div>
        <div className='w-full px-1 my-1'>
          <Separator />
        </div>
        <ol id='resultsTable' className='flex flex-col'>
          {ratings.map((rating) => (
            <li key={rating.id}>
              <RatingResult rating={rating} />
            </li>
          ))}
        </ol>
        {/* TODO: add pagination */}
      </div>
    </section>
  );
}

