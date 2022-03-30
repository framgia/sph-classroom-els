import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useToast } from '../../../../hooks/useToast';
import { useForm, Controller } from 'react-hook-form';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Button from '../../../../components/Button';
import InputField from '../../../../components/InputField';
import AuthApi from '../../../../api/Auth';
import style from './index.module.scss';

const AdminLogin = () => {
  const toast = useToast();
  const { control, handleSubmit } = useForm();

  const [error, setError] = useState({});
  const [submitStatus, setSubmitStatus] = useState(false);

  const handleOnSubmit = async ({ email, password }) => {
    toast('Processing', 'Logging in...');
    setSubmitStatus(true);
    setError('');

    try {
      const response = await AuthApi.login({
        email,
        password,
        loginType: 'Admin'
      });

      Cookies.set('access_token', response.data.token);
      Cookies.set('admin_id', response.data.user.id);
      Cookies.set('admin_name', response.data.user.name);
      Cookies.set('user_type', 'admin');

      window.location = '/admin/categories';
    } catch (error) {
      toast('Error', 'Incorrect Credentials, please try again.');
      setSubmitStatus(false);
      if (error?.response?.data?.error) {
        setError(error?.response?.data?.error);
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div>
        <Container className={style.loginContainer}>
          <Stack gap={2}>
            <Form id={style.loginForm} onSubmit={handleSubmit(handleOnSubmit)}>
              <h4 className={style.formTitle}>Sign In</h4>
              <Form.Group controlId="email">
                <Form.Label className={style.inputLabels}>
                  Email Address
                </Form.Label>
                <Controller
                  control={control}
                  name="email"
                  defaultValue=""
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

              <Form.Group controlId="password">
                <Form.Label className={style.inputLabels}>Password</Form.Label>
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
                      isInvalid={!!error?.password}
                      placeholder="Enter password here..."
                      maxLength={20}
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {error?.password}
                </Form.Control.Feedback>
              </Form.Group>

              <Button
                buttonLabel="Sign In"
                buttonSize="sm"
                type="submit"
                disabled={submitStatus}
              />
            </Form>
          </Stack>
        </Container>
      </div>
    </div>
  );
};

export default AdminLogin;
