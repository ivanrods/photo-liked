import { createContext, useState, useEffect } from "react";
// eslint-disable-next-line react-refresh/only-export-components
export const DataContext = createContext();

function DataProvider({ children }) {

  const [dataLike, setDataLike] = useState(() => {
    const savedData = localStorage.getItem("like");
    return savedData ? JSON.parse(savedData) : []; 
  });

  useEffect(() => {
    if (dataLike.length >= 0) {
      localStorage.setItem("like", JSON.stringify(dataLike));
    }
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
        setLoadFigures
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
export default DataProvider;
