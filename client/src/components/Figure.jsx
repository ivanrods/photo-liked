import { FaHeart } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import { FaDownload } from "react-icons/fa6";

function Figure({ onClick, src, alt, description, like, mod, onLike }) {
  const imgRef = useRef(null);
  const [imgWidth, setImgWidth] = useState(null);

  useEffect(() => {
    if (imgRef.current && mod) {
      const handleLoad = () => {
        setImgWidth(imgRef.current.offsetWidth);
      };

      const imgEl = imgRef.current;
      imgEl.addEventListener("load", handleLoad);

      if (imgEl.complete) handleLoad();

      return () => {
        imgEl.removeEventListener("load", handleLoad);
      };
    }
  }, [mod]);

  return (
    <div
      className={`bg-white ${
        mod
          ? "flex flex-col justify-center max-w-[90%] max-h-[90%] md:max-w-[90%] md:max-h-[90%] lg:max-w-[70%] lg:max-h-[90%] "
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
          ref={imgRef}
          className={`${
            mod
              ? "max-w-full max-h-full"
              : "w-full hover:scale-105 duration-300"
          }`}
          src={src}
          alt={alt}
        />
      </div>

      <article
        className={"px-6 py-4 bg-white"}
        style={mod && imgWidth ? { width: imgWidth } : {}}
      >
        <p
          className={` font-sans font-medium mb-2 break-words ${
            mod ? "w-full" : "overflow-hidden truncate h-7"
          }`}
        >
          {description}
        </p>
        <div className="flex items-center justify-between mt-2">
          <span className="bg-gray-200 px-2 rounded-md">Photo</span>
          <div className="flex gap-4 justify-center items-center">
            {mod && (
              <FaDownload
                onClick={async () => {
                  try {
                    const response = await fetch(src, { mode: "cors" });
                    if (!response.ok) throw new Error("Erro ao baixar imagem");

                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);

                    const link = document.createElement("a");
                    link.href = url;
                    link.download = alt
                      ? alt.replace(/\s+/g, "_") + ".jpg"
                      : "image.jpg";

                    document.body.appendChild(link);
                    link.click();

                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url);
                  } catch (error) {
                    alert("Falha ao baixar a imagem");
                    console.error(error);
                  }
                }}
                className="text-gray-600 text-xl"
              />
            )}
            <FaHeart
              onClick={onLike}
              className={`text-xl ${
                like ? "text-gray-600" : "text-gray-300"
              } cursor-pointer`}
            />
          </div>
        </div>
      </article>
    </div>
  );
}
export default Figure;
