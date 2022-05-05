import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineWechat } from "react-icons/ai";
import { Stack } from "@mui/material";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { AuthContext } from "../context/Auth";
import { useHistory } from "react-router-dom";
import { BiLoaderAlt } from "react-icons/bi";
const Navbar = () => {
  const [loader, setLoader] = useState(false);
  const history = useHistory();
  const user = useContext(AuthContext);
  // console.log(user);
  // console.log(loading);
  const handleSignout = async () => {
    setLoader(true);
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      isOnline: false,
    });
    await signOut(auth);
    history.replace("/login");
    setLoader(false);
  };
  return (
    <>
      <nav className="flex items-center justify-between p-5 border-4 h-16">
        <Stack direction="row" spacing={2}>
          <Link to={user ? "/home" : "/"} className="text-5xl">
            <AiOutlineWechat />
          </Link>
          <h2 className="text-4xl font-semibold">Talkify</h2>
        </Stack>
        <div className="p-4 space-x-2 flex">
          {!user ? (
            <>
              <Link to="/register">
                <Button>Register</Button>
              </Link>
              <Link to="/login">
                <Button>Login</Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/profile">
                <FaUserCircle className="w-16 h-9" />
              </Link>
              <Button onClick={handleSignout}>
                {!loader ? (
                  "Logout"
                ) : (
                  <BiLoaderAlt className="h-6 w-6 text-bold animated-spin" />
                )}
              </Button>
            </>
          )}
          {/* <>
              <Link to="/register">
                <Button>Register</Button>
              </Link>
              <Link to="/login">
                <Button>Login</Button>
              </Link>
            </> */}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
