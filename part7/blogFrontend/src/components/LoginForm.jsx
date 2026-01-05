import { useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
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
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h1 className="mb-4 text-center">Login</h1>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username.value}
            onChange={username.onChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password.value}
            onChange={password.onChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Login
        </Button>
      </Form>
    </div>
  );
}

export default LoginForm;
