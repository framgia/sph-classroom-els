import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import style from './index.module.css';
import PasswordResetApi from '../../../../api/PasswordReset';
import { useForm, Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';

const PasswordReset = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [status, setStatus] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(false);

  const { control, handleSubmit } = useForm();
  const [error, setError] = useState('');

  const handleOnSubmit = async ({ email }) => {
    setSubmitStatus(true);
    setError('');

    try {
      await PasswordResetApi.forgotPassword({ email });
      setSuccessMessage(
        'An email has been sent. Please click the link provided in the email sent to proceed with the password reset.'
      );
      setStatus(true);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <center>
      <Container>
        <Stack gap={2} className='col-md-5 mx-auto'>
          <Form
            onSubmit={handleSubmit(handleOnSubmit)}
            className={style.contentstyle}
          >
            {status === false ? (
              <div className={style.center} align='start'>
                <center>
                  <Form.Label>
                    {' '}
                    <h4> Password Reset </h4>
                  </Form.Label>
                </center>
                <Form.Group
                  id={style.Containercentermargin}
                  className='mb - 3'
                  controlId='Email'
                >
                  <Form.Label>
                    <h6 style={{ marginBottom: '0px' }}>Email</h6>
                  </Form.Label>
                  <Controller
                    control={control}
                    name='email'
                    defaultValue=''
                    render={({ field: { onChange, value, ref } }) => (
                      <Form.Control
                        onChange={onChange}
                        value={value}
                        ref={ref}
                        className='cntrs'
                        type='email'
                        isInvalid={error}
                        required
                        maxLength={50}
                      />
                    )}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {error}
                  </Form.Control.Feedback>
                </Form.Group>

                <center>
                  {submitStatus === false ? (
                    <Button type='submit' id={style.button}>
                      <span className={style.textbutton}>
                        Send Recovery Link
                      </span>
                    </Button>
                  ) : (
                    <Button type='submit' id={style.button} disabled>
                      <span className={style.textbutton}>
                        Send Recovery Link
                      </span>
                    </Button>
                  )}
                </center>

                <center>
                  <div>
                    <a href='login' className={style.cancel}>
                      Cancel
                    </a>
                  </div>
                </center>
              </div>
            ) : (
              <div>
                <h4 className={style.title}>Password Reset</h4>
                <div className={style.successMessageContainer}>
                  <span>{successMessage}</span>
                </div>
                <Link to={'/'} className={style.backButton}>
                  Back
                </Link>
              </div>
            )}
          </Form>
        </Stack>
      </Container>
    </center>
  );
};
export default PasswordReset;
