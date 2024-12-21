import { FaCamera, FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import Input from "./Input";
import { useNavigate, NavLink } from "react-router-dom";
import { useState } from "react";
function Header() {
  const [showSearch, setShowSearch] = useState(true);

  const navigate = useNavigate();

  function toggleSearch() {
    setShowSearch(!showSearch);
  }

  const verificarTecla = (evento) => {
    if (evento.key === "Enter") {
      navigate("/search");
    }
  };

  return (
    <header className="w-full fixed bg-white px-4">
      <div className="max-w-screen-xl mx-auto flex justify-center gap-8 py-4 items-center">
        {showSearch && (
          <div className="flex justify-center items-center gap-8">
            <FaCamera className="text-3xl text-gray-600" />
            <p className="text-xl font-bold text-gray-600 cursor-pointer">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-gray-800 font-semibold border-b-2 border-text-gray-800"
                    : "text-gray-600 hover:text-gray-800"
                }
                to="/"
              >
                Home
              </NavLink>
            </p>
            <p className="text-xl font-bold text-gray-600 cursor-pointer">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-gray-800 font-semibold border-b-2 border-text-gray-800"
                    : "text-gray-600 hover:text-gray-800"
                }
                to="/galeria"
              >
                Galeria
              </NavLink>
            </p>

            <FaSearch
              onClick={toggleSearch}
              className="md:hidden text-xl font-bold text-gray-600 cursor-pointer"
            />
          </div>
        )}

        <Input
          showSearch={showSearch}
          onClick={toggleSearch}
          onKeyPress={verificarTecla}
        />

        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-gray-800 font-semibold border-b-2 border-text-gray-800"
              : "text-gray-600 hover:text-gray-800"
          }
          to="/signIn"
        >
          <CgProfile className="text-3xl" />
        </NavLink>
      </div>
    </header>
  );
}
export default Header;
