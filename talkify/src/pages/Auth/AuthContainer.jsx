import React from "react";
import Login from "./Login";
import Register from "./Register";
import { Switch, Route} from "react-router-dom";
const AuthContainer = () => {
  return (
    <Switch>
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
    </Switch>
  );
};

export default AuthContainer;
