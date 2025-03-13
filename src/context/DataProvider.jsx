import { createContext, useState, useEffect } from "react";
export const DataContext = createContext();

function DataProvider({ children }) {

  const [dataLike, setDataLike] = useState(() => {
    const savedData = localStorage.getItem("like");
    return savedData ? JSON.parse(savedData) : []; // Verificação extra para evitar erro
  });

  useEffect(() => {
    if (dataLike.length > 0) {
      localStorage.setItem("like", JSON.stringify(dataLike));
    }
  }, [dataLike]);

  const [search, setSearch] = useState("");
  const [loadMoreFig, setLoadMoreFig] = useState(12);
  return (
    <DataContext.Provider
      value={{
        dataLike,
        setDataLike,
        search,
        setSearch,
        loadMoreFig,
        setLoadMoreFig,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
export default DataProvider;
