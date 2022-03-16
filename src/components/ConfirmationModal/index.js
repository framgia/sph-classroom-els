import React from 'react';
import { PropTypes } from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from '../Button';

/*
    To use this component, pass the following props:

    showModal           :    pass the boolean value to determine whether to show or hide the modal.
    setShowModal        :    pass the setter function of the state holding the boolean value.

    basically you're just going to pass the state you defined that will hold the boolean value to determine whether to show or hide modal.

    e.g.       const [showModal, ] = useState()

               <Breadcrumbs showModal={showModal} setShowModal={setShowModal} />

    itemToDelete         :    pass a string value such as the Quiz Name, Admin Name or Category Name of the item to be deleted to display in the modal.
    setDeleteConfirmed   :    pass the setter function of the state holding the boolean value to determine whether to confirm deletion.
*/

const ConfirmationModal = ({
  showModal,
  setShowModal,
  itemToDelete,
  setDeleteConfirmed
}) => {
  return (
    <Modal
      show={showModal}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Confirm Deletion
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        <p>
          Are you sure you want to permanently delete{' '}
          <strong>{itemToDelete}</strong>?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          buttonLabel="Cancel"
          buttonSize="sm"
          outline={true}
          onClick={() => setShowModal(false)}
        />
        <Button
          buttonLabel="Yes"
          buttonSize="sm"
          onClick={() => {
            setDeleteConfirmed(true);
            setShowModal(false);
          }}
        />
      </Modal.Footer>
    </Modal>
  );
};

ConfirmationModal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  itemToDelete: PropTypes.string,
  setDeleteConfirmed: PropTypes.func
};

export default ConfirmationModal;
