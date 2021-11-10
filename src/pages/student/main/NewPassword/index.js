import React, { useState } from 'react';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import style from "./index.module.css";
import PasswordResetApi from "../../../../api/PasswordReset";
import { useForm, Controller } from "react-hook-form";
import Cookies from 'js-cookie';

const NewPassword = () => {
    const { control, handleSubmit, data } = useForm();
    const [errors, setErrors] = useState({});
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

  const showAlertDialog = (isShow, message) => {
    setShowAlert(isShow);
    setAlertMessage(message);
  };

  const handleOnSubmit = async ({ password, password_confirmation, token }) => {
    try {
        // console.log( email, password, password_confirmation, token );

      const response = await PasswordResetApi.newPassword({ password, password_confirmation, token });
      Cookies.set('access_token', response.data.token);
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
  <center>
    <Container>
      <Stack gap={2} className="col-md-5 mx-auto">
        <Form
          onSubmit={handleSubmit(handleOnSubmit)}
          className={style.contentstyle}
        >
          <div align="start" className={style.suggestion}>
            Create a new password that is at least 6 characters long. A strong
            password is a combination of letters, numbers, and symbols.
          </div>
          <div className={style.left} align="start">
            <Form.Group className="mb-3" controlId="NewPassword">
              <Form.Label>New Password</Form.Label>
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
                      placeholder="***********"
                      isInvalid={errors?.email}
                      required
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
                    <Form.Control
                      onChange={onChange}
                      value={value}
                      ref={ref}
                      className="cntrs"
                      type="password"
                      placeholder="***********"
                      isInvalid={errors?.email}
                      required
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.password}
                </Form.Control.Feedback>
            </Form.Group>

            <center>
              <Button type="submit" id={style.button}>
                <span className={style.textbutton}>
                  Continue
                </span>
              </Button>
            </center>
          </div>
        </Form>
      </Stack>
    </Container>
  </center>
  );
};

export default NewPassword;
