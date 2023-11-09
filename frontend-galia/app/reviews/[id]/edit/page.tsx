import AddReviewForm from '@/components/new/add-review-form';
import { getReviewDetails } from '@/lib/utils';
import { BASE_API_SERVER_LINK } from '@/shared/environments/environment.local';
import { Review } from '@/shared/review.interface';
import React from 'react';

const ReviewEditPage = async ({ params }: { params: { id: string } }) => {
  // const review: Review = await getReviewDetails(params.id);
  const review: Review = await getReviewDetails(params.id);

  return (
    <div className='mx-auto max-w-xl p-4'>
      <AddReviewForm
        update={true}
        id={review.id}
        artist={review.artist}
        title={review.title}
        projectType={review.projectType}
        genres={review.genres?.toString()}
        releaseYear={review.releaseYear?.toString()}
        recommender={review.recommender}
        imageLink={review.imageLink}
        rating={review.rating?.toString()}
        bestTracks={review.bestTracks?.toString()}
        notes={review.notes}
        hasVinyl={review.hasVinyl}
        needsReduxReview={review.needsReduxReview}
      />
    </div>
  );
};

export default ReviewEditPage;

