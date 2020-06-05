import * as React from "react";

import { Redirect, Route } from "react-router-dom";

// import { isGranted } from "../../lib/abpUtility";

const ProtectedRoute = ({
  session,
  path,
  component,
  permission,
  render,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (!session || !session.auth_token)
          return (
            <Redirect
              to={{
                pathname: "/user/login",
                state: { from: props.location }
              }}
            />
          );
        // if (permission && !isGranted(permission)) {
        //   return (
        //     <Redirect
        //       to={{
        //         pathname: "/exception?type=401",
        //         state: { from: props.location }
        //       }}
        //     />
        //   );
        // }

        return render(props);
      }}
    />
  );
};

export default ProtectedRoute;
