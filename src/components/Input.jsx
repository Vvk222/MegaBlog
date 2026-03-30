import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1 block">
          {label}
        </label>
      )}

      <input
        id={id}
        type={type}
        ref={ref}
        className={`w-full px-4 py-2 rounded-xl border 
        bg-white dark:bg-gray-800 
        text-gray-800 dark:text-white 
        border-gray-200 dark:border-gray-700
        focus:ring-2 focus:ring-blue-500 outline-none 
        ${className}`}
        {...props}
      />
    </div>
  );
});

export default Input;