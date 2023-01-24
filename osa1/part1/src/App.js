
const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}
const Content = (props) => {
  return (
    <div>
      <p>{props.name} {props.exercise}</p>
    </div>
  )
}
const Total = (props) => {
  console.log(props)
  return (
    <div>
      <p>Number of exercises {props.exercises}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const Sum = course.parts.map(obj => obj.exercises)
  console.log(Sum)
 

  return (
    <div>
      <Header course={course.name} />
      {course.parts.map(obj => <Content name={obj.name} exercise={obj.exercises}/>)}
      <Total exercises={Sum[0] + Sum[1] + Sum[2]}/>
    </div>
  )
}


export default App;