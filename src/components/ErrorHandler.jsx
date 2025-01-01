import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const ErrorHandler = ({ statusCode, message }) => {
  useEffect(() => {
  toast.error(`${statusCode?? 'NETWORK_ERROR' }: ${statusCode ? message : 'Unable to connect to the server. Please check your internet connection or try again later.'}`, {
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
