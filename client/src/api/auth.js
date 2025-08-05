const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (data) => {
  const res = await fetch(`${API_URL}api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const loginUser = async (data) => {
  const res = await fetch(`${API_URL}api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (json.token) {
    localStorage.setItem("token", json.token);
    localStorage.setItem("user", JSON.stringify(json.user));
  }
  return json;
};
export const getUser = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}api/auth/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

export const updateUser = async (data) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}api/auth/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (json.user) {
    localStorage.setItem("user", JSON.stringify(json.user));
  }

  return json;
};

export const deleteUser = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}api/auth/delete`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.ok) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  return res.json();
};
