import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import PrivateRoute from "../Components/PrivateRoute";
const AppContainer = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <PrivateRoute exact path="/home" component={Home} />
        <PrivateRoute exact path="/profile" component={Profile} />
      </Switch>
    </>
  );
};

export default AppContainer;
