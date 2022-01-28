import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import style from './index.module.css';
import { Card } from 'react-bootstrap';
import { useState } from 'react';
import { useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';

import StudentsApi from '../../../../api/Student';
import Cookies from 'js-cookie';

const ProfileView = () => {
  const [profileName, setprofileName] = useState(null);
  const loggedInUserId = Cookies.get('user_id');

  useEffect(() => {
    StudentsApi.getDetails(loggedInUserId).then(({ data }) => {
      setprofileName(data.details);
    });
  }, []);

  return (
    <div
      className="d-flex justify-content-center align-items-center text-align-center"
      style={{ marginTop: '150px' }}
    >
      <Card
        style={{
          width: '430px',
          padding: '50px',
          paddingTop: '20px',
          backgroundColor: '#E0EAEC',
        }}
      >
        <div className={style.HeadingText}>Account Info</div>
        {profileName === null ? (
          <div className={style.loading}>
            <Spinner animation="border" role="status"></Spinner>
            <span className={style.loadingWord}>Loading</span>
          </div>
        ) : (
          <Form style={{ marginTop: '20px' }}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label
                style={{
                  marginBottom: '0px',
                  color: '#48535B',
                  fontSize: '16px',
                }}
              >
                Name
              </Form.Label>
              <Form.Control
                style={{ fontSize: '14px' }}
                value={profileName?.name}
                disabled="disabled"
                className={style.formControlstyle}
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Label
                style={{
                  marginBottom: '0px',
                  color: '#48535B',
                  fontSize: '16px',
                }}
              >
                Email
              </Form.Label>
              <Form.Control
                style={{ fontSize: '14px' }}
                value={profileName?.email}
                disabled="disabled"
                className={style.formControlstyle}
              />
            </Form.Group>
            <a href="/profile/change-password">
              <Button className={style.changepassbutton} variant="primary">
                Change Password
              </Button>
            </a>
            <a href="/profile/edit">
              <Button className={style.editbutton} variant="primary">
                Edit
              </Button>
            </a>
          </Form>
        )}
      </Card>
    </div>
  );
};

export default ProfileView;
