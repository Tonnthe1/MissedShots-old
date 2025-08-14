import React from 'react';
import styles from './CustomToggle.module.css';

interface CustomToggleProps {
  isOn: boolean;
  onToggle: () => void;
  activeIcon: string;
  inactiveIcon: string;
  label: string;
}

const CustomToggle: React.FC<CustomToggleProps> = ({ isOn, onToggle, activeIcon, inactiveIcon, label }) => {
  return (
    <div className={styles.toggleContainer} onClick={onToggle}>
      <div className={`${styles.toggle} ${isOn ? styles.on : ''}`}>
        <div className={styles.slider}>
          <img src={isOn ? activeIcon : inactiveIcon} alt={label} className={styles.icon} />
        </div>
      </div>
      <input type="text" placeholder={label} className={styles.input} />
    </div>
  );
};

export default CustomToggle;