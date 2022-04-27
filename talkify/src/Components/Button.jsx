import React from "react";

const Button = ({ children, theme, className }) => {
  // const themeClasses =
  //   theme === "fill"
  //     ? "bg-secondary-200 text-white hover:bg-secondary-300 border border-secondary-200"
  //     : theme === "outline"
  //     ? "hover:text-white hover:bg-secondary-200 text-secondary-200 border border-secondary-200 "
  //     : "bg-red-500 text-white hover:bg-red-600 border border-red-500 ";
  return (
    <button
      className={
        "rounded-full py-2 px-3 uppercase text-xs font-bold cursor-pointer tracking-wider border border-black bg-white hover:bg-gray-200 " +
        className
      }
    >
      {children}
    </button>
  );
};
// Button.defaultProps = {
//   theme: "fill",
// };
export default Button;
