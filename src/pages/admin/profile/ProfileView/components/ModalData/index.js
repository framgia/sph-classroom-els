import React, { props } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useForm, Controller } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Button from '@restart/ui/esm/Button';
import { PropTypes } from 'prop-types';

import style from '../../index.module.scss';

const ModalData = ({ 
  error,
  status,
  modalShow,
  submitStatus,
  setModalShow,
  successMessage,
  handleOnSubmit
}) => {
  const { control, handleSubmit } = useForm();

  return (
    <Modal
      {...props}
      size="50"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={modalShow}
      onHide={() => {
        setModalShow(false);
      }}
    >
      <Modal.Header closeButton className={style.header}>
        <Modal.Title id="contained-modal-title-vcenter">
            Upload Your Profile
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(handleOnSubmit)}>
        {status === false ? (
          <Form.Group controlId="formBasicEmail">
            <Controller
              control={control}
              name="image"
              defaultValue=""
              render={({ field }) => (
                <Form.Control
                  onChange={(e) => {
                    field.onChange(e.target.files[0]);
                  }}
                  className={style.controllerstyle}
                  type="file"
                  isInvalid={!!error?.image}
                  required
                  maxLength={1024}
                />
              )}
            />
            <Form.Control.Feedback type="invalid">
              {error?.image}
            </Form.Control.Feedback>
            <Modal.Footer>
              <Button id={style.Btncolor} type="submit" disabled={submitStatus}>
                <p style={{ fontSize: '14px' }}>Upload</p>
              </Button>
            </Modal.Footer>
          </Form.Group>
        ) : (
          <center>
            <div className={style.successMessageContainer}>
              <span>{successMessage}</span>
            </div>
          </center>
        )}
      </Form>
    </Modal>
  );   
};

ModalData.propTypes = {
  error: PropTypes.any,
  status: PropTypes.bool,
  modalShow: PropTypes.bool,
  submitStatus: PropTypes.bool,
  setModalShow: PropTypes.func,
  successMessage: PropTypes.any,
  handleOnSubmit: PropTypes.func
};

export default ModalData;
