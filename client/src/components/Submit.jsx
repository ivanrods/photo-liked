function Submit({ value, onClick, type }) {
  return (
    <button
      onClick={onClick}
      type={type}
      className="w-full max-w-2xl mx-auto bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
    >
      {value}
    </button>
  );
}
export default Submit;
