import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import style from "./index.module.css";
import Modal from "react-bootstrap/Modal";
import PasswordResetApi from "../../../../api/PasswordReset";
import { useForm, Controller } from "react-hook-form";

const PasswordReset = () => {
  const [show, setShow] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const { control, handleSubmit, data } = useForm();
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const showAlertDialog = (isShow, message) => {
    setShow(isShow);
    setModalMessage(message);
  };

  const handleOnSubmit = async ({ email }) => {
    try {
      const response = await PasswordResetApi.forgotPassword({ email });
      showAlertDialog(true,'An email has been sent. Please click the link when you get it.');
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
        <Stack gap={2} className="col-md-5 mx-auto">
          <Form
            onSubmit={handleSubmit(handleOnSubmit)}
            className={style.contentstyle}
          >
            <div className={style.center} align="start">
              <Form.Group className="mb - 3" controlId="Email">
                <Form.Label>Reset Password</Form.Label>

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

              <center>
                <Button
                  type="submit"
                  onClick={() => {
                    setShow(false);
                  }}
                  id={style.button}
                >
                  <span className={style.textbutton}>
                    Send the recovery link
                  </span>
                </Button>
              </center>

              <center>
                <div>
                  <a href="login" className={style.cancel}>
                    Cancel
                  </a>
                </div>
              </center>
            </div>
          </Form>
        </Stack>
      </Container>
      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
        className={style.modalcenter}
      >
        <Modal.Header closeButton>
          <Modal.Title>Password Reset</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={style.textmodal}>
            {
              modalMessage
            }
          </div>
        </Modal.Body>
      </Modal>
      
    </center>
  );
};
export default PasswordReset;
