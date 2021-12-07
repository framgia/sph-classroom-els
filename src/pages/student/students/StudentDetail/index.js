import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import style from './index.module.css';
import { BiUser } from 'react-icons/bi';
import Button from '@restart/ui/esm/Button';
import Moment from 'react-moment';

import StudentApi from '../../../../api/Student';
import QuizTaken from '../../../../api/QuizTaken';

const StudentDetail = () => {
  const { id } = useParams('id');
  const [studentDetails, setStudentDetails] = useState(null);
  const [overallQuizTaken, setOverallQuizTaken] = useState(0);
  const [quizzesTaken, setQuizzesTaken] = useState(null);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    StudentApi.getDetails(id).then(({ data }) => {
      setStudentDetails(data.details);
      setOverallQuizTaken(data.quizzesTaken);
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
          className={style.Buttonstyle}
          variant='success'
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
          className={style.Buttonstyle}
          variant='success'
          onClick={() => {
            onFollowClick(userid);
          }}
        >
          Follow
        </Button>
      );
    }
  };

  return (
    <center className={style.studentDetailContainer}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: '100px',
          paddingLeft: '10%',
          marginBottom: '100px'
        }}
      >
        <div style={{ display: 'flex' }}>
          <div className={style.profile_01}>
            <BiUser className={style.biuserposition} />
          </div>

          <div style={{ marginLeft: '40px' }}>
            <div className={style.studentdetailsposition}>
              <div className={style.userEditText}>{studentDetails?.name}</div>
              <div className={style.totalquizzestakenstyle}>
                {overallQuizTaken} Total Quizzes Taken
              </div>
              <div className={style.followone}>
                {studentDetails?.followers_count} Followers
              </div>
              <div className={style.follow}>
                {studentDetails?.followings_count} Following
              </div>
            </div>
          </div>
        </div>
        <div className={style.buttonDivstyle}>
          {displayFollowUnfollowButton(
            studentDetails?.has_followed,
            studentDetails?.id
          )}
        </div>
      </div>
      <div className={style.bg2} style={{ marginTop: '40px' }}>
        <div>
          <div className={style.cal1}>
            <p style={{ float: 'left', marginLeft: '12px', marginTop: '10px' }}>
              Quizzes
            </p>
          </div>
          <div className={`${style.cal_02} ${style.cal_3}`}>
            {quizzesTaken?.length > 0 ? (
              quizzesTaken?.map((quizTaken, idx) => {
                return (
                  <div key={idx} className={style.quizContainer}>
                    <h6 className={style.quizInfo}>
                      <img
                        src='https://scontent.xx.fbcdn.net/v/t1.15752-9/cp0/258753595_1042531349877078_5285897742986927636_n.png?_nc_cat=107&ccb=1-5&_nc_sid=aee45a&_nc_eui2=AeG6ET7IUKZQ5FgOtWNcOnr0viTzQX3Fx---JPNBfcXH70y4ar8c4Wkjc7RYv6FaFSWU8dG7Ohov_UfvPthlxxln&_nc_ohc=Pv4nXOm1yrgAX_rTLc4&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=f3ca0a1461f5a71ef4638df807e84a88&oe=61BE3C6F'
                        alt='add user'
                        width='20px'
                        height='20px'
                      />
                      <span className={style.margineforspan}>
                        {' '}
                        Answered {quizTaken.title} Quiz{' '}
                      </span>{' '}
                    </h6>
                    <div id={style.floatrighttext}>
                      <Moment fromNow>{quizTaken.created_at}</Moment>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className={style.noQuizzesTakenMessage}>
                <span>No Quizzes Taken</span>
              </div>
            )}
          </div>
        </div>
        <div>
          <div className={style.cal1}>
            <p style={{ float: 'left', marginLeft: '12px', marginTop: '10px' }}>
              Activities
            </p>
          </div>
          <div className={`${style.cal_02} ${style.cal_3}`}>
            {/* <div>
              <h6 className={style.s_h3}>
                <RiUserAddLine size='20px' />
                <span className={style.margineforspan}>
                  {' '}
                  Followed John Doe{' '}
                </span>{' '}
              </h6>
              <div id={style.floatrighttext}>1 minutes ago </div>
            </div> */}
          </div>
        </div>
      </div>
    </center>
  );
};

export default StudentDetail;
