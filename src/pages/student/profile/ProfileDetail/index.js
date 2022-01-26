import React, { useEffect, useState, props } from 'react';
import style from './index.module.css';
import { FaUserEdit } from 'react-icons/fa';
import { BsPencilSquare } from 'react-icons/bs';
import { BiUser } from 'react-icons/bi';
import { BsCardChecklist } from 'react-icons/bs';
import { RiUserAddLine } from 'react-icons/ri';
import Moment from 'react-moment';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import { Controller } from 'react-hook-form';

import MyVerticallyCenteredModal from 'react-bootstrap/Modal';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import StudentApi from '../../../../api/Student';
import DashboardApi from '../../../../api/Dashboard';
import ProfileEditApi from '../../../../api/ProfileEdit';

const ProfileDetail = () => {
  const loggedInUserId = Cookies.get('user_id');

  const ACTIVITY_TYPE = 'App\\Models\\Quiz';

  const [studentDetails, setStudentDetails] = useState(null);
  const [overallQuizTaken, setOverallQuizTaken] = useState(0);
  const [friendsActivities, setFriendsActivities] = useState(null);
  const [recentActivities, setRecentActivities] = useState(null);
  const [modalShow, setModalShow] = useState(null);
  const { control, handleSubmit } = useForm();
  // const [errors, setErrors] = useState({});

  // const handleOnSubmit = (data) => {
  //   console.log(data);
  // };
  const onChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
  };

  const handleOnSubmit = async ({ image }) => {
    console.log(image[0]);
    try {
      await ProfileEditApi.uploadImage({ image });
    } 
    catch (error) {
      console.log(error.response);
    }
  };

  // const changeHandler = (event) => {
  //   console.log(event.target.files[0]);
  // };

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

  const activitiesIconDisplay = (activityDetail) => {
    return activityDetail === ACTIVITY_TYPE ? (
      <BsCardChecklist size="20px" />
    ) : (
      <RiUserAddLine size="20px" />
    );
  };

  return (
    <center className={style.userProfileContainer}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: '50px',
          paddingLeft: '10%',
          marginBottom: '100px',
        }}
      >
        <div style={{ display: 'flex' }}>
          <div className={style.avatar}>
            <BiUser className={style.biUserPosition} />
            <a onClick={() => setModalShow(true)}>
              <BsPencilSquare
                size="20px"
                style={{
                  marginLeft: '170px',
                  strokeWidth: '0px',
                  marginTop: '5px',
                }}
                className={style.iconcursor}
              />
            </a>
            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </div>

          <div style={{ marginLeft: '40px' }}>
            <div style={{ marginTop: '33px' }} className={style.userInfo}>
              <div className={style.userEditText}>
                <h2 style={{ fontSize: '32px', fontWeight: 'Bold' }}>
                  {studentDetails?.name}
                </h2>
                <a href="/profile/view">
                  <FaUserEdit size="40px" className={style.userEdit} />
                </a>
              </div>
              <h4
                style={{
                  fontSize: '24px',
                  marginBottom: '20px',
                  color: '#48535B',
                }}
              >
                {overallQuizTaken} Total Quizzes Taken
              </h4>
              <div>
                <p className={style.followersText}>
                  {studentDetails?.followers_count} Followers
                </p>
                <p className={style.followingText}>
                  {studentDetails?.followings_count} Following
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={style.activitiesTableContainer}
        style={{ marginTop: '40px' }}
      >
        <div>
          <div className={style.cardHeader}>
            <p style={{ float: 'left', marginLeft: '12px', marginTop: '10px' }}>
              Recent Activities
            </p>
          </div>
          <div className={style.cardBody}>
            {recentActivities?.length > 0 ? (
              recentActivities?.map((recentActivity, idx) => {
                return (
                  <div className={style.tableContainer} key={idx}>
                    <h6 className={style.activityInfo}>
                      {activitiesIconDisplay(recentActivity.subject_type)}
                      <span className={style.activityDescription}>
                        {' '}
                        {recentActivity.description.replace(
                          studentDetails?.name,
                          'You'
                        )}{' '}
                      </span>{' '}
                    </h6>
                    <div id={style.timestamp}>
                      <Moment fromNow>{recentActivity.created_at}</Moment>{' '}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className={style.noQuizzesTakenMessage}>
                <span>No Recent Activities</span>
              </div>
            )}
          </div>
        </div>
        <div>
          <div className={style.cardHeader}>
            <p style={{ float: 'left', marginLeft: '12px', marginTop: '10px' }}>
              Friend’s Activities
            </p>
          </div>
          <div className={style.cardBody}>
            {friendsActivities?.length > 0 ? (
              friendsActivities?.map((friendActivity, idx) => {
                return (
                  <div className={style.tableContainer} key={idx}>
                    <h6 className={style.activityInfo}>
                      {activitiesIconDisplay(friendActivity.subject_type)}
                      <span className={style.activityDescription}>
                        {' '}
                        {friendActivity.description}{' '}
                      </span>{' '}
                    </h6>
                    <div id={style.timestamp}>
                      <Moment fromNow>{friendActivity.created_at}</Moment>{' '}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className={style.noQuizzesTakenMessage}>
                <span>No Recent Activities</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal
        {...props}
        size="50"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={modalShow}
        onHide={() => {
          setModalShow(false);
        }}
      >
        <Modal.Header closeButton className={style.header}>
          <Modal.Title id="contained-modal-title-vcenter">
            Upload Your Profile
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(handleOnSubmit)} onChange={onChange}>
          <Form.Group className="mb-none" controlId="formBasicEmail">
            {/* {''}
            <input type='file' name='image'  ref={control} accept='image/png, image/jpeg'  className={style.modalform}  onChange={onChange}/> */}
            <Controller
              control={control}
              name="image"
              defaultValue=""
              render={({ field }) => (
                <Form.Control
                  // value={value}
                  onChange={(e) => { field.onChange(e.target.files); }}
                  // ref={ref}
                  className="cntrs"
                  type="file"
                  isInvalid=""
                  accept="image/png, image/jpeg"
                  required
                  maxLength={1000}
                />
              )}
            />
            <Modal.Footer>
              <Button id={style.Btncolor} type="submit">
                <p style={{ fontSize: '14px' }}>Upload</p>
              </Button>
            </Modal.Footer>
          </Form.Group>
        </Form>
      </Modal>
    </center>
  );
};

export default ProfileDetail;
