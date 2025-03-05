import { createContext, useState } from "react";
export const DataContext = createContext();

function DataProvider({ children }) {
  const [dataLike, setDataLike] = useState("Valor init");
  const [search, setSearch] = useState('a')
  return (
    <DataContext.Provider value={{ dataLike, setDataLike, search, setSearch }}>
      {children}
    </DataContext.Provider>
  ); 
}
export default DataProvider;
