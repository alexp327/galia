'use client';
import { ProjectType } from '@/shared/projecttype';
import { Review } from '@/shared/review.interface';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const newReviewForm = () => {
  const [artist, setArtist] = useState('');
  const [title, setTitle] = useState('');
  const [projectType, setProjectType] = useState('default');
  const [genres, setGenres] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [recommender, setRecommender] = useState('');
  const [rating, setRating] = useState(1);
  const [bestTracks, setBestTracks] = useState('');
  const [notes, setNotes] = useState('');
  const [hasVinyl, setHasVinyl] = useState(false);
  const [needsReduxReview, setNeedsReduxReview] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const review: Review = {
      artist: artist,
      title: title,
      projectType: projectType,
      genres: genres.split(','),
      releaseYear: parseInt(releaseYear),
      recommender: recommender,
      rating: rating,
      bestTracks: bestTracks.split(','),
      notes: notes,
      hasVinyl: hasVinyl,
      needsReduxReview: needsReduxReview,
    };
    console.log(review);

    setIsPending(true);

    try {
      const res = await fetch('http://localhost:3000/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review),
      }).then((response) => {
        console.log(response);
        setIsPending(false);
        router.push('/list');
      });
    } catch (e) {
      console.error(e);
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='form-control w-full max-w-2xl mx-auto'>
        <label className='label'>
          <span className='label-text'>Artist</span>
        </label>
        <input
          type='text'
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          placeholder='Type here'
          className='input input-bordered w-full max-w-2xl'
        />
        <label className='label'>
          <span className='label-text'>Title</span>
        </label>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Type here'
          className='input input-bordered w-full max-w-2xl'
        />
        <label className='label'>
          <span className='label-text'>Type</span>
        </label>
        <select
          className='select select-bordered'
          value={projectType}
          onChange={(e) => setProjectType(e.target.value)}
        >
          <option disabled value='default'>
            Pick one
          </option>
          {/* TODO: use enum to dynamically create options */}
          <option value={ProjectType.ALBUM}>Album</option>
          <option value={ProjectType.MIXTAPE}>Mixtape</option>
          <option value={ProjectType.EP}>EP</option>
          <option value={ProjectType.COMPILATION}>Compilation</option>
          <option value={ProjectType.SINGLE}>Single</option>
        </select>
        {/* TODO: make this individual input fields / better */}
        <label className='label'>
          <span className='label-text'>Genres</span>
        </label>
        <textarea
          className='textarea textarea-bordered h-24'
          placeholder='rap,pop,classical,etc'
          value={genres}
          onChange={(e) => setGenres(e.target.value)}
        ></textarea>
        <label className='label'>
          <span className='label-text-alt'>Comma separated list</span>
        </label>
        <label className='label'>
          <span className='label-text'>Release Year</span>
        </label>
        <input
          type='text'
          value={releaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
          placeholder='Type here'
          className='input input-bordered w-full max-w-2xl'
        />
        <label className='label'>
          <span className='label-text'>Recommender</span>
        </label>
        <input
          type='text'
          value={recommender}
          onChange={(e) => setRecommender(e.target.value)}
          placeholder='Type here'
          className='input input-bordered w-full max-w-2xl'
        />
        <label className='label'>
          <span className='label-text'>Rating</span>
        </label>
        <div className='rating'>
          {[...Array(5)].map((star, index) => {
            index++;
            return (
              <input
                type='radio'
                name='rating'
                key={index}
                checked={rating === index}
                onChange={() => setRating(index)}
                className='mask mask-star-2 bg-green-500'
              />
            );
          })}
        </div>
        <label className='label'>
          <span className='label-text'>Best Tracks</span>
        </label>
        <textarea
          className='textarea textarea-bordered h-24'
          placeholder='Circles,Complicated,Blue World,etc'
          value={bestTracks}
          onChange={(e) => setBestTracks(e.target.value)}
        ></textarea>
        <label className='label'>
          <span className='label-text-alt'>Comma separated list</span>
        </label>
        <label className='label'>
          <span className='label-text'>Comments</span>
        </label>
        <textarea
          className='textarea textarea-bordered h-24'
          placeholder='Notes...'
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>
        <label className='cursor-pointer label'>
          <span className='label-text'>Own Vinyl?</span>
          <input
            type='checkbox'
            className='toggle toggle-accent'
            checked={hasVinyl}
            onChange={() => setHasVinyl(!hasVinyl)}
          />
        </label>
        <label className='cursor-pointer label'>
          <span className='label-text'>Need Redux Review?</span>
          <input
            type='checkbox'
            className='toggle toggle-accent'
            checked={needsReduxReview}
            onChange={() => setNeedsReduxReview(!needsReduxReview)}
          />
        </label>
        {!isPending && (
          <button className='btn btn-primary'>Submit Review</button>
        )}
        {isPending && (
          <button disabled className='btn'>
            <span className='loading loading-spinner'></span>
            Submitting
          </button>
        )}
      </div>
    </form>
  );
};

export default newReviewForm;

