'use client';
import React, { useState } from 'react';

const newReviewForm = () => {
  const [artist, setArtist] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState('default');
  const [genres, setGenres] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [rating, setRating] = useState(1);
  const [recommender, setRecommender] = useState('');
  const [bestTracks, setBestTracks] = useState('');
  const [comment, setComment] = useState('');
  const [ownVinyl, setOwnVinyl] = useState(false);
  const [needsReduxReview, setNeedsReduxReview] = useState(false);

  return (
    <form action=''>
      <div className='form-control w-full max-w-xs'>
        <label className='label'>
          <span className='label-text'>Artist</span>
        </label>
        <input
          type='text'
          required
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          placeholder='Type here'
          className='input input-bordered w-full max-w-xs'
        />
        <label className='label'>
          <span className='label-text'>Title</span>
        </label>
        <input
          type='text'
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Type here'
          className='input input-bordered w-full max-w-xs'
        />
        <label className='label'>
          <span className='label-text'>Type</span>
        </label>
        <select
          className='select select-bordered'
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option disabled value='default'>
            Pick one
          </option>
          <option value='album'>Album</option>
          <option value='mixtape'>Mixtape</option>
          <option value='ep'>EP</option>
          <option value='compilation'>Compilation</option>
          <option value='single'>Single</option>
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
          required
          value={releaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
          placeholder='Type here'
          className='input input-bordered w-full max-w-xs'
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
          <span className='label-text'>Recommender</span>
        </label>
        <input
          type='text'
          required
          value={recommender}
          onChange={(e) => setRecommender(e.target.value)}
          placeholder='Type here'
          className='input input-bordered w-full max-w-xs'
        />
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
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <label className='cursor-pointer label'>
          <span className='label-text'>Own Vinyl?</span>
          <input
            type='checkbox'
            className='toggle toggle-accent'
            checked={ownVinyl}
            onChange={() => setOwnVinyl(!ownVinyl)}
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
        <button className='btn btn-primary'>Submit Review</button>
        <p>artist {artist}</p>
        <p>title {title}</p>
        <p>type {type}</p>
        <p>genres {genres}</p>
        <p>rating {rating}</p>
        <p>recommender {recommender}</p>
        <p>bestTracks {bestTracks}</p>
        <p>comment {comment}</p>
        <p>ownVinyl {ownVinyl ? 'true' : 'false'}</p>
        <p>needsReduxReview {needsReduxReview ? 'true' : 'false'}</p>
      </div>
    </form>
  );
};

export default newReviewForm;

