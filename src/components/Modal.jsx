import styles from '../styles/Modal.module.css';

const Modal = ({ isModalOpen, onClose, children }) => {
  if (!isModalOpen) return null;
  return (
    <>
      <div className={styles.backdrop}  onClick={onClose}/>
      <dialog open={isModalOpen} className={styles.modal}>
        {children}
      </dialog>
    </>
  );
};

export default Modal;
