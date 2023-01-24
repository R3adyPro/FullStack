const Course = ({ course }) => {

    return (
      <div>
        <Header name={course.name} exercises={course.exercises}/>
        <Sisalto parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
    );
  };

  const Header = ({ name }) => {
    return (
      <div>
        <h1>{name} </h1>
      </div> 
    )
}

const Sisalto = ({ parts }) => {
  console.log(parts)
  return (
    <div>
      {parts.map( part => 
        <Parts key={part.id} name={part.name} exercises={part.exercises} />
        )}
    </div>
  )
}

const Parts = ({ name, exercises }) => {
  return(
      <p>{name} {exercises}</p>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce( (s, p) => {
    return s + p.exercises
  }, 0)  
  console.log(total)
    return(
        <p>total of {total} exercise</p>
    )
}

  export default Course