import { useState, useCallback } from 'react';
import Notes from './Notes';
import Modal from './Modal';
import styles from '../styles/CreateNote.module.css';

const CreateNote = () => {
  const [cardData, setCardData] = useState({ title: '', note: '', id: '' });
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNoteOpen, setIsNoteOpen] = useState(false);

  // Memoized Handlers
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setNotes((prevNotes) => [
      ...prevNotes,
      { ...cardData, id: Math.floor(Math.random() * Date.now()) },
    ]);
    setCardData({ title: '', note: '', id: '' });
    setIsModalOpen(false);
  }, [cardData]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setCardData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleDeleteNote = useCallback((id) => {
    setCardData({ title: '', note: '', id: '' });
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  }, []);

  const handleNoteOpen = useCallback((id) => {
    const selectedNote = notes.find((note) => note.id === id);
    setCardData(selectedNote);
    console.log('triggered1')
    setIsNoteOpen(true);
  }, [notes]);

  const handleNoteClose = useCallback(() => {
    setCardData({ title: '', note: '', id: '' });
    setIsNoteOpen(false);
  }, []);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <section>
      <div className={styles.buttonWrapper}>
        <button
          className={`${styles.addButton} ${
            notes.length > 0 || isModalOpen ? styles.addButtonWithContent : false
          }`}
          onClick={handleOpenModal}
        >
        +
        </button>
      </div>
      {isModalOpen && (
        <Modal isModalOpen={isModalOpen} onClose={handleCloseModal}>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type='text'
                name='title'
                value={cardData.title}
                onChange={handleInputChange}
                placeholder='Title'
                required
              />
            </div>
            <div>
              <textarea
                name='note'
                value={cardData.note}
                onChange={handleInputChange}
                placeholder='Add your Note'
                required
              />
            </div>
            <div className={styles.buttonWrapper}>
              <button className={styles.createButton} type='submit'>
                Create
              </button>
            </div>
          </form>
        </Modal>
      )}

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

      {isNoteOpen && (
        <Modal isModalOpen={isNoteOpen} onClose={handleNoteClose}>
          <div>
            <h3>{cardData.title}</h3>
            <p>{cardData.note}</p>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default CreateNote;
