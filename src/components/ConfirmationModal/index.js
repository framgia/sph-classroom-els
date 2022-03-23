import React from 'react';
import { PropTypes } from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from '../Button';

/*
    To use this component, pass the following props:

    showModal           :    pass the boolean value to determine whether to show or hide the modal.
    setShowModal        :    pass the setter function of the state holding the boolean value.

    basically you're just going to pass the state you defined that will hold the boolean value to determine whether to show or hide modal.

    e.g.       const [showModal, setShowModal] = useState()

               <Breadcrumbs showModal={showModal} setShowModal={setShowModal} />

    itemToDelete         :    pass a string value such as the Quiz Name, Admin Name or Category Name of the item to be deleted to display in the modal.
    setDeleteConfirmed   :    pass the setter function of the state holding the boolean value to determine whether to confirm deletion.
    canDelete            :    pass boolean such as true or false.
*/

const ConfirmationModal = ({
  showModal,
  setShowModal,
  itemToDelete,
  setDeleteConfirmed,
  canDelete = true
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
          <b>{canDelete ? 'Confirmation Modal' : 'Message'}</b>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        {canDelete ? (
          <p>
            Are you sure you want to permanently delete{' '}
            <strong>{itemToDelete}</strong>?
          </p>
        ) : (
          <p>
            Cannot delete <strong>{itemToDelete}</strong>
          </p>
        )}
      </Modal.Body>
      <Modal.Footer>
        {canDelete ? (
          <Button
            buttonLabel="Cancel"
            buttonSize="sm"
            outline={true}
            onClick={() => { setShowModal(false);}}
          />) : ('')}
        <Button
          buttonLabel={canDelete ? 'Yes' : 'Close'}
          buttonSize="sm"
          onClick={() => {
            if (canDelete) {
              setDeleteConfirmed(true);
            }

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
  setDeleteConfirmed: PropTypes.func,
  message: PropTypes.string,
  canDelete: PropTypes.bool
};

export default ConfirmationModal;
