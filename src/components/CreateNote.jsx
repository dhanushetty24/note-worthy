import { useState, useReducer } from 'react';
import Notes from './Notes';
import Modal from './Modal';
import { FaPencilAlt } from 'react-icons/fa';
import styles from '../styles/CreateNote.module.css';


const CreateNote = () => {
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [displayWarn, setDisplayWarn] = useState(false);

const initialState = { title: '', note: '', id: '' }
const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_TITLE':
      {
        action.payload.length === 0 ? setDisplayWarn(true) : setDisplayWarn(false);
        return { ...state, title: action.payload };
      }
    case 'UPDATE_NOTE':
      return { ...state, note: action.payload };
    case 'SET_DISPLAY':
      return action.payload;
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}
const [cardDataSet, dispathCardData] = useReducer(reducer, initialState);

const handleSubmit = (e) => {
  e.preventDefault();
  setNotes([
    ...notes,
    { ...cardDataSet, id: Math.floor(Math.random() * Date.now()) },
  ]);
  dispathCardData({ type: 'RESET' });
  setIsModalOpen(false);
};

  const handleDeleteNote = (id) => {
    dispathCardData({ type: 'RESET' });
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const handleNoteOpen = (id) => {
    const selectedNote = notes.find((note) => note.id === id);
    dispathCardData({ type: 'SET_DISPLAY', payload: selectedNote});
    setIsNoteOpen(true);
  };

  const handleNoteClose = () => {
    setIsNoteOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNoteEdit = () => {
    setIsNoteOpen(false);
    setIsModalOpen(true);
  };

  const displayCreate = () => {
    return (
      cardDataSet.title.length === 0 ||
      cardDataSet.note.length > 500 ||
      cardDataSet.title.length > 50
    );
  };

  return (
    <section>
      {/* Create button to create new note */}
      <div className={styles.buttonWrapper}>
        <button
          className={`${styles.addButton} ${
            notes.length > 0 || isModalOpen
              ? styles.addButtonWithContent
              : false
          }`}
          onClick={handleOpenModal}
        >
          +
        </button>
      </div>
      {/* Create new note modal  */}
      {isModalOpen && (
        <Modal isModalOpen={isModalOpen} onClose={handleCloseModal}>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputWrapper}>
              <input
                type='text'
                name='title'
                value={cardDataSet.title}
                onChange={e =>dispathCardData({type: 'UPDATE_TITLE', payload: e.target.value})}
                placeholder='Title'
              />
              {cardDataSet.title.length > 50 && (
                <p className={styles.warning}>
                  Warning: Maximum text length of 50 characters exceeded.
                </p>
              )}
              {displayWarn && (
                <p className={styles.warning}>Warning: Title can't be empty.</p>
              )}
            </div>
            <div className={styles.inputWrapper}>
              <textarea
                name='note'
                value={cardDataSet.note}
                onChange={e => dispathCardData({type: 'UPDATE_NOTE', payload: e.target.value})}
                placeholder='Add your Note'
              />
              {cardDataSet.note.length > 500 && (
                <p className={styles.warning}>
                  Warning: Maximum text length of 500 characters exceeded.
                </p>
              )}
            </div>
            {!displayCreate() && (
              <div className={styles.buttonWrapper}>
                <button className={styles.createButton} type='submit'>
                  Create
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </div>
            )}
          </form>
        </Modal>
      )}

      {/* Display all the notes created */}
      {notes.length > 0 && (
        <ul className={styles.displayStyle}>
          {notes.map((note) => (
            <Notes
              key={note.id}
              handleOnClick={handleDeleteNote}
              handleNoteOpen={handleNoteOpen}
              cardData={note}
            />
          ))}
        </ul>
      )}

      {/* Display a specific note opened in the modal*/}
      {isNoteOpen && (
        <Modal isModalOpen={isNoteOpen} onClose={handleNoteClose}>
          <div className={styles.noteOpen}>
            <h3>{cardDataSet.title}</h3>
            <p>{cardDataSet.note}</p>
            <div className={styles.buttonWrapper}>
              <button className={styles.editButton} onClick={handleNoteEdit}>
                <FaPencilAlt size={25} color='white' />
              </button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default CreateNote;
