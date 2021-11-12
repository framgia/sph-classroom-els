import React from 'react';
import {
  Switch,
  withRouter,
  // Route
} from 'react-router-dom';

// Middleware Route Components
import StudentRoute from './middleware/StudentRoute';
import AuthRoute from './middleware/AuthRoute';

// Student Components
import Login from '../pages/student/main/Login';
import Registration from '../pages/student/main/Registration';
import forgotPassword from '../pages/student/main/PasswordReset';
import NewPassword from '../pages/student/main/NewPassword';
import ProfileDetail from '../pages/student/profile/ProfileDetail';
// import Home from '../pages/student/main/Home';
import Dashboard from '../pages/student/main/Dashboard';
import CategoryList from '../pages/student/categories/CategoryList';
import QuizList from '../pages/student/quizzes/QuizList';
import QuestionList from '../pages/student/quizzes/QuestionList';
import QuestionAnswer from '../pages/student/quizzes/QuestionList/QuestionAnswer';
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
      <AuthRoute path="/login" exact component={Login}></AuthRoute>
      <AuthRoute path="/registration" exact component={Registration}></AuthRoute>
      <AuthRoute path="/reset-password" exact component={forgotPassword}></AuthRoute>
      <AuthRoute path="/new-password" exact component={NewPassword}></AuthRoute>
      {/* <StudentRoute path="/" exact component={Home}></StudentRoute> */}
      <StudentRoute path="/profile" exact component={ProfileDetail}></StudentRoute>
      <StudentRoute path="/" exact component={Dashboard}></StudentRoute>
      <StudentRoute path="/students" exact component={StudentList}></StudentRoute>
      <StudentRoute path="/learnings" exact component={LearningList}></StudentRoute>
      <StudentRoute path="/categories" exact component={CategoryList}></StudentRoute>
      <StudentRoute path="/categories/:id/quizzes" exact component={QuizList}></StudentRoute>
      <StudentRoute path="/categories/:id/quizzes/:id/questions" exact component={QuestionList}></StudentRoute>
      <StudentRoute path="/categories/:id/quizzes/:id/questions/:id/answer" exact component={QuestionAnswer}></StudentRoute>
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
