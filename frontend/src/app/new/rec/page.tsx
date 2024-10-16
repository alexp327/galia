import { createClient } from '@/utils/supabase/server';

const NewReviewPage = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <div>You must be logged in to submit a recommendation.</div>;
  }

  return (
    <section>
      <h2 className='text-xl mb-8'>New Recommendation</h2>
    </section>
  );
};

export default NewReviewPage;

