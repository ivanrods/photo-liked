import { createContext, useState } from "react";
export const DataContext = createContext();

function DataProvider({ children }) {
  const [dataLike, setDataLike] = useState("Valor init");
  return (
    <DataContext.Provider value={{ dataLike, setDataLike }}>
      {children}
    </DataContext.Provider>
  ); 
}
export default DataProvider;
