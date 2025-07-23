import React from "react";

const Card = ({ children, customClass, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`py-8 px-10 bg-gray-200 rounded-lg ${customClass} ${
        onClick ? "cursor-pointer" : ""
      } `}
    >
      {children}
    </div>
  );
};

export default Card;
