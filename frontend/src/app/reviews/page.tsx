import RatingResult from '@/src/components/rating-result';
import { Button } from '@/src/components/ui/button';
import { Separator } from '@/src/components/ui/separator';
import { Rating } from '@/src/lib/types';
import { createClient } from '@/utils/supabase/server';
import { ChevronDown, ChevronUp, FilterIcon, Image } from 'lucide-react';
import Link from 'next/link';

export default async function Page({ searchParams }: any) {
  const orderBy: keyof Rating = searchParams.orderBy || 'updated_at';
  const orderDirection = searchParams.orderDirection === 'asc' ? true : false;

  const supabase = createClient();
  let query = supabase.from('ratings').select(`*, release_group (*)`);

  if ((orderBy as string) === 'title') {
    // THE FOLLOWING CODE IS BUGGED ON SUPABASE'S SIDE
    // query = query.order('release_group(title)', {
    //   ascending: orderDirection,
    //   referencedTable: 'release_group',
    // });

    // built the following rpc function to work around the bug
    query = supabase.rpc('get_ratings_by_title', { ascending: orderDirection });
  } else {
    query = query.order(orderBy, { ascending: orderDirection });
  }

  const { data, error } = await query;

  if (error) {
    console.error('Query Error:', error);
    return <div>Error fetching ratings</div>;
  }

  let ratings: Rating[] = data as Rating[];

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
          <h4 className='flex-1'>
            <Link
              href={
                (orderBy as string) === 'title' && orderDirection
                  ? '?orderBy=title&orderDirection=desc'
                  : '?orderBy=title&orderDirection=asc'
              }
              className='flex items-center gap-1'
            >
              Title
              {(orderBy as string) === 'title' &&
                (orderDirection ? (
                  <ChevronUp className='w-4 h-4' />
                ) : (
                  <ChevronDown className='w-4 h-4' />
                ))}
            </Link>
          </h4>
          <h4 className='flex justify-center items-center w-12'>
            <Link
              href={
                (orderBy as string) === 'rating' && !orderDirection
                  ? '?orderBy=rating&orderDirection=asc'
                  : '?orderBy=rating&orderDirection=desc'
              }
              className='flex items-center gap-1 text-nowrap'
            >
              Rating
              {(orderBy as string) === 'rating' &&
                (orderDirection ? (
                  <ChevronUp className='w-4 h-4 inline' />
                ) : (
                  <ChevronDown className='w-4 h-4 inline' />
                ))}
            </Link>
          </h4>
          <h4 className='hidden lg:block w-1/3 text-right pr-3'>
            <Link
              href={
                (orderBy as string) === 'updated_at' && !orderDirection
                  ? '?orderBy=updated_at&orderDirection=asc'
                  : '?orderBy=updated_at&orderDirection=desc'
              }
              className='flex justify-end items-center gap-1'
            >
              {(orderBy as string) === 'updated_at' &&
                (orderDirection ? (
                  <ChevronUp className='w-4 h-4 inline' />
                ) : (
                  <ChevronDown className='w-4 h-4 inline' />
                ))}
              Last Updated
            </Link>
          </h4>
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
      </div>
      {/* TODO: add pagination */}
    </section>
  );
}

