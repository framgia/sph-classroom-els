import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import style from './index.module.scss';

import Location from './component/Location';

const ChangeLocation = ({ show, handleClose }) => {
  return (
    <Fragment>
      <Modal
        className={style.modalContainer}
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className={style.modalHeader}>
          <Modal.Title className={style.modalTitle}>
            Choose Location
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={style.modalBody}>
          <Location />
        </Modal.Body>
        <Modal.Footer className="d-flex gap-3">
          <Button className={style.backButton}>Go Back</Button>
          <div>
            <Button className={style.cancelButton} onClick={handleClose}>
              Cancel
            </Button>
            <Button className={style.saveButton}>Save</Button>
          </div>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

ChangeLocation.propTypes = {
  show: PropTypes.string,
  handleClose: PropTypes.any,
  handleShow: PropTypes.any
};

export default ChangeLocation;
