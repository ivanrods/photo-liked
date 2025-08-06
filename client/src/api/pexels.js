const accessKey = import.meta.env.VITE_PEXELS_API_KEY;

export async function fetchPhotos(searchTerm = "", perPage = 12) {
  const url = searchTerm
    ? `https://api.pexels.com/v1/search?query=${searchTerm}&per_page=${perPage}`
    : `https://api.pexels.com/v1/curated?per_page=${perPage}`;

  const response = await fetch(url, {
    headers: {
      Authorization: accessKey,
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar fotos da API Pexels");
  }

  const data = await response.json();
  return data.photos;
}
