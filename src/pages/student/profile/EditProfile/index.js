import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useToast } from '../../../../hooks/useToast';
import { PropTypes } from 'prop-types';
import Cookies from 'js-cookie';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import Button from '../../../../components/Button';
import InputField from '../../../../components/InputField';
import ProfileEditApi from '../../../../api/ProfileEdit';
import StudentsApi from '../../../../api/Student';
import style from './index.module.scss';

const EditProfile = () => {
  const toast = useToast();
  const history = useHistory();
  const loggedInUserId = Cookies.get('user_id');
  const { control, handleSubmit } = useForm();

  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [accountInfo, setAccountInfo] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(false);

  useEffect(() => {
    StudentsApi.getDetails(loggedInUserId)
      .then(({ data }) => {
        setAccountInfo(data.details);
      })
      .catch(() =>
        toast('Error', 'There was an error getting your account information.')
      );
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

    try {
      await ProfileEditApi.profileEdit({ name, email, password });
      history.push('/profile/view');
      toast('Success', 'Successfully Changed Your Account Information.');
    } catch (error) {
      toast(
        'Error',
        error?.response?.data?.error?.password ||
          error?.response?.data?.errors?.email
      );

      setSubmitStatus(false);

      if (error?.response?.data?.error || error?.response?.data?.errors) {
        setErrors(
          error?.response?.data?.error || error?.response?.data?.errors
        );

        showAlertDialog(
          true,
          error?.response?.data?.error?.password ||
            error?.response?.data?.errors?.email
        );
      } else {
        showAlertDialog(true, 'An error has occurred.');
      }
    }
  };

  return (
    <div className={style.formContainer}>
      {showAlert && (
        <Alert
          className={style.alert}
          variant="danger"
          onClose={() => setShowAlert(false)}
          dismissible
        >
          {alertMessage}
        </Alert>
      )}
      <Card className={style.card}>
        <div className={style.headingText}>Edit Account Info</div>
        {accountInfo === null ? (
          <div className={style.spinner}>
            <Spinner animation="border" role="status"></Spinner>
            <span>Loading</span>
          </div>
        ) : (
          <Form onSubmit={handleSubmit(handleOnSubmit)} className="mt-4">
            <Form.Group className="mb-4" controlId="formBasicName">
              <Form.Label className={style.inputLabels}>Name</Form.Label>
              <Controller
                control={control}
                name="name"
                defaultValue={accountInfo?.name}
                render={({ field: { onChange, value, ref } }) => (
                  <InputField
                    ref={ref}
                    type="text"
                    value={value}
                    fieldSize="md"
                    maxLength={50}
                    onChange={onChange}
                    isInvalid={!!errors?.name}
                    placeholder="e.g. John Doe"
                  />
                )}
              />
              <Form.Control.Feedback type="invalid">
                {errors?.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Label className={style.inputLabels}>Email</Form.Label>
              <Controller
                control={control}
                name="email"
                defaultValue={accountInfo?.email}
                render={({ field: { onChange, value, ref } }) => (
                  <InputField
                    ref={ref}
                    type="email"
                    value={value}
                    fieldSize="md"
                    maxLength={50}
                    onChange={onChange}
                    isInvalid={!!errors?.email}
                    placeholder="e.g. jhondoe@gmail.com"
                  />
                )}
              />
              <Form.Control.Feedback type="invalid">
                {errors?.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Label className={style.inputLabels}>Password</Form.Label>
              <Controller
                control={control}
                name="password"
                defaultValue={accountInfo?.password}
                render={({ field: { onChange, value, ref } }) => (
                  <InputField
                    ref={ref}
                    type="password"
                    value={value}
                    fieldSize="md"
                    maxLength={20}
                    onChange={onChange}
                    isInvalid={!!errors?.password}
                    placeholder="Enter password here..."
                  />
                )}
              />
              <Form.Control.Feedback type="invalid">
                {errors?.password}
              </Form.Control.Feedback>
            </Form.Group>

            <div className={style.formButtons}>
              <div>
                <Link to="/profile/view" className={style.cancel}>
                  Cancel
                </Link>
              </div>
              <Button
                buttonLabel="Change"
                buttonSize="sm"
                type="submit"
                disabled={submitStatus}
              />
            </div>
          </Form>
        )}
      </Card>
    </div>
  );
};

EditProfile.propTypes = {
  name: PropTypes.any,
  email: PropTypes.any
};

export default EditProfile;
