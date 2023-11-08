import Date from '@/components/date';
import { Button } from '@/components/ui/button';
import { BASE_API_SERVER_LINK } from '@/shared/environments/environment.local';
import { Review } from '@/shared/review.interface';
import { Check, Edit, Info, Star, X } from 'lucide-react';
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
    <section className='grid items-start gap-6 md:grid-cols-[2fr_3fr] lg:gap-12'>
      <div className='space-y-6'>
        <img
          src={
            review.imageLink
              ? review.imageLink
              : 'https://static.vecteezy.com/system/resources/thumbnails/005/337/799/small_2x/icon-image-not-found-free-vector.jpg'
          }
          alt={`${review.title} cover art`}
          className='w-full rounded-md shadow-md shadow-card'
        />
        <div className='flex space-x-4'>
          {review.hasVinyl ? (
            <div className='flex w-fit space-x-2 rounded-md bg-primary p-3'>
              <Check />
              <span>Own Vinyl</span>
            </div>
          ) : (
            <div className='flex w-fit space-x-2 rounded-md bg-muted p-3'>
              <X />
              <span>Do Not Own Vinyl</span>
            </div>
          )}
        </div>
        <div>
          <h3 className='text-2xl'>Favorite Songs</h3>
          <ul>
            {review.bestTracks?.map((track) => <li>&#x2022; {track}</li>)}
          </ul>
        </div>
      </div>
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
        {review.needsReduxReview && (
          <div className='flex space-x-2 rounded-md bg-primary p-3'>
            <Info />
            <span>Marked for Redux Review</span>
          </div>
        )}
        <div>
          <h3 className='pt-4 text-2xl'>Recommender / Reason for Listening</h3>
          <div className='mt-2 w-fit rounded-md border p-4'>
            <p className='text-gray-300'>{review.recommender}</p>
          </div>
        </div>
        <div>
          <h3 className='pt-4 text-2xl'>Comments</h3>
          <div className='mt-2 w-fit rounded-md border p-4'>
            {/* <h5 className='text-bold'>Alex</h5> */}
            <p className='text-gray-300'>{review.notes}</p>
          </div>
        </div>
        <div>
          <p>
            Originally Reviewed:
            <Date
              className='ml-2'
              dateString={review.createdAt!.toString()}
            ></Date>
          </p>
        </div>
        <div>
          <p>
            Last Edited:
            <Date
              className='ml-2'
              dateString={review.updatedAt!.toString()}
            ></Date>
          </p>
        </div>
        <Link href={`/reviews/${review.id}/edit`} className='inline-flex'>
          <Button variant='secondary'>
            <Edit className='mr-2'></Edit>Edit
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default ReviewDetailPage;

