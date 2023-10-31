import React from 'react';

interface Props {
  src: string;
  artist: string;
  title: string;
}

const projectCard = ({ src, artist, title }: Props) => {
  return (
    <div className='card card-side bg-base-100 shadow-xl px-2'>
      <figure className='w-1/3 max-w-xs'>
        <img src={src} alt='Album' />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>{title}</h2>
        <p>{artist}</p>
        <div className='card-actions justify-end'>
          <button className='btn btn-primary'>Update</button>
        </div>
      </div>
    </div>
  );
};

export default projectCard;

