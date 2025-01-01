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
        {cardData.content?.length > 35
          ? `${cardData.content.slice(0, 31)}...`
          : cardData.content}
      </p>
      <button
        className={styles.closeButton}
        onClick={(e) => {
          handleOnClick(cardData._id);
          handleChildElementClick(e);
        }}
      >
        X
      </button>
    </li>
  );
};

export default Notes;
