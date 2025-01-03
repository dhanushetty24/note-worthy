import styles from '../styles/Notes.module.css';

const Notes = ({ cardData, handleOnClick, handleNoteOpen }) => {
  const handleChildElementClick = (e) => {
    e.stopPropagation();
  };
  return (
    <li className={styles.card} onClick={() => handleNoteOpen(cardData._id)}>
      <h2>
        {cardData.title.length > 25
          ? `${cardData.title.slice(0, 20)}...`
          : cardData.title}
      </h2>
      <p>
        {cardData.content?.length > 55
          ? `${cardData.content.slice(0, 50)}...`
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
