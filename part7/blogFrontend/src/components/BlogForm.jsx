import { useField } from '../hooks';
import useBlogMutations from '../hooks/useBlogMutation';

function BlogForm() {
  const { reset: resetTitle, ...title } = useField('text');
  const { reset: resetAuthor, ...author } = useField('text');
  const { reset: resetUrl, ...url } = useField('text');
  const { createBlog } = useBlogMutations();

  const handleSubmit = (e) => {
    e.preventDefault();

    createBlog({
      title: title.value,
      author: author.value,
      url: url.value,
    });

    resetTitle();
    resetAuthor();
    resetUrl();
  };

  return (
    <form onSubmit={handleSubmit}>
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
