import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import {AiOutlineWechat} from "react-icons/ai";
const Navbar = () => {
  return (
    <>
      <nav className="flex items-center justify-between p-5 border-4 h-16">
        <h1 className="text-7xl font-semibold ">
          <Link to="/"><AiOutlineWechat/></Link>
        </h1>
        <div className="p-4 space-x-2">
          <Link to="/register">
            <Button>Register</Button>
          </Link>
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        </div>
        
      </nav>
    </>
  );
};

export default Navbar;
