import { useState } from 'react';
import { useDeleteBlog, useLikeBlog } from '../hooks/useBlogMutation';

function Blog({ blog, user }) {
  const [visible, setVisible] = useState(false);
  const likeMutation = useLikeBlog();
  const deleteMutation = useDeleteBlog();
  const isOwner = blog.user && blog.user.username === user.username;

  const handleLike = () => likeMutation.mutate(blog);
  const handleDelete = () => deleteMutation.mutate(blog.id);

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
            {'Likes - '}
            <span className="likes">{blog.likes}</span>{' '}
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
