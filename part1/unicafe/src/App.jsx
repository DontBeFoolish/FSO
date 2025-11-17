import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticLine = ({ value, text}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  return (
    <div>
      {good || neutral || bad ? 
      <table>
        <tbody>
          <StatisticLine text='good' value={good}/>
          <StatisticLine text='neutral' value={neutral}/>
          <StatisticLine text='bad' value={bad}/>
          <StatisticLine text='total' value={good + neutral + bad}/>
          <StatisticLine text='average' value={good / (good + neutral + bad)}/>
        </tbody>
      </table>

        : <p>No feedback given</p> }
    </div>
  )
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <div>
          <h2>Give Feedback</h2>
          <Button onClick={() => setGood(good + 1)} text={'good'}/>
          <Button onClick={() => setNeutral(neutral + 1)} text={'neutral'} />
          <Button onClick={() => setBad(bad + 1)} text={'bad'} />
      </div>
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </>
  )
}

export default App