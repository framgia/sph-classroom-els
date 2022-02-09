import React, { useState } from 'react';
import { useToast } from '../../../../hooks/useToast';
import { useForm, Controller } from 'react-hook-form';
import Cookies from 'js-cookie';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';

import style from './index.module.css';

import AuthApi from '../../../../api/Auth';

const AdminLogin = () => {
  const { control, handleSubmit } = useForm();
  const [error, setError] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState(false);

  const toast = useToast();

  const showAlertDialog = (isShow, message) => {
    setShowAlert(isShow);
    setAlertMessage(message);
  };

  const handleOnSubmit = async ({ email, password }) => {
    toast('Processing', 'Logging in...');
    setSubmitStatus(true);
    setError('');
    setShowAlert(false);

    try {
      const response = await AuthApi.login({ email, password, loginType: 'Admin' });
      Cookies.set('access_token', response.data.token);
      Cookies.set('admin_id', response.data.user.id);
      Cookies.set('user_type', 'admin');
      window.location = '/admin/categories';
    } catch (error) {
      toast('Error', 'Incorrect Credentials, please try again.');
      setSubmitStatus(false);
      if (error?.response?.data?.error) {
        setError(error?.response?.data?.error);
        showAlertDialog(
          true,
          error?.response?.data?.error?.unauthorized || 'Incorrect Credentials'
        );
      } else {
        showAlertDialog(true, 'An error has occurred.');
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      {showAlert && (
        <Alert
          className={`${style.alert}`}
          variant="danger"
          onClose={() => setShowAlert(false)}
          dismissible
        >
          {alertMessage}
        </Alert>
      )}
      <div>
        <Container className={style.loginContainer}>
          <Stack gap={2} id={style.loginForm}>
            <div className={style.signInText}>
              <h4>Sign In</h4>
            </div>
            <Form onSubmit={handleSubmit(handleOnSubmit)}>
              <div className={style.contanair}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>
                    <h6 className="mb-0">Email Address</h6>
                  </Form.Label>
                  <Controller
                    control={control}
                    name="email"
                    defaultValue=""
                    render={({ field: { onChange, value, ref } }) => (
                      <Form.Control
                        onChange={onChange}
                        value={value}
                        ref={ref}
                        type="email"
                        placeholder="Enter email here"
                        isInvalid={!!error?.email || !!error?.unauthorized}
                        required
                        maxLength={50}
                      />
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                    {error?.email || error?.unauthorized}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-1" controlId="password">
                  <Form.Label>
                    <h6 className="mb-0 mt-3">Password</h6>
                  </Form.Label>
                  <Controller
                    control={control}
                    name="password"
                    defaultValue=""
                    render={({ field: { onChange, value, ref } }) => (
                      <Form.Control
                        onChange={onChange}
                        value={value}
                        ref={ref}
                        type="password"
                        name="password"
                        placeholder="Enter password here"
                        isInvalid={!!error?.password}
                        required
                        maxLength={20}
                      />
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                    {error?.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <center>
                  <Button id={style.signInButton} type="submit" disabled={submitStatus}>
                    <p>Sign In</p>
                  </Button>
                </center>
              </div>
            </Form>
          </Stack>
        </Container>
      </div>
    </div>
  );
};

export default AdminLogin;
