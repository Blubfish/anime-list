import fetchAnimeById from "@/lib/fetchAnimeById";
import Image from "next/image";
import Link from "next/link";
import { genreClasses, tagClasses } from "../colorStyles";
import { AnimeData } from "../../type";

type AnimeInfoProps = {
  id: number;
  note?: string | null;
};

export default async function AnimeInfo({ id, note }: AnimeInfoProps) {
  const anime: AnimeData | null = await fetchAnimeById(id);
  
  if (!anime) {
    return (
      <div className="rounded-3xl border border-slate-800/80 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-8 text-slate-300 shadow-2xl shadow-black/40 backdrop-blur-xl">
        <p className="text-center text-lg font-semibold text-slate-100">
          Anime information could not be loaded.
        </p>
        <p className="mt-3 text-center text-sm text-slate-400">
          Please try again or go back to the main page.
        </p>
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-md shadow-orange-500/20 ring-1 ring-orange-300/30 transition hover:brightness-110 hover:shadow-orange-500/40"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-slate-950/90 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="relative shrink-0 lg:w-[280px]">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-6 rounded-3xl bg-gradient-to-br from-orange-500/30 via-pink-500/20 to-indigo-500/30 blur-2xl"
          />
          <div className="relative overflow-hidden rounded-2xl bg-slate-800 ring-1 ring-slate-700/80 shadow-xl shadow-black/40 w-auto h-auto">
            <Image
              src={anime.coverImage.large || anime.coverImage.extraLarge || ""}
              alt={anime.title.english || anime.title.romaji || "Anime cover"}
              width={280}
              height={420}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="flex-1 space-y-6">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.28em] text-orange-300/80">
              Anime details
            </p>
            <h1 className="bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-4xl font-bold leading-tight text-transparent">
              {anime.title.english || anime.title.romaji}
            </h1>
            <p
              className="max-w-3xl text-base leading-8 text-slate-300/90 sm:text-lg"
              dangerouslySetInnerHTML={{
                __html: (anime.description || "No description")
                  .replace(/(<br\s*\/?>)+/gi, "")
                  .replace(/\(Source:.*?\)/gi, "")
                  .trim(),
              }}
            />
          </div>

          {note && note.trim() !== "" && (
            <div className="rounded-2xl border border-orange-400/20 bg-gradient-to-br from-orange-500/10 via-slate-800/60 to-slate-800/60 p-5 ring-1 ring-orange-400/20 shadow-lg shadow-orange-500/10">
              <div className="mb-3 flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-orange-500/30 to-amber-500/20 ring-1 ring-orange-400/30">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-3.5 w-3.5 text-orange-300"
                    aria-hidden
                  >
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                  </svg>
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-100">
                    Your note
                  </p>
                  <p className="text-xs uppercase tracking-[0.18em] text-orange-300/80">
                    Personal thoughts
                  </p>
                </div>
              </div>
              <p className="whitespace-pre-wrap text-base leading-7 text-slate-200">
                {note}
              </p>
            </div>
          )}

          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700/60 to-transparent" />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-800/60 p-5 ring-1 ring-slate-700/50 transition">
              <p className="text-sm uppercase tracking-[0.18em] text-slate-400">
                Genres
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {anime.genres.length > 0 ? (
                  anime.genres.map((genre) => (
                    <span
                      key={genre}
                      className={`rounded-full ${genreClasses[genre] ?? "bg-slate-800 text-slate-300 ring-slate-700"} px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em]`}
                    >
                      {genre}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-slate-400">
                    No genres available
                  </span>
                )}
              </div>
            </div>
            <div className="rounded-2xl bg-slate-800/60 p-5 ring-1 ring-slate-700/50 transition">
              <p className="text-sm uppercase tracking-[0.18em] text-slate-400">
                Tags
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {anime.tags.length > 0 ? (
                  anime.tags
                    .filter((tag) => tag.rank >= 90)
                    .slice(0, 3)
                    .map((tag) => (
                      <span
                        key={tag.name}
                        className={`rounded-full ${tagClasses[tag.name] || "bg-orange-500/10 text-orange-200 ring-orange-500/20"} px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em]`}
                      >
                        {tag.name}
                      </span>
                    ))
                ) : (
                  <span className="text-sm text-slate-400">
                    No tags available
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-800/60 p-5 ring-1 ring-slate-700/50">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4 text-orange-300"
                >
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
                <p className="text-sm uppercase tracking-[0.18em] text-slate-400">
                  Popularity
                </p>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-orange-300">
                  {anime.popularity ? anime.popularity.toLocaleString() : "N/A"}
                </span>
                <span className="text-xs uppercase tracking-[0.15em] text-slate-500">
                  users watched
                </span>
              </div>
            </div>
            <div className="rounded-2xl bg-slate-800/60 p-5 ring-1 ring-slate-700/50">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4 text-emerald-300"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <p className="text-sm uppercase tracking-[0.18em] text-slate-400">
                  Average Score
                </p>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-emerald-300">
                  {anime.averageScore
                    ? (anime.averageScore / 10).toFixed(1)
                    : "N/A"}
                </span>
                <span className="text-xs uppercase tracking-[0.15em] text-slate-500">
                  / 10
                </span>
              </div>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-700/80">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_12px_rgba(16,185,129,0.45)]"
                  style={{
                    width: `${anime.averageScore ? (anime.averageScore / 100) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
