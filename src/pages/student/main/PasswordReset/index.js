import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useToast } from '../../../../hooks/useToast';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from '../../../../components/Button';
import InputField from '../../../../components/InputField';
import PasswordResetApi from '../../../../api/PasswordReset';
import style from './index.module.scss';

const PasswordReset = () => {
  const toast = useToast();
  const { control, handleSubmit } = useForm();

  const [successMessage, setSuccessMessage] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(false);
  const [error, setError] = useState('');

  const handleOnSubmit = ({ email }) => {
    toast('Processing', 'Sending you an email to reset your password...');
    setSubmitStatus(true);
    setError('');

    PasswordResetApi.forgotPassword({ email })
      .then(() => {
        toast(
          'Success',
          'An email has been successfully sent. Please check your inbox.'
        );
        setSuccessMessage(
          'An email has been sent. Please click the link provided in the email sent to proceed with the password reset.'
        );
        setEmailSent(true);
      })
      .catch((error) => {
        toast('Error', 'Incorrect email address, please try again.');
        setError(error.response.data.error);
        setSubmitStatus(false);
      });
  };

  return (
    <Container>
      <div className="d-flex justify-content-center align-items-center">
        <Form onSubmit={handleSubmit(handleOnSubmit)}>
          {!emailSent ? (
            <div className={style.formContainer}>
              <Form.Label>
                <h4>Password Reset</h4>
              </Form.Label>
              <Form.Group className="mb-3" controlId="Email">
                <Form.Label>
                  <h6 className="mb-0">Email</h6>
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
                      isInvalid={error}
                      placeholder="Enter email here..."
                      maxLength={50}
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {error}
                </Form.Control.Feedback>
              </Form.Group>

              <Button
                buttonLabel="Send Recovery Link"
                buttonSize="lg"
                type="submit"
                disabled={submitStatus}
              />

              <div>
                <a href="login" className={style.cancel}>
                  Cancel
                </a>
              </div>
            </div>
          ) : (
            <div className={style.formContainer}>
              <h4 className={style.title}>Password Reset</h4>
              <div className={style.successMessageContainer}>
                <span>{successMessage}</span>
              </div>
              <Link to="/" className={style.backButton}>
                Back
              </Link>
            </div>
          )}
        </Form>
      </div>
    </Container>
  );
};
export default PasswordReset;
