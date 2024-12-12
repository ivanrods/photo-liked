import { FaHeart } from "react-icons/fa";
function Figure({ onClick }) {
  return (
    <div className="w-full h-80 overflow-hidden bg-white rounded-lg">
      <div
        onClick={onClick}
        className="h-56 w-full object-cover overflow-hidden"
      >
        <img
          className="hover:scale-105 duration-300"
          src="https://cdn.pixabay.com/photo/2024/03/03/20/44/cat-8611246_1280.jpg"
        />
      </div>

      <article className="px-6 py-4">
        <p className="font-medium mb-2">Fachada, Construção, Arquitetura.</p>
        <div className="flex items-center justify-between">
          <span className="bg-gray-100 px-2 pb-1 rounded-md">Tag</span>
          <FaHeart className="text-gray-300 text-xl" />
        </div>
      </article>
    </div>
  );
}
export default Figure;
