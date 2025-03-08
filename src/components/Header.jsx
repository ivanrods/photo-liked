import { FaCamera, FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import Input from "./Input";
import { useNavigate, NavLink } from "react-router-dom";
import { useState, useContext } from "react";
import { DataContext } from "../context/DataProvider";

function Header() {
  const { setSearch } = useContext(DataContext);
  const { setLoadMoreFig } = useContext(DataContext);
  const [showSearch, setShowSearch] = useState(true);
  const [inputValue, setInputValue] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const value = event.target.value.trim();
    if (value) {
      setInputValue(value);
    }
  };
  
  const verificarTecla = (evento) => { 
    const value = evento.target.value.trim();
    if (evento.key === "Enter" && value) {
       window.scrollTo({ top: 0, behavior: "smooth" });
      setLoadMoreFig(9)
      setSearch(inputValue);
      navigate("/search");
     
    }
  };

  function toggleSearch() {
    setShowSearch(!showSearch);
  }

  
  return (
    <header className="w-full fixed bg-white px-4 z-10">
      <div className="max-w-screen-xl mx-auto flex justify-center gap-8 h-16 items-center">
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
          onChange={handleInputChange}
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
