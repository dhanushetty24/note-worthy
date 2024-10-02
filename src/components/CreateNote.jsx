import { useState } from "react";
import Notes from "./Notes";
import styles from '../styles/CreateNote.module.css'

const CreateNote = () => {
  const [cardData, setCardData] = useState({ title: '', note: '' });
  const [notes, setNotes] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setNotes([...notes, cardData]);
    setCardData({ title: '', note: '' });
  };

  const handleInputChange = (e) => {
    setCardData({ ...cardData, [e.target.name]: e.target.value });
  }
  
  const handleOnClick = () => {
    
  } 

  return (
    <section>
        <form onSubmit={handleSubmit} >
          <div>
            <input 
              type="text" 
              name="title" 
              value={cardData.title} 
              onChange={handleInputChange} 
              placeholder="Title" 
              required/>
          </div>
          <div>
            <textarea 
              name="note" 
              value={cardData.note} 
              onChange={handleInputChange} 
              placeholder="Add your Note" 
              required/>
          </div>
          <div>
            <button type='Submit'>Create</button>
          </div>
        </form>
        <ul className={styles.displayStyle}>
          {notes.length ? notes.map((obj) => <Notes cardData = {obj}/>) : false}
        </ul>
    </section>
  )
};

export default CreateNote;
