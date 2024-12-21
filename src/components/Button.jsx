function Button({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex justify-center aline-center mt-8 bg-white mx-auto text-gray-600 border-solid border-2 border-gray-600 px-4 py-2 rounded-3xl"
    >
      Veja mais
    </button>
  );
}
export default Button;
