import { useContext } from "react";
import AuthContext from '../contexts/AuthContext'
import { useField } from "../hooks/useField";

function LoginForm() {
  const { reset: resetUsername, ...username } = useField('text')
  const { reset: resetPassword, ...password } = useField('password')
  const { login } = useContext(AuthContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    login({ username: username.value, password: password.value })
    resetUsername()
    resetPassword()
  }


  return (
    <form onSubmit={handleSubmit}>
      <label> Username:
        <input {...username}/>
      </label>
      <br />
      <label> Password:
        <input {...password}/>
      </label>
      <br />
      <button type="submit">login</button>
    </form>
  );
}

export default LoginForm;
