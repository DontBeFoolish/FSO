import { useContext } from 'react';
import { useField } from '../hooks';
import AuthContext from '../contexts/AuthContext';

function LoginForm() {
  const { login } = useContext(AuthContext);

  const { reset: resetUsername, ...username } = useField('text');
  const { reset: resetPassword, ...password } = useField('password');

  const handleLogin = (event) => {
    event.preventDefault();
    login({ username: username.value, password: password.value });
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input {...username} />
        </label>
        <br />
        <label>
          Password:
          <input {...password} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default LoginForm;
