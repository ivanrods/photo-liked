import { FaHeart } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
function Modal({ onClick }) {
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
          <img
            className="w-full max-h-full "
            src="https://cdn.pixabay.com/photo/2024/03/03/20/44/cat-8611246_1280.jpg"
          />

          <article className="px-6 py-4 bg-white w-full">
            <p className="font-medium mb-2  ">
              Fachada, Construção, Arquitetura.
            </p>
            <div className="flex items-center justify-between">
              <span className="bg-gray-100 px-2 pb-1 rounded-md">Tag</span>
              <FaHeart className="text-gray-300 text-xl" />
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

export default Modal;
