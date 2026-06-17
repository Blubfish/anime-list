"use server";

import { Anime } from "../type";
import { pool } from "@/lib/lib";
import { revalidatePath } from "next/cache";

export async function handleSubmit(formData: Anime): Promise<void> {
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

  if (!title || typeof title !== "string") {
    throw new Error("Name is required");
  }

  if (typeof rating !== "number" || rating < 1 || rating > 10) {
    throw new Error("Rating must be a number from 1 to 10");
  }

  if (
    status &&
    !(
      status === "Completed" ||
      status === "Watching" ||
      status === "Plan to Watch" ||
      status === "On Hold" ||
      status === "Dropped"
    )
  ) {
    throw new Error("Invalid status");
  }

  if (!image || typeof image !== "string") {
    throw new Error("Image URL is required");
  }

  if (!genres || !Array.isArray(genres)) {
    throw new Error("Genres is required");
  }

  if (!aniListId || typeof aniListId !== "number") {
    throw new Error("AniList ID is required");
  }

  if (!episodes || typeof episodes !== "number") {
    throw new Error("Episodes is required");
  }

  if (!tags || !Array.isArray(tags)) {
    throw new Error("Tags is required");
  }

  await pool.query(
    `INSERT INTO anime (
      title,
      rating,
      status,
      note,
      image,
      genres,
      anilist_id,
      episodes,
      episodes_watched,
      tags
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
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
    ],
  );

  revalidatePath("/");
}
