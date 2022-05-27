import React, { useEffect, useState } from "react";
import Img from "../default.png";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";
import { MdNotificationsActive } from "react-icons/md";
const User = ({ user, selectUser, user1, chat }) => {
  const user2 = user?.uid;
  const [data, setData] = useState("");

  useEffect(() => {
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    let unsub = onSnapshot(doc(db, "lastMessage", id), (doc) => {
      setData(doc.data());
    });
    return () => unsub();
  }, []);
  console.log(data)
  return (
    //   user wrapper
    <div
      className={`mb-4 p-2 mx-2 h-auto cursor-pointer ${
        chat.name === user.name && "bg-gray-200 rounded-md  "
      }`}
      onClick={() => selectUser(user)}
    >
      {/* usr info */}
      <div className="flex justify-between items-center">
        {/* detail */}
        <div className="flex items-center  space-x-4">
          <img
            src={user.avatar || Img}
            className="h-10 w-10 rounded-full"
          ></img>
          <h4 className="text-lg ">{user.name}</h4>
          {/* {(data?.from !== user1) && (data?.unread) &&
              (<MdNotificationsActive className="w-6 h-5 bg-blue-100 " />)
          } */}
          {/* {console.log(data?.from)} */}
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
      {data && (
        <p className="text-sm truncate text-right text-gray-500">
          <strong className="mr-2">
            {data.from === user1 ? "Me :" : null}
          </strong>
          {data.text}
        </p>
      )}
    </div>
  );
};

export default User;
