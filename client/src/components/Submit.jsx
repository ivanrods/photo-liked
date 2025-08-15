import { FiLoader } from "react-icons/fi";
function Submit({ value, onClick, type, load }) {
  return (
    <button
      onClick={onClick}
      type={type}
      className="w-full mx-auto bg-gray-600 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-gray-800 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
    >
      {!load && value}
      {load && <FiLoader size={20} className="animate-spin mx-auto" />}
    </button>
  );
}
export default Submit;
