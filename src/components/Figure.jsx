import { FaHeart } from "react-icons/fa";
function Figure() {
  return (
    <div className="w-full h-80 overflow-hidden bg-white rounded-lg">
      <div className="h-56 w-full object-cover overflow-hidden">
        <img
          className="hover:scale-105 duration-300"
          src="https://cdn.pixabay.com/photo/2024/01/14/16/30/mountain-range-8508224_640.jpg"
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
