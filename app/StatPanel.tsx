import { AnimeRow } from "./type";

type StatPanelProps = {
  myAnimeList: AnimeRow[];
};

export default function StatPanel({ myAnimeList }: StatPanelProps) {
  const totalAnime = myAnimeList.length;
  const totalCompleted = myAnimeList.filter(
    (anime) => anime.status === "Completed",
  ).length;
  const totalDropped = myAnimeList.filter(
    (anime) => anime.status === "Dropped",
  ).length;
  const totalPlanned = myAnimeList.filter(
    (anime) => anime.status === "Plan to Watch",
  ).length;

  return (
    <section className="rounded-3xl border border-slate-800/80 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-orange-300/80">
            Anime summary
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-100">Your stats</h2>
        </div>
        <p className="text-sm text-slate-400">
          Total tracked anime and current status breakdown
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Total anime",
            value: totalAnime,
            accent: "bg-orange-500/10 text-orange-300 ring-orange-500/20",
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
                aria-hidden
              >
                <path d="M4 4h16v2H4V4zm0 4h16v12H4V8zm2 2v8h12v-8H6zm2 2h2v4H8v-4zm4 0h2v4h-2v-4z" />
              </svg>
            ),
            iconColor: "text-orange-300",
          },
          {
            label: "Completed",
            value: totalCompleted,
            accent: "bg-emerald-500/10 text-emerald-200 ring-emerald-500/20",
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
                aria-hidden
              >
                <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
              </svg>
            ),
            iconColor: "text-emerald-300",
          },
          {
            label: "Dropped",
            value: totalDropped,
            accent: "bg-rose-500/10 text-rose-200 ring-rose-500/20",
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
                aria-hidden
              >
                <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            ),
            iconColor: "text-rose-300",
          },
          {
            label: "Plan to Watch",
            value: totalPlanned,
            accent: "bg-sky-500/10 text-sky-200 ring-sky-500/20",
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
                aria-hidden
              >
                <path d="M19 3H5c-1.11 0-2 .9-2 2v14a2 2 0 0 0 2 2h14c1.11 0 2-.89 2-2V5a2 2 0 0 0-2-2zm0 16H5V5h14v14zM7 7h5v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z" />
              </svg>
            ),
            iconColor: "text-sky-300",
          },
        ].map((item) => (
          <div
            key={item.label}
            className={`rounded-2xl bg-slate-800/60 p-5 ring-1 ${item.accent} transition`}
          >
            <div className="flex items-center gap-2">
              <span className={item.iconColor}>{item.icon}</span>
              <p className="text-sm font-medium uppercase tracking-[0.18em]">
                {item.label}
              </p>
            </div>
            <p className="mt-4 text-3xl font-bold text-slate-100">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
