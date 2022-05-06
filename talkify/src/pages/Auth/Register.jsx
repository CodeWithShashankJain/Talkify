import React, { useState, useEffect } from "react";
import Button from "../../Components/Button";
import { Link } from "react-router-dom";
import { Alert, TextField } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { useHistory } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    error: null,
    loading: false,
  });
  const [emailError, setEmailError] = useState("");
  const [emailErrorVisibility, setEmailErrorVisibility] = useState(false);
  const { name, email, password, error, loading } = data;
  const history = useHistory();
  const handleChange = (event) => {
    setData({ ...data, [event.target.id]: event.target.value });
  };
  const handleError = (code) => {
    switch (code) {
      case "auth/email-already-in-use":
        setEmailError("E-mail already registered Please go on login page ");
        setEmailErrorVisibility(true);
        break;
      case "auth/weak-password":
        setEmailError("Password should be at least 6 characters ");
        setEmailErrorVisibility(true);
        break;
      case "auth/invalid-email":
        setEmailError("invalid email");
        setEmailErrorVisibility(true);
        break;
    }
  };
  useEffect(() => {
    const forms = JSON.parse(localStorage.getItem("user"));
    if (name === "" && email === "" && password === "")
      setData((prev) => ({ ...prev, ...forms }));
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(data));
  }, [name, email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setData({ ...data, error: null, loading: true });
    if (!name || !email || !password) {
      setData({ ...data, error: "All fields are required" });
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // firestore
      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        name,
        email,
        createdAt: Timestamp.fromDate(new Date()),
        isOnline: true,
      });
      setData({
        name: "",
        email: "",
        password: "",
        error: null,
        loading: false,
      });
      history.replace("/home");
      console.log(result.user);
    } catch (err) {
      handleError(err.code);
      console.log(err);
      setData({ ...data, error: err.message, loading: false });
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div
        className="w-3/6 mx-auto my-8 p-4 border
    -4 bg-white rounded-lg shadow-2xl "
      >
        <h1 className="mt-4 font-serif text-4xl font-semibold text-center">
          Talkify
        </h1>
        <p className="mt-4 text-sm font-semibold text-center">
          Join the community to chat with your freinds
        </p>
        <form className="mx-6 mt-4 text-center" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-6 items-center">
            <TextField
              label="Name"
              id="name"
              type="text"
              variant="outlined"
              size="small"
              value={data.name}
              onChange={handleChange}
              required
            />
            <TextField
              label="Email"
              id="email"
              type="email"
              variant="outlined"
              size="small"
              value={data.email}
              onChange={handleChange}
              required
            />
            <TextField
              label="Password"
              id="password"
              variant="outlined"
              type="password"
              size="small"
              value={data.password}
              onChange={handleChange}
              required
            />
          </div>
          {error
            ? emailErrorVisibility && (
                <Alert
                  onClose={() => {
                    setEmailErrorVisibility(false);
                  }}
                  className="absolute left-0 right-0 mx-auto transition duration-1000 ease-in-out w-96 top-10"
                  severity="error"
                >
                  {emailError}
                </Alert>
              )
            : null}
          <p className="mt-3 text-sm font-semibold text-center cursor-pointer">
            Already have an account?{" "}
            <Link to="/login">
              <span className="hover:underline">Login</span>
            </Link>
          </p>
          <Button className="mt-3 block ml-auto w-28" disabled={loading}>
            {loading ? "Creating..." : "Register"}
          </Button>
        </form>
        {/* {emailErrorVisibility && (
        <Alert
          onClose={() => {
            setEmailErrorVisibility(false);
          }}
          
          severity="error"
        >
          {emailError}
        </Alert>
      )} */}
      </div>
    </div>
  );
};

export default Register;
