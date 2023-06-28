import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props }) => {
  if (props.loggedIn === true || props.loggedIn === null) {
    return (
      <Route>
        {() =>
          <Component {...props} />
        }
      </Route>
    );
  } else if (props.loggedIn === false) {
    return (
      <Route>
        {() =>
          <Redirect to="/" />
        }
      </Route>
    );
  }
};

export default ProtectedRoute;
