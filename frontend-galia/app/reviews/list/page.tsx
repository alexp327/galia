import ProjectCard from '@/components/reviews/list/projectCard';
import { BASE_API_SERVER_LINK } from '@/shared/environments/environment.local';
import { Review } from '@/shared/review.interface';
import React from 'react';

const listPage = async () => {
  // TODO: set env var in docker compose with container reference
  let projectsList: Review[] = [];
  try {
    const res = await fetch(BASE_API_SERVER_LINK + '/api/review', {
      method: 'GET',
      cache: 'no-store',
    });

    projectsList = await res.json();
  } catch (e) {
    console.error(e);
  }

  return (
    <div>
      <ul className='m-4 mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {projectsList.map((project) => (
          <li key={project.id}>
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

