import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import NotificationContext from '../contexts/NotificationContext';
import blogService from '../services/blogs'
import { useField } from '../hooks/useField';

function BlogForm() {
  const queryClient = useQueryClient()
  const { setNotification } = useContext(NotificationContext)

  const { reset: resetTitle, ...title } = useField('text')
  const { reset: resetAuthor, ...author } = useField('text')
  const { reset: resetUrl, ...url } = useField('text')

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      queryClient.setQueryData(['blogs'], prev => prev.concat(newBlog))
      setNotification(`created blog ${newBlog.title}`)
    },
    onError: (error) => {
      console.error(error)
      setNotification('Failed to create blog')
    }
  })

  const createBlog = (e) => {
    e.preventDefault();
    const blogData = { title: title.value, author: author.value, url: url.value }
    newBlogMutation.mutate(blogData, {
      onSuccess: () => {        
        resetTitle()
        resetAuthor()
        resetUrl()
      }
    });
  };

  return (
    <form onSubmit={createBlog}>
      <label> Title: 
        <input {...title}/>
      </label>
      <label> Author:
        <input {...author}/>
      </label>
      <label> URL:
        <input {...url} />
      </label>
      <button type="submit">Create</button>
    </form>
  );
}

export default BlogForm;
