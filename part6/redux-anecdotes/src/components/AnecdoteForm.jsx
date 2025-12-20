import { useDispatch } from "react-redux";
import { createAnecdote } from '../reducers/anecdoteReducer'
import { resetNotification, setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(setNotification('Anecdote Added'))
    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000);
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit" >create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm