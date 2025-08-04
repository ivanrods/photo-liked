function Submit({ value, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex justify-center aline-center bg-black text-white py-3 rounded-md cursor-pointer mt-6 w-full 
      max-w-2xl mx-auto"
      type="submit"
     
    >{value}</button>
  );
}
export default Submit;
