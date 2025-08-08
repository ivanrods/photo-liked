import { createContext, useState, useEffect, useRef } from "react";

import { getLikes, saveLikes } from "../api/likes";

export const DataContext = createContext();

function DataProvider({ children }) {
  const [dataLike, setDataLike] = useState([]);
  const [search, setSearch] = useState("");
  const [loadMoreFig, setLoadMoreFig] = useState(12);
  const [loadFigures, setLoadFigures] = useState([]);

  const token = localStorage.getItem("token");
  const didFetchLikes = useRef(false); // <- flag de controle

  // Carrega os likes do backend
  useEffect(() => {
    const loadLikes = async () => {
      if (!token) return;

      try {
        const likesFromDB = await getLikes();
        setDataLike(likesFromDB);
        didFetchLikes.current = true; // <- marca como carregado
      } catch (err) {
        console.error("Erro ao buscar likes do banco:", err);
      }
    };

    loadLikes();
  }, [token]);

  // Salva os likes no backend (mas só depois de carregar os dados)
  useEffect(() => {
    const saveLikesData = async () => {
      if (!token || !didFetchLikes.current) return;

      try {
        await saveLikes(dataLike);
      } catch (error) {
        console.error("Erro ao salvar likes no banco:", error);
      }
    };

    saveLikesData();
  }, [dataLike, token]);

  return (
    <DataContext.Provider
      value={{
        dataLike,
        setDataLike,
        search,
        setSearch,
        loadMoreFig,
        setLoadMoreFig,
        loadFigures,
        setLoadFigures,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataProvider;
