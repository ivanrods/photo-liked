function Submit({ value, onClick, type }) {
  return (
    <button
      onClick={onClick}
      type={type}
      className="w-full max-w-2xl mx-auto bg-gray-600 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-gray-800 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
    >
      {value}
    </button>
  );
}
export default Submit;
