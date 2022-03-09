import React from 'react';
import { useHistory } from 'react-router-dom';
import { useToast } from '../../../../hooks/useToast';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Card } from 'react-bootstrap';
import style from './index.module.scss';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { Controller } from 'react-hook-form';
import { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import Spinner from 'react-bootstrap/Spinner';

import ProfileEditApi from '../../../../api/ProfileEdit';
import Cookies from 'js-cookie';
import AdminApi from '../../../../api/Admin';

const AdminEditProfile = () => {
  const { control, handleSubmit } = useForm();
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [profileName, setprofileName] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(false);
  const loggedInUserId = Cookies.get('admin_id');

  const history = useHistory();
  const toast = useToast();

  useEffect(() => {
    AdminApi.getAllUsers(loggedInUserId).then(({ data }) => {
      setprofileName(data[0]);
    });
  }, []);

  const showAlertDialog = (isShow, message) => {
    setShowAlert(isShow);
    setAlertMessage(message);
  };

  const handleOnSubmit = async ({ name, email, password }) => {
    toast('Processing', 'Changing your account information...');
    setSubmitStatus(true);
    setShowAlert(false);
    setErrors({});

    await ProfileEditApi.profileEdit({ name, email, password })
      .then(() => {
        history.push('/admin/profile');
        toast('Success', 'Successfully Changed Your Account Information.');
      })
      .catch((error) => {
        setSubmitStatus(false);
        if (error?.response?.data?.error || error?.response?.data?.errors) {
          setErrors(
            error?.response?.data?.error || error?.response?.data?.errors
          );
        } else {
          showAlertDialog(true, 'An error has occurred.');
        }
      });
  };

  return (
    <div className={style.bodyStyle}>
      <div
        className="d-flex justify-content-center align-items-center text-align-center"
        style={{ marginTop: '267px', marginLeft: '861px' }}
      >
        {showAlert && (
          <Alert
            className={style.allertstyle}
            variant="danger"
            onClose={() => setShowAlert(false)}
            dismissible
          >
            {alertMessage}
          </Alert>
        )}
        <Card className={style.cardStyle}>
          <div className={style.HeadingText}>Edit Account Info</div>
          {profileName === null ? (
            <div className={style.loading}>
              <Spinner animation="border" role="status"></Spinner>
              <span className={style.loadingWord}>Loading</span>
            </div>
          ) : (
            <Form
              onSubmit={handleSubmit(handleOnSubmit)}
              style={{ marginTop: '20px' }}
            >
              <Form.Group
                className={style.marginForForm}
                controlId="formBasicName"
              >
                <Form.Label className={style.FormGroupStyle}>Name</Form.Label>
                <Controller
                  control={control}
                  name="name"
                  defaultValue={profileName?.name}
                  render={({ field: { onChange, value, ref } }) => (
                    <Form.Control
                      onChange={onChange}
                      value={value}
                      ref={ref}
                      className="cntrs"
                      type="text"
                      placeholder="e.g. jhondoe"
                      isInvalid={!!errors?.name}
                      required
                      maxLength={50}
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group
                className={style.marginForForm}
                controlId="formBasicEmail"
              >
                <Form.Label className={style.FormGroupStyle}>Email</Form.Label>
                <Controller
                  control={control}
                  name="email"
                  defaultValue={profileName?.email}
                  render={({ field: { onChange, value, ref } }) => (
                    <Form.Control
                      onChange={onChange}
                      value={value}
                      ref={ref}
                      className="cntrs"
                      type="email"
                      placeholder="e.g. jhondoe@gmail.com"
                      isInvalid={!!errors?.email}
                      required
                      maxLength={50}
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group
                className={style.marginForForm}
                controlId="formBasicPassword"
              >
                <Form.Label className={style.FormGroupStyle}>
                  Password
                </Form.Label>
                <Controller
                  control={control}
                  name="password"
                  defaultValue={profileName?.password}
                  render={({ field: { onChange, value, ref } }) => (
                    <Form.Control
                      onChange={onChange}
                      value={value}
                      ref={ref}
                      className="cntrs"
                      type="password"
                      placeholder="**********"
                      isInvalid={!!errors?.password}
                      required
                      maxLength={50}
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.password}
                </Form.Control.Feedback>
              </Form.Group>

              <div className={style.buttonposition}>
                <Button
                  className={style.changepassbutton}
                  type="submit"
                  disabled={submitStatus}
                >
                  Change
                </Button>
                <div>
                  <a className={style.cancel} href="/admin/profile">
                    Cancel
                  </a>
                </div>
              </div>
            </Form>
          )}
        </Card>
      </div>
    </div>
  );
};

AdminEditProfile.propTypes = {
  name: PropTypes.any,
  email: PropTypes.any,
};

export default AdminEditProfile;
