import { click } from "@testing-library/user-event/dist/click"
import { useState } from "react"

const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <p>{props.name} {props.amount}</p>
    </div>
  )
}

const Statistics = (props) => {
  return(
    <div>
      <Statistics text="good" value={props.value} />
    </div>
  )
}


function App() {
  const [good, setGood] = useState(0)
  const [natural, setNatural] = useState(0)
  const [bad, setBad] = useState(0)

  const material = {
    firstTitle: "Give feedback",
    secondTitle: "Statistics",
    good: "Good",
    natural: "Natural",
    bad: "Bad",
    all: "all",
    average: "average",
    positive: "positive"
  }
  if(good+natural+bad == 0){
    return (
      <div>
        <Header title={material.firstTitle}/>
        <button onClick={() => setGood(good + 1)}>Good</button> <button onClick={() => setNatural(natural + 1)}>Natural</button> <button onClick={() => setBad(bad + 1)}>Bad</button>
        <Header title={material.secondTitle}/>
        <Content name="No feedback given"/>
      </div>
    );

  }
  else{
    return (
      <div>
        <Header title={material.firstTitle}/>
        <button onClick={() => setGood(good + 1)}>Good</button> <button onClick={() => setNatural(natural + 1)}>Natural</button> <button onClick={() => setBad(bad + 1)}>Bad</button>
        <Header title={material.secondTitle}/>
        <Content name={material.good} amount={good}/> <Content name={material.natural} amount={natural}/> <Content name={material.bad} amount={bad}/>
        <Content name={material.all} amount={good + natural + bad}/> <Content name={material.average} amount={good * 1 + natural * 0 + bad * -1}/> <Content name={material.positive} amount={100 - ((natural + bad) / (natural + bad + good)) *100  + "%"}/>
      </div>
    );
  }

}

export default App;
