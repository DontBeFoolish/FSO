import { useContext } from 'react';
import { useField } from '../hooks';
import AuthContext from '../contexts/AuthContext';

function LoginForm() {
  const { login } = useContext(AuthContext);

  const { reset: resetUsername, ...username } = useField('text');
  const { reset: resetPassword, ...password } = useField('password');

  const handleLogin = (event) => {
    event.preventDefault();
    console.log('attempting login');
    login({ username: username.value, password: password.value });
  };

  return (
    <form onSubmit={handleLogin}>
      <label>
        Username:
        <input {...username} />
      </label>
      <label>
        Password:
        <input {...password} />
      </label>
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
