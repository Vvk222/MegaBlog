import React from "react";

function Logo({ width = "100px" }) {
  return (
    <img
      src="/src/assets/Transparent-Logo.png"
      alt="Logo"
      className="object-contain"
      style={{ width }}
    />
  );
}

export default Logo;