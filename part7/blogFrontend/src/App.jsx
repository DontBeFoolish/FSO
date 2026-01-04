import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Notification from './components/Notification';
import AuthContext from './contexts/AuthContext';

import LoginForm from './components/LoginForm';
import Blogs from './pages/Blogs';
import Users from './pages/Users';
import NavBar from './components/NavBar';
import Blog from './pages/Blog';
import User from './pages/User';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Notification />
      <NavBar />

      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <LoginForm />}
        />
        <Route
          path="/"
          element={user ? <Blogs /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/users"
          element={user ? <Users /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/blogs/:id"
          element={user ? <Blog /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/users/:id"
          element={user ? <User /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </>
  );
}

export default App;
