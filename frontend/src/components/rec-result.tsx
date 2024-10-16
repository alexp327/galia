import { CircleChevronUp } from 'lucide-react';
import { Rating, Recommendation } from '../lib/types';
import { cn } from '../lib/utils';

type RecommendationResultProps = {
  recommendation: Recommendation;
};

const RecommendationResult = ({
  recommendation,
}: RecommendationResultProps) => {
  return (
    <div className='flex gap-2 hover:bg-accent/50 hover:cursor-pointer p-1 rounded-sm transition-all'>
      <object
        data={`https://coverartarchive.org/release-group/${recommendation.release_group.id}/front-250`}
        type='image/png'
        className='mx-auto w-12 h-auto rounded-sm'
      >
        <img src='/fallback.png' alt='' />
      </object>
      <div className='flex-1 flex flex-col justify-center text-nowrap overflow-hidden'>
        <h4 className='text-md'>{recommendation.release_group.title}</h4>
        <h5 className='text-foreground/70 text-sm'>
          {recommendation.release_group.artist} &#183;{' '}
          {new Date(recommendation.release_group.release_date).getFullYear()}
        </h5>
      </div>
      <div className='flex justify-center items-center w-12 h-12 rounded-sm'>
        {recommendation.priority ? (
          <CircleChevronUp className='w-5 text-primary' />
        ) : null}
      </div>
      <div className='hidden lg:flex justify-end items-center w-1/3 pr-3'>
        <p>
          {new Date(recommendation.recommended_on).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>
      </div>
    </div>
  );
};

export default RecommendationResult;

