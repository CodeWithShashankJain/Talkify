import React,{useRef,useEffect} from "react";
import Moment from "react-moment";
const Message = ({ msg, user1 }) => {
  const scroll = useRef();
  useEffect(() => {
    scroll.current?.scrollIntoView({ behaviour: "smooth" });
  }, [msg]);
  return (
    <div className={msg.from === user1 ? `mt-3 px-2 py-0 text-right` : `px-2 mt-3`} ref={scroll}>
      <p
        className={
          msg.from === user1
            ? "p-3 inline-block max-w-xs max-h-xs text-left rounded-md bg-blue-400 text-white"
            : "p-3 inline-block max-w-xs text-left rounded-md bg-gray-400 text-white"
        }
      >
        {msg.media ? (
          <img src={msg.media} alt={msg.text} className="w-full rounded" />
        ) : null}
        {msg.text}
        <br />
        <small className="inline-block mt-2 opacity-80">
          <Moment fromNow>{msg.createdAt.toDate()}</Moment>
        </small>
      </p>
    </div>
  );
};

export default Message;
