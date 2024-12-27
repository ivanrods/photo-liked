import { FaHeart } from "react-icons/fa";
import { useState } from "react";
function PhotoAction() {
  const [like, setLike] = useState(false);

  function toggleLike() {
    setLike(!like);
  }
  return (
    <div className="flex items-center justify-between">
      <span className="bg-gray-200 px-2  rounded-md ">Photo</span>
      <FaHeart
        onClick={toggleLike}
        className={`text-xl ${like ? "text-gray-600" : "text-gray-300"}`}
      />
    </div>
  );
}
export default PhotoAction;
