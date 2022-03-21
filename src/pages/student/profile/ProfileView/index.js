import React, { useState, useEffect } from 'react';
import { useToast } from '../../../../hooks/useToast';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Button from '../../../../components/Button';
import InputField from '../../../../components/InputField';
import StudentsApi from '../../../../api/Student';
import style from './index.module.scss';

const ProfileView = () => {
  const toast = useToast();
  const loggedInUserId = Cookies.get('user_id');
  const [profileName, setprofileName] = useState(null);

  useEffect(() => {
    StudentsApi.getDetails(loggedInUserId)
      .then(({ data }) => {
        setprofileName(data.details);
      })
      .catch(() =>
        toast('Error', 'There was an error getting the user details.')
      );
  }, []);

  return (
    <div className={style.formContainer}>
      <Card className={style.card}>
        <div className={style.headingText}>Account Info</div>
        {profileName === null ? (
          <div className={style.spinner}>
            <Spinner animation="border" role="status"></Spinner>
            <span>Loading</span>
          </div>
        ) : (
          <Form className="mt-4">
            <Form.Group className="mb-4" controlId="formBasicName">
              <Form.Label className={style.inputLabels}>Name</Form.Label>
              <InputField
                value={profileName?.name}
                fieldSize="md"
                disabled={true}
              />
            </Form.Group>

            <Form.Group className="mb-5" controlId="formBasicEmail">
              <Form.Label className={style.inputLabels}>Email</Form.Label>
              <InputField
                value={profileName?.email}
                fieldSize="md"
                disabled={true}
              />
            </Form.Group>

            <div className="d-flex justify-content-between">
              <Link to="/profile/change-password">
                <Button buttonLabel="Change Password" buttonSize="def" />
              </Link>
              <Link to="/profile/edit">
                <Button buttonLabel="Edit" buttonSize="sm" />
              </Link>
            </div>
          </Form>
        )}
      </Card>
    </div>
  );
};

export default ProfileView;
