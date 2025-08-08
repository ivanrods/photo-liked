const API_URL = import.meta.env.VITE_API_URL;
export const saveLikes = async (likes) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}api/auth/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ likes }),
  });

  const json = await res.json();
  return json;
};

export const getLikes = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}api/auth/likes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar likes");
  }

  const json = await res.json();
  return json.likes;
};
