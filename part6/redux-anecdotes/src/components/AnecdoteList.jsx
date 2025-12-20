import { useDispatch, useSelector } from "react-redux";
import { voteForAnecdote } from "../reducers/anecdoteReducer";
import { resetNotification, setNotification } from "../reducers/notificationReducer";

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
    dispatch(voteForAnecdote(anecdote.id))
    dispatch(setNotification(`Voted for - ${anecdote.content}`))
    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000);
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
