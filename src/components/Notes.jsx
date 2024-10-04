import styles from '../styles/Notes.module.css'

const Notes = ({cardData, handleOnClick}) => {
  return (
    <li className={styles.card}>
      <h3>{cardData.title.length>20 ? `${cardData.title.slice(0,18)}...` : cardData.title }</h3>
      <p>{cardData.note.length>35 ? `${cardData.note.slice(0,31)}...` : cardData.note }</p>
      <button className= {styles.closeButton} onClick={() =>handleOnClick(cardData.id) }>X</button>
    </li>
  );
};

export default Notes;