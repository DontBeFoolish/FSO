import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useContext } from "react"
import { createAnecdote } from "../requests"
import NotificationContext from "../NotificationContext"

const AnecdoteForm = () => {
  const { setNotification } = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.setQueryData(['anecdotes'], prev => prev.concat(newAnecdote))
      setNotification(`Created anecdote ${newAnecdote.content}`, 5)
    },
    onError: () => {
      setNotification('Anecdote must be 5 characters or more')
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(content)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
