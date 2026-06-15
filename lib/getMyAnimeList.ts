import { AnimeRow } from "@/app/type";

export const myAnimeList = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const allAnime = await response.json();
  
  return allAnime.map((anime: AnimeRow) => ({
    ...anime,
    aniListId: anime.anilist_id,
    genres: anime.genres ?? [],
    tags: anime.tags ?? [],
    episodes: anime.episodes ?? 0,
    episodesWatched: anime.episodes_watched ?? 0,
  }));
};
