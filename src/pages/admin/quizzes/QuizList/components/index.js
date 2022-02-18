import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useForm, Controller } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Button from '@restart/ui/esm/Button';
import { PropTypes } from 'prop-types';

import style from '.././index.module.scss';

const ModalRender = ({handleOnSubmit, submitStatus, errors, modalShow, setModalShow}) => {
  const { control, handleSubmit, reset} = useForm();

  useEffect(() =>{
    if (submitStatus){
      reset({
        name: '',
        instruction: ''
      });
    }
  }, [submitStatus]);


  return (
    <Modal
      size="50"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={modalShow}
    >
      <Modal.Header id={style.modalHeader}>
        <Modal.Title className={style.modalTitle} id="contained-modal-title-vcenter">
            Add a Quiz
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(handleOnSubmit)} id={style.forForm}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>
            <h6 className="mb-0">Name</h6>
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
                type="text"
                placeholder="Sample Quiz"
                isInvalid={!!errors?.name}
                required
                maxLength={50}
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors?.name}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="instruction">
          <Form.Label>
            <h6 className="mb-0">Instruction</h6>
          </Form.Label>
          <Controller
            control={control}
            name="instruction"
            defaultValue=""
            render={({ field: { onChange, value, ref } }) => (
              <Form.Control
                onChange={onChange}
                value={value}
                ref={ref}
                as="textarea"
                style={{height: '100px', resize: 'none'}}
                placeholder="Instruction"
                isInvalid={!!errors?.instruction}
                required
                maxLength={2000}
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors?.instruction}
          </Form.Control.Feedback>
        </Form.Group>

        <p style={{height: '165px'}}>Root
          <br/>Web Development
          <br/>Web Development
          <br/>Web Development
          <br/>Web Development
        </p>
        <Modal.Footer className={style.modalFooter}>
          <Button 
            className={style.button} 
          >
            Go Back
          </Button>
          <div className={style.spaceBettewen}>
            <a 
              className={style.cancelTag}
              onClick={() =>{
                setModalShow(false);
              }}
            >
              Cancel
            </a>
            <Button 
              className={style.button} 
              type="submit" 
              disabled={submitStatus}
            >
              Add Quiz
            </Button>
          </div>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

ModalRender.propTypes = {
  handleOnSubmit: PropTypes.bool,
  submitStatus: PropTypes.bool,
  setModalShow: PropTypes.bool,
  modalShow: PropTypes.bool,
  errors: PropTypes.any,
};

export default ModalRender;