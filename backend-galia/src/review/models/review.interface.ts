import { ProjectType } from 'src/shared/projecttype';

export interface Review {
  id?: number;
  artist?: string;
  title?: string;
  projectType?: ProjectType;
  genres?: string[];
  releaseYear?: number;
  rating?: number;
  recommender?: string;
  bestTracks?: string[];
  notes?: string;
  hasVinyl?: boolean;
  needsReduxReview?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
