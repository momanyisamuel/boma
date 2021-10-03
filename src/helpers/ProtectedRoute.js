import React from "react";
import { Route, Redirect } from "react-router-dom";
import { authService } from "./auth";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        const currentUser = authService.currentUserValue;
        if (!currentUser) {
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
