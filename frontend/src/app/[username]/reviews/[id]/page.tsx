import { getColorForRating, shantell } from '@/src/components/rating-result';
import { Separator } from '@/src/components/ui/separator';
import { Profile, Rating } from '@/src/lib/types';
import { cn } from '@/src/lib/utils';
import { createClient } from '@/utils/supabase/server';

// id corresponds to the id of the project in the release_group
//   table. Then it can be used as something to check
//   to conditionally render the review or lack thereof.

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

  let query = supabase
    .from('ratings')
    .select(`*, release_group (*)`)
    .eq('release_id', params.id);

  const { data, error } = await query;

  if (error) {
    console.error('Query Error:', error);
    return <div>Error fetching ratings</div>;
  }

  let rating: Rating | null = data.length > 0 ? (data[0] as Rating) : null;

  // if user has the necessary permissions, show the review
  // if review doesn't exist, show "no review" page
  // if review exists, show the review

  return rating ? (
    <section className='py-4 max-w-screen-xl mx-auto'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        <div className='col-span-1 text-center'>
          <img
            src={`https://coverartarchive.org/release-group/${rating.release_group.id}/front-500`}
            alt={`${rating.release_group.title} cover art`}
            width={500}
            height={500}
            className='mx-auto'
          />
          <h5 className='text-muted-foreground mt-4'>
            {rating.release_group.type === 1 ? 'Album' : 'type not supported'}{' '}
            &middot;{' '}
            {new Date(rating.release_group.release_date).toLocaleDateString(
              'en-US',
              {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              }
            )}
          </h5>
        </div>
        <div className='col-span-2'>
          <div>
            <h1 className='text-5xl font-bold mt-4 md:mt-0 break-words'>
              {rating.release_group.title}
            </h1>
            <h4 className='mt-2 text-muted-foreground text-lg'>
              {rating.release_group.artist}
            </h4>
          </div>
          <Separator className='my-3' />
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
                <td className='text-muted-foreground w-1/4 py-1.5'>Created</td>
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
        </div>
      </div>
    </section>
  ) : (
    <section className='p-4 max-w-3xl mx-auto'>
      <div className='text-center'>
        <h1 className='text-4xl font-bold'>
          {params.username} has not reviewed this release
        </h1>
      </div>
    </section>
  );
};

export default page;

