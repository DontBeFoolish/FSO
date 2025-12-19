import { useDispatch, useSelector } from "react-redux";
import { voteForAnecdote } from "../reducers/anecdoteReducer";

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
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const sortedAnecdotes = [...anecdotes]
    .sort((a, b) => b.votes - a.votes)
    .filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      {sortedAnecdotes.map(anecdote => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => dispatch(voteForAnecdote(anecdote.id))}
        />
      ))}
    </div>
  )
}

export default AnecdoteList
