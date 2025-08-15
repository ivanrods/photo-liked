import { FaCamera, FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useNavigate, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [showSearch, setShowSearch] = useState(true);
  const [inputValue, setInputValue] = useState("");

  const navigate = useNavigate();

  //Funçoes de busca de imagem

  const navigateToSearch = () => {
    if (inputValue.trim()) {
      navigate(`/search?query=${encodeURIComponent(inputValue)}`);
      setInputValue("");
    }
  };

  const checkKey = (evento) => {
    if (evento.key === "Enter" && inputValue.trim()) {
      navigateToSearch();
    }
  };

  //Funçoes de mostrar os butões

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowSearch(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
                to="/liked"
              >
                Liked
              </NavLink>
            </p>

            <FaSearch
              onClick={() => setShowSearch(false)}
              className="md:hidden text-xl font-bold text-gray-600 cursor-pointer"
            />
          </div>
        )}

        <div
          className={`flex items-center gap-2 md:flex w-3/4 bg-gray-100 px-4 py-2 rounded-md ${
            showSearch ? "hidden" : "flex"
          }`}
        >
          <IoArrowBackSharp
            className="text-2xl text-gray-600 md:hidden"
            onClick={() => setShowSearch(true)}
          />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={checkKey}
            placeholder="Pesquisar imagens e coleções"
            maxLength={50}
            className="focus:outline-none w-full h-full bg-transparent"
          />
          <FaSearch
            className="text-xl text-gray-600 cursor-pointer"
            onClick={navigateToSearch}
          />
        </div>

        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-gray-800 font-semibold border-b-2 border-text-gray-800"
              : "text-gray-600 hover:text-gray-800"
          }
          to="/profile"
        >
          {user && (
            <img
              src={user.avatar}
              alt="Avatar"
              className="w-8 h-8 rounded-full object-cover mb-1"
            />
          )}
          {!user && <CgProfile className="text-3xl " />}
        </NavLink>
      </div>
    </header>
  );
}
export default Header;
