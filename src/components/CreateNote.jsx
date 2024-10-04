import { useState } from "react";
import Notes from "./Notes";
import styles from '../styles/CreateNote.module.css'

const CreateNote = () => {
  const [cardData, setCardData] = useState({ title: '', note: '', id: ''});
  const [notes, setNotes] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setNotes([...notes, cardData]);
    setCardData({ title: '', note: '', id: ''});
  };

  const handleInputChange = (e) => {
    setCardData({ ...cardData, id: Math.floor(Math.random() * Date.now()),  [e.target.name]: e.target.value });
  }
  
  const handleOnClick = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
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
          {notes.length ? notes.map((obj) => <Notes key ={obj.id} handleOnClick = {handleOnClick} cardData = {obj}/>) : false}
        </ul>
    </section>
  )
};

export default CreateNote;
