import React from 'react';
import { Switch, withRouter } from 'react-router-dom';

// Middleware Route Components
import StudentRoute from './middleware/StudentRoute';

// Student Components
import Home from '../pages/student/main/Home';
import Dashboard from '../pages/student/main/Dashboard';

const Routes = () => {
  return (
    <Switch>
      {/* ADMIN ROUTES */}

      {/* STUDENT ROUTES */}
      <StudentRoute path="/" exact component={Home}></StudentRoute>
      <StudentRoute path="/dashboard" exact component={Dashboard}></StudentRoute>

      {/* ERROR ROUTES */}
    </Switch>
  );
};

export default withRouter(Routes);
