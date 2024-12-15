import { FaChevronDown } from "react-icons/fa";

function Button({onClick}) {
  return (
    <button onClick={onClick} className="flex justify-center aline-center mt-8 h-4 w-8 mx-auto text-gray-600 border-solid ">
      <FaChevronDown className="text-2xl font-medium hover:text-3xl active:text-gray-800" />
    </button>
  );
}
export default Button;
