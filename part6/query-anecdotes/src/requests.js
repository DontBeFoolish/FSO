const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const response = await fetch(baseUrl)
  if (!response.ok) {
    throw new Error('Failed to get anecdotes')
  }

  return await response.json()
}

export const createAnecdote = async (content) => {
  const newAnecdote = {
    content,
    id: (100000 * Math.random()).toFixed(0),
    votes: 0
  }

  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newAnecdote)
  })
  if (!response.ok) {
    throw new Error('Failed to create new anecdote')
  }

  return await response.json()
}

export const updateAnecdote = async (anecdote) => {
  const response = await fetch(`${baseUrl}/${anecdote.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ votes: anecdote.votes + 1})
  })
  if (!response.ok) {
    throw new Error('Failed to update anecdote')
  }

  return await response.json()
}