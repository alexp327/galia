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
    <div className='flex gap-2'>
      {/* TODO: add skeleton until cover art loads */}
      <img
        src={`https://coverartarchive.org/release-group/${rating.release_group.rg_id}/front-250`}
        alt={`Cover art for ${rating.release_group.title}`}
        className='w-16'
      />
      <div className='flex justify-center items-center w-16 h-16 bg-background rounded-xl'>
        {/* TODO: add variable text color based on rating? */}
        <h3 className={cn(shantell.className, 'text-5xl')}>{rating.rating}</h3>
      </div>
      <div className='flex-1 flex flex-col justify-center'>
        <h4 className='font-bold text-lg'>{rating.release_group.title}</h4>
        <h5 className='text-foreground/70'>{rating.release_group.artist}</h5>
      </div>
    </div>
  );
};

export default RatingResult;

