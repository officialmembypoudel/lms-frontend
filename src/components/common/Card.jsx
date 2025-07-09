import React from "react";

const Card = ({ children, customClass }) => {
  return (
    <div className={"py-8 px-10 bg-gray-200 rounded-lg" + " " + customClass}>
      {children}
    </div>
  );
};

export default Card;
