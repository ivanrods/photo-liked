import Footer from "./components/Footer";
import Header from "./components/Header";
import Profile from "./pages/Profile"
import Home from "./pages/Home"
import Search from "./pages/Search";

import Galeria from "./pages/Galeria";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
