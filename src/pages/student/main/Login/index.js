import React, { useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { Button, Alert } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import style from './index.module.css';
import Cookies from 'js-cookie';
import AuthApi from '../../../../api/Auth';

const Login = () => {
  const { control, handleSubmit } = useForm();
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const showAlertDialog = (isShow, message) => {
    setShowAlert(isShow);
    setAlertMessage(message);
  };

  const handleOnSubmit = async ({ email, password }) => {
    try {
      const response = await AuthApi.login({ email, password });
      Cookies.set('access_token', response.data.token);
      Cookies.set('user_id', response.data.user.id);
      window.location = '/';
    } catch (error) {
      console.log(error.response);
      if (error?.response?.data?.errors) {
        setErrors(error?.response?.data?.errors);
      } else if (error?.response?.data?.error) {
        showAlertDialog(true, error?.response?.data?.error?.message);
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
        <Container style={{ marginTop: '205px' }}>
          <Stack gap={2} id={style.log01}>
            <div className={style.signintext}>
              {' '}
              <h4> Sign In </h4>{' '}
            </div>
            <Form onSubmit={handleSubmit(handleOnSubmit)}>
              <div className={style.contanair}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>
                    <h6 style={{ marginBottom: '0px' }}>Email Address</h6>
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
                        placeholder="Enter here"
                        isInvalid={errors?.email}
                        required
                        maxLength={50}
                      />
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-1" controlId="password">
                  <Form.Label>
                    <h6 style={{ marginBottom: '0px', marginTop: '10px' }}>
                      Password
                    </h6>
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
                        className="cntrs"
                        type="password"
                        name="password"
                        placeholder="Enter here"
                        isInvalid={errors?.password}
                        required
                        maxLength={20}
                      />
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <p>
                  <LinkContainer to="/reset-password">
                    <a
                      className={style.fotgotPswrdsize}
                      style={{ textDecoration: 'none', marginTop: '0px' }}
                      href="/#"
                    >
                      Forgot password?
                    </a>
                  </LinkContainer>
                </p>

                <center>
                  <Button id={style.Btncolor} type="submit">
                    <p style={{ fontSize: '14px' }}>Sign In</p>
                  </Button>
                </center>

                <center>
                  <div className="cnb">
                    <p className={style.sign}>No Account Yet?</p>
                    <h5 className={style.sign}>
                      <LinkContainer to="/registration">
                        <a
                          className={style.fotgotPswrd}
                          style={{ textDecoration: 'none' }}
                          href="/#"
                        >
                          Sign Up
                        </a>
                      </LinkContainer>
                    </h5>
                  </div>
                </center>
              </div>
            </Form>
          </Stack>
        </Container>
      </div>
    </div>
  );
};

export default Login;
