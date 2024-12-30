import { useState, useReducer, useEffect } from 'react';
import Notes from './Notes';
import Modal from './Modal';
import { FaPencilAlt } from 'react-icons/fa';
import styles from '../styles/CreateNote.module.css';
import { addNote, fetchData, deleteNote } from '../api';
import LoadingSpinner from './LoadingSpinner';
import ErrorHandler from './ErrorHandler';

const CreateNote = () => {
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [displayWarn, setDisplayWarn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disError, setdisError] = useState({
    isError: false,
    statusCode: '',
    message: '',
  });

  const initialState = { title: '', content: '', id: '' };
  const reducer = (state, action) => {
    switch (action.type) {
      case 'UPDATE_TITLE': {
        action.payload.length === 0
          ? setDisplayWarn(true)
          : setDisplayWarn(false);
        return { ...state, title: action.payload };
      }
      case 'UPDATE_NOTE':
        return { ...state, content: action.payload };
      case 'SET_DISPLAY':
        return action.payload;
      case 'RESET':
        return initialState;
      default:
        return state;
    }
  };
  const [cardDataSet, dispatchCardData] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchJotgles = async () => {
      setLoading(true);
      try {
        await fetchData(setNotes);
      } catch (error) {
        setdisError({
          isError: true,
          statusCode: error.status,
          message: error.message,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchJotgles();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const addJotgles = async () => {
      setLoading(true);
      try {
        await addNote(cardDataSet, setNotes);
      } catch (error) {
        setdisError({
          isError: true,
          statusCode: error.status,
          message: error.message,
        });
      } finally {
        setLoading(false);
        dispatchCardData({ type: 'RESET' });
        setIsModalOpen(false);
      }
    };
    addJotgles();
  };

  const handleDeleteNote = (_id) => {
    const deleteJotgles = async () => {
      try {
        await deleteNote(_id, setNotes);
      } catch (error) {
        setdisError({
          isError: true,
          statusCode: error.status,
          message: error.message,
        });
      }
    };
    deleteJotgles();
  };

  const handleNoteOpen = (_id) => {
    const selectedNote = notes.find((note) => note._id === _id);
    dispatchCardData({ type: 'SET_DISPLAY', payload: selectedNote });
    setIsNoteOpen(true);
  };

  const handleNoteClose = () => {
    dispatchCardData({ type: 'RESET' });
    setIsNoteOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    dispatchCardData({ type: 'RESET' });
    setIsModalOpen(false);
  };

  const handleNoteEdit = () => {
    setIsNoteOpen(false);
    setIsModalOpen(true);
  };

  const displayCreate = () => {
    return (
      cardDataSet.title.length === 0 ||
      cardDataSet.content.length > 500 ||
      cardDataSet.title.length > 50
    );
  };

  return (
    <section>
      {/* Create button to create new note */}
      {!loading &&
      <div className={styles.buttonWrapper}>
        <button
          className={`${styles.addButton} ${
            notes.length > 0 || isModalOpen ? styles.addButtonWithContent : ''
          }`}
          onClick={handleOpenModal}
        >
          +
        </button>
      </div>
      }

      {/* display error toast msg on error occurance */}
      {disError.isError && (
        <ErrorHandler
          statusCode={disError.statusCode}
          message={disError.message}
        />
      )}

      {/* Create new note modal  */}
      {isModalOpen && (
        <Modal isModalOpen={isModalOpen} onClose={handleCloseModal}>
          {loading && <LoadingSpinner />}
          {!loading && (
            <form onSubmit={handleSubmit}>
              <div className={styles.inputWrapper}>
                <input
                  type='text'
                  name='title'
                  value={cardDataSet.title}
                  onChange={(e) =>
                    dispatchCardData({
                      type: 'UPDATE_TITLE',
                      payload: e.target.value,
                    })
                  }
                  placeholder='Title'
                />
                {cardDataSet.title.length > 50 && (
                  <p className={styles.warning}>
                    Warning: Maximum text length of 50 characters exceeded.
                  </p>
                )}
                {displayWarn && (
                  <p className={styles.warning}>
                    Warning: Title can't be empty.
                  </p>
                )}
              </div>
              <div className={styles.inputWrapper}>
                <textarea
                  name='note'
                  value={cardDataSet.content}
                  onChange={(e) =>
                    dispatchCardData({
                      type: 'UPDATE_NOTE',
                      payload: e.target.value,
                    })
                  }
                  placeholder='Add your Note'
                />
                {cardDataSet.content.length > 500 && (
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
          )}
        </Modal>
      )}

      {/* Display all the notes created */}
      {loading && <LoadingSpinner />}

      {!loading && notes.length > 0 && (
        <ul className={styles.displayStyle}>
          {notes.map((note) => (
            <Notes
              key={note._id}
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
            <p>{cardDataSet.content}</p>
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
