import { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Blog from './components/Blog';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

function App() {
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    select: (blogs) => [...blogs].sort((a, b) => b.likes - a.likes)
  })

  if (result.isLoading) return <div>loading data</div>
  if (result.isError) return <div>service unavailable</div>
  
  const blogs = result.data
  /** 
  const handleLike = async (blog) => {
    try {
      const returnedBlog = await blogService.update(blog.id);
      const updatedBlogs = blogs
        .map((b) => (b.id === returnedBlog.id ? returnedBlog : b))
        .sort((a, b) => b.likes - a.likes);
      setBlogs(updatedBlogs);
    } catch (error) {
      const message = error.response.data.error;
      //showNotification(setNotifInfo, message, 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await blogService.remove(id);
      const updatedBlogs = blogs.filter((b) => b.id !== id);
      setBlogs(updatedBlogs);
      const message = 'removed blog';
      //showNotification(setNotifInfo, message, 'success');
    } catch (error) {
      const message = error.response.data.error;
      //showNotification(setNotifInfo, message, 'error');
    }
  };
   */

  return (
    <div>
      <Notification />
      {user && (
        <>
          <h1>Login</h1>
          <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        </>
      )}
      {!user && (
        <>
          <h2>blogs</h2>
          <p>
            {/**user.name*/} logged in -
            <button type="button" /**onClick={handleLogout}*/>Logout</button>
          </p>
          <ul>
            {blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                user={user}
                //handleLike={handleLike}
                //handleDelete={handleDelete}
              />
            ))}
          </ul>
          <Togglable buttonOpen="create blog" buttonClose="cancel" ref={blogFormRef}>
            <BlogForm />
          </Togglable>
        </>
      )}
    </div>
  );
}

export default App;
