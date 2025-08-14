import React, { useEffect } from 'react';
import styles from './CustomAlert.module.css';

interface CustomAlertProps {
  type: 'error' | 'success' | 'info';
  title: string;
  message: string;
  onClose: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ type, title, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Kept at 3000 ms for faster alerts

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={styles.alertContainer}>
      <div className={`${styles.alert} ${styles[type]}`}>
        <div className={styles.title}>{title}</div>
        <div className={styles.message}>{message}</div>
        <button className={styles.closeButton} onClick={onClose}>&times;</button>
      </div>
    </div>
  );
};

export default CustomAlert;