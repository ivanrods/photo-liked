import PhotoAction from "./PhotoAction";

function Figure({ onClick, src, alt, description }) {
  return (
    <div className="w-full h-80 overflow-hidden bg-white rounded-lg">
      <div
        onClick={onClick}
        className="h-56 w-full object-cover overflow-hidden"
      >
        <img
          className="w-full hover:scale-105 duration-300"
          src={src}
          alt={alt}
        />
      </div>

      <article className="px-6 py-4">
        <p className="font-sans font-medium mb-2 overflow-hidden truncate h-7">
          {description}
        </p>
        <PhotoAction />
      </article>
    </div>
  );
}
export default Figure;
