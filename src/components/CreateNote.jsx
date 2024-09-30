import { useState } from "react";
import Notes from "./Notes";

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
        {notes.length ? notes.map((obj) => <Notes cardData = {obj}/>) : <p>No notes available</p>}
    </section>
  )
};

export default CreateNote;
