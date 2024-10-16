export type Rating = {
  id: string;
  release_group_id: string;
  user_id: string;
  rating: number;
  recommender: string;
  favorite_tracks: string;
  notes: string;
  own_physical: boolean;
  created_at: string; // use new Date() when displaying
  updated_at: string; // use new Date() when displaying
  release_group: ReleaseGroup;
};

export type Recommendation = {
  id: bigint;
  user_id: string;
  release_group_id: string;
  recommender: string;
  recommended_on: string; // use new Date() when displaying
  priority: boolean;
  release_group: ReleaseGroup;
};

export type ReleaseGroup = {
  id: string;
  type: number;
  title: string;
  artist: string;
  created_at: string;
  release_date: string;
};

export type Profile = {
  user_id: string;
  username: string;
  bio: string;
  pfp_url: string;
  first_name: string;
  last_name: string;
};

