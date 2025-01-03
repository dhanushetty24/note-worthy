import styles from '../styles/Header.module.css';
import img from '../assets/images/logo.jpeg';
const Header = () => {
  return (
    <header>
      <div className={styles.logo}>
        <img src={img} alt='Logo' />
        <h1>Note-worthy</h1>
      </div>
    </header>
  );
};

export default Header;
