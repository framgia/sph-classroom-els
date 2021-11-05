import React from 'react';
import { Switch, withRouter, Route } from 'react-router-dom';

// Middleware Route Components
import StudentRoute from './middleware/StudentRoute';

// Student Components
import Login from '../pages/student/main/Login';
import Registration from '../pages/student/main/Registration';
import PasswordReset from '../pages/student/main/PasswordReset';
import NewPassword from '../pages/student/main/NewPassword';
import ProfileDetail from '../pages/student/profile/ProfileDetail';
import Home from '../pages/student/main/Home';
import Dashboard from '../pages/student/main/Dashboard';
import CategoryList from '../pages/student/categories/CategoryList';
import QuizList from '../pages/student/quizzes/QuizList';
import QuestionList from '../pages/student/quizzes/QuestionList';
import QuizResult from '../pages/student/quizzes/QuizResult';
import LearningList from '../pages/student/learnings/LearningList';
import StudentList from '../pages/student/students/StudentList';
import QuizAnswerResult from '../pages/student/quizzes/QuizResult/QuizAnswerResult';
import ChangePassword from '../pages/student/profile/ChangePassword';
 
import ProfileView from '../pages/student/profile/ProfileView';
import ProfileEdit from '../pages/student/profile/EditProfile';

const Routes = () => {
  return (
    <Switch>
      {/* ADMIN ROUTES */}

      {/* STUDENT ROUTES */}
      <Route path="/login" exact component={Login}></Route>
      <Route path="/registration" exact component={Registration}></Route>
      <Route path="/reset-password" exact component={PasswordReset}></Route>
      <Route path="/new-password" exact component={NewPassword}></Route>
      <StudentRoute path="/" exact component={Home}></StudentRoute>
      <StudentRoute path="/profile" exact component={ProfileDetail}></StudentRoute>
      <StudentRoute path="/dashboard" exact component={Dashboard}></StudentRoute>
      <StudentRoute path="/students" exact component={StudentList}></StudentRoute>
      <StudentRoute path="/learnings" exact component={LearningList}></StudentRoute>
      <StudentRoute path="/categories" exact component={CategoryList}></StudentRoute>
      <StudentRoute path="/categories/:id/quizzes" exact component={QuizList}></StudentRoute>
      <StudentRoute path="/categories/:id/quizzes/:id/questions" exact component={QuestionList}></StudentRoute>
      <StudentRoute path="/categories/:id/quizzes/:id/results" exact component={QuizResult}></StudentRoute>
      <StudentRoute path="/categories/:id/quizzes/:id/results/:id/answer-result" exact component={QuizAnswerResult}></StudentRoute>
      <StudentRoute path="/profile/change-password" exact component={ChangePassword}></StudentRoute>

      <StudentRoute path="/profile/view" exact component={ProfileView}></StudentRoute>
      <StudentRoute path="/profile/edit" exact component={ProfileEdit}></StudentRoute>
      

      {/* ERROR ROUTES */}
    </Switch>
  );
};

export default withRouter(Routes);
