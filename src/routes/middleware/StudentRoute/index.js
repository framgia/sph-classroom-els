import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

import Navbar from '../../../components/NavigationBar';

const StudentRoute = ({ component: Component, name, ...rest }) => {
  return (
    <Fragment>
      {/* Navigation Bar */}
      <Navbar />

      {/* Main Component */}
      <Route
        {...rest}
        render={(props) => {
          return <Component {...props} />;
        }}
      ></Route>
    </Fragment>
  );
};

export default StudentRoute;
