import Profile from "../pages/Profile";
import Home from "../pages/Home";
import Search from "../pages/Search";
import Liked from "../pages/Liked";
import Login from "../pages/Login";
import Register from "../pages/Register";

import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import ScrollToTop from "../components/ScrollToTop";

function AppRoutes() {
  return (
    <>
      {" "}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/liked" element={<Liked />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
