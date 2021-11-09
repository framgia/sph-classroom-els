import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';

import AuthService from '../../../services/AuthService';
import AuthNavigationBar from '../../../components/AuthNavigationBar';

const AuthRoute = ({ component: Component, name, ...rest }) => {
  return (
    <Fragment>
      {/* Navigation Bar */}
      <AuthNavigationBar />

      {/* Main Component */}
      <Route
        {...rest}
        render={(props) => {
          if (!AuthService.authenticated()) {
            return <Component {...props} />;
          }

          return (
            <Redirect
              to={{
                pathname: '/',
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }}
      ></Route>
    </Fragment>
  );
};

export default AuthRoute;
