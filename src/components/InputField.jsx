import React from "react";

const InputField = ({ field, value, onChange, error, className }) => {
  return (
    <div className={className}>
      <div className="relative">
        {field.type === "textarea" ? (
          <textarea
            name={field.name}
            value={value}
            onChange={onChange}
            placeholder=" "
            rows={4}
            className="peer w-full px-4 py-3 lg:py-5 border border-gray-500 rounded-lg"
          />
        ) : (
          <input
            type={field.type}
            name={field.name}
            value={value}
            onChange={onChange}
            placeholder=" "
            className="peer w-full px-4 py-3 lg:py-5 border md:text-lg lg:text-xl border-gray-500 rounded-lg"
          />
        )}

        <label
          className="absolute left-4 top-3 text-gray-500 transition-all
          peer-placeholder-shown:top-3 peer-placeholder-shown:text-base lg:peer-placeholder-shown:text-lg
          peer-focus:-top-2.5  peer-focus:text-sm lg:peer-focus:text-lg peer-focus:bg-white peer-focus:px-1
          peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1"
        >
          {field.label}
        </label>
      </div>

      {error && <p className="text-red-500 text-sm mt-1 ml-1">{error}</p>}
    </div>
  );
};

export default InputField;
