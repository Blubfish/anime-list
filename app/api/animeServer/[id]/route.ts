import { pool } from "@/lib/lib";
import { isAuthorized } from "@/lib/auth";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!isAuthorized(request)) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
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
      id,
    ],
  );

  return Response.json({ message: "Anime updated" }, { status: 200 });
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const result = await pool.query("SELECT * FROM anime WHERE anime_id = $1", [
      id,
    ]);

    if (result.rows.length < 0) {
      return Response.json({ message: "Anime not found" });
    }

    return Response.json(result.rows[0], { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Something Went Wrong " }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!isAuthorized(request)) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    await pool.query("DELETE FROM anime WHERE anime_id = $1", [id]);
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Something Went Wrong " }, { status: 500 });
  }
}
