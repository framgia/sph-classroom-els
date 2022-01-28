import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';

import AuthService from '../../../services/AuthService';
import AuthNavigationBar from '../../../components/AuthNavigationBar';

import { PropTypes } from 'prop-types';

const AuthRoute = ({ component: Component, ...rest }) => {
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
                pathname: AuthService.isAdmin() ? '/admin/categories' : '/',
                state: {
                  from: props.location
                }
              }}
            />
          );
        }}
      ></Route>
    </Fragment>
  );
};

AuthRoute.propTypes = {
  component: PropTypes.any,
  name: PropTypes.string,
  location: PropTypes.any
};

export default AuthRoute;
