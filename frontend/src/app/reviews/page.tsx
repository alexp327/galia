import RatingResult from '@/src/components/rating-result';
import { Rating } from '@/src/lib/types';
import { createClient } from '@/utils/supabase/server';

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
    <div className='bg-accent p-2 rounded-lg'>
      <ol id='resultsTable' className='flex flex-col gap-2'>
        {ratings.map((rating) => (
          <li key={rating.id}>
            <RatingResult rating={rating} />
          </li>
        ))}
      </ol>
    </div>
  );
}

