import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';

import AuthService from '../../../services/AuthService';
import Navbar from '../../../components/NavigationBar';
import { PropTypes } from 'prop-types';

const StudentRoute = ({ component: Component, ...rest }) => {
  return (
    <Fragment>
      {/* Navigation Bar */}
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

StudentRoute.propTypes = {
  component: PropTypes.any,
  name: PropTypes.string,
  location: PropTypes.any,
};


export default StudentRoute;
