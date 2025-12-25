import { useMutation, useQueryClient } from '@tanstack/react-query';
import blogService from '../services/blogs'

function BlogForm() {
  const queryClient = useQueryClient()

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => queryClient.setQueryData(['blogs'], prev => prev.concat(newBlog)),
    onError: (error) => console.log(error)
  })

  const createBlog = (e) => {
    e.preventDefault();
    newBlogMutation.mutate({ 
      title: e.target.title.value, 
      author: e.target.author.value, 
      url: e.target.url.value 
    });

    e.target.title.value = ''
    e.target.author.value = ''
    e.target.url.value = ''
  };

  return (
    <form onSubmit={createBlog}>
      <label>
        Title:
        <input name="title" />
      </label>
      <label>
        Author:
        <input name="author" />
      </label>
      <label>
        URL:
        <input name="url" />
      </label>
      <button type="submit">Create</button>
    </form>
  );
}

export default BlogForm;
