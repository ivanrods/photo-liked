import Profile from "../pages/Profile";
import Home from "../pages/Home";
import Search from "../pages/Search";
import Liked from "../pages/Liked";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

function AppRoutes() {
  return (
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
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default AppRoutes;
