const Notes = ({cardData}) => {
  return (
    <div className="card">
      <h3>{cardData.title}</h3>
      <p>{cardData.note}</p>
    </div>
  );
};

export default Notes;