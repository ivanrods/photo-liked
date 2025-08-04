import Footer from "./components/Footer";
import Header from "./components/Header";

import DataProvider from "./context/DataProvider";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <DataProvider>
        <Header />
        <AppRoutes />
      </DataProvider>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
