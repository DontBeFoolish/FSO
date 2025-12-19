import NoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'


const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <NoteForm />
    </div>
  )
}

export default App
