import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { AiOutlineWechat } from "react-icons/ai";
import { Stack } from "@mui/material";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { AuthContext } from "../context/Auth";
import { useHistory } from "react-router-dom";
const Navbar = () => {
  const history = useHistory();
  const user = useContext(AuthContext);
  // console.log(user);
  const handleSignout = async () => {
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      isOnline: false,
    });
    await signOut(auth);
    history.replace("/login");
  };
  return (
    <>
      <nav className="flex items-center justify-between p-5 border-4 h-16">
        <Stack direction="row" spacing={2}>
          <Link to="/" className="text-5xl">
            <AiOutlineWechat />
          </Link>
          <h2 className="text-4xl font-semibold">Talkify</h2>
        </Stack>
        <div className="p-4 space-x-2">
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
                <Button>Profile</Button>
              </Link>
              <Button onClick={handleSignout}>Logout</Button>
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
