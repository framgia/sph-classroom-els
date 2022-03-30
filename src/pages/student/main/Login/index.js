import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useToast } from '../../../../hooks/useToast';
import { LinkContainer } from 'react-router-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import InputField from '../../../../components/InputField';
import Button from '../../../../components/Button';
import AuthApi from '../../../../api/Auth';
import style from './index.module.scss';

const Login = () => {
  const toast = useToast();
  const { control, handleSubmit } = useForm();

  const [error, setError] = useState({});
  const [submitStatus, setSubmitStatus] = useState(false);

  const handleOnSubmit = ({ email, password }) => {
    toast('Processing', 'Logging in...');
    setSubmitStatus(true);
    setError('');

    AuthApi.login({
      email,
      password,
      loginType: 'Student'
    })
      .then(({ data }) => {
        Cookies.set('access_token', data.token);
        Cookies.set('user_id', data.user.id);
        Cookies.set('user_type', 'student');
        window.location = '/';
      })
      .catch((error) => {
        toast('Error', 'Incorrect Credentials, please try again.');
        setSubmitStatus(false);
        if (error?.response?.data?.error) {
          setError(error?.response?.data?.error);
        }
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div>
        <Container id={style.container}>
          <Stack id={style.formCard}>
            <div className={style.headerStyle}>Sign In</div>
            <Form
              onSubmit={handleSubmit(handleOnSubmit)}
              className={style.form}
            >
              <section>
                <Form.Group controlId="email">
                  <Form.Label>
                    <h6 className="mb-0">Email Address</h6>
                  </Form.Label>
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
                        isInvalid={!!error?.email || !!error?.unauthorized}
                        placeholder="Enter email here..."
                        maxLength={50}
                      />
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                    {error?.email || error?.unauthorized}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mt-4" controlId="password">
                  <Form.Label>
                    <h6 className="mb-0">Password</h6>
                  </Form.Label>
                  <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, value, ref } }) => (
                      <InputField
                        ref={ref}
                        type="password"
                        value={value}
                        onChange={onChange}
                        fieldSize="md"
                        isInvalid={!!error?.password}
                        placeholder="Enter password here..."
                        maxLength={20}
                      />
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                    {error?.password}
                  </Form.Control.Feedback>
                  <LinkContainer
                    to="/reset-password"
                    className={style.forgotPassword}
                  >
                    <span>Forgot password?</span>
                  </LinkContainer>
                </Form.Group>
              </section>

              <Button
                buttonLabel="Sign In"
                buttonSize="sm"
                type="submit"
                disabled={submitStatus}
              />

              <div className={style.noAccountMessage}>
                <p>No Account Yet?</p>
                <LinkContainer to="/registration" className={style.signUpLink}>
                  <span>Sign Up</span>
                </LinkContainer>
              </div>
            </Form>
          </Stack>
        </Container>
      </div>
    </div>
  );
};

export default Login;
