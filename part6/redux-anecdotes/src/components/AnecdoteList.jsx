import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { incrementVote } from "../reducers/anecdoteReducer";

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>has {anecdote.votes} votes</div>
      <button onClick={handleClick}>vote</button>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => state.anecdotes)
  const sortedAnecdotes = [...anecdotes]
    .sort((a, b) => b.votes - a.votes)
    .filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))

  const handleClick = (anecdote) => {
    dispatch(incrementVote(anecdote))
    dispatch(setNotification(`Voted for - ${anecdote.content}`, 3))
  }

  return (
    <div>
      {sortedAnecdotes.map(anecdote => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => handleClick(anecdote)}
        />
      ))}
    </div>
  )
}

export default AnecdoteList
