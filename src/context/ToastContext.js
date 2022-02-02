import React, { createContext, useReducer } from 'react';
import { PropTypes } from 'prop-types';
import { useContext } from 'react';

const ToastStateContext = createContext({ toasts: [], show: false });
const ToastDispatchContext = createContext(null);

const ToastReducer = (state, action) => {
  switch (action.type) {
  case 'ADD_TOAST': {
    return {
      ...state,
      toasts: [...state.toasts, action.toast]
    };
  }

  case 'DELETE_TOAST': {
    const updatedToasts = state.toasts.filter((toast) => toast.id != action.id);

    return {
      ...state,
      toasts: updatedToasts
    };
  }

  default: {
    throw new Error('Unhandled action');
  }
  }
};

export function ToastProvider({ children }) {
  const [state, dispatch] = useReducer(ToastReducer, {
    toasts: []
  });

  return (
    <ToastStateContext.Provider value={state}>
      <ToastDispatchContext.Provider value={dispatch}>{children}</ToastDispatchContext.Provider>
    </ToastStateContext.Provider>
  );
}

ToastProvider.propTypes = {
  children: PropTypes.any
};

export const useToastStateContext = () => useContext(ToastStateContext);
export const useToastDispatchContext = () => useContext(ToastDispatchContext);
