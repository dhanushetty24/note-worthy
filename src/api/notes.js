import axiosInstance from './axiosInstances';

export const fetchData = async (setNotes) => {
  try {
    const { data } = await axiosInstance.get('/jotgles');
    setNotes(data.data);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const addNote = async (cardDataSet, setNotes) => {
  try {
    const { data } = await axiosInstance.post('/jotgles', cardDataSet);
    setNotes((prevNotes) => [...prevNotes, data.jotgle]);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const updateANote = async (cardDataSet, setNotes) => {
  try {
    const { data } = await axiosInstance.patch(`/jotgles/${cardDataSet._id}`, cardDataSet);
    setNotes((prevNotes) => prevNotes.map((note) => (note._id === data.data._id ? data.data : note)));
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const deleteNote = async (_id, setNotes) => {
  try {
    await axiosInstance.delete(`/jotgles/${_id}`);
    setNotes((prevNotes) => prevNotes.filter((note) => note._id !== _id));
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
