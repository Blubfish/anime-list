import fetchRecommendations from "../../../lib/fetchRecommendations";
import Image from "next/image";
import Link from "next/link";
import { AnimeRow, AnimeData, Anime } from "../../type";
type RecommendedAnimeFormProps = {
  aniListId: number;
  savedAnimeList?: AnimeRow[];
};
export default async function RecommendedAnimeForm({
  aniListId,
  savedAnimeList = [],
}: RecommendedAnimeFormProps) {
  const recommendedAnime = (await fetchRecommendations(aniListId)) ?? [];

  const mappedRecommendations = (recommendedAnime ?? [])
    .filter((anime: AnimeData) => anime !== null)
    .map((anime: AnimeData) => ({
      ...anime,
      aniListId: anime.id,
    }));

  const filterRecommendation = mappedRecommendations
    .filter(
      (anime: Anime) =>
        !anime.isAdult &&
        !savedAnimeList.some((saved) => saved.anilist_id === anime.aniListId),
    )
    .slice(0, 12);

  return (
    <section className="rounded-3xl border border-slate-800/80 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-orange-500/30 to-amber-500/20 ring-1 ring-orange-400/30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4 text-orange-300"
              aria-hidden
            >
              <path d="M12 2l2.39 7.36H22l-6.18 4.49L18.18 21 12 16.27 5.82 21l2.36-7.15L2 9.36h7.61L12 2z" />
            </svg>
          </span>
          <div>
            <h2 className="text-lg font-semibold text-slate-100">
              You might also like
            </h2>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
              Based on this anime
            </p>
          </div>
        </div>
        {filterRecommendation.length > 0 && (
          <span className="rounded-full bg-slate-800/70 px-3 py-1 text-xs font-semibold text-slate-300 ring-1 ring-slate-700/60">
            {filterRecommendation.length} suggestions
          </span>
        )}
      </div>

      {filterRecommendation.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
          {filterRecommendation.map((anime: AnimeData) => (
            <Link
              href={`/components/animeInfo/${anime.id}`}
              key={anime.id}
              className="group relative rounded-2xl border border-slate-800/80 bg-slate-950/80 p-2 text-left text-slate-300 shadow-lg shadow-black/30 ring-1 ring-transparent transition hover:-translate-y-0.5 hover:border-orange-400/50 hover:shadow-orange-500/10 hover:ring-orange-400/20"
            >
              <div className="relative overflow-hidden rounded-xl bg-slate-800 w-auto h-auto">
                <Image
                  src={
                    anime.coverImage.large || anime.coverImage.extraLarge || ""
                  }
                  alt={
                    anime.title.english || anime.title.romaji || "Anime cover"
                  }
                  width={120}
                  height={180}
                  className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  unoptimized
                />
                {anime.averageScore ? (
                  <span className="absolute right-1.5 top-1.5 inline-flex items-center gap-1 rounded-full bg-slate-950/80 px-2 py-0.5 text-[10px] font-semibold text-amber-300 ring-1 ring-amber-400/30 backdrop-blur">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-2.5 w-2.5"
                      aria-hidden
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    {(anime.averageScore / 10).toFixed(1)}
                  </span>
                ) : null}
              </div>

              <p className="mt-2 line-clamp-2 text-[11px] font-medium uppercase tracking-[0.08em] text-slate-400 group-hover:text-orange-300">
                {anime.title.english || anime.title.romaji}
              </p>

              <div className="pointer-events-none absolute left-1/2 top-0 z-10 hidden w-60 -translate-x-1/2 -translate-y-[calc(100%+10px)] rounded-2xl border border-slate-700/80 bg-slate-950/95 p-3 text-xs text-slate-100 shadow-2xl shadow-black/50 ring-1 ring-black/30 backdrop-blur transition duration-200 group-hover:block">
                <p className="text-sm font-semibold text-orange-300">
                  {anime.title.english || anime.title.romaji}
                </p>
                <p
                  className="line-clamp-5 leading-5 text-slate-300"
                  dangerouslySetInnerHTML={{
                    __html: (anime.description || "No description")
                      .replace(/(<br\s*\/?>)+/gi, " ")
                      .replace(/\(Source:.*?\)/gi, "")
                      .trim(),
                  }}
                />

                <span
                  aria-hidden
                  className="absolute left-1/2 top-full -mt-px h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-slate-700/80 bg-slate-950/95"
                />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-700/70 bg-slate-900/40 p-8 text-center">
          <p className="text-sm font-semibold text-slate-200">
            No recommendations yet
          </p>
          <p className="mt-1 text-xs text-slate-400">
            We couldn&rsquo;t find similar anime right now. Try again later.
          </p>
        </div>
      )}
    </section>
  );
}
