import ProjectCard from '@/components/list/projectCard';
import { BASE_API_SERVER_LINK } from '@/shared/environments/environment.local';
import { Review } from '@/shared/review.interface';
import Link from 'next/link';
import React from 'react';

const listPage = async () => {
  // TODO: set env var in docker compose with container reference
  const res = await fetch(BASE_API_SERVER_LINK + '/api/review', {
    method: 'GET',
    cache: 'no-store',
  });
  const projectsList: Review[] = await res.json();

  return (
    <div>
      <ul className='grid grid-cols-1 md:grid-cols-2 gap-4 m-4 max-w-4xl mx-auto'>
        {projectsList.map((project) => (
          <li>
            <ProjectCard
              id={project.id!}
              src={project.imageLink!}
              artist={project.artist!}
              title={project.title!}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default listPage;

