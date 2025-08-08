import Footer from "./components/Footer";
import Header from "./components/Header";
import { Toaster } from "sonner";
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
      <Toaster position="top-right" richColors />
    </BrowserRouter>
  );
}

export default App;
