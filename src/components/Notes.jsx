import styles from '../styles/Notes.module.css'

const Notes = ({cardData}) => {
  return (
    <li className={styles.card}>
      <h3>{cardData.title}</h3>
      <p>{cardData.note}</p>
    </li>
  );
};

export default Notes;