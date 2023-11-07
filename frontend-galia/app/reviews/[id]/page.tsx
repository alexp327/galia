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

  for (let i = 0; i < 5; i++) {
    if (review.rating! > i) {
      ratingStars.push(<Star className='fill-primary stroke-primary' />);
    } else {
      ratingStars.push(<Star className='fill-background stroke-primary' />);
    }
  }

  return (
    <section className='grid items-start gap-6 md:grid-cols-2 lg:gap-12'>
      <img
        src={
          review.imageLink
            ? review.imageLink
            : 'https://static.vecteezy.com/system/resources/thumbnails/005/337/799/small_2x/icon-image-not-found-free-vector.jpg'
        }
        alt={`${review.title} cover art`}
        className='w-full rounded-md shadow-md shadow-card'
      />
      <div className='space-y-6'>
        <h1 className='text-3xl font-bold'>{review.title}</h1>
        <p className='text-xl text-gray-400'>{review.artist}</p>
        <div className='flex items-center space-x-2'>{ratingStars}</div>
        <p className='text-base capitalize text-gray-300'>
          {review.projectType} &#x2022; {review.releaseYear}
        </p>
        <ul className='flex space-x-2'>
          {review.genres?.map((genre) => (
            <li key={genre} className='rounded-md bg-muted px-2 py-1 text-sm'>
              {genre}
            </li>
          ))}
        </ul>
        <div>{review.bestTracks}</div>
        <div>{review.genres}</div>
        <div>{review.notes}</div>
        <div>{review.recommender}</div>
        <div>{review.hasVinyl ? 'true' : 'false'}</div>
        <div>{review.needsReduxReview ? 'true' : 'false'}</div>
        <div>{review.createdAt!.toString()}</div>
        <div>{review.updatedAt!.toString()}</div>
        <Link href={`/reviews/${review.id}/edit`}>
          <Button variant='secondary'>
            <Edit className='mr-2'></Edit>Edit
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default ReviewDetailPage;

