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
            className="peer w-full px-4 py-4 border border-gray-300 rounded-xl outline-none focus:border-black transition-colors resize-none"
          />
        ) : (
          <input
            type={field.type}
            name={field.name}
            value={value}
            onChange={onChange}
            placeholder=" "
            className="peer w-full px-4 py-4 md:text-lg border border-gray-300 rounded-xl outline-none focus:border-black transition-colors"
          />
        )}

        <label
          className="absolute left-3 top-4 px-1 text-gray-500 transition-all duration-200 pointer-events-none
          bg-white
          /* Placeholder state */
          peer-placeholder-shown:top-4 peer-placeholder-shown:text-base 
          /* Focused/Filled state */
          peer-focus:-top-2.5 peer-focus:text-xs 
          peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-xs"
        >
          {field.label}
        </label>
      </div>

      {error && <p className="text-red-500 text-xs mt-1 ml-2 font-medium">{error}</p>}
    </div>
  );
};

export default InputField;