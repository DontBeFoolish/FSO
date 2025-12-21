import { createSlice } from "@reduxjs/toolkit"
import anecdotesService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    voteForAnecdote(state, action) {
      const updatedAnecdote = action.payload
      return state.map(anecdote => anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

const { createAnecdote, setAnecdotes, voteForAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const incrementVote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdotesService.updateVotes(anecdote)
    dispatch(voteForAnecdote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer
