import Link from 'next/link';
import React from 'react';

interface MusicInfo {
  id: number;
  artist: string;
  title: string;
  projectType: string;
  genres: string[];
  releaseYear: number;
  rating: number;
  recommender: string;
  bestTracks: string[];
  notes: string;
  hasVinyl: boolean;
  needsReduxReview: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const listPage = async () => {
  // TODO: set env var in docker compose with container reference
  const res = await fetch('http://172.20.0.4:3000/api/review', {
    method: 'GET',
    cache: 'no-store',
  });
  const projectsList: MusicInfo[] = await res.json();

  return (
    <div>
      list
      <ul>
        {projectsList.map((project) => (
          <li>
            {project.title} - {project.artist}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default listPage;

