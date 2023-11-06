import { Button } from '@/components/ui/button';
import { BASE_API_SERVER_LINK } from '@/shared/environments/environment.local';
import { Review } from '@/shared/review.interface';
import { Edit, Star } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const getReviewDetails = async (id: string) => {
  console.log('fetching data');

  const res = await fetch(`${BASE_API_SERVER_LINK}/api/review/${id}`, {
    method: 'GET',
    next: {
      revalidate: 60,
    },
  });

  console.log('fetched data');

  return res.json();
};

const ReviewDetailPage = async ({ params }: { params: { id: string } }) => {
  console.log(params.id);
  const review: Review = await getReviewDetails(params.id);

  let ratingStars = [];

  for (let i = 0; i < review.rating!; i++) {
    ratingStars.push(<Star className='fill-primary stroke-primary' />);
  }

  return (
    <article className='mx-auto flex flex-col items-center rounded-lg bg-muted p-4'>
      <img
        src={
          review.imageLink
            ? review.imageLink
            : 'https://static.vecteezy.com/system/resources/thumbnails/005/337/799/small_2x/icon-image-not-found-free-vector.jpg'
        }
        alt={`${review.title} cover art`}
        className='w-full max-w-md rounded-md shadow-md shadow-card'
      />
      <div className='mt-4 flex flex-col rounded-md bg-primary/25 p-2 sm:w-3/4 sm:px-4'>
        <h2 className='text-center text-2xl font-bold'>{review.title}</h2>
        <h3 className='text-center text-lg'>{review.artist}</h3>
      </div>
      <p className='mt-4 capitalize'>
        {review.projectType} &#x2022; {review.releaseYear}
      </p>
      <div className='mt-2 flex'>{ratingStars}</div>
      <div>{review.bestTracks}</div>
      <div>{review.genres}</div>
      <div>{review.notes}</div>
      <div>{review.recommender}</div>
      <div>{review.hasVinyl ? 'true' : 'false'}</div>
      <div>{review.needsReduxReview ? 'true' : 'false'}</div>
      <div>{review.createdAt!.toString()}</div>
      <div>{review.updatedAt!.toString()}</div>
      <Link href={`/reviews/${review.id}/edit`}>
        <Button className='w-48'>
          <Edit className='mr-2'></Edit>Edit
        </Button>
      </Link>
    </article>
  );
};

export default ReviewDetailPage;

