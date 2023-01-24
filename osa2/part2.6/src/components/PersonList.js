const PersonList = ({ person, deleteName }) => {
    return (
      <div key={person.id}>
          {person.name} {person.number}
          <button onClick={() => deleteName(person.id, person.name)}>delete</button>
      </div>
    )
    };
  
  export default PersonList;