import { AnimeRow } from "@/app/type";
import { Pool } from "pg";

const envContent = process.env.DATABASE_URL;

export const pool = new Pool({
  connectionString: envContent,
});

async function getAnimeList() {
  const result = await pool.query(
    "SELECT * FROM public.anime ORDER BY rating DESC",
  );
  return result.rows;
}

export const myAnimeList = async () => {
  const animeData = await getAnimeList();
  const allAnime = animeData.map((anime: AnimeRow) => ({
    ...anime,
    aniListId: anime.anilist_id,
    genres: anime.genres ?? [],
    tags: anime.tags ?? [],
    episodes: anime.episodes ?? 0,
    episodesWatched: anime.episodes_watched ?? 0,
  }));
  return allAnime;
};
