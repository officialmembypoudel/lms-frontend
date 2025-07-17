import React from "react";

const Loader = ({ fullscreen = true }) => {
  return (
    <div
      className={`${
        fullscreen ? "h-[100vh]" : ""
      } flex justify-center items-center gap-2`}
    >
      <div
        style={{ animationDelay: "200ms" }}
        className="animate-bounce p-4 w-4 h-4 bg-gray-800 rounded-full"
      ></div>
      <div
        style={{ animationDelay: "300ms" }}
        className="animate-bounce p-4 w-4 h-4 bg-gray-800 rounded-full"
      ></div>
      <div
        style={{ animationDelay: "500ms" }}
        className="animate-bounce p-4 w-4 h-4 bg-gray-800 rounded-full"
      ></div>
    </div>
  );
};

export default Loader;
