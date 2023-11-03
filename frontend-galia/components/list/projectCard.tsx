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
      href={`/alex/${id}`}
      className='shadow-xl p-2 bg-secondary flex gap-4 rounded-lg'
    >
      <img src={src} alt='' className='w-1/3 rounded-sm'></img>
      <div className='w-2/3 flex flex-col justify-center'>
        <h3 className='font-bold text-lg'>{title}</h3>
        <p>{artist}</p>
      </div>
    </Link>
  );
};

export default projectCard;

