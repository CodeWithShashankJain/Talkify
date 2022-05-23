import React from "react";
import Img from "../default.png";
const User = ({ user, selectUser }) => {
  return (
    //   user wrapper
    <div
      className="mb-4 p-3 h-16  mr-1 cursor-pointer"
      onClick={() => selectUser(user)}
    >
      {/* usr info */}
      <div className="flex justify-between items-center">
        {/* detail */}
        <div className="flex items-center space-x-2">
          <img
            src={user.avatar || Img}
            className="h-10 w-10 rounded-full"
          ></img>
          <h4>{user.name}</h4>
        </div>
        {/* status */}
        <div
          className={
            user.isOnline
              ? "bg-green-500 w-2 h-2 rounded-full"
              : "bg-red-600 w-2 h-2 rounded-full"
          }
        ></div>
      </div>
    </div>
  );
};

export default User;
