import RecommendationResult from '@/src/components/rec-result';
import { Separator } from '@/src/components/ui/separator';
import { Profile, Recommendation } from '@/src/lib/types';
import { createClient } from '@/utils/supabase/server';
import { ChevronDown, ChevronUp, Image } from 'lucide-react';
import Link from 'next/link';

interface SearchParams {
  orderBy?: keyof Recommendation;
  orderDirection?: 'asc' | 'desc';
  offset?: number;
}

const RecsPage = async ({
  params,
  searchParams,
}: {
  params: { username: string };
  searchParams: SearchParams;
}) => {
  const supabase = createClient();

  /* make sure user exists and current user
      has access to the requested user's recommendations
  */
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <div>no current session</div>;
  }

  const { data: profileData } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', params.username);

  if (!profileData || profileData.length === 0) {
    return <div>Username not found</div>;
  }

  const profile = profileData[0] as Profile;

  if (profile.user_id !== user.id) {
    return <div>Unauthorized</div>;
  }

  const orderBy: keyof Recommendation =
    searchParams.orderBy || 'recommended_on';
  const orderDirection = searchParams.orderDirection === 'asc' ? true : false;
  const offset = searchParams.offset || 0;

  let query = supabase.from('recommendations').select(`*, release_group (*)`);

  if ((orderBy as string) === 'title') {
    query = supabase.rpc('get_recommendations_by_title', {
      ascending: orderDirection,
      offset_val: 0,
    });
  } else {
    query = query
      .order('priority', { ascending: false })
      .order(orderBy, { ascending: orderDirection })
      .range(0, 25);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Query Error:', error);
    return <div>Error fetching ratings</div>;
  }

  let recommendations: Recommendation[] = data as Recommendation[];

  if (!recommendations || recommendations.length === 0) {
    return <div>No recommendations available</div>;
  }

  return (
    <section>
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
            <span className='flex items-center gap-1 text-nowrap'>
              Priority
            </span>
          </h4>
          <h4 className='hidden lg:block w-1/3 text-right pr-3'>
            <Link
              href={
                (orderBy as string) === 'recommended_on' && !orderDirection
                  ? '?orderBy=recommended_on&orderDirection=asc'
                  : '?orderBy=recommended_on&orderDirection=desc'
              }
              className='flex justify-end items-center gap-1'
            >
              {(orderBy as string) === 'recommended_on' &&
                (orderDirection ? (
                  <ChevronUp className='w-4 h-4 inline' />
                ) : (
                  <ChevronDown className='w-4 h-4 inline' />
                ))}
              Date Recommended
            </Link>
          </h4>
        </div>
        <div className='w-full px-1 my-1'>
          <Separator />
        </div>
        <ol id='resultsTable' className='flex flex-col'>
          {recommendations.map((recommendation) => (
            <li key={recommendation.id}>
              <Link href={`/${params.username}/reviews/${recommendation.id}`}>
                <RecommendationResult recommendation={recommendation} />
              </Link>
            </li>
          ))}
        </ol>
      </div>
      {/* TODO: add pagination */}
    </section>
  );
};

export default RecsPage;

