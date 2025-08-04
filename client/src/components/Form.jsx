function Form({ children }) {
  return (
    <form className="w-11/12 md:max-w-xl flex flex-col bg-white px-8 py-8 gap-2 rounded-md ">
      {children}
    </form>
  );
}

export default Form;
