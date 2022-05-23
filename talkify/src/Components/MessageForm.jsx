import React, { useRef } from "react";
import { MdAttachment } from "react-icons/md";
import { AiOutlineSend } from "react-icons/ai";
import { TextField } from "@mui/material";

const MessageForm = ({ handleSubmit, text, setText, setImg }) => {
  const inputRef = useRef(null);
  const handleOpenFileInput = () => {
    inputRef.current.click();
  };

  return (
    <form
      className="flex w-full space-x-4 h-10 items-center absolute bottom-0 left-0"
      onSubmit={handleSubmit}
    >
      <label className="cursor-pointer" onClick={handleOpenFileInput}>
        <MdAttachment className="w-7 h-6" />
      </label>
      <input
        ref={inputRef}
        onChange={(e) => setImg(e.target.files[0])}
        type="file"
        accept="image/*"
        className="hidden"
      />
      <div className="">
        <TextField
          label="Enter Your Message"
          type="text"
          variant="outlined"
          size="small"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style = {{width: 700}}
        />
      </div>
      <div>
        <button>
          <AiOutlineSend className="w-7 h-6" />
        </button>
      </div>
    </form>
  );
};

export default MessageForm;
