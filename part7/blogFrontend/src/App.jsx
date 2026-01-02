import { useQuery } from '@tanstack/react-query';
import { useRef, useContext } from 'react';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import NotificationContext from './context/NotificationContext';
import AuthContext from './context/AuthContext';
import Blogs from './components/Blogs';

function App() {
  // const { user } = useContext(AuthContext);
  let user = {
    username: 'meow',
    name: 'vi',
    token: '123',
  };

  const handleLogout = () => {
    user = null;
  };

  const { setNotification } = useContext(NotificationContext);

  const blogFormRef = useRef();

  const {
    data: blogs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    select: (returnedBlogs) =>
      [...returnedBlogs].sort((a, b) => b.likes - a.likes),
    retry: 1,
  });

  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>blog service unavailable</div>;

  const addBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility();
      const response = await blogService.create(newBlog);
      setBlogs(blogs.concat(response));
      const message = 'successfully added blog';
      setNotification({ message, type: 'success' });
    } catch (error) {
      const message = error.response.data.error;
      setNotification({ message, type: 'error' });
    }
  };

  return (
    <div>
      <Notification />
      {!user && (
        <>
          <h1>Login</h1>
          <LoginForm />
        </>
      )}
      {user && (
        <>
          <h2>blogs</h2>
          <p>
            {user.name} logged in -
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </p>
          <Blogs user={user} blogs={blogs} />
          <Togglable
            buttonOpen="create blog"
            buttonClose="cancel"
            ref={blogFormRef}
          >
            <BlogForm addBlog={addBlog} />
          </Togglable>
        </>
      )}
    </div>
  );
}

export default App;
