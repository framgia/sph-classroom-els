import React, { useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { Button, Alert } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';


import AuthApi from '../../../../api/Auth';
import style from './index.module.css';

const Registration = () => {

  const { control, handleSubmit } = useForm();
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const showAlertDialog = (isShow, message) => {
    setShowAlert(isShow);
    setAlertMessage(message);
  };

  const handleOnSubmit = async ({ name, email, password, password_confirmation }) => {
    try {
      await AuthApi.register({ name, email, password, password_confirmation });
      window.location = '/login';
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
    <div>
      {showAlert && (
        <Alert
          className="mx-4 my-4"
          variant="danger"
          onClose={() => setShowAlert(false)}
          dismissible
        >
          {alertMessage}
        </Alert>
      )}
      <Container style={{marginTop:'132px'}}>
        <Stack gap={2} className="col-md-5 mx-auto" id={style.log01}>
          <Form onSubmit={handleSubmit(handleOnSubmit)}>
            <div>
              <Form.Group className="mb-3" controlId="Name">
                <Form.Label>
                  <h5>Name</h5>
                </Form.Label>
                <Controller
                  control={control}
                  name="name"
                  defaultValue=""
                  render={({ field: { onChange, value, ref } }) => (
                    <Form.Control
                      onChange={onChange}
                      value={value}
                      ref={ref}
                      className="cntrs"
                      type="text"
                      placeholder="e.g. jhondoe"
                      isInvalid={errors?.name}
                      required
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="Email">
                <Form.Label>
                  <h5>Email</h5>
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
                      className="cntrs"
                      type="email"
                      placeholder="e.g. jhondoe@gmail.com"
                      isInvalid={errors?.email}
                      required
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="Password">
                <Form.Label>
                  <h5>Password</h5>
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
                      placeholder="min of 6 characters"
                      isInvalid={errors?.password}
                      required
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.password}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="PasswordConfirmation">
                <Form.Label>
                  <h5>Confirm Password</h5>
                </Form.Label>
                <Controller
                  control={control}
                  name="password_confirmation"
                  defaultValue=""
                  render={({ field: { onChange, value, ref } }) => (
                    <Form.Control
                      onChange={onChange}
                      value={value}
                      ref={ref}
                      className="cntrs"
                      type="password"
                      name="password_confirmation"
                      placeholder="************"
                      isInvalid={errors?.password_confirmation}
                      required
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.password_confirmation}
                </Form.Control.Feedback>
              </Form.Group>
                      
              <center style={{marginTop:'65px'}}>
                <Button className={style.Btncolor} type="submit">
                  <h5>Sign Up</h5>
                </Button>
              </center>
                      
              <center>
                <div className="cnb">
                  <p className={style.sign}>Already have an Account?</p>
                  <h5 className={style.sign}>
                    <LinkContainer to="/login">
                      <a style={{ textDecoration: 'none' }} href="/#">
                                  Sign In
                      </a>
                    </LinkContainer>
                  </h5>
                </div>
              </center>
            </div>
          </Form>
        </Stack>
      </Container >
    </div>
  );
};

export default Registration;
