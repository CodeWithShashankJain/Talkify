import "./App.css";
import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
// import Home from "./pages/Home";
// import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
// import Profile from "./pages/Profile";
// import Navbar from "./Components/Navbar";
import AuthProvider from "./context/Auth";
import PrivateRoute from "./Components/PrivateRoute";
import AuthContainer from "./pages/Auth/AuthContainer";
import AppContainer from "./pages/AppContainer";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path={["/register", "/login"]}
              component={AuthContainer}
            />
            <Route path="/" exact>
              <Redirect to="/login" />
            </Route>
            <PrivateRoute
              exact
              path={["/home", "/profile"]}
              component={AppContainer}
            />
            <Route path="/404" exact component={NotFoundPage} />
            <Redirect to="/404" />
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
