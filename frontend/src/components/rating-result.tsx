import { Rating } from '../lib/types';
import { Shantell_Sans } from 'next/font/google';
import { cn } from '../lib/utils';

export const shantell = Shantell_Sans({
  subsets: ['latin'],
});

type RatingResultProps = {
  rating: Rating;
};

export const getColorForRating = (rating: number) => {
  let red, green;

  if (rating <= 5) {
    red = 255;
    green = Math.floor((rating / 5) * 230);
  } else {
    red = Math.floor(((10 - rating) / 5) * 255);
    green = 200;
  }

  return `rgb(${red}, ${green}, 90)`;
};

const RatingResult = ({ rating }: RatingResultProps) => {
  const ratingColor = getColorForRating(rating.rating);

  return (
    <div className='flex gap-2 hover:bg-accent/50 hover:cursor-pointer p-1 rounded-sm transition-all'>
      <object
        data={`https://coverartarchive.org/release-group/${rating.release_group.id}/front-250`}
        type='image/png'
        className='mx-auto w-12 h-auto rounded-sm'
      >
        <img src='/fallback.png' alt='' />
      </object>
      <div className='flex-1 flex flex-col justify-center text-nowrap overflow-hidden'>
        <h4 className='text-md'>{rating.release_group.title}</h4>
        <h5 className='text-foreground/70 text-sm'>
          {rating.release_group.artist} &#183;{' '}
          {new Date(rating.release_group.release_date).getFullYear()}
        </h5>
      </div>
      <div className='flex justify-center items-center w-12 h-12 rounded-sm'>
        <h3
          className={cn(shantell.className, 'text-4xl')}
          style={{ color: ratingColor }}
        >
          {rating.rating}
        </h3>
      </div>
      <div className='hidden lg:flex justify-end items-center w-1/3 pr-3'>
        <p>
          {new Date(rating.updated_at).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>
      </div>
    </div>
  );
};

export default RatingResult;

