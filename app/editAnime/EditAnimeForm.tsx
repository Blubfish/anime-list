"use client";

import AnimeForm from "../components/AnimeForm";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AnimeRow, Anime } from "../type";

type EditAnimePageProps = {
  anime: Anime;
  animeID: number;
  savedAnimeList: AnimeRow[];
};

export default function EditAnimePage({
  anime,
  animeID,
  savedAnimeList,
}: EditAnimePageProps) {
  const router = useRouter();

  async function handleUpdate(formData: Anime) {
    await fetch(`/api/animeServer/${animeID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_API_SECRET ?? "",
      },
      body: JSON.stringify(formData),
    });
  }

  async function handleDelete() {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${animeID}`, {
      method: "DELETE",
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_API_SECRET ?? "",
      },
    });

    router.push("/");
    router.refresh();
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-orange-500/30 to-amber-500/20 ring-1 ring-orange-400/30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4 text-orange-300"
              aria-hidden
            >
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
            </svg>
          </span>
          <div>
            <h2 className="text-lg font-semibold text-slate-100">Edit form</h2>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
              Update the saved details
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-md shadow-orange-500/20 ring-1 ring-orange-300/30 transition hover:brightness-110 hover:shadow-orange-500/40 focus:outline-none focus:ring-2 focus:ring-orange-300/50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-4 w-4"
            >
              <path
                fill="currentColor"
                d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"
              />
            </svg>
            Back to Home
          </Link>

          <button
            type="button"
            onClick={handleDelete}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-red-500 to-rose-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-md shadow-red-500/20 ring-1 ring-red-300/30 transition hover:brightness-110 hover:shadow-red-500/40 focus:outline-none focus:ring-2 focus:ring-red-300/50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M9 3h6v2h5v2H4V5h5V3zm-2 5h10v12a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V8zm2 2v8h2V10H9zm4 0v8h2V10h-2z"
              />
            </svg>
            Delete Anime
          </button>
        </div>
      </div>

      <AnimeForm
        anime={anime}
        onSubmit={handleUpdate}
        savedAnimeList={savedAnimeList}
      />
    </div>
  );
}
