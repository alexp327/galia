export type Rating = {
  id: string;
  release_id: number;
  user_id: string;
  rating: number;
  recommender: string;
  favorite_tracks: string;
  notes: string;
  own_physical: boolean;
  created_at: string; // use new Date() when displaying
  release_group: ReleaseGroup;
};

export type ReleaseGroup = {
  id: number;
  type: number;
  rg_id: string;
  title: string;
  artist: string;
  created_at: string;
  release_date: string;
};

