import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { useToast } from '../../../../hooks/useToast';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Button from '../../../../components/Button';
import InputField from '../../../../components/InputField';
import AuthApi from '../../../../api/Auth';
import style from './index.module.scss';

const Registration = () => {
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

  const handleOnSubmit = ({ name, email, password, password_confirmation }) => {
    toast('Processing', 'Creating your account...');
    setSubmitStatus(true);
    setShowAlert(false);
    setErrors({});

    AuthApi.register({ name, email, password, password_confirmation })
      .then(() => {
        toast('Success', 'Successfully Registered.');
        history.push('/login');
      })
      .catch((error) => {
        toast('Error', 'Please enter a valid input to successfully register.');
        setSubmitStatus(false);
        if (error?.response?.data?.errors) {
          setErrors(error?.response?.data?.errors);
        } else if (error?.response?.data?.error) {
          showAlertDialog(true, error?.response?.data?.error?.message);
        } else {
          showAlertDialog(true, 'An error has occurred.');
        }
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
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
      <div>
        <Container id={style.container}>
          <Stack id={style.formCard}>
            <div>
              <h4>Sign Up</h4>
            </div>
            <Form
              onSubmit={handleSubmit(handleOnSubmit)}
              className={style.form}
            >
              <section>
                <Form.Group className="mb-4" controlId="Name">
                  <Form.Label>
                    <h6 className="mb-0">Name</h6>
                  </Form.Label>
                  <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, value, ref } }) => (
                      <InputField
                        ref={ref}
                        type="text"
                        value={value}
                        onChange={onChange}
                        fieldSize="md"
                        isInvalid={!!errors?.name}
                        placeholder="e.g. John Doe"
                        maxLength={50}
                      />
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="Email">
                  <Form.Label>
                    <h6 style={{ marginBottom: '0px' }}>Email</h6>
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
                        isInvalid={!!errors?.email}
                        placeholder="e.g. jhondoe@gmail.com"
                        maxLength={50}
                      />
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="Password">
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

                <Form.Group className="mb-4" controlId="PasswordConfirmation">
                  <Form.Label>
                    <h6 className="mb-0">Confirm Password</h6>
                  </Form.Label>
                  <Controller
                    control={control}
                    name="password_confirmation"
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
              </section>

              <Button
                buttonLabel="Sign Up"
                buttonSize="sm"
                type="submit"
                disabled={submitStatus}
              />

              <div className={style.withAccountMessage}>
                <p>Already have an Account?</p>
                <LinkContainer to="/login" className={style.signInLink}>
                  <span>Sign In</span>
                </LinkContainer>
              </div>
            </Form>
          </Stack>
        </Container>
      </div>
    </div>
  );
};

export default Registration;
