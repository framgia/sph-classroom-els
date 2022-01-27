import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import style from './index.module.css';
import { BiUser } from 'react-icons/bi';
import Button from '@restart/ui/esm/Button';
import Moment from 'react-moment';

import StudentApi from '../../../../api/Student';
import QuizTaken from '../../../../api/QuizTaken';

const StudentDetail = () => {
  const ACTIVITY_TYPE = 'App\\Models\\Quiz';

  const { id } = useParams('id');
  const [studentDetails, setStudentDetails] = useState(null);
  const [overallQuizTaken, setOverallQuizTaken] = useState(0);
  const [quizzesTaken, setQuizzesTaken] = useState(null);
  const [recentActivities, setRecentActivities] = useState(null);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    StudentApi.getDetails(id).then(({ data }) => {
      setStudentDetails(data.details);
      setOverallQuizTaken(data.quizzesTaken);
    });

    StudentApi.getRecentActivities(id).then(({ data }) => {
      setRecentActivities(data.data);
    });

    QuizTaken.getRecent(id).then(({ data }) => {
      setQuizzesTaken(data.data);
    });
  }, [status]);

  const onFollowClick = (userid) => {
    StudentApi.follow(userid).then(() => {
      setStatus(!status);
    });
  };

  const onUnfollowClick = (userid) => {
    StudentApi.unfollow(userid).then(() => {
      setStatus(!status);
    });
  };

  const displayFollowUnfollowButton = (status, userid) => {
    if (status) {
      return (
        <Button
          className={style.followUnfollowButton}
          variant="success"
          onClick={() => {
            onUnfollowClick(userid);
          }}
        >
          Unfollow
        </Button>
      );
    } else {
      return (
        <Button
          className={style.followUnfollowButton}
          variant="success"
          onClick={() => {
            onFollowClick(userid);
          }}
        >
          Follow
        </Button>
      );
    }
  };

  const iconDisplay = (activityDetail) => {
    return (
      <img
        className={style.tableIcon}
        src={
          activityDetail === ACTIVITY_TYPE
            ? 'https://pxl02-scueduau.terminalfour.net/fit-in/800x10000/filters:quality(95)/prod01/channel_1/media/campaigns/evaluation2x.png'
            : 'https://www.toprecursoshumanos.com.br/images/svg-colado-124643x123.svg?crc=3915734253'
        }
        alt="add"
        height="20px"
        width="20px"
      />
    );
  };

  return (
    <center className={style.studentDetailContainer}>
      <div className={style.student}>
        <div className="d-flex">
          <div className={style.profile}>
            <BiUser className={style.biUserPosition} />
          </div>

          <div className={style.studentInfo}>
            <div className={style.studentDetailsPosition}>
              <div className={style.studentName}>{studentDetails?.name}</div>
              <div className={style.totalQuizzesTaken}>
                {overallQuizTaken} Total Quizzes Taken
              </div>
              <div className={style.followersText}>
                {studentDetails?.followers_count} Followers
              </div>
              <div className={style.followingText}>
                {studentDetails?.followings_count} Following
              </div>
            </div>
          </div>
        </div>
        <div className={style.buttonAlignment}>
          {displayFollowUnfollowButton(
            studentDetails?.has_followed,
            studentDetails?.id
          )}
        </div>
      </div>
      <div className={style.activityTables}>
        <div>
          <div className={style.tableHeader}>
            <p className={style.tableTitle}>Quizzes</p>
          </div>
          <div className={style.tableBody}>
            {quizzesTaken?.length > 0 ? (
              quizzesTaken?.map((quizTaken, idx) => {
                return (
                  <div key={idx} className={style.activityInfoAlignment}>
                    <h6 className={style.activityInfo}>
                      <img
                        src="https://pxl02-scueduau.terminalfour.net/fit-in/800x10000/filters:quality(95)/prod01/channel_1/media/campaigns/evaluation2x.png"
                        alt="add user"
                        width="20px"
                        height="20px"
                      />
                      <span className={style.activityDescription}>
                        {' '}
                        Answered {quizTaken.title} Quiz{' '}
                      </span>{' '}
                    </h6>
                    <div id={style.timestamp}>
                      <Moment fromNow>{quizTaken.created_at}</Moment>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className={style.noActivityMessage}>
                <span>No Quizzes Taken</span>
              </div>
            )}
          </div>
        </div>
        <div>
          <div className={style.tableHeader}>
            <p className={style.tableTitle}>Activities</p>
          </div>
          <div className={style.tableBody}>
            {recentActivities?.length > 0 ? (
              recentActivities?.map((recentActivity, idx) => {
                return (
                  <div className={style.activityInfoAlignment} key={idx}>
                    <h6 className={style.activityInfo}>
                      {iconDisplay(recentActivity.subject_type)}
                      <span className={style.activityDescription}>
                        {' '}
                        {recentActivity.description}{' '}
                      </span>{' '}
                    </h6>
                    <div id={style.timestamp}>
                      <Moment fromNow>{recentActivity.created_at}</Moment>{' '}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className={style.noActivityMessage}>
                <span>No Recent Activities</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </center>
  );
};

export default StudentDetail;
