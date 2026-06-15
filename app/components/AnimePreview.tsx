import Image from "next/image";

type AnimePreviewProps = {
  title: string;
  rating: number;
  status: string;
  note: string;
  episodes: number;
  episodesWatched: number | "";
  image: string;
};

export default function AnimePreview({
  title,
  rating,
  status,
  note,
  episodes,
  episodesWatched,
  image,
}: AnimePreviewProps) {
  return (
    <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 ring-1 ring-slate-800/60">
      <div className="mb-4 flex items-center gap-2">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-orange-500/30 to-amber-500/20 ring-1 ring-orange-400/30">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-3.5 w-3.5 text-orange-300"
            aria-hidden
          >
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
          </svg>
        </span>
        <div>
          <p className="text-sm font-semibold text-slate-100">Live Preview</p>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
            See how it will look
          </p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-[1fr_120px] sm:items-start">
        <div className="space-y-2 text-sm text-slate-300">
          <p>
            <span className="font-semibold text-slate-100">Name:</span>{" "}
            {title || <span className="text-slate-500">Not set</span>}
          </p>
          <p>
            <span className="font-semibold text-slate-100">Rating:</span>{" "}
            <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/15 px-2 py-0.5 text-xs font-semibold text-orange-300 ring-1 ring-orange-400/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-3 w-3"
                aria-hidden
              >
                <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              {rating}/10
            </span>
          </p>
          <p>
            <span className="font-semibold text-slate-100">Status:</span>{" "}
            <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-xs font-medium text-slate-200 ring-1 ring-slate-700">
              {status}
            </span>
          </p>
          <p>
            <span className="font-semibold text-slate-100">Note:</span>{" "}
            {note || <span className="text-slate-500">No note yet</span>}
          </p>

          <p>
            <span className="font-semibold text-slate-100">
              Currently watched episode:{" "}
            </span>{" "}
            {episodes ? (
              <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-xs font-medium text-slate-200 ring-1 ring-slate-700">
                {episodesWatched}/{episodes}
              </span>
            ) : (
              <span className="text-slate-500">No episode yet</span>
            )}
          </p>
        </div>

        <div className="relative h-[170px] w-[120px] overflow-hidden rounded-xl bg-slate-800 ring-1 ring-slate-700/80 shadow-lg shadow-black/30">
          {image ? (
            <Image
              src={image}
              alt={title || "Selected anime cover"}
              width={120}
              height={170}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center px-3 text-center text-xs font-semibold text-slate-500">
              No image
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
