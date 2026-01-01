import { useState } from 'react';

function BlogForm({ addBlog }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const createBlog = (e) => {
    e.preventDefault();
    addBlog({
      title,
      author,
      url,
    });
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <form onSubmit={createBlog}>
      <label>
        Title:
        <input value={title} onChange={({ target }) => setTitle(target.value)} />
      </label>
      <label>
        Author:
        <input value={author} onChange={({ target }) => setAuthor(target.value)} />
      </label>
      <label>
        URL:
        <input value={url} onChange={({ target }) => setUrl(target.value)} />
      </label>
      <button type="submit">Create</button>
    </form>
  );
}

export default BlogForm;
