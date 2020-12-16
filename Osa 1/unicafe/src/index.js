import React, {useState} from 'react';
import ReactDOM from 'react-dom';


const Statistics = (props) => {
  if(props.good + props.bad + props.neutral === 0){
    return (
      <div>
        <h2>No feedback given</h2>
      </div>
    )
  }

  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="Good" value={props.good}/>
          <StatisticLine text="Neutral" value={props.neutral} />
          <StatisticLine text="Bad" value={props.bad} />
          <StatisticLine text="Average" value={(props.good - props.bad) / (props.good + props.bad + props.neutral)} />
          <StatisticLine text="Positive" value={(props.good / (props.good + props.bad + props.neutral)) * 100 + '%'} />
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const App = () =>{
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const setToGood = () => {
    setGood(good + 1)    
  }

  const setToNeutral = () => {
    setNeutral(neutral + 1)
  }

  const setToBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick= {setToGood} text="Good" />
      <Button handleClick={setToNeutral} text="Neutral" />
      <Button handleClick={setToBad} text="Bad" />
      <h1>Statistics</h1>
      
        <Statistics good={good} bad={bad} neutral={neutral} />
      
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

ReactDOM.render(<App />,
  document.getElementById('root')
  )