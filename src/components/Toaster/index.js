import React from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

import { useToastStateContext, useToastDispatchContext } from '../../context/ToastContext';

const Toaster = () => {
  const { toasts } = useToastStateContext();
  const dispatch = useToastDispatchContext();

  return (
    <ToastContainer position="bottom-end" className="mb-5 me-5">
      {toasts &&
        toasts.map((toast, idx) => {
          return (
            <Toast
              onClick={() => {
                dispatch({ type: 'DELETE_TOAST', id: toast.id });
              }}
              key={idx}
              bg={toast.type === 'Success' ? 'success' : toast.type === 'Error' ? 'danger' : ''}
            >
              <Toast.Header>
                <strong className="me-auto">{toast.type}</strong>
              </Toast.Header>
              <Toast.Body>{toast.message}</Toast.Body>
            </Toast>
          );
        })}
    </ToastContainer>
  );
};

export default Toaster;
