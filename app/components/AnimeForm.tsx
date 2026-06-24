"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import fetchAni from "../../lib/fetchAni";
import Image from "next/image";
import AnimePreview from "./AnimePreview";
import { Anime, AnimeData, AnimeRow } from "../type";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import PasswordModal from "./PasswordModal";
import usePassWordLocked from "./hook/usePasswordLock";

type AnimeFormProps = {
  anime?: Anime;
  onSubmit: (formData: Anime) => Promise<void>;
  savedAnimeList?: AnimeRow[];
};

export default function AnimeForm({
  anime,
  onSubmit,
  savedAnimeList = [],
}: AnimeFormProps) {
  const [formData, setFormData] = useState<Anime>({
    isAdult: anime?.isAdult ?? true,
    title: anime?.title ?? "",
    rating: anime?.rating ?? 1,
    status: anime?.status ?? "Plan to Watch",
    note: anime?.note ?? "",
    image: anime?.image ?? "",
    genres: anime?.genres ?? [],
    episodes: anime?.episodes ?? 1,
    aniListId: anime?.aniListId ?? 1,
    tags: anime?.tags ?? [],
    episodesWatched: anime?.episodesWatched ?? 0,
  });
  const router = useRouter();
  const [animeOption, setAnimeOption] = useState<AnimeData[]>([]);
  const [showOption, setShowOption] = useState(false);
  const filterAnime = animeOption.filter(
    (anime) =>
      !anime.isAdult &&
      !savedAnimeList.some((saved) => saved.anilist_id === anime.id) &&
      anime.episodes,
  );
  const { isUnlocked, setIsUnlocked } = usePassWordLocked();

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (!formData.title.trim()) {
        setAnimeOption([]);
        return;
      }

      const result = await fetchAni(formData.title);
      setAnimeOption(result);
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [formData.title]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await onSubmit({
        ...formData,
        episodesWatched:
          formData.episodesWatched === "" ? 0 : formData.episodesWatched,
      });
      router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error);
      alert("Fail To Save Anime");
    }
  }
  if (!isUnlocked) {
    return <PasswordModal setIsUnlocked={setIsUnlocked} />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" id="anime-form">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="animeNameInput"
          className="text-sm font-semibold text-slate-200"
        >
          Anime Name
        </label>
        <input
          id="animeNameInput"
          type="text"
          placeholder="Enter anime name"
          value={formData.title}
          onChange={(e) => {
            setFormData({ ...formData, title: e.target.value });
            setShowOption(true);
          }}
          onFocus={() => setShowOption(true)}
          onBlur={() => {
            setTimeout(() => {
              setShowOption(false);
            }, 150);
          }}
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/25"
        />
      </div>

      {showOption && animeOption.length > 0 && (
        <div className="rounded-2xl border border-slate-800/80 bg-slate-950/70 p-3 ring-1 ring-slate-800/60">
          <p className="mb-3 text-xs uppercase tracking-[0.18em] text-slate-400">
            Suggestions
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {filterAnime.map((anime: AnimeData) => (
              <button
                type="button"
                key={anime.id}
                className="group flex w-full flex-col gap-2 rounded-xl border border-transparent p-2 text-left text-slate-300 transition hover:border-orange-400/40 hover:bg-slate-800/80 hover:text-orange-200"
                onClick={() => {
                  setFormData({
                    ...formData,
                    title: anime.title.english || anime.title.romaji || "",
                    image:
                      anime.coverImage.large ||
                      anime.coverImage.extraLarge ||
                      "",
                    genres: anime.genres,
                    aniListId: anime.id,
                    episodes: anime.episodes,
                    tags: anime.tags
                      .filter((tag: { rank: number }) => tag.rank >= 90)
                      .slice(0, 3)
                      .map((tag: { name: string }) => tag.name),
                    isAdult: anime.isAdult,
                  });
                  setShowOption(false);
                }}
              >
                <div className="overflow-hidden rounded-lg bg-slate-800 ring-1 ring-slate-700/80">
                  <Image
                    src={anime.coverImage.extraLarge || ""}
                    alt={
                      anime.title.english || anime.title.romaji || "Anime cover"
                    }
                    width={120}
                    height={170}
                    className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    unoptimized
                  />
                </div>
                <p className="line-clamp-2 text-xs font-medium text-slate-200 group-hover:text-orange-200">
                  {anime.title.english || anime.title.romaji}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold text-slate-200">Rating</p>
          <Combobox
            items={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
            onValueChange={(rating) =>
              setFormData({ ...formData, rating: Number(rating) })
            }
            value={formData.rating}
          >
            <ComboboxInput
              readOnly
              placeholder="Select a rating"
              className="min-h-11 w-full border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 shadow-sm has-[[data-slot=input-group-control]:focus-visible]:border-orange-400 has-[[data-slot=input-group-control]:focus-visible]:ring-2 has-[[data-slot=input-group-control]:focus-visible]:ring-orange-400/25"
            />
            <ComboboxContent className="min-h-11 w-full border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 shadow-sm focus-within:border-red-400 focus-within:ring-orange-400/25">
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem
                    key={item}
                    value={item}
                    className="text-slate-100 data-highlighted:bg-orange-500/15 data-highlighted:text-orange-200"
                  >
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold text-slate-200">Status</p>
          <Combobox
            items={[
              "Completed",
              "Plan to Watch",
              "Watching",
              "On Hold",
              "Dropped",
            ]}
            onValueChange={(status) =>
              setFormData({
                ...formData,
                status: status ?? "",
                episodesWatched:
                  status === "Completed"
                    ? formData.episodes
                    : status === "Plan to Watch"
                      ? 0
                      : formData.episodesWatched,
              })
            }
            value={formData.status}
          >
            <ComboboxInput
              readOnly
              placeholder="Select a status"
              className="min-h-11 w-full border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 shadow-sm has-[[data-slot=input-group-control]:focus-visible]:border-orange-400 has-[[data-slot=input-group-control]:focus-visible]:ring-2 has-[[data-slot=input-group-control]:focus-visible]:ring-orange-400/25"
            />
            <ComboboxContent className="min-h-11 w-full border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 shadow-sm focus-within:border-orange-400 focus-within:ring-orange-400/25">
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList className="max-h-64">
                {(item) => (
                  <ComboboxItem
                    key={item}
                    value={item}
                    className="text-slate-100 data-highlighted:bg-orange-500/15 data-highlighted:text-orange-200"
                  >
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>
      </div>

      {["Watching", "Dropped", "On Hold"].includes(formData.status) && (
        <div className="flex flex-col gap-2">
          <label
            htmlFor="episodesWatchedInput"
            className="text-sm font-semibold text-slate-200"
          >
            Episodes Watched
          </label>
          <input
            id="episodesWatchedInput"
            type="number"
            min={0}
            max={formData.episodes}
            placeholder="Enter episodes here"
            value={formData.episodesWatched}
            onChange={(e) =>
              setFormData({
                ...formData,
                episodesWatched:
                  e.target.value === "" ? "" : Number(e.target.value),
              })
            }
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-400/25"
          ></input>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label
          htmlFor="shortNoteForm"
          className="text-sm font-semibold text-slate-200"
        >
          Extra Note
        </label>
        <textarea
          id="shortNoteForm"
          placeholder="Add a short note..."
          value={formData.note}
          onChange={(e) => setFormData({ ...formData, note: e.target.value })}
          rows={4}
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/25"
        />
      </div>

      <AnimePreview
        title={formData.title}
        rating={formData.rating}
        status={formData.status}
        note={formData.note}
        episodes={formData.episodes}
        episodesWatched={formData.episodesWatched}
        image={formData.image}
      />

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-md shadow-orange-500/20 ring-1 ring-orange-300/30 transition hover:brightness-110 hover:shadow-orange-500/40 focus:outline-none focus:ring-2 focus:ring-orange-300/50"
      >
        Save Anime
      </button>
    </form>
  );
}
