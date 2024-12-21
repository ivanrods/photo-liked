import { IoArrowBackSharp } from "react-icons/io5";
function Input({ showSearch, onClick, onKeyPress }) {
  return (
    <div
      className={`flex items-center gap-2  md:flex w-3/4 bg-gray-100 px-4 py-2 rounded-md " ${
        showSearch ? "hidden" : "flex"
      }`}
    >
      <IoArrowBackSharp
        className="text-2xl text-gray-600 md:hidden"
        onClick={onClick}
      />
      <input
        onKeyPress={onKeyPress}
        className="focus:outline-none w-full h-full bg-transparent"
        type="text"
        placeholder="Pesquisar por imagens e coleções"
      />
    </div>
  );
}
export default Input;
