import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import style from "./index.module.css";
import PasswordResetApi from "../../../../api/PasswordReset";
import { useForm, Controller } from "react-hook-form";
import Cookies from "js-cookie";
import { Alert } from "react-bootstrap";

const NewPassword = () => {
  const { control, handleSubmit, data } = useForm();
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const queryParams = new URLSearchParams(window.location.search); 
  const token = queryParams.get('token');

  const showAlertDialog = (isShow, message) => {
    setShowAlert(isShow);
    setAlertMessage(message);
  };

  const handleOnSubmit = async ({ email, password, password_confirmation }) => {
    try {      
      const values = { email: email, password: password, password_confirmation: password_confirmation, token: token };
      const response = await PasswordResetApi.resetPassword( values );
      Cookies.set("access_token", response.data.token);
      window.location = "/";
    } catch (error) {
      console.log(error.response);
      if (error?.response?.data?.errors) {
        setErrors(error?.response?.data?.errors);
      } else {
        showAlertDialog(true, "An error has occurred.");
      }
    }
  };

  return (
    <center>
      <Container>
      {showAlert && (
        <Alert
          className={`${style.alertNewPassword}`}
          variant="danger"
          onClose={() => setShowAlert(false)}
          dismissible
        >
          {alertMessage}
        </Alert>
      )}
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
                <Form.Label>Email</Form.Label>
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
                        placeholder="Input Email Address"
                        isInvalid={errors?.email}
                        required
                      />
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.email}
                  </Form.Control.Feedback>
                </Form.Group>
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
                      isInvalid={errors?.password}
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

              <center>
                <Button type="submit" id={style.button}>
                  <a className={style.textbutton}>Continue</a>
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
