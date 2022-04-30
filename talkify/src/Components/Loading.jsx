import React from "react";
import {BiLoaderAlt} from "react-icons/bi"
const Loading = () => {
  return (
      <h1 className=" h-screen flex text-4xl justify-center items-center ">
        <BiLoaderAlt className = "h-16 w-16 animate-spin"/>
      </h1>
  );
};

export default Loading;
