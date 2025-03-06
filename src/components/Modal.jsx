import { IoClose } from "react-icons/io5";

import Figure from "./Figure";

function Modal({ onClick, src, alt, mod, description, like, onLike }) {
  mod = true;

  return (
    <div
      className=" fixed top-0 left-0 flex justify-center items-center w-screen h-screen 
    justify-items-center bg-black/90 box-border z-20"
    >
      <IoClose
        onClick={onClick}
        className="fixed top-4 left-4 text-white text-4xl cursor-pointer"
      />
      <Figure
        src={src}
        alt={alt}
        mod={mod}
        description={description}
        like={like}
        onLike={onLike}
      />
    </div>
  );
}

export default Modal;
