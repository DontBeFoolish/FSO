import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import Blogs from './components/Blogs';

function App() {
  // const { user, logout } = useContext(AuthContext);
  const user = {
    username: 'vi',
    name: 'Vi Developer',
    token: '123',
  };

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
            {user.name} logged in -{' '}
            <button
              type="button"
              // onClick={() => logout()}
            >
              Logout
            </button>
          </p>
          <Blogs user={user} blogs={blogs} />
          <Togglable
            buttonOpen="create blog"
            buttonClose="cancel"
            ref={blogFormRef}
          >
            <BlogForm />
          </Togglable>
        </>
      )}
    </div>
  );
}

export default App;
