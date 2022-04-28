import React from "react";
import Button from "../../Components/Button";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";

const Register = () => {
  return (
    <div
      className="w-3/6 mx-auto my-8 p-4 border
    -4 bg-white rounded-lg shadow-lg"
    >
      <h1 className="mt-4 font-serif text-4xl font-semibold text-center">
        Talkify
      </h1>
      <p className="mt-4 text-sm font-semibold text-center">
        Join the community to chat with your freinds
      </p>
      <form //onSubmit={handleSubmit(onSubmit)}
        className="mx-6 mt-4 text-center"
      >
        <div className="flex flex-col space-y-6 items-center">
          {/* <input
            type="text"
            name="name"
            placeholder="Enter The Username" 
            className="border-2 rounded-md text-center"
          ></input> */}
          <TextField label="Name" variant="outlined" required />
          <TextField label="Email" variant="outlined" required />
          <TextField label="Password" variant="outlined" required />
          <input label="Confirm Password" />
          {/* <input
            type="text"
            name="email"
            placeholder="Enter The Email"
            className="border-2 rounded-md text-center "
          ></input>

          <input
            type="password"
            name="password"
            placeholder="Enter The Password"
            className="border-2 rounded-md text-center "
          ></input> */}
        </div>

        <p className="mt-3 text-sm font-semibold text-center cursor-pointer">
          Already have an account?{" "}
          <Link to="/login">
            <span className="hover:underline">Login</span>
          </Link>
        </p>
        <Button className="mt-3 block ml-auto w-28">Register</Button>
      </form>
    </div>
  );
};

export default Register;
