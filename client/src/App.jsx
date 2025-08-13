import Footer from "./components/Footer";
import Header from "./components/Header";
import { Toaster } from "sonner";

import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <AppRoutes />

      <Footer />
      <Toaster position="top-right" richColors />
    </BrowserRouter>
  );
}

export default App;
