import { useContext, useState } from "react";
import AuthContext from '../contexts/AuthContext'

function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useContext(AuthContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    login({ username, password })
  }


  return (
    <form onSubmit={handleSubmit}>
      <label> Username:
        <input
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </label>
      <br />
      <label> Password:
        <input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </label>
      <br />
      <button type="submit">login</button>
    </form>
  );
}

export default LoginForm;
