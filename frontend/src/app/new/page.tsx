import NewReviewForm from '@/src/components/new-review-form';
import { createClient } from '@/utils/supabase/server';

const NewReviewPage = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <div>You must be logged in to submit a review.</div>;
  }

  return (
    <section>
      <h2 className='text-xl mb-8'>New Review</h2>
      <NewReviewForm />
    </section>
  );
};

export default NewReviewPage;

