import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const ErrorHandler = ({ statusCode, message }) => {
  useEffect(() => {
  toast.error(`${statusCode}: ${message}`, {
    position: 'bottom-right',
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
  }, [statusCode, message]);
  return (
    <>
      <ToastContainer />
    </>
  );
};

export default ErrorHandler;
