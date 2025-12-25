import { useState, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import AuthContext from './contexts/AuthContext';
import blogService from './services/blogs'

function App() {
  const { user } = useContext(AuthContext)

  const { data: blogs, isLoading, isError } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    select: (blogs) => [...blogs].sort((a, b) => b.likes - a.likes),
    retry: 1
  })

  if (isLoading) return <div>loading data</div>
  if (isError) return <div>service unavailable</div>

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
          <LoginForm />
        </>
      )}
      {!user && (
        <>
          <h2>blogs</h2>
          <p>
            {/**user.name*/} logged in -
            <button type="button" /**onClick={handleLogout}*/>Logout</button>
          </p>
          <Blogs user={user} blogs={blogs} />
          <BlogForm />
        </>
      )}
    </div>
  );
}

export default App;
