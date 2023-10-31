import { ProjectType } from './projecttype';

export interface Review {
  id?: number;
  artist?: string;
  title?: string;
  projectType?: ProjectType | string; // TODO: remove string as an option
  genres?: string[];
  releaseYear?: number;
  rating?: number;
  recommender?: string;
  imageLink?: string;
  bestTracks?: string[];
  notes?: string;
  hasVinyl?: boolean;
  needsReduxReview?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

