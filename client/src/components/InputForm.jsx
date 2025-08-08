function InputForm({ register, name, label, placeholder, type, errors }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        {...register(name)}
        type={type}
        placeholder={errors[name]?.message || placeholder}
        className={`px-4 py-2 rounded-lg border ${
          errors[name] ? "border-red-500" : "border-gray-300"
        } focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-200 shadow-sm text-gray-800 placeholder-gray-400 mb-4`}
      />
    </div>
  );
}

export default InputForm;
