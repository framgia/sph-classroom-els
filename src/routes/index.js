import React from 'react';
import { Switch, withRouter } from 'react-router-dom';

// Middleware Route Components
import AdminRoute from './middleware/AdminRoute';
import StudentRoute from './middleware/StudentRoute';
import AuthRoute from './middleware/AuthRoute';

//Admin Components
import AdminLogin from '../pages/admin/main/Login';
import CategoryList from '../pages/admin/categories/CategoryList';

// Student Components
import Login from '../pages/student/main/Login';
import Registration from '../pages/student/main/Registration';
import forgotPassword from '../pages/student/main/PasswordReset';
import NewPassword from '../pages/student/main/NewPassword';
import ProfileDetail from '../pages/student/profile/ProfileDetail';
import Dashboard from '../pages/student/main/Dashboard';
import CategoryList from '../pages/student/categories/CategoryList';
import CategoryDetail from '../pages/student/categories/CategoryDetail';
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
import StudentDetails from '../pages/student/students/StudentDetail';

const Routes = () => {
  return (
    <Switch>
      {/* ADMIN ROUTES */}
      <AuthRoute path="/admin/login" exact component={AdminLogin}></AuthRoute>

      <AdminRoute path="/admin/categories" exact component={CategoryList}></AdminRoute>

      {/* STUDENT ROUTES */}
      <AuthRoute path="/login" exact component={Login}></AuthRoute>
      <AuthRoute path="/registration" exact component={Registration}></AuthRoute>
      <AuthRoute path="/reset-password" exact component={forgotPassword}></AuthRoute>
      <AuthRoute path="/new-password" exact component={NewPassword}></AuthRoute>

      <StudentRoute path="/profile" exact component={ProfileDetail}></StudentRoute>
      <StudentRoute path="/" exact component={Dashboard}></StudentRoute>
      <StudentRoute path="/students" exact component={StudentList}></StudentRoute>
      <StudentRoute path="/learnings" exact component={LearningList}></StudentRoute>
      <StudentRoute path="/categories" exact component={CategoryList}></StudentRoute>
      <StudentRoute path="/categories/:id/sub" exact component={CategoryDetail}></StudentRoute>
      <StudentRoute path="/categories/:id/quizzes" exact component={QuizList}></StudentRoute>
      <StudentRoute path="/categories/:categoryId/quizzes/:quizId/questions" exact component={QuestionList}></StudentRoute>
      <StudentRoute path="/categories/:categoryId/quizzes/:quizId/questions/:questionId/answer" exact component={QuestionAnswer}></StudentRoute>
      <StudentRoute path="/categories/:id/quizzes/:id/results" exact component={QuizResult}></StudentRoute>
      <StudentRoute path="/categories/:id/quizzes/:id/results/:id/answer-result" exact component={QuizAnswerResult}></StudentRoute>
      <StudentRoute path="/profile/change-password" exact component={ChangePassword}></StudentRoute>
      <StudentRoute path="/profile/view" exact component={ProfileView}></StudentRoute>
      <StudentRoute path="/profile/edit" exact component={ProfileEdit}></StudentRoute>
      <StudentRoute path="/students/:id" exact component={StudentDetails}></StudentRoute>

      {/* ERROR ROUTES */}
    </Switch>
  );
};

export default withRouter(Routes);
