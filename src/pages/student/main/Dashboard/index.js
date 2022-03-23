import { React, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Card from 'react-bootstrap/Card';
import Recent from './components/Recent';
import CategoryLearned from './components/CategoryLearned';
import FriendsActivities from './components/FriendsActivities';
import DashboardApi from '../../../../api/Dashboard';
import QuizTaken from '../../../../api/QuizTaken';
import style from './index.module.scss';

function Dashboard() {
  const userId = Cookies.get('user_id');

  const [quizzes, setQuizzes] = useState(null);
  const [recentQuizzes, setRecentQuizzes] = useState(null);
  const [categoriesLearned, setCategoriesLearned] = useState(null);

  useEffect(() => {
    DashboardApi.getAll(userId).then(({ data }) => {
      setCategoriesLearned(data.data);
    });

    QuizTaken.getRecentQuizzes().then(({ data }) => {
      setRecentQuizzes(data.recentQuizzesTaken);
      setQuizzes(data.attempts);
    });
  }, []);

  const getAllQuizzesTakenForEveryRecentQuiz = (quiz_id) => {
    const quizzesList = quizzes?.filter((quiz) => quiz.quiz_id === quiz_id);

    return quizzesList;
  };

  const renderDashList = () => {
    return (
      <Card className={style.card}>
        <Card.Header className={style.cardHeader}>
          <p className={style.cardTitle}>Categories Learned</p>
        </Card.Header>
        <Card.Body>
          {categoriesLearned?.length ? (
            categoriesLearned?.map((categoryLearned, idx) => {
              return (
                <CategoryLearned key={idx} categoryLearned={categoryLearned} />
              );
            })
          ) : (
            <div>
              <center>
                <span>No Categories Learned</span>
              </center>
            </div>
          )}
        </Card.Body>
      </Card>
    );
  };

  return (
    <div className="container">
      <div className={style.pageTitle}>Recent</div>
      <div className={style.recentQuizzesContainer}>
        {quizzes &&
          recentQuizzes?.map((recentQuizzes, idx) => {
            return (
              <Recent
                recentQuizzes={recentQuizzes}
                quizzes={getAllQuizzesTakenForEveryRecentQuiz(
                  recentQuizzes.quiz_id
                )}
                key={idx}
              />
            );
          })}
      </div>
      {recentQuizzes?.length === 0 ? (
        <div className={style.noQuizzesTakenMessageContainer}>
          <center>
            <span>No Quizzes Taken Yet</span>
          </center>
        </div>
      ) : (
        ''
      )}
      <div className="d-flex flex-wrap gap-4">
        {renderDashList()}
        <FriendsActivities />
      </div>
    </div>
  );
}

export default Dashboard;
