import { pool } from "@/lib/lib";
import { isAuthorized } from "@/lib/auth";

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
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
    } = await request.json();

    if (!title || typeof title !== "string") {
      return Response.json({ message: "Name is required" }, { status: 400 });
    }

    if (typeof rating !== "number" || rating < 1 || rating > 10) {
      return Response.json(
        { message: "Rating must be a number from 1 to 10" },
        { status: 400 },
      );
    }

    if (
      status !== "Completed" &&
      status !== "Watching" &&
      status !== "Plan to Watch" &&
      status !== "On Hold" &&
      status !== "Dropped"
    ) {
      return Response.json({ message: "Invalid status" }, { status: 400 });
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

    return Response.json(
      {
        message: "Data Received",
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
      },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Something Went Wrong " }, { status: 500 });
  }
}
