import { useState } from 'react';

function Blog({ blog, user, handleLike, handleDelete }) {
  const [visible, setVisible] = useState(false);
  // const isOwner = blog.user && blog.user.username === user.username;
  const isOwner = true

  return (
    <li className="blog">
      <div className="blog-header">
        {blog.title} - {blog.author}
        <button type="button" onClick={() => setVisible(!visible)}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>

      {visible && (
        <div className="blog-details">
          <p>{blog.url}</p>
          <p>
            {`Likes - `}
            <span className='likes'>{blog.likes}</span>
            {' '}
            <button type="button" onClick={() => handleLike(blog)}>like</button>
          </p>
          <p>{blog.user.name}</p>
          {isOwner && (
            <button type="button" onClick={() => handleDelete(blog.id)}>delete</button>
          )}
        </div>
      )}
    </li>
  );
}

export default Blog;
