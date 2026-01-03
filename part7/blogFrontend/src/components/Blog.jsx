import { useContext, useState } from 'react';
import { useDeleteBlog, useLikeBlog } from '../hooks/useBlogMutation';
import AuthContext from '../contexts/AuthContext';

function Blog({ blog }) {
  const { user } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);

  const likeMutation = useLikeBlog();
  const deleteMutation = useDeleteBlog();

  const isOwner = blog.user && blog.user.username === user.username;

  const handleLike = () => likeMutation.mutate(blog.id);
  const handleDelete = () => deleteMutation.mutate(blog.id);

  const url = blog.url.startsWith('http') ? blog.url : `https://${blog.url}`;

  return (
    <li>
      <div>
        {blog.title} - {blog.author}
        <button type="button" onClick={() => setVisible(!visible)}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>

      {visible && (
        <div>
          <a href={url} target="_blank" rel="noopener noreferrer">
            {url}
          </a>
          <p>
            {'Likes - '}
            <span>{blog.likes}</span>{' '}
            <button type="button" onClick={() => handleLike()}>
              like
            </button>
          </p>
          <p>{blog.user.name}</p>
          {isOwner && (
            <button type="button" onClick={() => handleDelete()}>
              delete
            </button>
          )}
        </div>
      )}
    </li>
  );
}

export default Blog;
