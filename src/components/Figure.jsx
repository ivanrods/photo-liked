import { FaHeart } from "react-icons/fa";

function Figure({ onClick, src, alt, description, like, mod, onLike }) {
  return (
    <div
      className={`bg-white ${
        mod
          ? "flex flex-col justify-center max-w-[90%] max-h-[90%] md:max-w-[90%] md:max-h-[80%] lg:max-w-[70%] lg:max-h-[80%] "
          : "w-full h-80 overflow-hidden rounded-lg"
      }`}
    >
      <div
        onClick={onClick}
        className={`w-full ${
          mod
            ? "h-full flex flex-col justify-center items-center"
            : "h-56 object-cover overflow-hidden"
        }`}
      >
        <img
          className={`${
            mod
              ? "max-w-full max-h-full"
              : "w-full hover:scale-105 duration-300"
          }`}
          src={src}
          alt={alt}
        />
      </div>

      <article className={"px-6 py-4 bg-white"}>
        <p
          className={` font-sans font-medium mb-2${
            mod ? "w-full" : "overflow-hidden truncate h-7"
          }`}
        >
          {description}
        </p>
        <div className="flex items-center justify-between mt-2">
          <span className="bg-gray-200 px-2 rounded-md">Photo</span>
          <FaHeart
            onClick={onLike}
            className={`text-xl ${like ? "text-gray-600" : "text-gray-300"}`}
          />
        </div>
      </article>
    </div>
  );
}
export default Figure;
