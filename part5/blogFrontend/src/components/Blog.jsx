import { useState } from 'react';

function Blog({
  blog, user, handleLike, handleDelete,
}) {
  const [visible, setVisible] = useState(false);
  const showWhenVisible = { display: visible ? '' : 'none' };
  return (
    <div>
      {blog.title}
      -
      {blog.author}
      <button type="button" onClick={() => setVisible(!visible)}>
        {visible ? 'hide' : 'view'}
      </button>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>
          Votes -
          {blog.likes}
          <button type="button" onClick={() => handleLike(blog)}>like</button>
        </p>
        <p>{blog.user.name}</p>
        {blog.user.username === user.username
        && <button type="button" onClick={() => handleDelete(blog.id)}>delete</button> }
      </div>
    </div>
  );
}

export default Blog;
