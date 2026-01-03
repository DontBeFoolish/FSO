import { useField } from '../hooks';
import { useCreateBlog } from '../hooks/useBlogMutation';

function BlogForm() {
  const { reset: resetTitle, ...title } = useField('text');
  const { reset: resetAuthor, ...author } = useField('text');
  const { reset: resetUrl, ...url } = useField('text');
  const createMutation = useCreateBlog();

  const createBlog = (e) => {
    e.preventDefault();

    createMutation.mutate({
      title: title.value,
      author: author.value,
      url: url.value,
    });

    resetTitle();
    resetAuthor();
    resetUrl();
  };

  return (
    <form onSubmit={createBlog}>
      <label>
        Title:
        <input {...title} />
      </label>
      <label>
        Author:
        <input {...author} />
      </label>
      <label>
        URL:
        <input {...url} />
      </label>
      <button type="submit">Create</button>
    </form>
  );
}

export default BlogForm;
