import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useForm, Controller } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Button from '@restart/ui/esm/Button';
import { PropTypes } from 'prop-types';

import style from '../../index.module.scss';

import Location from '../../../../../../components/ChangeLocation/component/Location';

const AddQuizModal = ({
  handleOnSubmit,
  submitStatus,
  errors,
  modalShow,
  setModalShow,
  location,
  setLocation,
  type
}) => {
  const { control, handleSubmit, reset } = useForm();
  const [isRootCategory, setIsRootCategory] = useState(true);
  const [backButtonClicked, setBackButtonClicked] = useState(false);

  useEffect(() => {
    if (submitStatus) {
      reset({
        name: '',
        instruction: ''
      });
    }

    if (!modalShow) {
      setIsRootCategory(true);
      setLocation(null);
    }
  }, [submitStatus]);

  return (
    <Modal size="50" className={style.modalContainer} show={modalShow}>
      <Modal.Header id={style.modalHeader}>
        <Modal.Title
          className={style.modalTitle}
          id="contained-modal-title-vcenter"
        >
          Add a Quiz
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(handleOnSubmit)} id={style.forForm}>
        <Modal.Body className={style.modalBody}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>
              <h6 className={style.titleStyle}>Name</h6>
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
                  placeholder="Enter quiz title..."
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
              <h6 className={style.titleStyle}>Instruction</h6>
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
                  style={{ height: '100px', resize: 'none' }}
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

          <p style={{ height: '165px' }}>
            <Location
              isRootCategory={setIsRootCategory}
              backToParentCategory={backButtonClicked}
              setBackButtonStatus={setBackButtonClicked}
              location={location}
              setLocation={setLocation}
              type={type}
            />
          </p>
        </Modal.Body>
        <Modal.Footer className={style.modalFooter}>
          {isRootCategory ? (
            ''
          ) : (
            <Button
              className={style.button}
              onClick={() => setBackButtonClicked(true)}
            >
              Go Back
            </Button>
          )}
          <div className={style.primaryButtons}>
            <a
              className={style.cancelTag}
              onClick={() => {
                setModalShow(false);
              }}
            >
              Cancel
            </a>
            <Button
              className={style.button}
              type="submit"
              onClick={() => setModalShow(false)}
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

AddQuizModal.propTypes = {
  handleOnSubmit: PropTypes.func,
  submitStatus: PropTypes.bool,
  setModalShow: PropTypes.func,
  modalShow: PropTypes.bool,
  errors: PropTypes.any,
  location: PropTypes.object,
  setLocation: PropTypes.func,
  type: PropTypes.string
};

export default AddQuizModal;
