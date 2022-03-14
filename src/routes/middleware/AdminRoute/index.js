import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';

import AuthService from '../../../services/AuthService';
import Navbar from '../../../components/NavigationSideBar';
import { PropTypes } from 'prop-types';

const AdminRoute = ({ sidebar = true, component: Component, ...rest }) => {
  return (
    <Fragment>
      {/* Navigation Side Bar */}
      {sidebar ? <Navbar /> : ''}

      {/* Main Component */}
      <Route
        {...rest}
        render={(props) => {
          if (AuthService.authenticated() && AuthService.isAdmin()) {
            return <Component {...props} />;
          }

          return (
            <Redirect
              to={{
                pathname: AuthService.isAdmin() ? '/admin/login' : '/login',
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

AdminRoute.propTypes = {
  component: PropTypes.any,
  name: PropTypes.string,
  location: PropTypes.any,
  sidebar: PropTypes.bool
};

export default AdminRoute;
