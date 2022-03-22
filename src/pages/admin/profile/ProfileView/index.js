import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Button from '../../../../components/Button';
import InputField from '../../../../components/InputField';
import AdminApi from '../../../../api/Admin';
import style from './index.module.scss';

const AdminProfile = () => {
  const [profileName, setprofileName] = useState(null);
  const loggedInUserId = Cookies.get('admin_id');

  useEffect(() => {
    AdminApi.getAllUsers(loggedInUserId).then(({ data }) => {
      setprofileName(data[0]);
    });
  }, []);

  return (
    <div className={style.mainBody}>
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
              <Link to="/admin/profile/edit-password">
                <Button buttonLabel="Change Password" buttonSize="def" />
              </Link>
              <Link to="/admin/profile/edit">
                <Button buttonLabel="Edit" buttonSize="sm" />
              </Link>
            </div>
          </Form>
        )}
      </Card>
    </div>
  );
};

export default AdminProfile;
