"use server";

import { Anime } from "../type";
import { pool } from "@/lib/lib";
import { revalidatePath } from "next/cache";

export async function handleGet(animeID: number) {
  const result = await pool.query("SELECT * FROM anime WHERE anime_id = $1", [
    animeID,
  ]);

  if (result.rows.length === 0) return null;

  return result.rows[0];
}

export async function handleDelete(animeID: number): Promise<void> {
  await pool.query("DELETE FROM anime WHERE anime_id = $1", [animeID]);
  revalidatePath("/");
}

export async function handleUpdate(
  formData: Anime,
  animeID: number,
): Promise<void> {
  const {
    title,
    rating,
    status,
    note,
    image,
    genres,
    aniListId,
    episodes,
    episodesWatched,
    tags,
  } = formData;

  await pool.query(
    `UPDATE anime 
    SET title = $1,
        rating = $2,
        status = $3,
        note = $4,
        image = $5,
        genres = $6,
        anilist_id = $7,
        episodes = $8,
        episodes_watched = $9,
        tags = $10
    WHERE anime_id = $11`,
    [
      title,
      rating,
      status,
      note,
      image,
      genres,
      aniListId,
      episodes,
      episodesWatched,
      tags,
      animeID,
    ],
  );

  revalidatePath("/");
}
