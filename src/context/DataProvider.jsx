import { createContext, useState } from "react";
export const DataContext = createContext();

function DataProvider({ children }) {
  const [dataLike, setDataLike] = useState("Valor init");
  const [search, setSearch] = useState('')
  const [loadMoreFig, setLoadMoreFig] = useState(10);
  return (
    <DataContext.Provider value={{ dataLike, setDataLike, search, setSearch, loadMoreFig, setLoadMoreFig }}>
      {children}
    </DataContext.Provider>
  ); 
}
export default DataProvider;
