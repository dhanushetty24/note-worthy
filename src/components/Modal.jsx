import React from 'react';
import styles from '../styles/Modal.module.css';

const Modal = ({ isModalOpen, onClose, children }) => {
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