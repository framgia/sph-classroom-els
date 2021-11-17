import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import style from './index.module.css';
import Modal from 'react-bootstrap/Modal';
import PasswordResetApi from '../../../../api/PasswordReset';
import { useForm, Controller } from 'react-hook-form';

const PasswordReset = () => {
  const [show, setShow] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const { control, handleSubmit } = useForm();
  const [errors, setErrors] = useState({});

  const showAlertDialog = (isShow, message) => {
    setShow(isShow);
    setModalMessage(message);
  };

  const handleOnSubmit = async ({ email }) => {
    try {
      await PasswordResetApi.forgotPassword({ email });
      showAlertDialog(true,'An email has been sent. Please click the link provided to proceed with the password reset.');
    } catch (error) {
      console.log(error.response);
      if (error?.response?.data?.errors) {
        setErrors(error?.response?.data?.errors);
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
            <div className={style.center} align="start">
              <center>
                <Form.Label> <h4> Password Reset </h4></Form.Label>
              </center>
              <Form.Group id={style.Containercentermargin} className="mb - 3" controlId="Email">
                <Form.Label>
                  <h6>Email</h6>
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
        centered
        show={show}
        onHide={() => {
          setShow(false);
        }}
      >
        <Modal.Header id={style.modalcenter} closeButton>
          <Modal.Title> <p style={{fontWeight: 'Bold', fontSize:'16px'}}> Password Reset </p> </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={style.textmodal}>
            {
              modalMessage
            }
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button id={style.Btncolor} onClick={() => {
            setShow(false);
          }}>Close</Button>
        </Modal.Footer>
      </Modal>
      
    </center>
  );
};
export default PasswordReset;
