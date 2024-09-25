import { Rating } from '../lib/types';
import { Shantell_Sans } from 'next/font/google';
import { cn } from '../lib/utils';

export const shantell = Shantell_Sans({
  subsets: ['latin'],
});

type RatingResultProps = {
  rating: Rating;
};

const RatingResult = ({ rating }: RatingResultProps) => {
  return (
    <div className='flex gap-2 hover:bg-accent/50 hover:cursor-pointer p-1 rounded-sm transition-all'>
      {/* TODO: add skeleton until cover art loads */}
      <img
        src={`https://coverartarchive.org/release-group/${rating.release_group.rg_id}/front-250`}
        alt={`Cover art for ${rating.release_group.title}`}
        className='w-12 rounded-sm'
      />
      <div className='flex-1 flex flex-col justify-center text-nowrap overflow-hidden'>
        <h4 className='text-md'>{rating.release_group.title}</h4>
        <h5 className='text-foreground/70 text-sm'>
          {rating.release_group.artist} &#183;{' '}
          {new Date(rating.release_group.release_date).getFullYear()}
        </h5>
      </div>
      <div className='flex justify-center items-center w-12 h-12 rounded-sm'>
        {/* TODO: add variable text color based on rating? */}
        <h3 className={cn(shantell.className, 'text-4xl')}>{rating.rating}</h3>
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

