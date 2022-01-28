import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';

import AuthService from '../../../services/AuthService';
import Navbar from '../../../components/NavigationSideBar';
import { PropTypes } from 'prop-types';

const AdminRoute = ({ component: Component, ...rest }) => {
  return (
    <Fragment>
      {/* Navigation Side Bar */}
      <Navbar />

      {/* Main Component */}
      <Route
        {...rest}
        render={(props) => {
          if (AuthService.authenticated()) {
            return <Component {...props} />;
          }

          return (
            <Redirect
              to={{
                pathname: '/login',
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

AdminRoute.propTypes = {
  component: PropTypes.any,
  name: PropTypes.string,
  location: PropTypes.any,
};

export default AdminRoute;
