import EditAnimePageClient from "../EditAnimeForm";
import RecommendedAnimeForm from "@/app/components/animeInfo/RecommendedAnimeForm";
import { myAnimeList } from "@/lib/getMyAnimeList";

export default async function EditAnimePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${id}`, {
    method: "GET",
  });

  const animeRow = await response.json();
  const anime = {
    ...animeRow,
    aniListId: animeRow.anilist_id,
    episodesWatched: animeRow.episodes_watched ?? 0,
  };
  const savedAnimeList = await myAnimeList();

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-950 to-indigo-950 px-4 py-6 sm:px-6 lg:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-orange-500/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-6xl space-y-6">
        <div className="rounded-3xl border border-slate-800/80 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-[0.28em] text-orange-300/80">
                Edit anime
              </p>
              <h1 className="bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-4xl font-bold leading-tight text-transparent">
                Update your entry
              </h1>
              <p className="max-w-2xl text-sm leading-6 text-slate-400">
                Tweak the saved details, then explore similar anime
                recommendations in one clean view.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <section className="rounded-3xl border border-slate-800/80 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl">
            <EditAnimePageClient
              anime={anime}
              animeID={Number(id)}
              savedAnimeList={savedAnimeList}
            />
          </section>

          <aside className="rounded-3xl border border-slate-800/80 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl">
            <RecommendedAnimeForm aniListId={anime.aniListId} />
          </aside>
        </div>
      </div>
    </main>
  );
}
