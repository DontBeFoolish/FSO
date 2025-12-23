function LoginForm({
  handleLogin, username, setUsername, password, setPassword,
}) {
  return (
    <form onSubmit={handleLogin}>
      <label htmlFor="username">
        Username:
        <input
          type="text"
          id="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </label>
      <br />
      <label htmlFor="password">
        Password:
        <input
          type="password"
          id="password"
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
