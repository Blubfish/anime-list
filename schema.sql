CREATE TABLE anime (
    anime_id INTEGER GENERATED ALWAYS AS IDENTITY,
    title TEXT NOT NULL,
    rating INTEGER NOT NULL,
    status TEXT NOT NULL,
    note TEXT NOT NULL,
    image TEXT NOT NULL,
    genres TEXT[] NOT NULL DEFAULT '{}'::text[],
    anilist_id INTEGER NOT NULL,
    episodes INTEGER NOT NULL,
    tags TEXT[] NOT NULL DEFAULT '{}'::text[],
    episodes_watched INTEGER NOT NULL,
    CONSTRAINT anime_pkey PRIMARY KEY (anime_id)
);
