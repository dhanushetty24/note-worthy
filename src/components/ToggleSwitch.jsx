import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import styles from '../styles/Toggle.module.css';

const ToggleSwitch = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div className={styles.switchContainer}>
      <label className={styles.switch}>
        <input
          className={styles.switchInput}
          onClick={toggleTheme}
          type="checkbox"
          role="switch"
          name="dark"
          {...(theme === 'dark' ? { checked: true } : {})}
        />
        <span className={styles.switchInner}></span>
        <p className={styles.switchSr}>{theme} Mode</p>
      </label>
    </div>
  );
};


export default ToggleSwitch;
