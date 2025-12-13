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
      <label htmlFor="title">
        Title:
        <input value={title} onChange={({ target }) => setTitle(target.value)} />
      </label>
      <label htmlFor="author">
        Author:
        <input value={author} onChange={({ target }) => setAuthor(target.value)} />
      </label>
      <label htmlFor="url">
        URL:
        <input value={url} onChange={({ target }) => setUrl(target.value)} />
      </label>
      <button type="button">Create</button>
    </form>
  );
}

export default BlogForm;
