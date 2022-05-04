import { useState } from 'react'


const Button = ({value, text, valueHandler}) => (
  <>
    <button onClick={() => valueHandler(value + 1)}>{text}</button>
  </>
)
const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text} {value}</td>
  </tr>
)
const Statistics = ({good, bad, neutral, all}) => {
  if (all === 0) {
    return <p>no feedback given</p>
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value ={good}/>
        <StatisticLine text="neutral" value ={neutral}/>
        <StatisticLine text="bad" value ={bad}/>
        <StatisticLine text="all" value ={all}/>
        <StatisticLine text="average" value ={(good - bad)/all}/>
        <StatisticLine text="positive" value ={good/all*100}/> 
      </tbody>
    </table>
  )
}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad

  return (
    <>
      <h1>give feedback</h1>
      <Button value={good} text="good" valueHandler={setGood} />
      <Button value={neutral} text="neutral" valueHandler={setNeutral} />
      <Button value={bad} text="bad" valueHandler={setBad} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </>
  )
}


export default App;
