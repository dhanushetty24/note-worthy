import axios from 'axios';

export const fetchData = async (setNotes) => {
  try {
    const { data } = await axios.get('http://localhost:8080/api/jotgles');
    setNotes(data.data);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const addNote = async (cardDataSet, setNotes) => {
  try {
    const { data } = await axios.post(
      'http://localhost:8080/api/jotgles',
      cardDataSet
    );
    setNotes((prevNotes) => [...prevNotes, data.jotgle]);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const deleteNote = async (_id, setNotes) => {
  try {
    await axios.delete(
      `http://localhost:8080/api/jotgles/${_id}`
    );
    setNotes((prevNotes) => prevNotes.filter((note) => note._id !== _id));
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
