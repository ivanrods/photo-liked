import { createContext, useState, useEffect } from "react";
import { saveLikes, getLikes } from "../api/auth";
// eslint-disable-next-line react-refresh/only-export-components
export const DataContext = createContext();

function DataProvider({ children }) {
  const [dataLike, setDataLike] = useState([]);
  const [search, setSearch] = useState("");
  const [loadMoreFig, setLoadMoreFig] = useState(12);
  const [loadFigures, setLoadFigures] = useState([]);

  const token = localStorage.getItem("token");

  // Carrega os likes do backend
  useEffect(() => {
    const loadLikes = async () => {
      if (!token) return;

      try {
        const likesFromDB = await getLikes();
        setDataLike(likesFromDB);
      } catch (err) {
        console.error("Erro ao buscar likes do banco:", err);
      }
    };

    loadLikes();
  }, [token]);

  // Salva os likes no backend
  useEffect(() => {
    const saveLikesData = async () => {
      if (!token) return;

      try {
        await saveLikes(dataLike);
      } catch (error) {
        console.error("Erro ao salvar likes no banco:", error);
      }
    };

    if (dataLike.length > 0) saveLikesData();
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
