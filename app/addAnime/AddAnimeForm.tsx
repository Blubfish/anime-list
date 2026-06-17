"use client";

import Link from "next/link";
import AnimeForm from "../components/AnimeForm";
import { Anime, AnimeData, AnimeRow } from "../type";
import { handleSubmit } from "./actions";

type AddAnimeFormProps = {
  animeData: AnimeData | null;
  savedAnimeList: AnimeRow[];
};

export default function AddAnimeForm({
  animeData,
  savedAnimeList,
}: AddAnimeFormProps) {
  const anime: Anime | null = animeData
    ? {
        isAdult: animeData.isAdult,
        title: animeData.title.english || animeData.title.romaji || "",
        image:
          animeData.coverImage.large || animeData.coverImage.extraLarge || "",
        genres: animeData.genres,
        episodes: animeData.episodes,
        aniListId: animeData.id,
        tags: animeData.tags
          .filter((tag: { rank: number }) => tag.rank >= 90)
          .slice(0, 3)
          .map((tag: { name: string }) => tag.name),
        rating: 1,
        status: "Plan to Watch",
        note: "",
        episodesWatched: 0,
      }
    : null;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-orange-500/30 to-amber-500/20 ring-1 ring-orange-400/30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4 text-orange-300"
              aria-hidden
            >
              <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
            </svg>
          </span>
          <div>
            <h2 className="text-lg font-semibold text-slate-100">New entry</h2>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
              Fill in your details
            </p>
          </div>
        </div>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-md shadow-orange-500/20 ring-1 ring-orange-300/30 transition hover:brightness-110 hover:shadow-orange-500/40 focus:outline-none focus:ring-2 focus:ring-orange-300/50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-4 w-4"
          >
            <path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
          Back to Home
        </Link>
      </div>

      <AnimeForm
        onSubmit={handleSubmit}
        anime={anime ?? undefined}
        savedAnimeList={savedAnimeList}
      />
    </div>
  );
}
