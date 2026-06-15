export type AnimeData = {
  description: string;
  isAdult: boolean;
  id: number;
  title: {
    romaji?: string;
    english?: string;
  };
  coverImage: {
    large?: string;
    extraLarge?: string;
  };
  genres: string[];
  aniListId: number;
  episodes: number;
  tags: {
    name: string;
    rank: number;
  }[];
  popularity?: number;
  favourites?: number;
  averageScore?: number;
};

export type Anime = {
  isAdult: boolean;
  title: string;
  rating: number;
  status: string;
  note: string;
  image: string;
  genres: string[];
  episodes: number;
  aniListId: number;
  tags: string[];
  episodesWatched: number | "";
};

export type AnimeRow = {
  anime_id: number;
  title: string;
  rating: number;
  status: string;
  note: string | null;
  image: string | null;
  genres: string[] | null;
  anilist_id: number | null;
  episodes: number | null;
  tags: string[] | null;
  episodes_watched: number | null;
};
