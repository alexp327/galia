import Link from 'next/link';
import React from 'react';

interface Props {
  id: number;
  src: string;
  artist: string;
  title: string;
}

const projectCard = ({ id, src, artist, title }: Props) => {
  return (
    <Link
      href={`/reviews/${id}`}
      className='flex gap-4 rounded-lg bg-secondary p-2 shadow-xl'
    >
      <img src={src} alt='' className='w-1/3 rounded-sm'></img>
      <div className='flex w-2/3 flex-col justify-center'>
        <h3 className='text-lg font-bold'>{title}</h3>
        <p>{artist}</p>
      </div>
    </Link>
  );
};

export default projectCard;

