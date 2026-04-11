export default function Button({
  children,
  type = "button",
  bgColor = "bg-blue-500",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`${bgColor} ${textColor} px-4 py-2 rounded-xl hover:opacity-90 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}