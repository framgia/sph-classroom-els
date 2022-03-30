import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import Cookies from 'js-cookie';
import { FaUserEdit } from 'react-icons/fa';
import { BsCardChecklist } from 'react-icons/bs';
import { RiUserAddLine } from 'react-icons/ri';
import QuizResult from '../../quizzes/QuizResult';
import StudentApi from '../../../../api/Student';
import QuizTaken from '../../../../api/QuizTaken';
import DashboardApi from '../../../../api/Dashboard';
import style from './index.module.scss';

const ProfileDetail = () => {
  const loggedInUserId = Cookies.get('user_id');

  const ACTIVITY_TYPE = 'App\\Models\\Quiz';

  const [studentDetails, setStudentDetails] = useState(null);
  const [overallQuizTaken, setOverallQuizTaken] = useState(0);
  const [friendsActivities, setFriendsActivities] = useState(null);
  const [recentActivities, setRecentActivities] = useState(null);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [quizInfo, setQuizInfo] = useState({
    quizTakenID: null,
    category_id: null,
    quiz_id: null,
    title: '',
    questions: null,
    score: null,
    total: null
  });

  useEffect(() => {
    StudentApi.getDetails(loggedInUserId).then(({ data }) => {
      setStudentDetails(data.details);
      setOverallQuizTaken(data.quizzesTaken);
    });

    StudentApi.getRecentActivities(loggedInUserId).then(({ data }) => {
      setRecentActivities(data.data);
    });

    DashboardApi.getFriendsActivities().then(({ data }) => {
      setFriendsActivities(data.data);
    });
  }, []);

  const getQuizInfo = (activityDetail, quizTakenID) => {
    const { questions, category_id, quiz } = activityDetail;

    QuizTaken.getScore(quizTakenID).then(({ data }) => {
      setQuizInfo({
        quizTakenID,
        category_id,
        quiz_id: quiz.id,
        title: quiz.title,
        questions,
        score: data[0].score,
        total: questions.length
      });

      setShowQuizResult(true);
    });
  };

  const activityInfo = (activityDetail, forRecentCard = true) => {
    const { properties, subject_type } = activityDetail;

    return (
      <Fragment>
        {subject_type === ACTIVITY_TYPE ? (
          <BsCardChecklist size="20px" />
        ) : (
          <RiUserAddLine size="20px" />
        )}
        <span className={style.activityDescription}>
          {forRecentCard ? (
            'You'
          ) : (
            <Link
              className={style.activitySubject}
              to={`/students/${properties.followed_id}`}
            >
              {properties.name}
            </Link>
          )}{' '}
          {subject_type === ACTIVITY_TYPE ? (
            <Fragment>
              answered{' '}
              <span
                className={forRecentCard ? style.activitySubject : ''}
                title={properties.quiz.title}
                onClick={() => {
                  if (forRecentCard)
                    getQuizInfo(properties, properties.taken_quiz.id);
                }}
              >
                {properties.quiz.title}
              </span>
            </Fragment>
          ) : (
            <Fragment>
              followed{' '}
              <Link
                className={style.activitySubject}
                to={`/students/${properties.followed_id}`}
              >
                {properties.followed_name}
              </Link>
            </Fragment>
          )}
        </span>
      </Fragment>
    );
  };

  return (
    <div className="container">
      {!showQuizResult ? (
        <Fragment>
          <div className={style.profileHeader}>
            <div className={style.userInfo}>
              <div className={style.infoLabels}>
                {studentDetails?.name}
                <a href="/profile/view">
                  <FaUserEdit size="40px" className={style.editButton} />
                </a>
                <p className={style.infoLabels}>
                  {overallQuizTaken} Total Quizzes Taken
                </p>
                <div className="mt-2 d-flex gap-5">
                  <p className={style.followersLabel}>
                    {studentDetails?.followers_count} Followers
                  </p>
                  <p className={style.followingLabel}>
                    {studentDetails?.followings_count} Following
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={style.activitiesTableContainer}>
            <div>
              <div className={style.cardHeader}>
                <p className="mx-3">Recent Activities</p>
              </div>
              <div className={style.cardBody}>
                {recentActivities?.length > 0 ? (
                  recentActivities?.map((recentActivity, idx) => {
                    return (
                      <div className={style.tableContainer} key={idx}>
                        <h6 className={style.activityInfo}>
                          {activityInfo(recentActivity)}
                        </h6>
                        <div id={style.timestamp}>
                          <Moment fromNow>{recentActivity.created_at}</Moment>{' '}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className={style.noRecentActivitiesMessage}>
                    <span>No Recent Activities</span>
                  </div>
                )}
              </div>
            </div>
            <div>
              <div className={style.cardHeader}>
                <p className="mx-3">Friend’s Activities</p>
              </div>
              <div className={style.cardBody}>
                {friendsActivities?.length > 0 ? (
                  friendsActivities?.map((friendActivity, idx) => {
                    return (
                      <div className={style.tableContainer} key={idx}>
                        <h6 className={style.activityInfo}>
                          {activityInfo(friendActivity, false)}
                        </h6>
                        <div id={style.timestamp}>
                          <Moment fromNow>{friendActivity.created_at}</Moment>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className={style.noRecentActivitiesMessage}>
                    <span>No Recent Activities</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Fragment>
      ) : (
        <QuizResult
          hideQuizResult={() => setShowQuizResult(false)}
          quizTakenID={parseInt(quizInfo.quizTakenID)}
          categoryId={parseInt(quizInfo.category_id)}
          quizId={parseInt(quizInfo.quiz_id)}
          questions={quizInfo.questions}
          title={quizInfo.title}
          score={quizInfo.score}
          total={quizInfo.total}
          forProfile={true}
        />
      )}
    </div>
  );
};

export default ProfileDetail;
