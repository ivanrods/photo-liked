import Footer from "./components/Footer";
import Header from "./components/Header";

import Profile from "./routes/Profile";
import Home from "./routes/Home";
import Search from "./routes/Search";
import Galeria from "./routes/Galeria";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";
import DataProvider from "./context/DataProvider";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <DataProvider>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/galeria" element={<Galeria />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </DataProvider>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
