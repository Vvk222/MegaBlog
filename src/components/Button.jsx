import React from "react";

function Button({
  children,
  type = "button",
  variant = "primary",
  className = "",
  ...props
}) {
  const base =
    "px-5 py-2.5 rounded-xl font-medium shadow transition active:scale-95";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500",
    secondary:
      "bg-purple-600 text-white hover:bg-purple-700",
    danger:
      "bg-red-500 text-white hover:bg-red-600",
    outline:
      "border border-gray-300 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700",
  };

  return (
    <button
      type={type}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;