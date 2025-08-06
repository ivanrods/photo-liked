import { createContext, useState, useEffect } from "react";
import { saveLikes } from "../api/auth";
// eslint-disable-next-line react-refresh/only-export-components
export const DataContext = createContext();

function DataProvider({ children }) {
  const [dataLike, setDataLike] = useState(() => {
    const savedData = localStorage.getItem("like");
    return savedData ? JSON.parse(savedData) : [];
  });

  useEffect(() => {
    const saveLikesData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          await saveLikes(dataLike);
        } catch (error) {
          console.error("Erro ao salvar likes no banco:", error);
          // Se der erro, salva localmente como fallback
          localStorage.setItem("like", JSON.stringify(dataLike));
        }
      } else {
        if (dataLike.length >= 0) {
          localStorage.setItem("like", JSON.stringify(dataLike));
        }
      }
    };
    saveLikesData();
  }, [dataLike]);

  const [search, setSearch] = useState("");
  const [loadMoreFig, setLoadMoreFig] = useState(12);
  const [loadFigures, setLoadFigures] = useState([]);
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
