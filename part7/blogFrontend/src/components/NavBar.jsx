import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

function NavBar() {
  const { user, logout } = useContext(AuthContext);
  if (!user) return null;

  return (
    <div>
      <Link to="/">Blogs</Link>
      {' | '}
      <Link to="/users">Users</Link>
      {' | '}
      <button type="button" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default NavBar;
