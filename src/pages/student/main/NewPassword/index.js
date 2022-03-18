import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useToast } from '../../../../hooks/useToast';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from '../../../../components/Button';
import InputField from '../../../../components/InputField';
import PasswordResetApi from '../../../../api/PasswordReset';
import style from './index.module.scss';

const NewPassword = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get('token');
  const { control, handleSubmit } = useForm();
  const history = useHistory();
  const toast = useToast();

  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState(false);

  const showAlertDialog = (isShow, message) => {
    setShowAlert(isShow);
    setAlertMessage(message);
  };

  const handleOnSubmit = ({ email, password, password_confirmation }) => {
    toast('Processing', 'Changing your password...');
    setSubmitStatus(true);
    setShowAlert(false);
    setErrors({});

    const values = {
      email,
      password,
      password_confirmation,
      token: token
    };

    PasswordResetApi.resetPassword(values)
      .then(() => {
        toast('Success', 'Successfully Changed Your Password.');
        history.push('/login');
      })
      .catch((error) => {
        toast(
          'Error',
          'Please enter a valid input to successfully change your password.'
        );
        setSubmitStatus(false);
        if (error?.response?.data?.errors) {
          setErrors(error?.response?.data?.errors);
        } else {
          showAlertDialog(true, 'Incorrect Email.');
        }
      });
  };

  return (
    <Container>
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
      <div className="d-flex justify-content-center align-items-center">
        <Form
          onSubmit={handleSubmit(handleOnSubmit)}
          className={style.formCard}
        >
          <div className={style.headerStyle}>
            Change Password
          </div>
          <div className={style.suggestion}>
            Create a new password that is at least 6 characters long. A strong
            password is a combination of letters, numbers, and symbols.
          </div>
          <div className={style.formInputs}>
            <Form.Group className="mb-3" controlId="NewPassword">
              <Form.Label>Email</Form.Label>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value, ref } }) => (
                  <InputField
                    ref={ref}
                    type="email"
                    value={value}
                    onChange={onChange}
                    fieldSize="md"
                    isInvalid={!!errors?.email}
                    placeholder="e.g. johndoe@gmail.com"
                    maxLength={50}
                  />
                )}
              />
              <Form.Control.Feedback type="invalid">
                {errors?.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="NewPassword">
              <Form.Label>New Password</Form.Label>
              <Controller
                control={control}
                name="password"
                defaultValue=""
                render={({ field: { onChange, value, ref } }) => (
                  <InputField
                    ref={ref}
                    type="password"
                    value={value}
                    onChange={onChange}
                    fieldSize="md"
                    isInvalid={!!errors?.password}
                    placeholder="min of 6 characters"
                    maxLength={20}
                  />
                )}
              />
              <Form.Control.Feedback type="invalid">
                {errors?.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="ConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Controller
                control={control}
                name="password_confirmation"
                defaultValue=""
                render={({ field: { onChange, value, ref } }) => (
                  <InputField
                    ref={ref}
                    type="password"
                    value={value}
                    onChange={onChange}
                    fieldSize="md"
                    isInvalid={!!errors?.password_confirmation}
                    placeholder="match passwords"
                    maxLength={20}
                  />
                )}
              />
              <Form.Control.Feedback type="invalid">
                {errors?.password_confirmation}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <Button
            buttonLabel="Continue"
            buttonSize="sm"
            type="submit"
            disabled={submitStatus}
          />
        </Form>
      </div>
    </Container>
  );
};

export default NewPassword;
