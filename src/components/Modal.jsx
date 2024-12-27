import { IoClose } from "react-icons/io5";
import PhotoAction from "./PhotoAction";

function Modal({ onClick, src, alt, description }) {
  return (
    <div
      className=" fixed top-0 left-0 flex justify-center items-center w-screen h-screen 
    justify-items-center bg-black/90 box-border "
    >
      <IoClose
        onClick={onClick}
        className="fixed top-4 left-4 text-white text-4xl cursor-pointer"
      />

      <div className=" flex justify-center items-center h-[70%] max-w-[90%] md:max-w-[70%] lg:max-w-[60%] ">
        <div className="w-full h-full flex flex-col justify-center items-center">
          <img className="w-full max-h-full " src={src} alt={alt} />

          <article className="px-6 py-4 bg-white w-full">
            <p className="font-sans font-medium mb-2  ">{description}</p>
            <PhotoAction />
          </article>
        </div>
      </div>
    </div>
  );
}

export default Modal;
