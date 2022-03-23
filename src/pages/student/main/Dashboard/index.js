import { React, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { BiBookAlt } from 'react-icons/bi';
import Card from 'react-bootstrap/Card';
import Recent from './components/Recent';
import FriendsActivities from './components/FriendsActivities';
import DashboardApi from '../../../../api/Dashboard';
import QuizTaken from '../../../../api/QuizTaken';
import style from './index.module.scss';
import DataTable from '../../../../components/DataTable';

function Dashboard() {
  const userId = Cookies.get('user_id');

  const [quizzes, setQuizzes] = useState(null);
  const [recentQuizzes, setRecentQuizzes] = useState(null);
  const [categoriesLearned, setCategoriesLearned] = useState(null);
  const [sortOptions, setSortOptions] = useState({});

  const tableHeaderNames = [];

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

  const renderTableData = () => {
    return categoriesLearned?.map((categorylearned, idx) => {
      return (
        <tr key={idx}>
          <td className={style.listTable}>
            <BiBookAlt size="20px" style={{ margin: '0px 17px 5px 0px' }} />
            {categorylearned.name}
          </td>
          <td className={style.listTable}>
            {categorylearned.quizzes.length} out of{' '}
            {categorylearned.quizzes_count} Quizzes Taken
          </td>
        </tr>
      );
    });
  };

  const renderDashList = () => {
    return (
      <Card className={style.card}>
        <Card.Header className={style.cardHeader}>
          <p className={style.cardTitle}>Categories Learned</p>
        </Card.Header>
        <Card.Body>
          <DataTable
            data={categoriesLearned}
            tableHeaderNames={tableHeaderNames}
            renderTableData={renderTableData}
            sortOptions={sortOptions}
            setSortOptions={setSortOptions}
            headerStyle={false}
            onSpinner={false}
          />
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
