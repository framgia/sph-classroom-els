import { useToastDispatchContext } from '../context/ToastContext';

export function useToast() {
  const dispatch = useToastDispatchContext();

  const toast = (type, message) => {
    const id = Math.random().toString(36).substr(2, 9);

    dispatch({
      type: 'ADD_TOAST',
      toast: {
        id,
        type,
        message
      }
    });

    setTimeout(() => {
      dispatch({ type: 'DELETE_TOAST', id });
    }, 6000);
  };

  return toast;
}
