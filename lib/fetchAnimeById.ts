export default async function fetchAnimeById(id: number) {
  const query = `
    query ($id: Int) {
      Media(id: $id, type: ANIME) {
        id
        description(asHtml: true)
        title {
          romaji
          english
          native
        }
        coverImage {
          extraLarge
        }
        isAdult
        genres
        episodes
        tags {
          name
          rank
        }
        popularity
        favourites
        averageScore
      }
    }
  `;

  try {
    const response = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { id },
      }),
    });

    const data = await response.json();
    return data?.data?.Media ?? null;
  } catch (error) {
    console.log(error);
  }
}
