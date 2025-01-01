import styles from '../styles/Notes.module.css';

const Notes = ({ cardData, handleOnClick, handleNoteOpen }) => {
  const handleChildElementClick = (e) => {
    e.stopPropagation();
  };
  return (
    <li className={styles.card} onClick={() => handleNoteOpen(cardData.id)}>
      <h2>
        {cardData.title.length > 20
          ? `${cardData.title.slice(0, 18)}...`
          : cardData.title}
      </h2>
      <p>
        {cardData.note.length > 35
          ? `${cardData.note.slice(0, 31)}...`
          : cardData.note}
      </p>
      <button
        className={styles.closeButton}
        onClick={(e) => {
          handleOnClick(cardData.id);
          handleChildElementClick(e);
        }}
      >
        X
      </button>
    </li>
  );
};

export default Notes;
