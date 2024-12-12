import { FaCamera, FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import Input from "./Input";
import { Link } from "react-router-dom";
function Header() {
  return (
    <header className="w-full fixed bg-white px-4">
      <div className="max-w-screen-xl mx-auto flex justify-center gap-8 py-4 items-center">
        <FaCamera className="text-3xl text-gray-600" />
        <p className="text-xl font-bold text-gray-600 cursor-pointer">
          <Link to="/">Home</Link>
        </p>
        <p className="text-xl font-bold text-gray-600 cursor-pointer">
          <Link to="/galeria">Galeria</Link>
        </p>
        <FaSearch className="md:hidden text-2xl font-bold text-gray-600 cursor-pointer" />

        <Input />
        <Link to="/profile">
        <CgProfile className="text-3xl" />
        </Link>
        
      </div>
    </header>
  );
}
export default Header;
