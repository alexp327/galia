import {
  BASE_API_CLIENT_LINK,
  BASE_API_SERVER_LINK,
} from '@/shared/environments/environment.local';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getReviewDetails(id: string) {
  const res = await fetch(`${BASE_API_SERVER_LINK}/api/review/${id}`, {
    method: 'GET',
    cache: 'no-store',
  });

  // TODO: have server return 404 error if not found

  return res.json();
}

export async function deleteReview(id: string, client: boolean) {
  let baseAPI;
  if (client) {
    baseAPI = BASE_API_CLIENT_LINK;
  } else {
    baseAPI = BASE_API_SERVER_LINK;
  }

  const res = await fetch(`${baseAPI}/api/review/${id}`, {
    method: 'DELETE',
    cache: 'no-store',
  });

  if (!res.ok) return undefined;

  return res.json();
}

