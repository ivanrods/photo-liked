function InputForm({ placeholder, type, label, id, onChange, value }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id}>{label}</label>
      <input
        className="border-solid border-2 border-gray-300 px-2 py-1 mb-2 rounded-md"
        placeholder={placeholder}
        onChange={onChange}
        type={type}
        id={id}
        name={id}
        value={value}
      />
    </div>
  );
}
export default InputForm;
