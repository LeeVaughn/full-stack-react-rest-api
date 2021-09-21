import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Consumer } from "./Context";

// destructures and renames the component prop and collects any props that get passed into a ...rest variable
export default ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      { context => (
        <Route
          {...rest}
          render={ props => context.authenticatedUser ? (
            <Component {...props} />
          ) : (
            <Redirect to={{
              pathname: "/signin",
              state: { from: props.location },
            }} />
          )}
        />
      )}
    </Consumer>
  );
};