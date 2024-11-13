import { getColorForRating, shantell } from '@/src/components/rating-result';
import { Alert, AlertDescription } from '@/src/components/ui/alert';
import { Separator } from '@/src/components/ui/separator';
import { Profile, Rating, Recommendation, ReleaseGroup } from '@/src/lib/types';
import { cn } from '@/src/lib/utils';
import { createClient } from '@/utils/supabase/server';
import { CircleChevronDown, CircleChevronUp, Info } from 'lucide-react';

// id corresponds to the id of the project in the release_group table.
//   Then used to conditionally render the review/rec or lack thereof.

const page = async ({
  params,
}: {
  params: { username: string; id: string };
}) => {
  // check if user has the necessary permissions to view this page

  const supabase = createClient();

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

  const { data: releaseGroupData, error: releaseGroupError } = await supabase
    .from('release_group')
    .select('*')
    .eq('id', params.id);

  const { data: ratingData, error: ratingError } = await supabase
    .from('ratings')
    .select(`*`)
    .eq('release_group_id', params.id)
    .eq('user_id', profile.user_id);

  const { data: recommendationData, error: recommendationError } =
    await supabase
      .from('recommendations')
      .select(`*`)
      .eq('release_group_id', params.id)
      .eq('user_id', profile.user_id);

  if (releaseGroupError) {
    console.error('Error fetching release group:', releaseGroupError);
    return <div>Error fetching release group</div>;
  }

  if (ratingError) {
    console.error('Error fetching rating:', ratingError);
    return <div>Error fetching rating</div>;
  }

  if (recommendationError) {
    console.error('Error fetching recommendation:', recommendationError);
    return <div>Error fetching recommendation</div>;
  }

  const release_group: ReleaseGroup | null =
    releaseGroupData.length > 0 ? (releaseGroupData[0] as ReleaseGroup) : null;

  const rating: Rating | null =
    ratingData.length > 0 ? (ratingData[0] as Rating) : null;

  const recommendation: Recommendation | null =
    recommendationData.length > 0
      ? (recommendationData[0] as Recommendation)
      : null;

  if (!release_group) {
    return <div>Release group not found</div>;
  }

  return (
    <section className='py-4 max-w-screen-xl mx-auto'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        <div className='col-span-1 text-center'>
          <object
            data={`https://coverartarchive.org/release-group/${release_group.id}/front-500`}
            type='image/png'
            className='mx-auto w-full h-auto'
          >
            <img src='/fallback.png' alt='' />
          </object>
          <h5 className='text-muted-foreground mt-4'>
            {release_group.type === 1 ? 'Album' : 'type not supported'} &middot;{' '}
            {new Date(release_group.release_date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </h5>
        </div>
        <div className='col-span-2'>
          <div>
            <h1 className='text-5xl font-bold mt-4 md:mt-0 break-words'>
              {release_group.title}
            </h1>
            <h4 className='mt-2 text-muted-foreground text-lg'>
              {release_group.artist}
            </h4>
          </div>
          <Separator className='my-3' />
          {/* if rating exists, show rating */}
          {rating ? (
            <table className='table-auto w-full mt-4'>
              <tbody>
                <tr>
                  <td className='text-muted-foreground w-1/4 py-1.5'>Rating</td>
                  <td
                    className={cn(shantell.className, 'text-8xl w-3/4 py-1.5')}
                    style={{ color: getColorForRating(rating.rating) }}
                  >
                    {rating.rating}
                  </td>
                </tr>
                <tr>
                  <td className='text-muted-foreground w-1/4 py-1.5'>
                    Recommender
                  </td>
                  <td className='w-3/4 py-1.5'>{rating.recommender}</td>
                </tr>
                <tr>
                  <td className='text-muted-foreground w-1/4 py-1.5'>
                    Recommended On
                  </td>
                  <td className='w-3/4 py-1.5'>
                    {new Date(rating.recommended_on).toLocaleDateString(
                      'en-US',
                      {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      }
                    )}
                  </td>
                </tr>
                <tr>
                  <td className='text-muted-foreground w-1/4 py-1.5'>
                    Favorite Tracks
                  </td>
                  <td className='w-3/4 py-1.5'>{rating.favorite_tracks}</td>
                </tr>
                <tr>
                  <td className='text-muted-foreground w-1/4 py-1.5'>Notes</td>
                  <td className='w-3/4 py-1.5'>{rating.notes}</td>
                </tr>
                <tr>
                  <td className='text-muted-foreground w-1/4 py-1.5'>
                    Own Physical Copy
                  </td>
                  <td className='w-3/4 py-1.5'>
                    {rating.own_physical ? 'Yes' : 'No'}
                  </td>
                </tr>
                <tr>
                  <td className='text-muted-foreground w-1/4 py-1.5'>
                    Created
                  </td>
                  <td className='w-3/4 py-1.5'>
                    {new Date(rating.created_at).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>
                </tr>
                <tr>
                  <td className='text-muted-foreground w-1/4 py-1.5'>
                    Last Updated
                  </td>
                  <td className='w-3/4 py-1.5'>
                    {new Date(rating.updated_at).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>
                </tr>
              </tbody>
            </table>
          ) : // if rating does not exist, check if recommendation exists
          recommendation ? (
            // if recommendation exists, show recommendation
            <table className='table-auto w-full mt-4'>
              <tbody>
                <tr>
                  <td className='text-muted-foreground w-1/4 py-1.5'>
                    Priority
                  </td>
                  <td>
                    {recommendation.priority ? (
                      <CircleChevronUp className='w-5 text-primary' />
                    ) : (
                      <CircleChevronDown className='w-5 text-muted-foreground' />
                    )}
                  </td>
                </tr>
                <tr>
                  <td className='text-muted-foreground w-1/4 py-1.5'>
                    Recommender
                  </td>
                  <td className='w-3/4 py-1.5'>{recommendation.recommender}</td>
                </tr>
                <tr>
                  <td className='text-muted-foreground w-1/4 py-1.5'>
                    Recommended On
                  </td>
                  <td className='w-3/4 py-1.5'>
                    {new Date(recommendation.recommended_on).toLocaleDateString(
                      'en-US',
                      {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      }
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            // otherwise, no review or rec
            <h3>no review or rec for this release</h3>
          )}
        </div>
      </div>
      {/* if both rating and rec exist show rec alert */}
      {recommendation && rating ? (
        <Alert className='mt-4'>
          <AlertDescription>
            <Info className='w-5 h-5 inline-block mr-3' />
            This release is also a current recommendation from{' '}
            {recommendation.recommender} on{' '}
            {new Date(recommendation.recommended_on).toLocaleDateString(
              'en-US',
              {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              }
            )}
          </AlertDescription>
        </Alert>
      ) : null}
    </section>
  );
};

export default page;

