function InputForm({ placeholder, type, label, id }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id}>{label}</label>
      <input
        className="border-solid border-2 border-gray-300 px-2 py-1 mb-2 rounded-md"
        placeholder={placeholder}
        type={type}
        id={id}
      />
    </div>
  );
}
export default InputForm;
