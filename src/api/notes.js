export const fetchData = async (setNotes) => {
  try {
    const response = await fetch('http://localhost:8080/api/jotgles');
    const { data } = await response.json();
    setNotes(data);
  } catch (error) {
    console.error('Error:', error);
  }
};

export const addNote = async (cardDataSet, notes, setNotes) => {
  try {
    const response = await fetch('http://localhost:8080/api/jotgles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cardDataSet),
    });
    const { jotgle } = await response.json();
    setNotes([...notes, jotgle]);
  } catch (error) {
    console.error('Error:', error);
  }
};

export const deleteNote = async (_id, setNotes) => {
  try {
    await fetch(`http://localhost:8080/api/jotgles/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setNotes((prevNotes) => prevNotes.filter((note) => note._id !== _id));
  } catch (error) {
    console.error('Error:', error);
  }
};
