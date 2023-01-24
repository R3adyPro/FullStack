const Form = ({ newName, addPerson, handleNameChange }) => {
  return (
    <form onSubmit={addPerson()}>
      <div>
        name:{" "}
        <input name="name" value={newName.name} onChange={handleNameChange()} />
      </div>
      <div>
        number:{" "}
        <input name="number" value={newName.number} onChange={handleNameChange()} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default Form